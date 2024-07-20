import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
export default function TabLayout() {
  return (
    <Tabs screenOptions={
        {
            tabBarActiveTintColor : Colors.PRIMARY ,
            tabBarStyle : {height : 60} ,

            tabBarLabelStyle : {fontSize : 18} ,
        }
    }>
        <Tabs.Screen name='home' options={{
            tabBarLabel : "Home" ,    
            headerShown : false , 
            tabBarIcon : ({color})=><Ionicons name="home" size={30} color={color}/>
        
        }} >

        </Tabs.Screen>
        <Tabs.Screen name='AddItems' options={{
            tabBarLabel : "Add Items" ,
            headerShown : false ,
            tabBarIcon : ({color})=><Ionicons name="add-circle-sharp" size={30} color={color}/>
        }}>
            
        </Tabs.Screen>
        
    </Tabs>
  )
}
