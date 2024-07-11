import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { db } from './../../config/fireBaseConfig'
import { collection, query ,getDocs, where } from 'firebase/firestore'

import BusinessDataCard from '../../components/BusinessList/BusinessDataCard'
import Category from '../../components/Home/Category'
import { Colors } from '../../constants/Colors'
import { set } from 'firebase/database'

export default function BusinessListByCategory() {

    const[businessData , setBusinessData] = useState([])
    const [loading , setLoading] = useState(false)
   const navigation = useNavigation()
   const {category} = useLocalSearchParams()
   useEffect(()=>{
    navigation.setOptions({
        headerShown : true ,
headerTitle :  category
           })
           GetBusinessData();   
   },[])

   const GetBusinessData = async ()=>{
    setLoading(true)
    setBusinessData([])
    const q = query(collection(db , 'BusinessData'),where("category",'==', category))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc)=> 
    setBusinessData(prev => [...prev , {id : doc?.id , ...doc.data()}])
    )
    setLoading(false)
}

  return (

    <View>

{ businessData.length && loading == false ?
  <FlatList
data={businessData} 
onRefresh={GetBusinessData}
refreshing = {loading}
renderItem={({item ,index})=>(

  
  
<BusinessDataCard  business={item}  key ={index} />

)}
 />  : loading ? <ActivityIndicator 
  size={'large'} 
  color = {Colors.PRIMARY}
  style={{marginTop : '60%'}}
  ></ActivityIndicator> : <Text style={{fontSize : 25 ,color : Colors.GRAY , textAlign :"center" , 
 fontFamily :'outfit-medium' ,
 marginTop : '50%'
 }}>No business Found</Text>
}
 </View>
  )
}