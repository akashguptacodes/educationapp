import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function Button({text, type='fill', onPress, loading}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading} style={{
        padding:15,
        width: '100%',
        marginTop: 15,
        borderRadius:15,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        backgroundColor: type=='fill'? Colors.PRIMARY:Colors.WHITE,
    }}>
      {!loading ? <Text style={{
        textAlign:'center',
        fontSize:18,
        color:type=='fill'? Colors.WHITE:Colors.PRIMARY
      }}>{text}</Text>:
      <ActivityIndicator size={'small'} color={type=='fill'? Colors.WHITE:Colors.PRIMARY}/>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})