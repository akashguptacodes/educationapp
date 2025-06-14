import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { imageAssets } from '../../constants/Options'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import Button from '../Shared/Button'
import { useRouter } from 'expo-router'
import { UserDetailContext } from '../../context/UserDetailContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'

export default function Intro({ course, enroll }) {

    const router = useRouter();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);

    const onEnrollCourse = async () => {
        const docId = Date.now().toString();
        setLoading(true);
        const data = {
            ...course,
            createdBy: userDetail?.email,
            createdOn: new Date(),
            enrolled: true
        }
        await setDoc(doc(db, 'Courses', docId), data)
        router.push({
            pathname: '/courseView/' +docId ,
            params: {
                courseParams: JSON.stringify(data),
                enroll: false
            }
        })
        setLoading(false);
    }

    return (
        <View>
            <Image
                style={{
                    width: '100%',
                    height: 280
                }}
                source={imageAssets[course?.banner_image]} />
            <View style={{
                padding: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 21
                }}>{course?.courseTitle}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                    marginTop: 5,
                }}>
                    <Ionicons name="book-sharp" size={24} color="black" />
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16
                    }}>{course?.chapters?.length} Chapters
                    </Text>
                </View>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 19,
                    marginTop: 10
                }}>Description :
                </Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 15,
                    color: Colors.GRAY
                }}>{course?.description}
                </Text>
                {
                    enroll == 'true' ? <Button text={'Enroll now'} onPress={() => onEnrollCourse()} /> : <Button text={'Start Now'} onPress={() => {
                        console.log('');
                    }} />
                }
            </View>
            <Pressable onPress={() => { router.back() }} style={{
                position: 'absolute',
                padding: 10
            }}>
                <Ionicons name="arrow-back-outline" size={30} color="black" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({})