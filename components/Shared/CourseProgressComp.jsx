import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { imageAssets } from '../../constants/Options'
import * as Progress from 'react-native-progress';


export default function CourseProgressComp({ item, width=280 }) {

    const GetCompletedChapters = (course) => {
        const completedChapters = course?.completedChapter?.length;
        const percentage = completedChapters / course?.chapters?.length;
        console.log(percentage);
        return percentage
    }

    return (
        <View style={{
            margin: 7,
            padding: 10,
            backgroundColor: Colors.BG_GRAY,
            borderRadius: 15,
            width: width
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
            }}>
                <Image source={imageAssets[item?.banner_image]}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                    }}
                />
                <View style={{
                    flex: 1
                }}>
                    <Text numberOfLines={2} style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 17,
                        flexWrap: 'wrap',
                    }}>{item?.courseTitle}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 15
                    }}>{item?.chapters?.length} Chapters</Text>
                </View>
            </View>

            <View style={{
                marginTop: 10,
            }}>
                <Progress.Bar progress={GetCompletedChapters(item)} width={width-30} color={Colors.ORANGE} />
                <Text style={{
                    fontFamily: 'outfit',
                    marginTop: 3,
                    fontSize: 13,
                }}>{item?.completedChapter?.length ?? 0} Out of {item?.chapters?.length} Chapters Completed</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})