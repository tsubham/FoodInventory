import { View, Text } from 
'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import UserIntro from '../../components/Profile/UserIntro';
import UserList from '../../components/Profile/UserList';

export default function profile() {
  const router = useRouter()
  return (
    <View style = {{
      padding : 20 , 
      marginTop : 20
    }}>
    <View style ={{display : 'flex' , flexDirection : 'row' , gap : 10}}>
    <TouchableOpacity onPress={()=> router.back()} ><Ionicons style={{marginTop : 6}} name="arrow-back" size={20} color={'black'} />
</TouchableOpacity>
      <Text style = {{fontFamily : 'outfit-bold' , fontSize : 25}}>Profile</Text>
    </View>
    
    <UserIntro />
    <UserList />
  </View>
  )
}