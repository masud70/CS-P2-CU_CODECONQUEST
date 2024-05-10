import { View, Text, StyleSheet, Image, Pressable, Modal, Switch, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router'

export default function Others() {

    const route = useRouter();

    const [modalViewStatus, setmodalViewStatus] = useState(false)
    const [otherNavigation, setotherNavigation] = useState('')
    const [banglaLang, setbanglaLang] = useState(false)
    const [darkMode, setdarkMode] = useState(false)

    const navigationComponents = [
        {
            title: "Volunteer Community", 
            icon: <MaterialIcons name="groups-2" size={24} color="black" />
        },
        {
            title: "Events", 
            icon: <MaterialIcons name="event" size={24} color="black" />
        },
        {
            title: "Settings", 
            icon: <AntDesign name="setting" size={24} color="black" />
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
                    <Text className="text-[22px] font-semibold border-b-2 mb-3">Others</Text>
                    {
                        navigationComponents.map((item,index)=>{
                            return <Pressable onPress={()=>{setotherNavigation(item.title);setmodalViewStatus(true)}} key={item.title} style={styles.oneNavigation}>
                                        <View className="w-1/4 flex justify-center items-center">
                                                {item.icon}
                                        </View>
                                        <View className="w-3/4">
                                            <Text className="text-[18px] font-semibold text-left">
                                                {item.title}
                                            </Text>
                                        </View>
                                    </Pressable>
                        })
                    }
                    
                    <Link className="rounded-lg px-4 py-4 w-40 text-center m-auto font-bold text-white bg-red-500 mt-4"
					href={"authentication/login"}>Sign Out</Link>
                </View>

            </View>

            <Modal
                animationType="fade"
                visible={modalViewStatus}
                transparent={true}
                >
                <View style={styles.modalView}>
                    {/* <Text 
                        style={{position:'absolute',right:10,top:10,padding:5}}
                        onPress={()=>{setmodalViewStatus(false)}}
                        >
                        <Entypo name="circle-with-cross" size={24} color="red" />
                    </Text> */}
                    <Text style={{fontWeight:'bold', color:'black'}} className="text-[20px] mb-4">{otherNavigation}</Text>

                    {
                        otherNavigation=='Settings' &&
                        <>
                            <View className="flex justify-between flex-row items-center w-[100%]">
                                <Text>Dark Mode</Text>
                                <Switch  value={darkMode} onValueChange={()=>{setdarkMode(!darkMode)}} />
                            </View>
                            <View className="flex justify-between flex-row items-center w-[100%]">
                                <Text>Bangla</Text>
                                <Switch  value={banglaLang} onValueChange={()=>{setbanglaLang(!banglaLang)}} />
                            </View>
                        </>
                    }
                    {
                        otherNavigation=='Volunteer Community' &&
                        <>
                        <Text className=" text-justify w-full">
                            Discover upcoming events, volunteer drives, and community initiatives to make a positive impact in your area.
                        </Text>
                        <TouchableOpacity onPress={()=>{route.push('')}} className="rounded-l border-lime-600 border-2 px-4 py-3 mt-5">
                            <Text className="text-lime-600">Go to community</Text>
                        </TouchableOpacity>
                        </>
                    }
                    {
                        otherNavigation=='Events' &&
                        <>
                        <Text className=" text-justify w-full">
                            Explore a diverse range of upcoming events and activities. 
                        </Text>
                        <TouchableOpacity className="rounded-l border-lime-600 border-2 px-4 py-3 mt-5">
                            <Text className="text-lime-600">Explore Events</Text>
                        </TouchableOpacity>
                        </>
                    }
                    

                    <Pressable onPress={()=>{setmodalViewStatus(false)}} className="flex justify-center border-red-600 border-2 py-3 rounded-lg mt-5 flex-row items-center w-[50%]">
                        <Text className=" text-red-600">Cancel</Text>
                    </Pressable>
                </View>
                
            </Modal>
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
        borderRadius:100,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      },
      UserFullName:{
        fontSize:20,
        color:'#303030',
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
        borderColor:'white',
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
        color:'gray',
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
    },

    modalView: {
        minHeight:250,
        top:'20%',
        alignSelf:'center',
        width:'80%',
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
}
)