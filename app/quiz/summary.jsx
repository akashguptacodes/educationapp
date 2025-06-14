import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import Button from '../../components/Shared/Button'

export default function QuizSummary() {
  const { quizResultParams } = useLocalSearchParams();
  const quizResult = JSON.parse(quizResultParams);
  const [totalCorrectAns, setTotalCorrectAns] = useState(0);
  const [totalques, setTotalques] = useState(0);
  const router = useRouter();

  useEffect(() => {
    CalculateResult();
  }, []);

  const CalculateResult = () => {
    if (quizResult !== undefined) {
      const correctAns = Object.entries(quizResult)?.filter(([key, value]) => value?.isCorrect == true);
      const totalques = Object.keys(quizResult).length;
      setTotalCorrectAns(correctAns?.length);
      setTotalques(totalques);
    }
  };

  const GetPercMarks = () => {
    return ((totalCorrectAns / totalques) * 100).toFixed(0);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image 
        source={require('../../assets/images/wave.png')} 
        style={{
          width: '100%',
          height: 700, 
          position: 'absolute',
          top: 0,
        }} 
      />
      <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
        <Text style={styles.title}>Quiz Summary</Text>
        
        {/* Score Summary */}
        <View style={styles.scoreContainer}>
          <Image 
            source={require('../../assets/images/trophy2.png')} 
            style={styles.trophy} 
          />
          <Text style={styles.scoreText}>
            {GetPercMarks() > 60 ? 'Congratulations!' : 'Try Again!'}
          </Text>
          <Text style={styles.percentageText}>
            You gave {GetPercMarks()}% Correct Answer
          </Text>
          <View style={styles.resultRow}>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>Q {totalques}</Text>
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>✅ {totalCorrectAns}</Text>
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>❌ {totalques - totalCorrectAns}</Text>
            </View>
          </View>
        </View>

        <Button text={'Back to Home'} onPress={() => router.replace('/(tabs)/home')} />

        {/* Quiz Summary List */}
        <Text style={styles.summaryTitle}>Summary:</Text>

        <FlatList
          data={Object.entries(quizResult)}
          keyExtractor={(item, index) => index.toString()} 
          contentContainerStyle={{ paddingBottom: 100 }} 
          renderItem={({ item }) => {
            const quizItem = item[1];
            return (
              <View style={[
                styles.quizItem,
                {
                  backgroundColor: quizItem?.isCorrect ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
                  borderColor: quizItem?.isCorrect ? Colors.GREEN : 'red',
                }
              ]}>
                <Text style={styles.quizQuestion}>{quizItem?.question}</Text>
                <Text style={styles.quizAnswer}>Correct Ans: {quizItem?.correctAns}</Text>
                <Text style={styles.quizAnswer}>Your Ans: {quizItem?.userChoice}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 30,
    color: Colors.BLACK,
  },
  scoreContainer: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    elevation: 3,
  },
  trophy: {
    width: 100,
    height: 100,
    marginTop: -40,
  },
  scoreText: {
    fontSize: 26,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
  },
  percentageText: {
    fontFamily: 'outfit',
    color: Colors.GRAY,
    fontSize: 17,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 10,
  },
  resultTextContainer: {
    padding: 7,
    backgroundColor: Colors.WHITE,
    elevation: 1,
    borderRadius: 10,
  },
  resultText: {
    fontFamily: 'outfit',
    fontSize: 20,
  },
  summaryTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    marginTop: 20,
  },
  quizItem: {
    padding: 15,
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 15,
  },
  quizQuestion: {
    fontFamily: 'outfit',
    fontSize: 18,
  },
  quizAnswer: {
    fontFamily: 'outfit',
    fontSize: 15,
  },
});

