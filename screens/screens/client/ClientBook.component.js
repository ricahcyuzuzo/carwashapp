import * as React from 'react';
import { StyleSheet, View, ScrollView, Platform, Text, TextInput, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper'; 
import * as Animatable from 'react-native-animatable';
import {FontAwesome5, Foundation, Feather, Ionicons, MaterialCommunityIcons, Fontisto} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import axios from 'axios'


const BookScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        pickedDate: 'Pick a date',
        isDateTimePickerVisible: false,
        service: '',
        carType: '',
        phone: '',
        price: '',
        result: [],
        check_textInputChange: false,
        isValidUser: true,
        plateNo: '',
    });
 

    React.useEffect( () => {
        (async () => {
            const token = await AsyncStorage.getItem('token').then();
        const dat = jwtDecode(token);

        const res = await axios.get('http://carwash.eu-4.evennode.com/api/service');

        setData({
            ...data,
            phone: dat.user.phone_number,
            result: res.data.results
        });
        })();        
    }, []);

    let datee;
    const showDateTimePicker = () => {
        setData({
            ...data,
            isDateTimePickerVisible: true,
        });
    }


    const hideDateTimePicker = () => {
        setData({
            ...data,
            isDateTimePickerVisible: false,
        })
    }

    const handleValueChange = (itemValue) => {
        setData({
            ...data,
            carType: itemValue,
        })
        console.log(data.carType)
    }

    const handleValueChangeService = (itemValue, itemIndex) => {
        const arrData = data.result.find(x => x.service_name === itemValue);
        setData({
            ...data,
            service: itemValue,
            price: arrData.price
        })
        console.log(data.price)
    }
    const textInputChange = (val) => {
        if ( val.trim().length == 7 ){
            setData({
                ...data,
                plateNo: val,
                check_textInputChange: true,
                isValidUser: true
            });
        }else{
            setData({
                ...data,
                plateNo:val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
        console.log(data.plateNo);
    }

    const handleDatePicker = (date) => {
        const stringDate = date.toString().slice(0, -23);
        const newDate = new Date(stringDate);
        const getFullDate = newDate.getFullYear() + '-' + newDate.getMonth() + 1 + '-' + newDate.getDate();
        setData({
            ...data,
            pickedDate: getFullDate,
        });


    }
    const between = (min, max) => {
        return Math.floor(
          Math.random() * (max - min + 1) + min
        )
    }
    const hadleBooking = () => {
        const requestId = between(111111111111, 999999999999).toString();
        axios.post('http://carwash.eu-4.evennode.com/api/booking', {
            date: data.pickedDate,
            service: data.service,
            carType: data.carType,
            price: data.price,
            phoneNumber: data.phone,
            plateNo: data.plateNo,
            requestTransactionId: requestId
        }).then((res) => {
            console.log(res);
            navigation.navigate('Pay', { 
                price: data.price,
                requestTransactionId: requestId
            });
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Animatable.Text animation='bounceIn' style={styles.textHeader}>Book</Animatable.Text>
        </View>
        <Animatable.View animation='fadeInUpBig' style={styles.footer}>
            <ScrollView>
            <Text style={styles.text_footer}>Plate No</Text>
                <View style={styles.action}>
                    <Feather 
                        name='hash' size={24} color='#193e4c' style={styles.icon}
                    />
                    <TextInput
                        placeholder='(e.g): RAA000A'
                        placeholderTextColor='#666666'
                        style={styles.textInput}
                        autoCapitalize='characters'
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
                        <Text style={styles.errorMsg}>Plate Number must be 7 numbers only.</Text>
                    </Animatable.View>
                }
                <Text style={styles.text_footer}>Service</Text>
                <View style={styles.action}>
                    <MaterialCommunityIcons 
                        name='car-wash' size={24} color='#193e4c' style={styles.icon}
                    />
                    <Picker
                        selectedValue={data.service}
                        style={styles.textInput}
                        onValueChange={handleValueChangeService}
                        mode='dialog'
                    >
                    {data.result.map((item, key) => (
                        <Picker.Item key={key} label={item.service_name} value={item.service_name} />
                    ))}    
                    </Picker>


                </View>
                <Text style={styles.text_footer}>Date & Time</Text>
                <View style={styles.action}>
                    <Fontisto 
                        name='date' size={24} color='#193e4c' style={styles.icon}
                    />
                    <TouchableOpacity onPress={showDateTimePicker}>
                        <Text style={styles.textInput, {paddingTop: 5, fontWeight: 'bold', paddingLeft: 3}}>{data.pickedDate.toString()}</Text>
                    </TouchableOpacity>
                    
                    <DateTimePicker 
                        isVisible={data.isDateTimePickerVisible}
                        onConfirm={(date) => handleDatePicker(date)}
                        onCancel={hideDateTimePicker}
                        is24Hour={false}
                        is

                    />
                </View>
                <Text style={styles.text_footer}>Vehicle Type</Text>
                <View style={styles.action}>
                    <Ionicons 
                        name='car-sport-sharp' size={24} color='#193e4c' style={styles.icon}
                    />
                    <Picker
                        selectedValue={data.carType}
                        style={styles.textInput}
                        onValueChange={handleValueChange}
                        mode='dialog'
                    >
                        <Picker.Item label="Dina" value="Dina" />
                        <Picker.Item label="TXL" value="TXL" />
                        <Picker.Item label="Rava4" value="Rava4" />
                        <Picker.Item label="Pickup" value="Pickup" />
                        <Picker.Item label="Truck" value="Truck" />
                    </Picker>
                </View>
                <Text style={styles.text_footer}>Price</Text>
                <View style={styles.action}>
                    <MaterialCommunityIcons 
                        name='currency-usd-circle' size={24} color='#193e4c' style={styles.icon}
                    />
                    <Text style={styles.textInput, {paddingTop: 5, fontWeight: 'bold', paddingLeft: 3}}>{data.price.toString()}</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={hadleBooking}>
                        <LinearGradient
                            colors={['#4c66ef', '#3b5998']}
                            style={styles.signIn}>
                                <Text style={styles.buttonText}>Book</Text>
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
        flex: 6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 60,
        paddingVertical: 50,
        paddingHorizontal: 30,
        width: '100%'
    },
    header: { 
        flex: 1,
        backgroundColor: '#193e4c',
        width: 100,
        height: 70,
    },
    textHeader: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        margin: 'auto',
        width: '100%'
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
        borderWidth:0
    },
    signIn: {
        width: '100%',
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

export default BookScreen;