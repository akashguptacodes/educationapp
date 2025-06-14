import { View, Text, Platform, FlatList, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Home/Header';
import Colors from '../../constants/Colors'
import NoCourse from '../../components/Home/NoCourse';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { UserDetailContext } from '../../context/UserDetailContext';
import CourseList from '../../components/Home/CourseList';
import PracticeSection from '../../components/Home/PracticeSection';
import CourseProgress from '../../components/Home/CourseProgress';

export default function Home() {

  const [courseList, setCourseList] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userDetail && GetCourseList();
  }, [])


  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(collection(db, 'Courses'), where('createdBy', '==', userDetail?.email));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc?.data());
      setCourseList(prev => [...prev, doc.data()]);
    })
    setLoading(false);
  }

  return (
    <FlatList
      onRefresh={()=>GetCourseList()}
      refreshing={loading}
      data={[]}
      style={{
        backgroundColor:Colors.WHITE
      }}
      ListHeaderComponent={
        <View>
          <Image source={require('../../assets/images/wave.png')}
            style={{
              position:'absolute',
              width:'100%',
              height:400
            }}
             />
        <View style={{
          padding: 25,
          paddingTop: Platform.OS == 'ios' && 45,

        }}>
          <Header />
          {
            courseList?.length == 0 ?
              <NoCourse /> :
              <View>
                <CourseProgress courseList={courseList}/>
                <PracticeSection/>
                <CourseList courseList={courseList} />
              </View>
          }
        </View>
        </View>
      }
    />
  )
}