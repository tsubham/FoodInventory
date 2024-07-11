import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{ padding: 20, paddingTop: 40, backgroundColor: Colors.PRIMARY , borderBottomLeftRadius : 25, borderBottomRightRadius : 25 }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
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

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          backgroundColor: "white",
          marginVertical: 10,
          padding: 10,
          borderRadius: 8,
          marginTop: 15,
          alignItems: "center",
        }}
      >
        <Ionicons name="search" size={24} color= {Colors.PRIMARY}/>
        <TextInput style={{fontFamily : 'outfit' , fontSize : 15}} placeholder="Search"></TextInput>
      </View>
    </View>
  );
}
