import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { PracticeOption } from '../../constants/Options'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function PracticeSection() {

  const router = useRouter();

  return (
    <View>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25,
        marginTop:10,
      }}>Practice</Text>
      <View>
        <FlatList 
            numColumns={3}
            data={PracticeOption}
            renderItem={({item,index})=>(
                <TouchableOpacity onPress={()=>{router.push({
                  pathname:'/practice/'+item?.name,
                  params:{
                    type:item?.name
                  }
                })}} key={index} style={{
                    flex:1,
                    margin:5,
                    aspectRatio:1
                }}>
                    <Image source={item?.image} style={{
                        width:'100%',
                        height:'100%',
                        maxHeight:160,
                        borderRadius:15,
                        objectFit:'fill',
                        borderWidth:2,
                        borderColor:Colors.BG_GRAY
                    }}/>
                    <Text style={{
                        position:'absolute',
                        padding:15,
                        fontFamily:'outfit',
                        fontSize:15,
                        color:Colors.WHITE
                    }}>{item?.name}</Text>
                </TouchableOpacity>
            )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})