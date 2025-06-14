import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { CourseCategory } from '../../constants/Options';
import CourseListByCategory from '../../components/Explore/CourseListByCategory';
import { FlatList } from 'react-native';

export default function Explore() {
    return (
        <FlatList
            style={{
                flex: 1,
                backgroundColor: Colors.WHITE,
            }}
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
                        padding: 25,
                    }}>
                        <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 30
                        }}>Explore More Courses
                        </Text>
                        {CourseCategory.map((item, index) => (
                            <View key={index} style={{
                                marginTop: 10
                            }}>
                                <CourseListByCategory category={item} />
                            </View>
                        ))}
                    </View>
                </View>
            }
        />
    )
}