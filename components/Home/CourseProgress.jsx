import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import CourseProgressComp from '../Shared/CourseProgressComp';

export default function CourseProgress({ courseList }) {

  return (
    <View style={{
      marginTop: 10,
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25,
        color: Colors.WHITE
      }}>Progress</Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={courseList}
        renderItem={({ item, index }) => (
          <View style={{
          }}>
            <CourseProgressComp item={item} />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})