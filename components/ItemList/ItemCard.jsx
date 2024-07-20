import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Colors } from "../../constants/Colors";
import { FlipInEasyX } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/fireBaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { updateDoc } from 'firebase/firestore'


export default function ItemCard({item , onDelete}) { 


  const onSubmit =  async (item)=>{
    const docRef = doc(db , 'FoodItems' , item.id) 
    await updateDoc(docRef , {
      available : foods
        })
    ToastAndroid.show('Review Added Successfully' , ToastAndroid.BOTTOM)
  }



  const router = useRouter()

  const [foods, setFoods] = useState(item.available);
 
  const toggleStatus = (item) => {
    setFoods(prevState => !prevState);
    onSubmit(item)
  };
   
  return (
    <View style ={{
        padding : 10 , 
        backgroundColor : 'white',
        borderRadius : 35 ,
        marginTop : 15
    }}>
    <View style = {{
      display : 'flex' ,
        flexDirection : 'row' ,
         justifyContent : 'space-between'
    }} >
    <View style = {{
        display : 'flex' ,
        flexDirection : 'row' ,
         justifyContent : 'space-between'
    }} >
    <View style = {{
        display : 'flex' ,
        flexDirection : 'row' ,
         gap : 30
    }}>
<Image source={{uri : item.imageUrl}} 
style ={{
    height : 50 ,
    width : 50 ,
    borderRadius: 15,

}}>

</Image> 
 
 <View>
        <Text style={{ fontFamily: "outfit-bold", marginTop: 5 }}>
          {item.name}
        </Text>

        <Text
          style={{ fontSize: 13, color: Colors.GRAY, fontFamily: "outfit" }}
        >
          {item.category}
        </Text>
        <Text style={{
          fontSize : 12
        }} >{item.quantity} {item.measurement}</Text>
        </View>
        </View>
</View>

<View style ={{
  display : 'flex' ,
  flexDirection : 'row' ,
  gap: 50

}}>
        <View style={styles.myItem}>
      <Text style={!foods ? styles.active : styles.inactive}>
      </Text>
      <TouchableOpacity
        style={!foods ? styles.activeButton : styles.inactiveButton}
        onPress={() => toggleStatus(item)}
      >
        <Text style={styles.buttonText}>
          {!foods ? 'Active' : 'Inactive'}
        </Text>
      </TouchableOpacity>
    </View>

        <TouchableOpacity  style={{
          marginRight : 14
        }} onPress={()=>
        onDelete(item)} >
        <Ionicons style = {{
            marginTop : 10
        }} name="trash-outline" size={26} color="black" /> 
        </TouchableOpacity>
        </View>
        </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  myItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 8,
  },
  active: {
    color: 'green',
  },
  inactive: {
    color: 'red',
  },
  activeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 50,
    marginRight : 8
  },
  inactiveButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily : 'outfit-medium',
    fontSize : 15
  },
})