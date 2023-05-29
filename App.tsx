import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaNoticia from './screens/ListaNoticia';
import CadastroNoticia from './screens/CadastroNoticia';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cadastro" component={CadastroNoticia} />
        <Stack.Screen name="Lista" component={ListaNoticia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
