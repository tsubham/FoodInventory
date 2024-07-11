import { View, Text, TouchableOpacity, ToastAndroid , Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { TextInput } from 'react-native'
import { Colors } from '../../constants/Colors'
import { arrayUnion, updateDoc } from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import { doc } from 'firebase/firestore'
import { db } from '../../config/fireBaseConfig'
import { FlatList } from 'react-native-gesture-handler'
export default function ReviewsComponent( {business}) {
  const [rating , setRating]= useState()
  const [userReview , setUserReview] = useState(4)
  const {user} = useUser()

  const onSubmit =  async ()=>{
    const docRef = doc(db , 'BusinessData' , business?.id) 
    await updateDoc(docRef , {
      reviews : arrayUnion({
        rating : rating , 
        review : userReview , 
        userName : user?.fullName ,
        userImage : user?.imageUrl,
        userEmail : user?.primaryEmailAddress?.emailAddress
      })
    })
    ToastAndroid.show('Review Added Successfully' , ToastAndroid.BOTTOM)
  }

  return (
    <View style={{padding : 15 , backgroundColor : '#fff' ,  
    marginTop : -18
    }}>
      <Text style ={{fontFamily : 'outfit-bold' , fontSize : 20}}>Reviews</Text>
      <View>
      <Rating
  showRating = {false}
  onFinishRating={(rating)=> setRating(rating)}
  style={{ paddingVertical: 10 }}
/>
<TextInput placeholder='Write your Review'  
onChangeText={(value)=>setUserReview(value)}
numberOfLines={4}
style ={{color : 'black' , borderColor : 'black'  , borderWidth : 1 , 
borderRadius : 10 ,
fontSize : 18 ,
fontFamily : 'outfit-medium' ,
textAlignVertical : 'top' }} ></TextInput> 

<TouchableOpacity  
onPress={()=> onSubmit()}
disabled = {!userReview}
style ={{padding : 10  ,
width : '100%'
,height : 45,
backgroundColor : Colors.PRIMARY , 
borderRadius : 30,
marginTop : 10 }}  > 
<Text style = {{color : "#fff", fontFamily : 'outfit-medium' 
, textAlign : 'center' 
, fontSize : 20}}>
  Submit
</Text></TouchableOpacity>
    </View>
   <View>
    {
      business?.reviews?.map((item , index)=>(
        <View style ={{display: 'flex' ,
         flexDirection :'row' , 
         gap : 10 , 
         padding :10 ,alignItems :'center' ,
          borderRadius : 10 , 
          borderWidth : 1 ,
          marginTop : 15}}>
        <Image source ={{uri : item.userImage}} style={{
          width : 40 , 
          height : 40 , borderRadius :  99
        }}></Image>
        <View style = {{display : 'flex' ,gap : 4}}>
        <Text style = {{ fontFamily : 'outfit-medium' }}>{item?.userName}</Text>
        <Rating 
        imageSize={20}
ratingCount={item?.rating}
style ={{alignItems : 'flex-start'}}
        />
        <Text>{item?.review}</Text>
        </View>
          
        </View>
      ))
    }
   </View>
   
    </View>
  )
}