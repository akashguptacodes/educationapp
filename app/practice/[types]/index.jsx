import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { PracticeOption } from '../../../constants/Options';
import Colors from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import {UserDetailContext} from '../../../context/UserDetailContext'
import CourseListGrid from '../../../components/PracticeScreen/CourseListGrid';

export default function PracticeTypeHomeScreen() {
    const { type } = useLocalSearchParams();
    const option = PracticeOption?.find(item => item?.name == type);
    const router = useRouter();
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        userDetail && GetCourseList();
    }, [userDetail])
    

    const GetCourseList = async () => {
        try{
            setLoading(true);
            setCourseList([]);
            const q = query(collection(db,'Courses',)
                ,where('createdBy','==',userDetail?.email),
            orderBy('createdOn','desc'));
            
            const querySnapShot = await getDocs(q);
            querySnapShot.forEach((doc)=>{
                console.log(doc.data());
                
                setCourseList(prev=>[...prev, doc.data()]);            
            })
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <View>
            <Image source={option?.image} style={{
                height: 200,
                width: '100%'
            }} />
            <View style={{
                position: 'absolute',
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center'
            }}>
                <Pressable onPress={()=>router.back()}>
                    <Ionicons name="arrow-back-outline" size={25} color="black" style={{
                        backgroundColor: Colors.WHITE,
                        padding: 8,
                        borderRadius: 10
                    }} />
                </Pressable>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 35,
                    color: Colors.WHITE
                }}>{type}</Text>
            </View>
            {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{marginTop:150}} />}
            <CourseListGrid courseList={courseList} option={option} />
        </View>
    )
}

const styles = StyleSheet.create({})