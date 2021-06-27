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


const ForgotScreen = ({ navigation, route }) => {

    const [data, setData] = React.useState({
        email: '',
        code: '',
        check_emailInputChange: false,
        isValidEmail: true,
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isCodeValid: false,
    });

    const inputEmailChange = (val) => {
        if ( val.trim().length >= 4 ){
            setData({
                ...data,
                email: val,
                check_emailInputChange: true,
                isValidEmail: true
            });
        }else{
            setData({
                ...data,
                email:val,
                check_emailInputChange: false,
                isValidEmail: false
            });
        }
    }


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        })
    }
    const handleCodeChange = (val) => {
        if( val.trim().length == 4 ){
            setData({
                ...data,
                code: val,
                isCodeValid: true
            });
        }else{
            setData({
                ...data,
                code: val,
                isCodeValid: false
            });
        }
    }

    const handleSendPasswordRecoveryEmail = () => {
        const email = data.email;
        axios.post('http://carwash.eu-4.evennode.com/api/sendcode', {
            email: email,
        })
        .then((res) => {
        Alert.alert('Majestic Car Wash', res.data.message)
        })
        .catch((err) => {
        console.log(err)
        })
    }

    const nextChangePassword = async () => {
        axios.get('http://carwash.eu-4.evennode.com/api/checkcode', { params: {vcode: data.code}})
        .then((res) => {
            if(res.data.status == 404){
                Alert.alert('Majestic car Wash', res.data.message);
            }else{
                AsyncStorage.setItem('email', data.email)
                navigation.navigate('Change')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Text animation='bounceIn' style={styles.textHeader}>Forgot Password</Animatable.Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                 <Text style={styles.text_footer}>Email:</Text>
                <View style={styles.action}>
                    <Foundation 
                        name='mail'
                        size={24}
                        color='#193e4c'
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder='(e.g): Email for password recovery'
                        placeholderTextColor='#666666'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val) => inputEmailChange(val)}
                    />
                    {data.check_emailInputChange ?
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
                { data.isValidEmail ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Email must be valid.</Text>
                    </Animatable.View>
                }
                    <TouchableOpacity onPress={handleSendPasswordRecoveryEmail}>
                        <LinearGradient
                            colors={['#4c66ef', '#3b5998']}
                            style={styles.signIn}>
                                <Text style={styles.buttonText}>Send Verification Code to me</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                <Text style={styles.text_footer}>Enter the code</Text>

                <View style={styles.action}>
                    <Ionicons
                        name='lock-open'
                        size={24}
                        color='#193e4c'
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder='(e.g) 0000'
                        keyboardType='numeric'
                        placeholderTextColor='#666666'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val) => handleCodeChange(val)}
                    />
                    {data.isCodeValid ?
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
                { data.isCodeValid ? null: <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Code needs to be 4 numbers.</Text>
                    </Animatable.View>
                }
                {data.isCodeValid ? 
                <View style={styles.button}>
                    <TouchableOpacity onPress={nextChangePassword}>
                        <LinearGradient
                            colors={['#4c66ef', '#3b5998']}
                            style={styles.signIn}>
                                <Text style={styles.buttonText}>Next</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View> : null}   

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

export default ForgotScreen;