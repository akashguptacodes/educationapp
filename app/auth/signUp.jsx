import { View, Text, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import {UserDetailContext} from '../../context/UserDetailContext'
import { Image } from 'react-native'
import Colors from "../../constants/Colors";
import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';

export default function SignUp() {

    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);

    const CreateNewUser = async () => {
        setLoading(true);        
        createUserWithEmailAndPassword(auth, email,password)
        .then(async(res)=>{
            console.log("inside createnewuser and then");
            
            const user = res?.user;
            console.log(user);
            //save user to database
            await SaveUser(user);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err.message);
            setLoading(false);
            
        })
    }
    // const SaveUser = () => {
    //     await setDoc(doc(db, collection name, unique name of document),{
    //         name: fullName,
    //         email: email,
    //     })
    // }
    const SaveUser = async (user) => {
        const data = {
            name: fullName,
            email: email,
            member: false,
            uid: user?.uid
        }
        await setDoc(doc(db,'users',email),data)
        console.log("user saved successfully");
        setUserDetail(data);
        
    }

    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            padding: 25,
            backgroundColor: Colors.WHITE
        }}>
            <Image source={require('../../assets/images/signup.jpg')}
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
            >Create New Account
            </Text>
            <TextInput placeholder='Full Name' style={styles.input} onChangeText={(val)=>{setFullName(val)}} />
            <TextInput placeholder='Email' style={styles.input} onChangeText={(val)=>{setEmail(val)}} />
            <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} onChangeText={(val)=>{setPassword(val)}} />
            <TouchableOpacity
                disabled={loading}
                onPress={CreateNewUser}
                style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    width: '100%',
                    marginTop: 25,
                    borderRadius: 10
                }}
            >
                {
                    !loading?(
                        <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: Colors.WHITE,
                        textAlign: 'center'
                    }}
                >Create Account</Text>
                    ):(<ActivityIndicator size={'large'} color={Colors.WHITE}/>)
                }
            </TouchableOpacity>
            <View style={{
                display:'flex',
                flexDirection:'row',
                marginTop:15,
                gap:5,
            }}>
                <Text style={{fontFamily:'outfit'}}>Already have an account?</Text>
                <Pressable onPress={()=>{router.push('/auth/signIn')}}>
                    <Text style={{
                        fontFamily:'outfit',
                        color:Colors.PRIMARY
                    }}>Sign In Here</Text>
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