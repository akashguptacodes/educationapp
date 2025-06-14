import { View, Text, StyleSheet, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { Image } from 'react-native'
import Colors from "../../constants/Colors";
import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignIn() {

    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);

    const onSignIn = async () => {
        console.log("Signin call ja rha hai");
        setLoading(true);
        signInWithEmailAndPassword(auth, email,password)
        .then(async (res)=>{
            const user=res?.user;
            console.log("user hai ye", user);
            console.log("getUserDetails ko call kiya hai");
            await getUserDetails();
            setLoading(false);
            router.replace('/(tabs)/home')
        }).catch(
            e=>{
                console.log(e);
                ToastAndroid.show('Incorrect email & password', ToastAndroid.BOTTOM)
                setLoading(false);
            }
        )
    }
    const getUserDetails = async () => {
        const result = await getDoc(doc(db, 'users', email));
        console.log("result.data() hai ye",result.data());
        setUserDetail(result?.data()); 
    }

    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            padding: 25,
            backgroundColor: Colors.WHITE
        }}>
            <Image source={require('../../assets/images/signin.jpg')}
                style={{
                    width: '100%',
                    height: '40%'
                }}
            />
            <Text
                style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 30,
                }}
            >Welcome Back !
            </Text>
            <TextInput placeholder='Email' style={styles.input} onChangeText={(val)=>{setEmail(val)}}/>
            <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} onChangeText={(val)=>{setPassword(val)}}/>
            <TouchableOpacity
                disabled={loading}
                onPress={onSignIn}
                style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    width: '100%',
                    marginTop: 25,
                    borderRadius: 10
                }}
            >
                {!loading?(
                    <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: Colors.WHITE,
                        textAlign: 'center'
                    }}
                >Login</Text>
                ):(<ActivityIndicator size={'large'} color={Colors.WHITE} />)}
            </TouchableOpacity>
            <View style={{
                display:'flex',
                flexDirection:'row',
                marginTop:15,
                gap:5,
            }}>
                <Text style={{fontFamily:'outfit'}}>Not Have an Account?</Text>
                <Pressable onPress={()=>{router.push('/auth/signUp')}}>
                    <Text style={{
                        fontFamily:'outfit',
                        color:Colors.PRIMARY
                    }}>Create New Here</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        width: '100%',
        padding: 15,
        fontSize: 16,
        marginTop: 20,
        borderRadius: 6,
    }
})