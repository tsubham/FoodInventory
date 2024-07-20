import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/fireBaseConfig";
import ItemCard from "./ItemCard";
import { deleteDoc, doc } from "firebase/firestore";
import { ToastAndroid } from "react-native";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native";

export default function ItemList() {

  


  const navigation = useNavigation()
  const onDeleteItem = (item) => {
    const card = item;
    Alert.alert(
      "Do you want to delete",
      "Do you really want to delete this business ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteBusiness(card);
          },
        },
      ]
    );
  };
  const deleteBusiness = async (item) => {
    await deleteDoc(doc(db, "FoodItems", item.id));
    GetItemList();
    ToastAndroid.show("Item Deleted..", ToastAndroid.LONG);
  };

  const [ItemList, setItemList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
     GetItemList()      
    }, [])
  )

  const GetItemList = async () => {
    setItemList([]);
    const q = query(collection(db, "FoodItems"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setItemList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };
  return (
    <View
      style={{
        padding: 15,
      }}
    >
      
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
          }}
        >
          Items
        </Text>

        
      <View>
        <FlatList
          onEndReached={() => GetItemList()}
          data={ItemList}
          renderItem={({ item, index }) => (
            <ItemCard
              item={item}
              key={index}
              onDelete={(item) => onDeleteItem(item)}
          
            />
            
          )}
        ></FlatList>
      </View>
    </View>
  );
}
