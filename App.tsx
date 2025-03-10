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
   <View style={{backgroundColor:"#fff",flex:1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : (
            <Stack.Screen name="Login" component={CustomCameraScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
   </View>
  );
};

export default App;

