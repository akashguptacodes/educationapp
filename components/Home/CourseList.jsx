import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constants/Options'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function CourseList({ courseList, heading='Courses', enroll=false }) {

    const router = useRouter();

    return (
        <View style={{
            marginTop: 15,
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
            }}>{heading}
            </Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={courseList}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} onPress={()=>router.push({
                        pathname:'/courseView/' + item?.docId,
                        params:{
                            courseParams:JSON.stringify(item),
                            enroll: enroll
                        }
                        })}
                        style={styles.courseContainer}>
                        <Image source={imageAssets[item?.banner_image]}
                            style={{
                                width: '100%',
                                height: 150,
                                borderRadius: 15,
                            }}
                        />
                        <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 16,
                            marginTop: 10
                        }}>{item?.courseTitle}
                        </Text>
                        <View style={{
                            display:'flex',
                            flexDirection:'row',
                            gap:5,
                            alignItems:'center',
                            marginTop:5,
                        }}>
                            <Ionicons name="book-sharp" size={24} color="black" />
                            <Text style={{
                                fontFamily: 'outfit'
                            }}>{item?.chapters?.length} Chapters
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
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