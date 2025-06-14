import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';
import Button from '../../components/Shared/Button';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function ChapterView() {

  const {chapterParams, docId, chapterIndex} = useLocalSearchParams();
  const chapter = JSON.parse(chapterParams);
  const [loader,setLoader] = useState(false);
  const[currentPage,setCurrenPage] = useState(0);
  const router = useRouter();


  const GetProgress = (currentPage) => {
    const perc = (currentPage/chapter?.content?.length);
    return perc;
  }

  const onChapterComplete = async() => {
    //save chapter complete
    setLoader(true);
    await updateDoc(doc(db,'Courses', docId),{
      completedChapter: arrayUnion(chapterIndex)    
    })
    console.log("hii");
    setLoader(false);

    //go back
    router.replace('/courseView/'+docId)
  }

  return (
    <View style={{
      padding:25,
      backgroundColor:Colors.WHITE,
      flex:1
    }}>
      <Progress.Bar progress={GetProgress(currentPage)}
        width={Dimensions.get('screen').width * 0.85} />
      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:25
        }}>
          {chapter?.content[currentPage]?.topic}
        </Text>
        <Text style={{
          fontFamily:'outfit',
          fontSize:18,
          marginTop:7
        }}>{chapter?.content[currentPage]?.explain}
        </Text>
        {chapter?.content[currentPage]?.code && <Text style={[styles.codeExampleText,{backgroundColor:Colors.BLACK, color:Colors.WHITE}]}>{chapter?.content[currentPage]?.code}</Text>}
        {chapter?.content[currentPage]?.example && <Text style={styles.codeExampleText}>{chapter?.content[currentPage]?.example}</Text>}
      </View>
      <View style={{
        position:'absolute',
        bottom:10,
        width:'100%',
        left:25
      }}>
        {chapter?.content?.length-1 !=currentPage ?
      <Button text={'Next'} onPress={()=>{setCurrenPage(currentPage+1)}} />:
      <Button text={'Finish'} onPress={()=>{onChapterComplete()}} loading={loader} />
    }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  codeExampleText:{
    padding:15,
    backgroundColor:Colors.BG_GRAY,
    borderRadius:15,
    fontFamily:'outfit',
    fontSize:18,
    marginTop:15
  }
})