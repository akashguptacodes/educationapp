import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import * as Progress from 'react-native-progress';
import Button from '../../components/Shared/Button'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function Quiz() {

    const { courseParams } = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const [currentPage, setCurrentPage] = useState(0);
    const quiz = course?.quiz;
    const [selectedOption, setSelectedOption] = useState();
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const GetProgress = (currentPage) => {
        const perc = (currentPage/quiz?.length);
        return perc;
    }

    const OnOptionSelect = (selectedCoice) => {
        setResult(prev=>({...prev, [currentPage]:{
            userChoice: selectedCoice,
            isCorrect: quiz[currentPage]?.correctAns==selectedCoice,
            question: quiz[currentPage]?.question,
            correctAns: quiz[currentPage]?.correctAns
        }}))
        console.log(result);
    }

    const onQuizFinish = async () => {
        //save the result in database for quiz
        try{
            setLoading(true);
            await updateDoc(doc(db,'Courses',course.docId),{
                quizResult: result
            })
            //redirect to quiz summary
            setLoading(false);
            router.replace({
                pathname:'/quiz/summary',
                params:{
                    quizResultParams: JSON.stringify(result)
                }
            })
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <View>
            <Image source={require('../../assets/images/wave.png')} style={{
                height: 600,
                width: '100%'
            }} />
            <View style={{
                position:'absolute',
                padding:25,
                width:'100%'
            }}>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <Pressable onPress={()=>router.back()}>
                        <Ionicons name="arrow-back" size={30} color={Colors.WHITE} />
                    </Pressable>
                    <Text style={{
                        fontFamily:'outfit-bold',
                        fontSize:20,
                        color:Colors.WHITE
                    }}>{currentPage+1} of {quiz?.length}</Text>
                </View>
                <View style={{
                    marginTop:20
                }}>
                    <Progress.Bar progress={GetProgress(currentPage)} width={Dimensions.get('window').width*0.85} color={Colors.WHITE} height={8} />
                </View>
                <View style={{
                    padding:25,
                    backgroundColor:Colors.WHITE,
                    marginTop:30,
                    height:Dimensions.get('screen').height*0.65,
                    elevation:1,
                    borderRadius:20
                }}>
                    <Text style={{
                        fontFamily:'outfit-bold',
                        fontSize:25,
                        textAlign:'center',
                        marginBottom:10
                    }}>{quiz[currentPage]?.question}
                    </Text>
                    {quiz[currentPage].options?.map((item,index)=>(
                        <TouchableOpacity key={index} onPress={()=>{setSelectedOption(index);OnOptionSelect(item)}} style={{
                            padding:15,
                            borderWidth:1,
                            borderRadius:15,
                            marginTop:8,
                            backgroundColor:selectedOption == index? Colors.LIGHT_GREEN : null,
                            borderColor:selectedOption == index ? Colors.GREEN : null
                        }}>
                            <Text style={{
                                fontFamily:'outfit',
                                fontSize:20
                            }}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {(selectedOption?.toString() && quiz?.length-1>currentPage) ? <Button text={"Next"} loading={loading} onPress={()=>{setCurrentPage(currentPage+1);setSelectedOption(null)}}/> :''}
                {(selectedOption?.toString() && quiz?.length-1 == currentPage) ? <Button text={"Finish"} loading={loading} onPress={()=>onQuizFinish()} /> :''}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})