import { Image, Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuestionAnswer() {

    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const qaList = course?.qa;
    const router = useRouter();
    const [selectedQuestion, setSelectedQuestion] = useState();
    const onQuestionSelect = (index) => {
        setSelectedQuestion(selectedQuestion === index ? null : index);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image source={require('../../assets/images/wave.png')} style={styles.image} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={30} color={Colors.WHITE} />
                    </Pressable>
                    <Text style={styles.title}>Question & Answers</Text>
                </View>
                <Text style={styles.subtitle}>{course?.courseTitle}</Text>

                {/* Ensure FlatList gets enough space */}
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={qaList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Pressable style={styles.card} onPress={() => onQuestionSelect(index)}>
                                <Text style={styles.question}>{item?.question}</Text>
                                {selectedQuestion === index && (
                                    <View style={styles.answerContainer}>
                                        <Text style={styles.answer}>Answer: {item?.answer}</Text>
                                    </View>
                                )}
                            </Pressable>
                        )}
                        showsVerticalScrollIndicator={false} // Optional: hides the scrollbar
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 600,
        width: '100%',
        position: 'absolute',
    },
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontFamily: 'outfit-bold',
        color: Colors.WHITE,
    },
    subtitle: {
        fontFamily: 'outfit',
        color: Colors.WHITE,
        fontSize: 18,
        marginBottom: 10,
    },
    card: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        marginTop: 15,
        borderRadius: 15,
        elevation: 3,
    },
    question: {
        fontFamily: 'outfit-bold',
        fontSize: 18,
    },
    answerContainer: {
        borderTopWidth: 0.4,
        marginVertical: 10,
    },
    answer: {
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.GRAY,
        marginTop: 10,
    },
});
