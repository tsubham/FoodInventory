import { View, Text ,Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function BusinessListCard({business}) {
    const router = useRouter()
  return (
    <TouchableOpacity onPress={()=>{
        router.push('/businessDetails/'+business.id)
    }}  style ={{
        backgroundColor :'#fff',
        padding :10 ,
        marginTop :15,
        borderRadius : 40
    }}>
<Image source = {{uri : business.imageUrl }}
style ={{
    width : "100%" , 
    height : 150,
    borderBottomLeftRadius : 15 , 
    borderBottomRightRadius : 15
}}>
</Image> 
<View style ={{padding : 10}}>
<Text style ={{fontFamily : 'outfit-bold' , fontSize :20}} >{business.name} </Text>
<Text style ={{ color : Colors.GRAY, fontFamily : 'outfit' }}>{business.address}</Text>
</View>  


 </TouchableOpacity>
  )
}