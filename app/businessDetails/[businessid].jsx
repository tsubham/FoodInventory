import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { db } from '../../config/fireBaseConfig'
import { getDoc , doc } from 'firebase/firestore'
import { Colors } from '../../constants/Colors'
import Intro from '../../components/BusinessDetails/intro'
import ActionButton from '../../components/BusinessDetails/ActionButton'
import AboutSection from "./../../components/BusinessDetails/AboutSection"
import ReviewsComponent from '../../components/BusinessDetails/ReviewsComponent'
export default function businessid() {

  const [loading , setLoading] = useState(false)
  const {businessid} = useLocalSearchParams()
  const [businessDetails , setBusinessDetails] = useState([])
 
  useEffect(()=>{
GetBusinessDetails()
  } , [])

  const GetBusinessDetails = async()=>{
 setLoading(true)
const docRef = doc(db , "BusinessData" , businessid )
const docSnap = await getDoc(docRef)
 setBusinessDetails({id : docSnap.id , ...docSnap.data()})
setLoading(false)
  }
  return (
    <View> 
    {
      loading ? <ActivityIndicator 
      size={'large'}
      color={Colors.PRIMARY}
      style={{marginTop : '60%'}}></ActivityIndicator> 
      : 
      <ScrollView>
        <Intro business = {businessDetails} />
        <ActionButton business = {businessDetails} />
       

        <AboutSection business = {businessDetails} />
        <ReviewsComponent business ={businessDetails} />
        
        
  </ScrollView>
    }
      
    </View>
  )
}