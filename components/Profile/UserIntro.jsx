import { View, Text , Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function UserIntro() {
    const {user} = useUser()
  return (
    <View style ={{
display : 'flex' , 
        justifyContent : 'center' ,
        alignItems : 'center',
        marginTop : 20
    }}>
    <Image source={{uri : user.imageUrl}} style = {{
        height : 100 , 
        width : 100, 
        borderRadius : 99 ,
    }}></Image>
    <Text style={{
        fontFamily : 'outfit-medium',
        fontSize : 30
    }}>{user.fullName}</Text>
    <Text style={{
        fontFamily :'outfit', 
        fontSize : 15
    }}>{user.primaryEmailAddress.emailAddress}</Text>
    </View>
  )
}