import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useAuth } from '@clerk/clerk-expo'

export default function Header() {
  const {signOut} = useAuth()
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        height : 180
      }}
    >
    <View style = {{
      display: "flex",
          flexDirection: "row", 
          justifyContent : 'space-between'
    }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginTop : 25
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 45, height: 45, borderRadius: 99 }}
        />
        <View>
          <Text style={{ color: "white" }}>Welcome !</Text>
          <Text
            style={{
              color: "white",
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      <TouchableOpacity style ={{
        display : 'flex' ,
        flexDirection : 'row' ,
        padding : 10 ,
        backgroundColor : '#987D9A' ,
        width : 100 ,
        borderRadius  : 20 , 
        height : 45 ,
        marginTop : 20 ,
      gap : 3
      
      }} 
      onPress={()=>signOut()}
      >
       <Ionicons name="log-out-outline" size={24} color="white" />
      <Text style = {{
        color : 'white' ,
        textAlign : 'center' ,

        
      }} >Logout</Text>
       
      </TouchableOpacity>
      </View>
      <View style = {{
        padding : 20 , 
        marginTop : -10
    }}>
      <Text style = {{
        fontFamily : 'outfit-bold',
        color : '#FFF2E1' ,
        fontSize : 30
      }}>The Food Inventory</Text>
    </View>
    </View>
  );
}
