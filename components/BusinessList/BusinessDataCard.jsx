import { View,Image , Text } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'


export default function BusinessDataCard({business}) {
 const router = useRouter()
  return (
    <TouchableOpacity 
    onPress={()=> router.push('businessDetails/' + business.id)}
     style={{backgroundColor : '#fff'
    , display : 'flex' ,gap : 10, flexDirection :'row' ,
     padding :10 , margin :10 ,borderRadius : 15,
     alignItems : 'center'
    
    } }
   >
      <Image source={{uri : business.imageUrl}} 
      style={{
        width :120 ,
        height :120 ,
        borderRadius :15
      }}></Image>
      <View>
      <Text style ={{fontSize : 20 , marginBottom :10, fontFamily : 'outfit-bold'}}>{business.name}</Text>
      <Text style ={{fontSize : 18 , marginBottom :10 
      , fontFamily : 'outfit' ,color : Colors.GRAY}}>{business.address}</Text>
      
          <View style={{ display: "flex", flexDirection: "row" ,gap:2 }}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/2107/2107957.png",
              }}
              style={{ height: 15, width: 15 }}
            ></Image>
            <Text style={{ fontFamily: "outfit"  , fontSize : 15}}> 4.5</Text>
          </View>
    </View>
    </TouchableOpacity>
  )
}