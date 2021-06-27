import * as React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image animation='bounceIn' style={styles.iconStyles} source={require('./icon.png')}></Animatable.Image>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <Text style={[styles.title]}>Stay connected with to our Services!</Text>
                <Text style={styles.text}>Sign in with your account</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <LinearGradient
                            colors={['#4c66ef', '#3b5998']}
                            style={styles.signIn}>
                                <Text style={styles.textSign}>Get Started!!</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
    iconStyles: {
        margin: 100,
        height: 150,
        width: 150,
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 60,
        paddingVertical: 50,
        paddingHorizontal: 30,
        width: "100%"
    },
    header: {
        flex: 2,
        backgroundColor: '#193e4c',
        width: "100%",
        height: 70,
    },
    getStartedText: {
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 60,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    gradientButton: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
    bottonSmallText:{
        fontSize: 18,
        textAlign: 'center',
        margin: 'auto',
        marginBottom: 60,
    },
    signIn: {
        width: "100%",
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5,
        fontSize: 18
    },
    button: {
        alignItems: 'center',
        marginTop: 30,
        width: "50%",
        marginLeft: 180
    }

});

export default SplashScreen;