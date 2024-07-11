import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react' 
import { TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../config/fireBaseConfig';
import { useRouter } from 'expo-router';
import { where } from 'firebase/firestore';

import { useState } from 'react';
import BusinessCard from '../../components/Home/BusinessCard';
import BusinessListCard from '../../components/Explore/BusinessListCard';


export default function Mybusiness() {
    const {user} = useUser()
    const router = useRouter()
    const [loading , setloading] = useState(false)

    const [businessList , setBusinessList] = useState([])

    useEffect(()=>{
        user&&GetUserBusiness()
    },[user])

    const GetUserBusiness = async ()=>{
        setloading(true)
        setBusinessList([])
        const q =  query(collection(db , 'BusinessData') , 
        where('userEmail' , "==" , user?.primaryEmailAddress.emailAddress))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=>{
            setBusinessList(prev=> [...prev , {id : doc.id  , ...doc.data()}])
        })
        setloading(false)
    }

   

  return (
    <View>
      <View style ={{ padding : 20 , 
        marginTop : 20 ,display : 'flex' , flexDirection : 'row' , gap : 10}}>
      <TouchableOpacity onPress={()=> router.back()} ><Ionicons style={{marginTop : 6}} name="arrow-back" size={20} color={'black'} />
    </TouchableOpacity>
        <Text style = {{fontFamily : 'outfit-bold' , fontSize : 25}}>My business</Text>
      </View>
      <FlatList
      onRefresh={GetUserBusiness}
      refreshing = {loading}
      data = {businessList}
      renderItem={({item , index})=>(
<BusinessListCard business={item} key = {index} ></BusinessListCard>      )}></FlatList>
      </View>
  )
} 