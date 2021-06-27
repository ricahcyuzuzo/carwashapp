import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/screens/auth/Register.component';
import SplashScreen from './screens/screens/auth/SplashScreen.component';
import LoginScreen from './screens/screens/auth/Login.component';
import HomeScreen from './screens/screens/client/Home.component';
import BookScreen from './screens/screens/client/ClientBook.component';
import PayScreen from './screens/screens/client/Payment.component';
import ForgotScreen from './screens/screens/auth/sendEmailForgotPassword.component';
import { MaterialIcons } from '@expo/vector-icons'
import ChangePasswordScreen from './screens/screens/auth/ChangePassword.component';


const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#193e4c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name='Splash'
          component={SplashScreen}
          options={{ headerShown: false, }}
        />
        <Stack.Screen 
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false, }}  
        />
        <Stack.Screen
          name='Regist'
          component={RegisterScreen}
          options={{ headerShown: false, }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{  headerLeft: false }}
        />
        <Stack.Screen
          name='Booking'
          component={BookScreen}
        />
        <Stack.Screen
          name='Pay'
          component={PayScreen}
         />
         <Stack.Screen
          name='Forgot'
          component={ForgotScreen}
         />
         <Stack.Screen
          name='Change'
          component={ChangePasswordScreen}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;