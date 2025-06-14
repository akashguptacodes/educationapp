import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { FlatList } from 'react-native';
import FlipCard from 'react-native-flip-card';
import * as Progress from 'react-native-progress';

export default function Flashcards() {

    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const flashcard = course?.flashcards;
    const [currentPage, setCurrentPage] = useState(0);
    const width = Dimensions.get('screen').width;
    const router = useRouter();

    const onScroll = (event) => {
        const index = Math.round(event?.nativeEvent?.contentOffset.x / width);
        console.log(index);
        setCurrentPage(index)
    }

    const GetProgress = (currentPage) => {
        const perc = (currentPage/flashcard?.length);
        return perc;
    }

    return (
        <View>
            <Image source={require('../../assets/images/wave.png')} style={{
                height: 600,
                width: '100%'
            }} />
            <View style={{
                position: 'absolute',
                padding: 25,
                width: '100%'
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Pressable  onPress={()=>router.back()}>
                        <Ionicons name="arrow-back" size={30} color={Colors.WHITE} />
                    </Pressable>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20,
                        color: Colors.WHITE
                    }}>{currentPage + 1} of {flashcard?.length}</Text>
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    <Progress.Bar progress={GetProgress(currentPage)} width={Dimensions.get('window').width * 0.85} color={Colors.WHITE} height={8} />
                </View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    data={flashcard}
                    onScroll={onScroll}
                    renderItem={({ item, index }) => (
                        <View style={{
                            height: 500,
                            width: width * 0.9,
                            marginTop: 50
                        }}>
                            <FlipCard style={styles.flipCardContainer}>
                                {/* Face side */}
                                <View style={styles.fontCard}>
                                    <Text style={{
                                        fontFamily: 'outfit-bold',
                                        fontSize: 28
                                    }}>{item?.front}</Text>
                                </View>
                                {/* Back side  */}
                                <View style={styles.backCard}>
                                    <Text style={{
                                        width: Dimensions.get('screen').width * 0.78,
                                        fontFamily: 'outfit',
                                        padding: 20,
                                        fontSize: 28,
                                        textAlign: 'center',
                                        color: Colors.WHITE
                                    }}>{item?.back}</Text>
                                </View>
                            </FlipCard>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flipCardContainer: {
        width: Dimensions.get('screen').width * 0.78,
        height: 400,
        backgroundColor: Colors.WHITE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: Dimensions.get('screen').width * 0.05,
    },
    fontCard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: 20,
    },
    backCard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 20,
    }
})