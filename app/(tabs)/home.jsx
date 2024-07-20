import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useState , useEffect } from 'react'
import Header from '../../components/Home/Header'
import { collection , getDocs, query  } from 'firebase/firestore'
import { db } from '../../config/fireBaseConfig'
import ItemList from '../../components/ItemList/ItemList'
import { ScrollView } from 'react-native'

export default function home() {

  return (
    
    <ScrollView>
    <Header />


   
    <ItemList />
    <View style ={{
      height : 15
    }}>

    </View>
    
    </ScrollView>
  )
}