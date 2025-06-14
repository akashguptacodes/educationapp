import { useRouter } from "expo-router";
import Colors from "../constants/Colors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { UserDetailContext } from "../context/UserDetailContext";

export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User detected:", user.email);

        try {
          const result = await getDoc(doc(db, 'users', user.email));
          const userData = result?.data();

          // Only update state if data has changed
          if (JSON.stringify(userDetail) !== JSON.stringify(userData)) {
            setUserDetail(userData);
          }

          router.replace('/(tabs)/home');
        } catch (error) {
          console.log("Error fetching user details:", error);
        }
      }
    });

    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, []); // Empty dependency array ensures this runs only once

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image source={require('../assets/images/landing.jpg')} style={styles.image} />
      <View style={styles.textDiv}>
        <Text style={styles.heading}>Welcome to Learnova</Text>
        <Text style={styles.para}>
          Emphasize the quality of education and AI’s role in providing expert guidance. 📚🤖
        </Text>
        <TouchableOpacity onPress={() => router.push('/auth/signUp')} style={styles.button}>
          <Text style={[styles.buttonText, { color: Colors.ORANGE }]}>Get Started !</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/auth/signIn')}
          style={[styles.button, { backgroundColor: Colors.ORANGE, borderWidth: 1, borderColor: Colors.WHITE }]}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>Already have an Account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    marginTop: 50,
  },
  textDiv: {
    padding: 25,
    backgroundColor: Colors.ORANGE,
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  heading: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.WHITE,
  },
  para: {
    color: Colors.WHITE,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'outfit',
  },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'outfit',
  },
});
