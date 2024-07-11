import { View, Text ,Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'

export default function CategoryItems({category , onCategoryPress}) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>  
    <View style = {{padding : 15 , marginRight : 15 , backgroundColor : Colors.ICONS_BG
    , borderRadius :99}} >
    <Image source={{uri : category.icon}} style ={{
        height : 40 ,
        width : 40 
    }}></Image>
    </View> 
    <Text style={{fontSize:10 ,textAlign : 'center' ,
    marginTop : 5 , marginRight : 15 ,
    fontFamily : 'outfit-medium'

     }}>{category.name}</Text>
</TouchableOpacity>    
)
}