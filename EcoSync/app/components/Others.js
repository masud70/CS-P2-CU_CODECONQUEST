import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';

export default function Others() {
  
  return (
    <SafeAreaView>
      <ScrollView className="h-screen p-4 bg-white" showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View className="flex justify-center items-center flex-col">
            <Image style={styles.imageStyle} source={require('../../assets/1176433.png')}/>
            <View className="w-full">

                <Text style={styles.UserFullName}>Md. Masud Mazumdar</Text>
                <View style={styles.mapViewContainer}>
                        <Text style={styles.dropStationNearTitle}>Drop stations near you..</Text>
                        <MapView style={{flex:1}}
                            initialRegion={{
                                latitude: 22.4716,
                                longitude: 91.7877,
                                latitudeDelta: 0.0222,
                                longitudeDelta: 0.0921,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: 22.4716, longitude: 91.7877 }}
                                title="A drop station"
                                description="This is a drop station"
                                />
                        </MapView>
                </View>

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
      UserFullName:{
        fontSize:20,
        color:'#09D95D',
        textAlign:'center',
        fontWeight:'500',
        marginVertical:10
      },
      mapViewContainer:{
        backgroundColor:'white',
        marginVertical:10,
        marginHorizontal: 5,
        padding:10,
        borderWidth:2,
        borderColor:'#09D95D',
        borderRadius:10,
        height:350,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    dropStationNearTitle:{
        fontSize:15,
        color:'#102487',
        fontWeight:'500',
        marginBottom:5
    },
})