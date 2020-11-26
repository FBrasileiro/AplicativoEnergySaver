import React, {useState} from 'react';

import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import MainNavigator from './navigation/MainNavigation'


export default function App() {

  return (
    <MainNavigator />
  );
}

const styles = StyleSheet.create({
  inputContainer:{
    borderColor: 'black',
    borderWidth:1,
    padding:10
  }
})
