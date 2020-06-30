import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Splash, Landing, Login, Register, Home, History, Account, Viewbook } from '../screens';
const Stack = createStackNavigator(); 

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Splash" 
        component={Splash}
        options={{
          headerShown: false
        }} 
      />
       <Stack.Screen 
        name="Landing" 
        component={Landing}
        options={{
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen 
        name="Register" 
        component={Register} 
        options={{
          headerShown: false
        }}
      />

       <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen 
        name="History" 
        component={History} 
        options={{
          headerShown: true
        }}
      />

      <Stack.Screen 
        name="Account" 
        component={Account} 
        options={{
          headerShown: true
        }}
      />

       <Stack.Screen 
        name="Viewbook" 
        component={Viewbook} 
        options={{
          headerShown: false
        }}
      />
     
    </Stack.Navigator>
  );
}

export default Router;