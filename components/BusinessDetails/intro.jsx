import { View, Text ,Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/fireBaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({business}) {
  const {user} = useUser()
  const onDelete = ()=>{
    Alert.alert("Do you want to delete" , "Do you really want to delete this business ?" ,[
      {
        text : 'Cancel',
        style : 'cancel'

      } ,
      {
        text :'Delete',
        style :'destructive',
        onPress : ()=>{
          deleteBusiness()
        }
      }
    ])
  }

  const deleteBusiness = async()=>{
    await deleteDoc(doc(db, 'BusinessData',business.id))
    router.back()
    ToastAndroid.show('Business Deleted..' , ToastAndroid.LONG)
  }

    const router = useRouter()
  return (
    <View>
    <View style ={{
        position :'absolute', 
        zIndex :10 ,
        display : 'flex' ,
        flexDirection : 'row' , 
        padding : 20 ,
        width : '100%' , marginTop : 15 
        , justifyContent : 'space-between'


    }}>
    <TouchableOpacity onPress={()=> router.back()} ><Ionicons name="arrow-back-circle" size={40} color="#fff" />
</TouchableOpacity>
    <Ionicons name="heart-outline" size={40} color="#fff" />
    </View>
     <Image source={{uri : business.imageUrl}} 
     style ={{width : '100%' ,
     height : 400}} ></Image>
     <View style ={{padding : 20 , 
     marginTop : -20 , 
     backgroundColor : "#fff" , borderTopRightRadius : 25 , 
     borderTopLeftRadius : 25}}>

     <View style ={{display :'flex' ,
     flexDirection :'row',
     justifyContent : 'space-between',
     alignItems :'center'
     }}>
        <Text style={{fontFamily : 'outfit-bold' , fontSize : 25}}>
    {business.name}    
        </Text>
{ user.primaryEmailAddress.emailAddress == business.userEmail ?
  <TouchableOpacity onPress={()=>onDelete()}
        >
        <Ionicons name="trash" size={24} color="black" />

        </TouchableOpacity> : null
}
       
        </View>

        <Text style={{fontFamily : 'outfit' , fontSize : 25}}>
        {business.address}
        </Text>
     </View>
    </View>
  )
}