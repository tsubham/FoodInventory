import { View, Text , TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Category from '../../components/Home/Category';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../config/fireBaseConfig';
import { where } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';
import { useRouter } from 'expo-router';



export default function explore() { 
  const router = useRouter()
  const[businessList , setBusinessList] = useState([])

  const getBusinessByCategory = async (category)=>{
    setBusinessList([])
    const q = query(collection(db , "BusinessData") , where("category" , '==' , category))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc)=>{
      setBusinessList(prev=>[...prev , {id:doc.id , ...doc.data()}])
    })

  } 


  return (
    <View style = {{
      padding : 20 , 
      marginTop : 20
    }}>
    <View style ={{display : 'flex' , flexDirection : 'row' , gap : 10}}>
    <TouchableOpacity onPress={()=> router.back()} ><Ionicons style={{marginTop : 6}} name="arrow-back" size={20} color={'black'} />
</TouchableOpacity>
      <Text style = {{fontFamily : 'outfit-bold' , fontSize : 25}}>Explore More</Text>
    </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          backgroundColor: "white",
          marginVertical: 10,
          padding: 10,
          borderRadius: 8,
          marginTop: 15,
          alignItems: "center",
          borderColor : Colors.PRIMARY , 
          borderWidth : 1
        }}
      >
        <Ionicons name="search" size={24} color= {Colors.PRIMARY}/>
        <TextInput style={{fontFamily : 'outfit' , fontSize : 15 ,
       
        }} placeholder="Search"></TextInput>
      </View>
      <Category explore = {true} onCategorySelect={(category)=>
      getBusinessByCategory(category)
      } />
      <ExploreBusinessList businessList ={businessList} ></ExploreBusinessList>
    </View>
  )
}