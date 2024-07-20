import { View, Text ,Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
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
import { StyleSheet } from 'react-native';
import {Switch } from 'react-native';



export default function addBusiness() {


  const toggleSwitch = () => setAvailable(previousState => !previousState);



  const {user} = useUser()
const [name , setName] = useState('')
const [quantity , setQuantity] = useState('')
const [measurement ,setMeasurement] =useState('')
const [category , setCategory] = useState('')

 const [available, setAvailable] = useState(false)

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
      headerTitle : "Add Item"  ,
      headerShown : true
    })
  } , [])

  const onAddNewItem =  async()=>{
    const fileName = Date.now().toString()+".jpg"
    const resp = await fetch(image)
const blob = await resp.blob()
const imageRef = ref(storage , 'FoodItems/'+ fileName)
uploadBytes(imageRef , blob).then((snapShot)=>{
  console.log('added successfully..')
}
).then(resp=>{
  getDownloadURL(imageRef).then(async(downloadUrl)=>{
    console.log(downloadUrl)
    saveItemDetails(downloadUrl)
  })
})
  }

  const saveItemDetails = async(imageUrl)=>{
    await setDoc(doc(db ,'FoodItems', Date.now().toString()),{
      name : name ,
      category : category ,
      quantity : quantity ,
      measurement : measurement ,
      userName : user?.fullName ,
      userEmail : user?.primaryEmailAddress.emailAddress ,
      userImage : user?.imageUrl ,
      imageUrl : imageUrl ,
      available : available
    })
    ToastAndroid.show('New Item Addedd' ,ToastAndroid.LONG)
      navigation.navigate('home')
      setName('')
      setCategory('')
      setQuantity('')
      setMeasurement('')
      setImage('')
  }
         

  return (
    <View style ={{
      padding : 15
    }}>
      <Text style={{
        fontFamily : 'outfit-bold',
        fontSize :25
      }}>Add a New Item</Text>
      <Text style={{
        fontFamily : 'outfit',
        fontSize :15 ,
        color : Colors.GRAY
      }}>Fill all details in order to add a new Food Item</Text>
      <TouchableOpacity
      onPress={()=>onImageClick()}
      style ={{
        width : 200 ,
marginTop : 10
      }}>
      {
        !image ?  <Image source={require('./../../assets/images/placeholder.png')} style ={{
        width : 200 , height :200
      }} ></Image> :
       <Image source={{uri :image}} style ={{
        width : 200 , height :200 ,
        borderRadius : 15
      }} ></Image>

      }
      </TouchableOpacity>
      
      <View>
        <TextInput value={name} onChangeText={(v)=>setName(v)} style={{
          borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          padding : 10,
          borderWidth :1, 
          marginTop : 20,
fontFamily : 'outfit',
fontSize : 17
        }} placeholder='Name'></TextInput>

        
<View style ={{
  display : 'flex' ,
  flexDirection : 'row' ,
borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          borderWidth :1, 
          marginTop : 10,
        padding : -60 ,
fontFamily : 'outfit',
fontSize : 17
}}>

<View style={styles.container}>
      <Text style={styles.text}>
        {available ? 'Available' : 'Not Available'}
      </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={available ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={available}
        
      />
    </View>
    </View>
        
      </View>

      {
        available ? <View style = {{
        display : 'flex', 
        flexDirection : 'row',
        justifyContent : 'space-between'
      }}>
       <TextInput 
       value={quantity}
        onChangeText={(v)=>setQuantity(v)}
         style={{
          borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          padding : 10,
          borderWidth :1, 
          marginTop : 10,
          width : '60%' ,
        
fontFamily : 'outfit',
fontSize : 17
        }} placeholder='Quantity'></TextInput>
        <View style={{
          borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          borderWidth :1, 
          marginTop : 10,
          width : '33%' ,
fontFamily : 'outfit',
fontSize : 17
        }}>
<RNPickerSelect 

      onValueChange={(value) => setMeasurement(value)}
      items={[
        { label: 'g', value: 'g' },
        { label: 'Kg', value: 'Kg' },
        { label: 'L', value: 'L' },
        { label: 'ml', value: 'ml' }

      ]}
   />
</View></View>
       
       
       
        :<View style={{
          borderRadius : 10 ,
          borderColor : Colors.PRIMARY ,
          backgroundColor : '#fff',
          borderWidth :1, 
          marginTop : 10,
fontFamily : 'outfit',
fontSize : 17
        }}></View>
      }

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
placeholder={{
  label : 'Category'
}}
      onValueChange={(value) => setCategory(value)}
      items={[
        { label: 'dairy', value: 'dairy' },
        { label: 'fruits', value: 'fruits' },
        { label: 'vegetable', value: 'vegetables' },
        { label: 'cereals', value: 'cereals' },
        { label: 'juices', value: 'juices' }


      ]}
   />
</View>


<TouchableOpacity onPress={()=>onAddNewItem() 

}
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
  }}>Add Item</Text>

 
</TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  padding : 10
  },
  text: {
    fontSize: 24,
    fontFamily : 'outfit-medium',
    color : 'grey'
     
  },
});
