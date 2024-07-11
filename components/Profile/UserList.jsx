import { View, Text, FlatList ,Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'


export default function UserList() {
  const {signOut} = useAuth()
  const router = useRouter()
  const onMenuClick = (item)=>{
    if(item.path == 'logout'){
  signOut()
return 
    }
    if(item.path == 'share'){
      Share.share({
        message : 'Download the app by clicking the link below'
      })
      return 
    }
    router.push(item.path)
  }
    const Userlist = [{
        id : 1 , 
        name : 'Add Business'  ,
        icon : require('./../../assets/images/add.png') ,
        path : "/AddBusiness/add-business"
    } ,{
        id : 2 , 
        name : 'My Business'  ,
        icon : require('./../../assets/images/business-and-trade.png') ,
        path : "/AddBusiness/My-business"
    },{
        id : 3 , 
        name : 'Share App'  ,
        icon : require('./../../assets/images/share_1.png') ,
        path : "share"
    },{
        id : 4 , 
        name : 'Logout'  ,
        icon : require('./../../assets/images/logout.png') ,
        path : "logout"
    },]
  return (
    <View 
    style ={{
      marginTop : 50
    }}
   > 
    <FlatList
    data={Userlist}
    numColumns={2}
    renderItem={({item , index}) =>(
      <TouchableOpacity  
      onPress={()=> onMenuClick(item)}
       style ={{
        display :'flex' , 
        alignItems : 'center' ,
        flexDirection : 'row' ,
        gap : 10,
        flex : 1 ,
        padding : 13 ,
        borderWidth :1 ,
        borderRadius : 10 ,
        margin : 10 ,
        borderColor : Colors.PRIMARY ,
        backgroundColor : "#fff"
      }}><Image source={item.icon} style={{
        height : 50 , 
        width : 50
      }} ></Image>
        <Text style ={{
          flex : 1 ,
          fontFamily : 'outfit-medium' ,
          fontSize : 20
        }}>{item.name}</Text>
      </TouchableOpacity>
      
    )}
    ></FlatList>
    <View style ={{
      display : 'flex' ,
      justifyContent :'center' ,
      alignItems : 'center' ,
      height : 200 ,
      marginTop : 50 ,
      
    }}>
    <Text style={{
      fontFamily : 'outfit-medium' ,
      color : Colors.GRAY
      ,fontSize :  18
    }}>Developed By Tsubham @ 2024</Text>
    <Text style={{
      fontFamily : 'outfit' ,
      color : Colors.GRAY ,
 fontSize :  18
    }}>All rights reserved</Text>
    </View>

    </View>
  )
}