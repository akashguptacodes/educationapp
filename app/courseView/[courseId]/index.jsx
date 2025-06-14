import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Intro from '../../../components/CourseView/Intro';
import Colors from '../../../constants/Colors';
import Chapters from '../../../components/CourseView/Chapters';
import { FlatList } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';

export default function CourseView() {

  const { courseParams,courseId ,enroll } = useLocalSearchParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    if(!courseParams){
      GetCourseById();
    }
    else{
      setCourse(JSON.parse(courseParams))
    }
  }, [])
  

  const GetCourseById = async () => {
    const docRef = await getDoc(doc(db,'Courses',courseId));
    const courseData = docRef.data();
    setCourse(courseData);

  }

  return course && (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={{
          backgroundColor: Colors.WHITE,
          flex: 1
        }}>
          <Intro course={course} enroll={enroll} />
          <Chapters course={course} />
        </View>}
    />
  )
}

const styles = StyleSheet.create({})