import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router'

export default function Others() {


    const navigationComponents = [
        {
          title: "Volunteer Registration", icon: <MaterialIcons name="volunteer-activism" size={24} color="black" />
        },
        {
            title: "Volunteer Community", icon: <MaterialIcons name="groups-2" size={24} color="black" />
        },
        {
            title: "Events", icon: <MaterialIcons name="event" size={24} color="black" />
        },
        {
            title: "Settings", icon: <AntDesign name="setting" size={24} color="black" />
        }
      ]
  
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
                <View style={styles.otherMenuContainer}>
                    <Text className="text-[22px] mb-2 font-semibold border-b-2 mb-3">Others</Text>
                    {
                        navigationComponents.map((item,index)=>{
                            return <View key={item.title} style={styles.oneNavigation}>
                                        <View className="w-1/4 flex justify-center items-center">
                                                {item.icon}
                                        </View>
                                        <View className="w-3/4">
                                            <Text className="text-[18px] font-semibold text-left">
                                                {item.title}
                                            </Text>
                                        </View>
                                    </View>
                        })
                    }
                    
                    <Link className="rounded-lg px-4 py-4 w-40 text-center m-auto font-bold text-white bg-red-500 mt-4"
					href={"authentication/login"}>Sign Out</Link>
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
    otherMenuContainer:{
        width:'95%',
        alignSelf:'center',
        marginBottom:80
    },
    oneNavigation:{
        height:60,
        width:'100%',
        backgroundColor:'white',
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10
    }
}
)