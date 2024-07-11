import { View, Text ,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from './../../config/fireBaseConfig'
import { collection, query ,getDocs } from 'firebase/firestore'
import { FlatList } from 'react-native'

export default function Slider() {
    const [sliderList , setSliderList] = useState([])
    useEffect(()=>{
        GetSliderList()
    } ,[])
    const GetSliderList = async ()=>{
        setSliderList([])
        const q = query(collection(db , 'Slider'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=> 
        setSliderList(prev => [...prev , doc.data()])
        )
    }
  return (
    <View style = {{} }>
      <Text style ={{fontFamily : "outfit-bold" ,
      fontSize : 20 ,
      paddingTop : 10,
      paddingLeft:20 ,
      marginBottom :5 }}>#Special for you</Text>

      <FlatList style={{paddingLeft : 10}} showsHorizontalScrollIndicator ={false}  horizontal= {true}
        data={sliderList}
        renderItem={({item, index})=>(
            <Image source={{uri : item.imageUrl}}
            style = {{
                width : 300 , 
                height : 180,
borderRadius: 15 ,
marginRight : 15
            }} />

      )}
      />
    </View>
  )
}