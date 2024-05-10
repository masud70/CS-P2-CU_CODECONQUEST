import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Others() {
  
  return (
    <SafeAreaView>
      <ScrollView className="h-screen p-4 bg-white" showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View className="flex justify-center items-center flex-col">
            <Image style={styles.imageStyle} source={require('../../assets/1176433.png')}/>
            <View className="w-full">

            </View>
        </View>
        

      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    imageStyle:{
        height:200,
        width:200,
        borderWidth:3,
        borderColor:'#09D95D',
        borderRadius:100
      },
})