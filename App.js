import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen  from './components/LoginScreen'
import { HomeScreen } from './components/HomeScreen';
import MyProfile from './components/MyProfile';
import DailyTips from './components/DailyTips';
import CommonQuestions from './components/CommonQuestions';
import Activities from './components/Activities';
import SignUpScreen from './components/SignUpScreen';
import { DocumentScreen } from './components/DocumentScreen';
import PaymentScreen from './components/PaymentScreen';
import './global';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        title: 'Sign Up'
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Inicio'
      }
    },
    Profile: {
      screen: MyProfile,
      navigationOptions: {
        title: 'Mi Perfil'
      }
    },
    Questions: {
      screen: CommonQuestions,
      navigationOptions: {
        title: 'Click Tips'
      }
    },
    Payment: {
      screen: PaymentScreen,
      navigationOptions: {
        title: 'Pago'
      }
    },
    Tips: {
      screen: DailyTips,
      navigationOptions: {
        title: 'Click Tips'
      }
    },
    Games: {
      screen: Activities,
      navigationOptions: {
        title: 'Click Tips'
      }
    },
    DocumentView: {
      screen: DocumentScreen,
      navigationOptions: {
        title: 'Click Tips'
      }
    }
  },
  {
    initialRouteName: 'Login',
    cardStyle: {
      backgroundColor: '#FF914C'
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return <AppContainer />;
}
