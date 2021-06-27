import * as React from 'react';
import {
    StyleSheet,
    View, 
    Text, 
    Alert,
    TextInput,
    TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Foundation, Ionicons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';


const LoginScreen = ({ navigation, route }) => {

    const [data, setData] = React.useState({
        telephone: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const textInputChange = (val) => {
        if ( val.trim().length == 10 ){
            setData({
                ...data,
                telephone: val,
                check_textInputChange: true,
                isValidUser: true
            });
        }else{
            setData({
                ...data,
                telephone:val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
        console.log(data.telephone)
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        })
    }
    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ){
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        }else{
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const handleSignIn = () => {
        axios.post('http://carwash.eu-4.evennode.com/api/login', {
            phoneNumber: data.telephone,
            password: data.password
        })
        .then(async (res) => {
            console.log(res.data)
            await AsyncStorage.setItem('token', res.data.token)
            console.log(await AsyncStorage.getItem('token'));
            navigation.navigate('Home');
        })
        .catch((err) => {
            if(err.response){
                Alert.alert('Majestic Car Wash', err.response.data.errorMessage)
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Text animation='bounceIn' style={styles.textHeader}>Welcome!</Animatable.Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <Text style={styles.text_footer}>Telephone</Text>
                <View style={styles.action}>
                    <Foundation 
                        name='telephone'
                        size={24}
                        color='#193e4c'
                        style={styles.icon}
                         />
                    <TextInput
                        placeholder='(e.g): 0780000000'
                        keyboardType='numeric'
                        placeholderTextColor='#666666'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation='bounceIn'
                        >
                            <Feather
                                name='check-circle'
                                color='green'
                                size={24}
                                style={styles.icon}
                            />
                        </Animatable.View>
                    :null}
                </View>
                { data.isValidUser ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Telephone must be 10 numbers only.</Text>
                    </Animatable.View>
                }

                <Text style={styles.text_footer}>Password</Text>

                <View style={styles.action}>
                    <Ionicons
                        name='lock-closed'
                        size={24}
                        color='#193e4c'
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder='Your Password'
                        placeholderTextColor='#666666'
                        style={styles.textInput}
                        secureTextEntry={data.secureTextEntry ? true : false}
                        autoCapitalize='none'
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity 
                    onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry?
                            <Feather
                                name='eye-off'
                                size={24}
                                color='gray'
                                style={styles.icon}/>
                            :
                            <Feather
                                name='eye'
                                size={24}
                                color='gray'
                                style={styles.icon}/>
                        }
                    </TouchableOpacity>
                </View>
                { data.isValidPassword ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }
                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                    <Text style={{color: '#009387', marginTop:15, paddingLeft:10 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleSignIn}>
                        <LinearGradient
                            colors={['#4c66ef', '#3b5998']}
                            style={styles.signIn}>
                                <Text style={styles.buttonText}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Regist')}>
                        <LinearGradient
                            colors={['#4c66ef', '#3b5998']}
                            style={styles.signIn}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>    

            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#193e4c',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 60,
        paddingVertical: 50,
        paddingHorizontal: 30,
        width: "100%"
    },
    header: {
        flex: 1,
        backgroundColor: '#193e4c',
        width: "100%",
        height: 70,
    },
    textHeader: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingTop: 10
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 0
    },
    signIn: {
        width: "100%",
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 0,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    icon: {
        paddingBottom: 10
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },

})

export default LoginScreen;