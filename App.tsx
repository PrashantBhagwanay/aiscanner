// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Login from './Login/Login';
// import SplashScreen from './Login/SplashScreen';
// import LoginScreen from './Login/LoginScreen';



// const App = () => {
//   return (
//     <View style={{ display: "flex",backgroundColor:"#fff" ,flex:1}}>
//       {/* <Login /> */}
//       {/* <SplashScreen /> */}
//       {/* <SplashScreen /> */}
//       <LoginScreen />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
// });

// export default App;





import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./Login/SplashScreen";
import LoginScreen from "./Login/LoginScreen";
import LogScreen from "./Login/LogScreen";
import SignupScreen from "./Login/SignupScreen";
import Dashboard from "./Login/Dashboard";
import { View } from "react-native";
import CustomCameraScreen from "./Login/CustomCameraScreen";
import VisitingCardForm from "./Login/VisitingCardForm";
import SuccessScreen from "./Login/SuccessScreen";
import SavedCards from "./Login/SavedCards";


export type RootStackParamList = {
  navigate(arg0: string): void;
  login: undefined;
  signup: undefined;
  onboard: undefined;
  VisitingCardForm: { imageUrl: any; clinicData: any };
};


const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show splash screen for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);





  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : (
            <>
              <Stack.Screen name="onboard" component={LoginScreen} />
              <Stack.Screen name="login" component={LogScreen} />
              <Stack.Screen name="signup" component={SignupScreen} />
              <Stack.Screen name="dashboard" component={Dashboard} />
              <Stack.Screen name="VisitingCardForm" component={VisitingCardForm} />
              <Stack.Screen name="success" component={SuccessScreen} />
              <Stack.Screen name="SavedCards" component={SavedCards} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;

