import * as React from 'react';
import {
    StyleSheet,
    View, 
    Text, 
    Button,
    TextInput,
    TouchableOpacity, 
    ScrollView,
    Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Foundation, Feather, Ionicons, FontAwesome} from '@expo/vector-icons'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        names: '',
        telephone: '',
        password: '',
        check_textInputChange: false,
        check_emailInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidEmail: true,
        isValidNames: false,
        isValidPassword: true,
        isRepeatValidPassword: true,
    });

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        })
    }

    const handleRepeatPassword = (val) => {
        if( data.password == val ){
            setData({
                ...data,
                isRepeatValidPassword: true
            });
        }else{
            setData({
                ...data,
                isRepeatValidPassword: false
            })
        }
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

    const handleChangePassword = async () => {
        const email = await AsyncStorage.getItem('email');
        const password = data.password;
        axios.patch('http://carwash.eu-4.evennode.com/api/password', {
            password: password,
            email: email
        })
        .then((res) => {
            Alert.alert('Majestic Car Wash', res.data.message)
            navigation.navigate('Login');
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Text animation='bounceIn' style={styles.textHeader}>Change Password</Animatable.Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <ScrollView>
                        
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
                <Text style={styles.text_footer}>Comfirm Password</Text>

                <View style={styles.action}>
                    <Ionicons
                        name='lock-closed'
                        size={24}
                        color='#193e4c'
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder='Repeat Password'
                        placeholderTextColor='#666666'
                        style={styles.textInput}
                        secureTextEntry={data.secureTextEntry ? true : false}
                        autoCapitalize='none'
                        onChangeText={(val) => handleRepeatPassword(val)}
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
                { data.isRepeatValidPassword ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Passwords must match</Text>
                    </Animatable.View>
                }
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleChangePassword}>
                        <LinearGradient
                            colors={['#4c66ef', '#3b5998']}
                            style={styles.signIn}>
                                <Text style={styles.buttonText}>Change Password</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>    
                </ScrollView>
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
        flex: 4,
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
        fontWeight: 'bold'
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
});

export default ChangePasswordScreen;