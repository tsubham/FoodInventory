import { View, Text ,Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { storage } from '../../config/fireBaseConfig';
import { collection , getDocs, query, setDoc  } from 'firebase/firestore'
import { db } from '../../config/fireBaseConfig'
import { getDownloadURL, ref } from 'firebase/storage';
import { uploadBytes } from 'firebase/storage'; 
import { useUser } from '@clerk/clerk-expo';
import { doc } from 'firebase/firestore';


export default function addBusiness() {
  const {user} = useUser()
const [categoryList , setCategoryList] = useState([])
const [name , setName] = useState('')
const [website , setWebsite] = useState('')
const [address , setAddress] = useState('')
const [contact , setContact] = useState('')
const [about , setAbout] = useState('')
const [category , setCategory] = useState('')

  const GetCategoryList =  async()=>{
    setCategoryList([])
    const q  = query(collection(db , 'Category')) 
    const snapShot = await getDocs(q)
    snapShot.forEach((doc)=>{
  setCategoryList(prev => [...prev , {
    label : (doc.data()).name  ,
    value : (doc.data()).name
  }])
    })
  }

  const navigation = useNavigation()
  const [image , setImage] = useState(null)

  const onImageClick = async()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
setImage(result.assets[0].uri)  }

  useEffect(()=>{
    navigation.setOptions({
      headerTitle : "Add Business"  ,
      headerShown : true
    })
    GetCategoryList()
  } , [])

  const onAddNewBusiness =  async()=>{
    const fileName = Date.now().toString()+".jpg"
    const resp = await fetch(image)
const blob = await resp.blob()
const imageRef = ref(storage , 'business-app/'+ fileName)
uploadBytes(imageRef , blob).then((snapShot)=>{
  console.log('added successfully..')
}
).then(resp=>{
  getDownloadURL(imageRef).then(async(downloadUrl)=>{
    console.log(downloadUrl)
    saveBusinessDetails(downloadUrl)
  })
})
  }

  const saveBusinessDetails = async(imageUrl)=>{
    await setDoc(doc(db ,'BusinessData', Date.now().toString()),{
      name : name ,
      category : category ,
      address : address ,
      website : website ,
      contact : contact ,
      about : about ,
      userName : user?.fullName ,
      userEmail : user?.primaryEmailAddress.emailAddress ,
      userImage : user?.imageUrl ,
      imageUrl : imageUrl
    })
    ToastAndroid.show('New Business Addedd' ,ToastAndroid.LONG)
  }
         

  return (
    <View style ={{
      padding : 15
    }}>
      <Text style={{
        fontFamily : 'outfit-bold',
        fontSize :25
      }}>Add a new business</Text>
      <Text style={{
        fontFamily : 'outfit',
        fontSize :15 ,
        color : Colors.GRAY
      }}>Fill all details in order to add a new business</Text>
      <TouchableOpacity
      onPress={()=>onImageClick()}
      style ={{
        width : 125 ,
marginTop : 10
      }}>
      {
        !image ?  <Image source={require('./../../assets/images/placeholder.png')} style ={{
        width : 115 , height :115
      }} ></Image> :
       <Image source={{uri :image}} style ={{
        width : 115 , height :115 ,
        borderRadius : 15
      }} ></Image>

      }
      </TouchableOpacity>
      
      <View>
        <TextInput onChangeText={(v)=>setName(v)} style={{
          borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          padding : 10,
          borderWidth :1, 
          marginTop : 10,
fontFamily : 'outfit',
fontSize : 17
        }} placeholder='Name'></TextInput>

        <TextInput onChangeText={(v)=>setAddress(v)} style={{
          borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          padding : 10,
          borderWidth :1, 
          marginTop : 10,
fontFamily : 'outfit',
fontSize : 17
        }} placeholder='Address'></TextInput>
      
         <TextInput onChangeText={(v)=>setContact(v)} style={{
          borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          padding : 10,
          borderWidth :1, 
          marginTop : 10,
fontFamily : 'outfit',
fontSize : 17
        }} placeholder='Contact'></TextInput>
         <TextInput onChangeText={(v)=>setWebsite(v)} style={{
          borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          padding : 10,
          borderWidth :1, 
          marginTop : 10,
fontFamily : 'outfit',
fontSize : 17
        }} placeholder='Website'></TextInput>
       
        <TextInput onChangeText={(v)=>setAbout(v)} multiline 
        numberOfLines={3}
         style={{
          borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          padding : 10,
          borderWidth :1, 
          marginTop : 10,
          height : 100 ,
fontFamily : 'outfit',
fontSize : 17
        }} placeholder='About'></TextInput>
      </View>

<View style={{
          borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          borderWidth :1, 
          marginTop : 10,
fontFamily : 'outfit',
fontSize : 17
        }}>
<RNPickerSelect
      onValueChange={(value) => setCategory(value)}
      items={categoryList}
   />
</View>
<TouchableOpacity onPress={()=>onAddNewBusiness()}
 style={{
  backgroundColor : Colors.PRIMARY ,
  width : '100%',
  padding : 15,
  marginTop :10,
  borderRadius :10
}}>
  <Text style ={{ 
    textAlign :'center' ,
    fontFamily : 'outfit-medium', 
    color : '#fff'
  }}>Add business</Text>

 
</TouchableOpacity>

    </View>
  )
}