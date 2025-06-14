import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../../constants/Colors'
import Button from '../../components/Shared/Button'
import { GenerateCourseAIModel, GenerateTopicsAIModel } from '../../config/AiModel';
import Prompts from '../../constants/Prompts';
import { db } from '../../config/firebaseConfig'
import { UserDetailContext } from '../../context/UserDetailContext'
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const onGenerateTopic = async () => {
    //get topic idea from ai model
    setLoading(true);
    const PROMPT = userInput + Prompts.IDEA;
    const AiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
    const topicIdea = JSON.parse(AiResp.response.text());
    setTopics(topicIdea);
    console.log(topicIdea);
    setLoading(false);
  }

  const onTopicSelect = (topic) => {
    const isAlreadySelected = selectedTopics?.find((item) => item == topic);
    if (!isAlreadySelected) {
      setSelectedTopics(prev => [...prev, topic]);
    }
    else {
      const topics = selectedTopics?.filter(item => item !== topic);
      setSelectedTopics(topics);
    }
  }

  const isTopicSelected = (topic) => {
    const selection = selectedTopics?.find(item => item == topic);
    return selection ? true : false
  }

  const onGenerateCourse = async () => {
    // generate course using ai model
    setLoading(true);
    const PROMPT = selectedTopics + Prompts.COURSE;
    try {
      const AiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
      const resp = JSON.parse(AiResp.response.text());
      const courses = resp?.courses;
      console.log(courses);

      // save course info to database
      courses?.forEach(async (course) => {
        const docId = Date.now().toString();
        await setDoc(doc(db, 'Courses', docId), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email,
          docId: docId
        })        
      })
      router.push('/(tabs)/home');
      setLoading(false);
    }
    catch (error) {
      console.log("Error while saving course", error);
      setLoading(false);
    }
  }

  return (
<ScrollView style={{ backgroundColor: Colors.WHITE }} contentContainerStyle={{ flexGrow: 1, padding: 25 }}>
  <View style={{ flex: 1 }}>
    <Text style={{ fontFamily: 'outfit-bold', fontSize: 30 }}>Create New Course</Text>
    <Text style={{ fontFamily: 'outfit', fontSize: 22 }}>What You Want to Learn Today?</Text>
    <Text style={{ fontFamily: 'outfit', fontSize: 14, marginTop: 8, color: Colors.GRAY }}>
      What course do you want to create? (ex. Learn Java, Python, Digital Marketing, 9th Physics etc...)
    </Text>

    <TextInput 
      style={styles.textInput} 
      numberOfLines={3} 
      multiline={true} 
      onChangeText={(val) => setUserInput(val)} 
      placeholder="(ex. Learn Java, Learn React native etc....)" 
    />

    <Button text={'Generate Topic'} type='outline' onPress={onGenerateTopic} loading={loading} />

    <View style={{ marginTop: 15, marginBottom: 15 }}>
      <Text style={{ fontFamily: 'outfit', fontSize: 19 }}>Select All Topics Which You Want To Learn.</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 6 }}>
        {topics?.map((topic, index) => (
          <Pressable key={index} onPress={() => onTopicSelect(topic)}>
            <Text style={{
              padding: 7,
              borderWidth: 0.4,
              borderRadius: 99,
              paddingHorizontal: 15,
              backgroundColor: isTopicSelected(topic) ? Colors.PRIMARY : null,
              color: isTopicSelected(topic) ? Colors.WHITE : Colors.PRIMARY
            }}>{topic}</Text>
          </Pressable>
        ))}
      </View>
    </View>

    {selectedTopics?.length > 0 && <Button text='Generate Course' onPress={onGenerateCourse} loading={loading} />}
  </View>
</ScrollView>
  )
}

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    alignItems: 'flex-start',
    fontSize: 18,
  }
})