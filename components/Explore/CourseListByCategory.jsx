import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { imageAssets } from '../../constants/Options';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import CourseList from '../Home/CourseList';

export default function CourseListByCategory({ category }) {

    useEffect(() => {
        GetCourseListByCategory();
    }, []);
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const GetCourseListByCategory = async () => {
        setCourseList([]);
        setLoading(true);
        console.log("inside useeffect");
        const q = query(collection(db, 'Courses'), where('category', '==', category));
        console.log(query?.toString());
        
        const querySnapShot = await getDocs(q);
        console.log("querysnapshot", querySnapShot);
        querySnapShot?.forEach((doc) => {
            console.log(doc.data());
            console.log("courselist data");
            setCourseList(prev => [...prev, doc?.data()]);
        })
        setLoading(false);
    }

    return (
        <View>
            { courseList?.length>0 && <CourseList courseList={courseList} heading={category} enroll={true} />}
        </View>
    )
}

const styles = StyleSheet.create({
    courseContainer: {
        padding: 10,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        margin: 6,
        width: 260,
    }
})