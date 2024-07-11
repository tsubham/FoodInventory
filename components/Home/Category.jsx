import { View, Text , Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { db } from './../../config/fireBaseConfig'
import { collection , getDocs, query  } from 'firebase/firestore'
import { FlatList } from 'react-native'
import CategoryItems from './CategoryItems'
import { useRouter } from 'expo-router'

export default function Category({explore , onCategorySelect}) {

  const onCategoryPressHandler =(item)=>{
    if(!explore){
      router.push('businessList/'+item.name)
    }
    else {
      onCategorySelect(item.name)
    }
  }

    const [categoryList , setCategoryList] = useState([])
    const router = useRouter()

    useEffect(()=>{
              GetCategoryList()
    } , [])

    const GetCategoryList = async ()=>{
        setCategoryList([])
        const q = query(collection(db ,'Category'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=> {

            setCategoryList(prev=> [...prev , doc.data()])
        }
        
        )
    }

  return (
    <View>

{
  !explore ? <View style = {{
        padding : 20 ,
        paddingTop : 5,
         display : 'flex' ,
         flexDirection : 'row',
         justifyContent : "space-between",
         marginTop : 10
      }} >
      <Text style = {{
        fontFamily : 'outfit-bold',
        fontSize:18
      }}>Category</Text>
      <Text  style = {{
        fontFamily : 'outfit-medium',
        color : Colors.PRIMARY
      }}>View all</Text>
      </View>
      : null

}
    
      <FlatList 
horizontal = {true} 
showsHorizontalScrollIndicator = {false}
style ={{marginLeft : 15}}
      data={categoryList} 
      renderItem={({item , index})=>(
 <CategoryItems category = {item} key={index} onCategoryPress={
   ()=>onCategoryPressHandler(item)
 } />

      )
     }
       />



    </View>
  )
}