import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import Colors from '../../constants/Colors';
import { UserDetailContext } from '../../context/UserDetailContext';
import { ProfileMenu } from '../../constants/Options';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

export default function Profile() {

    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router = useRouter();

    const OnOptionClick = (option) => {
        if (option?.name == 'Logout') {
            signOut(auth).then(() => {
                setUserDetail(null);
                router.push('/');
            }).catch((error) => {
                console.log("Error while logging out");

            })
        }
        else {
            router.push(option?.path);
        }
    }

    return (
        <FlatList
            data={[]}
            style={{
                backgroundColor: Colors.WHITE
            }}
            ListHeaderComponent={
                <View style={{
                    backgroundColor: Colors.WHITE,
                    flex: 1,
                }}>
                    <Image source={require('../../assets/images/wave.png')}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: 400,
                        }}
                    />
                    <View style={{
                        marginTop: 20,
                        padding: 20,
                    }}>
                        <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 30
                        }}>Profile</Text>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={require('../../assets/images/logo.jpeg')}
                                style={{
                                    height: 150,
                                    width: 150,
                                    borderRadius: 15,
                                    marginTop: 15,
                                    borderWidth:1,
                                    borderColor:Colors.GRAY
                                }} />
                            <Text style={{
                                fontFamily: 'outfit-bold',
                                fontSize: 25,
                                marginTop: 15
                            }}>Hello! 👋 {userDetail?.name.split(' ')[0]}
                            </Text>
                        </View>
                        <View style={{
                            marginTop: 25,
                        }}>
                            <FlatList
                                data={ProfileMenu}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 10,
                                        padding: 15,
                                        width: '100%',
                                        borderWidth: 1,
                                        borderColor: Colors.GRAY,
                                        borderRadius: 15,
                                        marginBottom: 10
                                    }} onPress={() => OnOptionClick(item)}>
                                        <Ionicons name={item?.icon} size={30} color="black" />
                                        <Text style={{
                                            fontFamily: 'outfit',
                                            fontSize: 20
                                        }}>{item?.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </View>
            }
        />
    )
}