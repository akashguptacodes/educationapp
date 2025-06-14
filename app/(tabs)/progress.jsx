import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { UserDetailContext } from '../../context/UserDetailContext';
import CourseProgressComp from '../../components/Shared/CourseProgressComp';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Progress() {

    const [courseList, setCourseList] = useState([]);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        userDetail && GetCourseList();
    }, [])


    const GetCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        const q = query(collection(db, 'Courses'), where('createdBy', '==', userDetail?.email));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            console.log(doc.data());
            setCourseList(prev => [...prev, doc.data()]);
        })
        setLoading(false);
    }

    return (
        <FlatList
            data={[]}
            ListHeaderComponent={
                <View style={{
                    backgroundColor: Colors.WHITE,
                    flex: 1
                }}>
                    <Image source={require('../../assets/images/wave.png')}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: 400
                        }}
                    />
                    <View style={{
                        width: '100%',
                        padding: 20,
                        marginTop: 20
                    }}>
                        <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 30,
                            color: Colors.WHITE,
                            marginBlock: 10
                        }}>Course Progress</Text>
                        <FlatList
                            data={courseList}
                            onRefresh={() => GetCourseList()}
                            refreshing={loading}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => router.push({
                                    pathname: '/courseView/' + item?.docId,
                                    params: {
                                        courseParams: JSON.stringify(item)
                                    }
                                })}>
                                    <CourseProgressComp item={item} width={'95%'} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            }
        />
    )
}