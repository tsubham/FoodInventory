import { View, Text, FlatList , Image, TouchableOpacity, Linking, Share } from 'react-native'
import React from 'react' 


export default function ActionButton({business}) {
    const onPressHandle =(item)=>{
        if(item.name == 'share'){
           Share.share({
            message:business?.name + "\n Address : " + business?.address + 
            "\n Find More about this business in Business-Directory App by Tsubham"  
           })
           return 
        }
Linking.openURL(item.url)
    }

    const ActionButtonMenu = [{
        id : 1 , 
        name : 'Call' , 
        icon : require('./../../assets/images/call.png')
        , url : 'tel:' + business.contact
    },{
        id : 2 , 
        name : 'web' , 
        icon : require('./../../assets/images/web.png')
        , url : business.website
    },{
        id : 3 , 
        name : 'share' , 
        icon : require('./../../assets/images/share.png')
    },{
        id : 4 , 
        name : 'location' , 
        icon : require('./../../assets/images/pin.png')
        , url : 'https://maps.google.com/?q=' + business.address
    }]
  return (
    <View style ={{
        padding : 15 , 
        backgroundColor : '#fff',
        marginTop: -10
    }}>

<FlatList data={ActionButtonMenu} 
numColumns={4} 
columnWrapperStyle ={{justifyContent : 'space-between'}}
     renderItem={({item , index}) =>(
        <TouchableOpacity onPress={()=>onPressHandle(item)} key={index} >
            <Image source={item?.icon} style={{
                height : 50 ,
                width :50
            }} />
            <Text style ={{fontFamily : 'outfit-medium' ,
             textAlign : 'center' ,
              marginTop : 8}}>{item.name}</Text>
        </TouchableOpacity>
     )} 
      ></FlatList>
     
    </View>
  )
}