import { FIREBASE_FIRESTORE } from "@/FirebaseConfig";
import MealsDisplay from "@/components/home/MealsDisplay";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import {
  TextInput,
  Button,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLaoding] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    setLaoding(true);
  
    const collectionName = ["balanced_diets", "low_carbs", "dairy_free", "ketogenic", "high_protein", "gluten_free"];
    
    try {
      // Initialize an array to store all search results
      let allResults : any[] = [];
  
      // Iterate over each collection
      for (const name of collectionName) {
        const nameQuery = query(
          collection(FIREBASE_FIRESTORE, name),
          where("meal_name", ">=", searchText),
          where("meal_name", "<=", searchText + "\uf8ff")
        );
        const tagsQuery = query(
          collection(FIREBASE_FIRESTORE, name),
          where("meal_tags", "array-contains", searchText)
        );
        const categoryQuery = query(
          collection(FIREBASE_FIRESTORE, name),
          where("meal_category", "==", searchText)
        );
  
        // Execute queries and get documents
        const [nameSnapshot, tagsSnapshot, categorySnapshot] = await Promise.all([
          getDocs(nameQuery),
          getDocs(tagsQuery),
          getDocs(categoryQuery)
        ]);
  
        // Extract data from snapshots and push to allResults array
        nameSnapshot.forEach(doc => allResults.push(doc.data()));
        tagsSnapshot.forEach(doc => allResults.push(doc.data()));
        categorySnapshot.forEach(doc => allResults.push(doc.data()));
      }
  
      // Filter out duplicates
      const uniqueResults = allResults.filter((value, index, self) =>
        index === self.findIndex((t) => t.meal_id === value.meal_id)
      );
  
      console.log(uniqueResults);
  
      // Update search results state
      setSearchResults(uniqueResults);
      setLaoding(false);
    } catch (error) {
      console.error("Error searching:", error);
      setLaoding(false); 
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView behavior="padding">
      <View style = {styles.inputCont}>
        <TextInput
          placeholder="Search"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          style={styles.txtInput}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          {searchResults && searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={({ item }) => <MealsDisplay meal={item} />}
              keyExtractor={(item) => item.meal_id.toString()}
            />
          ) : (
            <Text style = {styles.txt}>No meals found</Text>
          )}
        </View>
      )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  txtInput: {
    marginVertical: hp(1),
    marginHorizontal: wp(1),
    borderWidth: hp(0.1),
    padding: hp(1),
    borderRadius: hp(1),
    fontFamily: "monospace",
  },
  inputCont: {
    marginHorizontal : wp(2),
    marginVertical : hp(1)
  },
  txt : {
    fontSize : hp(2),
    alignSelf : 'center',
    top : hp(2),
    
  }
});
