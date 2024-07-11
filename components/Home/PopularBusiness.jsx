import { View, Text , FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection , getDocs, query  } from 'firebase/firestore'
import { db } from '../../config/fireBaseConfig'
import BusinessCard from './BusinessCard'
export default function PopularBusiness() {

    const [BusinessList , setBusinessList] = useState([])

    useEffect(()=>{
              GetBusinessList()
    } , [])

    const GetBusinessList = async ()=>{
        setBusinessList([])
        const q = query(collection(db ,'BusinessData'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=> {

            setBusinessList(prev=> [...prev , {id : doc.id , ...doc.data()}])
       }
        
        )
    }

  return (
    <View>
      <View style = {{
        padding : 20 ,
         display : 'flex' ,
         flexDirection : 'row',
         justifyContent : "space-between",

      }} >
      <Text style = {{
        fontFamily : 'outfit-bold',
        fontSize:18
      }}>Popular Businesses</Text>
      <Text  style = {{
        fontFamily : 'outfit-medium',
        color : Colors.PRIMARY
      }}>View all</Text>
      </View>

 
      <FlatList
      data={BusinessList}
      horizontal = {true}
      showsHorizontalScrollIndicator = {false}
      renderItem={({item,index})=>(
        <BusinessCard  business={item} key={index}  />
      )
      
      }
      />
    </View>
  )
}