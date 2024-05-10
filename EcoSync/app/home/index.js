import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, FontAwesome, Octicons,MaterialCommunityIcons } from '@expo/vector-icons';
import Timeline from '../components/Timeline';
import Forum from '../components/Forum';
import Issue from '../components/Issue';
import Others from '../components/Others';


const Tab = createBottomTabNavigator();

export default function Dashboard() {
  
  const focusedIcons=[
    <Ionicons name="home-outline" size={24} color="gray" />,
    <MaterialCommunityIcons name="forum-outline" size={24} color="gray" />,
    <Octicons name="report" size={24} color="gray" />,
    <AntDesign name="infocirlceo" size={24} color="gray" />
  ]

  const unFocusedIcons = [
    <Ionicons name="home-sharp" size={24} color="#09D95D" />,
    <MaterialCommunityIcons name="forum" size={24} color="#09D95D" />,
    <Octicons name="report" size={24} color="#09D95D" />,
    <AntDesign name="infocirlce" size={24} color="#09D95D" />
  ]

  const tabComponents = [
    {
      name: "Home", component: Timeline
    },
    {
      name: "Forum", component: Forum,
    },
    {
      name: "Issue", component: Issue
    },
    {
      name: "Others", component: Others
    }
  ]

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#09D95D',
        tabBarInactiveTintColor: 'gray',
      })}>
      {
        tabComponents.map(({ name, component },index) => {
          return (
            <Tab.Screen  key={name} name={name} component={component} options={{ headerShown: false, tabBarIcon: ({ focused }) => (focused ? unFocusedIcons[index] : focusedIcons[index]) }} />
          )
        })
      }
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});