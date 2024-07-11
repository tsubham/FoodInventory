import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessCard({ business }) {
  const router = useRouter() 
  return (
    <TouchableOpacity
    onPress={()=>router.push("/businessDetails/"+ business?.id)}
      style={{
        borderRadius: 15,
        padding: 10,
        paddingTop: 10,
        marginLeft: 15,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15,
        }}
      ></Image>
      <View>
        <Text style={{ fontFamily: "outfit-bold", marginTop: 5 }}>
          {business.name}
        </Text>

        <Text
          style={{ fontSize: 13, color: Colors.GRAY, fontFamily: "outfit" }}
        >
          {business.address}
        </Text>

        <View style={{ display: "flex", flexDirection :'row' , justifyContent: "space-between" }}>
          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/2107/2107957.png",
              }}
              style={{ height: 15, width: 15 }}
            ></Image>
            <Text style={{ fontFamily: "outfit" }}> 4.5</Text>
          </View>
          <Text
            style={{
              fontFamily: "outfit",
              backgroundColor: Colors.PRIMARY,
              borderRadius: 5,
              fontSize: 12,
              color: "#fff",
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
