import { View, Text } from 'react-native'
import React from 'react'

export default function AboutSection({business}) {
  return (
    <View style={{
        backgroundColor : '#fff',
        padding : 15
    }}>
      <Text style ={{
        fontFamily : 'outfit-bold' ,
        fontSize : 20
      }}>About</Text>
      <Text style ={{
        fontFamily : 'outfit' ,
        fontSize : 15 ,
        lineHeight : 25
      }}>{business.about}</Text>
    </View>
  )
}