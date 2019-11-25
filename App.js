import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen  from './components/LoginScreen'
import { HomeScreen } from './components/HomeScreen';
import MyProfile from './components/MyProfile';
import { DailyTips } from './components/DailyTips';
import CommonQuestions from './components/CommonQuestions';
import Activities from './components/Activities';
import SignUpScreen from './components/SignUpScreen';
import { DocumentScreen } from './components/DocumentScreen';
import PaymentScreen from './components/PaymentScreen';
import ProfileScreen from './components/ProfileScreen';
import UploadDocument from './components/UploadDocument';
import EditDocument from './components/EditDocument';
import MyDocuments from './components/MyDocuments';
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
    ProfessionalProfile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Click Tips'
      }
    },
    Questions: {
      screen: CommonQuestions,
      navigationOptions: {
        title: 'Preguntas Frecuentes'
      }
    },
    Upload: {
      screen: UploadDocument,
      navigationOptions: {
        title: 'Subir documento'
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
        title: 'Actividades y Juegos'
      }
    },
    MyDocumentsView: {
      screen: MyDocuments,
      navigationOptions: {
        title: 'Mis Documentos'
      }
    },
    EditDocumentView: {
      screen: EditDocument,
      navigationOptions: {
        title: 'Editar Documento'
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
