import * as React from 'react';
import {
    StyleSheet,
    View, 
    Text, 
    Button,
    TextInput,
    TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Foundation, Ionicons, Feather } from '@expo/vector-icons';
import axios from 'axios';


const PayScreen = ({navigation, route}) => {

    const [data, setData] = React.useState({
        telephone: '',
        password: '',
        price: route.params.price,
        requestId: route.params.requestTransactionId,
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
    }

    const handlePay = () => {
        axios.post('http://carwash.eu-4.evennode.com/api/pay',{
            phoneNumber: data.telephone,
            amount: data.price,
            requestTransId: data.requestId
        }).then((res) => {
            console.log(res.data.message)
            navigation.navigate('Home')
        })
    }

    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <Text style={styles.text_footer}>Momo Number</Text>
                <View style={styles.action}>
                    <Foundation 
                        name='telephone'
                        size={24}
                        color='#193e4c'
                        style={styles.icon}
                         />
                    <TextInput
                        placeholder='(e.g): 0780000000'
                        placeholderTextColor='#666666'
                        style={styles.textInput}
                        keyboardType='numeric'
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

                <View style={styles.button}>
                    <TouchableOpacity onPress={handlePay}>
                        <LinearGradient
                            colors={['#4c66ef', '#3b5998']}
                            style={styles.signIn}>
                                <Text style={styles.buttonText}>Pay</Text>
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
        flex: 1.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
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


export default PayScreen;