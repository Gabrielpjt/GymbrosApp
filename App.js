import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen'
import PushUp1Screen from './screens/PushUp1Screen';
import PushUp2Screen from './screens/PushUp2Screen';
import PlankScreen from './screens/Plank';
import ReportScreen from './screens/ReportScreen';
import RiwayatScreen from './screens/RiwayatScreen'
import UsersContextProvider from './contexts/UsersContext';
import { OneReportsProvider } from './contexts/OneReportContext';
import { Colors } from './constants/styles';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Push Up Biasa" component={PushUp1Screen} />
      <Stack.Screen name="Push Up Kaki Ditekuk" component={PushUp2Screen} />
      <Stack.Screen name="Plank" component={PlankScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="RiwayatScreen" component={RiwayatScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <OneReportsProvider>
    <UsersContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="App" component={AuthenticatedStack} />
          <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
    </UsersContextProvider>
    </OneReportsProvider>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <Navigation />
    </>
  );
}
