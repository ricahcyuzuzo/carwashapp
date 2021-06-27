import * as React from 'react';
import { View, ScrollView, Text, StyleSheet, Button } from 'react-native';
import { FAB } from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
    const [data, setData] = React.useState({ result: [] });
    
    const navigation = useNavigation();

    React.useEffect( () => {

        ( async () => {
            const token = await AsyncStorage.getItem('token').then();
        const dat = jwtDecode(token);

        const res = await axios.get('http://carwash.eu-4.evennode.com/api/bookings', { params: { tel: dat.user.phone_number }} );

        setData({
            ...data,
            result: res.data.results
        });
        })();
        
        
    }, []);

    const handleReload = async () => {
        const token = await AsyncStorage.getItem('token').then();
        const dat = jwtDecode(token);

        const res = await axios.get('http://carwash.eu-4.evennode.com/api/bookings', { params: { tel: dat.user.phone_number }} );

        setData({
            ...data,
            result: res.data.results
        });
    }

    const cancelBooking = (bookingId) => {
        console.log(bookingId);
        axios.post('http://carwash.eu-4.evennode.com/api/cancel', {
            bookingId: bookingId,
        })
        .then((res) => {
            console.log(res);
            Alert.alert('Majestic Car Wash', res.data.message)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('Login')}>
            <MaterialIcons 
                name='logout' 
                size={35}  
                color='#fff'/>
            </TouchableOpacity>
            
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                
                <Text style={styles.text_footer1}>My Bookings</Text>
                <ScrollView>
                    {
                        data.result.map((item, key) => (
                            <View key={key}>
                                <View style={styles.homeData}>
                                    <Text style={styles.itemStyleService}>
                                        {item.service}
                                    </Text>
                                    <Text style={styles.itemStyleDate}>
                                        {item.date}
                                    </Text>
                                </View>
                                <View style={styles.homeData}>
                                    <Text style={styles.itemStyle}>
                                        {item.status}
                                    </Text>
                                    <Text style={styles.itemStyle}>
                                        {item.pay_status}
                                    </Text>
                                </View>
                                <View style={styles.button}>
                                
                                <Button title="Cancel" style={{backgroundColor: 'red', color: 'white'}} onPress={() => {
                                    axios.post('http://carwash.eu-4.evennode.com/api/cancel', {
                                        bookingId: item.booking_id,
                                    })
                                    .then((res) => {
                                        Alert.alert('Majestic Car Wash', res.data.message);
                                        handleReload();
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                                }} />
                </View>
                            <View style={styles.itemSeparatorStyle} />
                            </View>
                            
                        ))}
                </ScrollView>
                <FAB 
                    style={styles.fab}
                    small = {false}
                    icon='plus'
                    animated
                    onPress={() => navigation.navigate('Booking')}
                     />
                <FAB 
                    style={styles.fab2}
                    small = {false}
                    icon='reload'
                    animated
                    onPress={handleReload}
                />
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#193e4c',
        alignItems: 'center',
        justifyContent: 'center'
    },
    homeData: {
        flexDirection: 'row'
    },
    footer: {
        flex: 5,
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
        paddingTop: 10,
    },
    fab:{
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fab2:{
        position: 'absolute',
        margin: 16,
        marginRight:100,
        right: 0,
        bottom: 0,
    },
    text_footer1: {
        color: '#05375a',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 1,
        paddingBottom: 20,
        textAlign: 'center',
    },
    itemStyleService: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold'
    },
    itemStyleDate: {
        padding: 10,
        fontSize: 14,
        fontWeight: '200'
    },
    itemStyle: {
        padding: 10,
        fontSize: 14,
    },
    itemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
    },
});

export default HomeScreen;