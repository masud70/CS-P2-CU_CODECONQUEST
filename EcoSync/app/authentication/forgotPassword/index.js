import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from '@expo/vector-icons';

export default function App() {

    const [email, setEmail] = useState('')
    const [otp, setotp] = useState('')
    const [errorMessage, seterrorMessage] = useState('')
    const [loading, setloading] = useState(false)
    const [otpSendingStatus, setotpSendingStatus] = useState(false)
    const [otpsentStatus, setotpsentStatus] = useState(false)


	return (
		<SafeAreaView>
			<View style={{width:'auto'}} className="flex justify-center items-center bg-white h-screen ">
				<Image
                    style={{width:200, height:200, resizeMode:'contain'}}
                 source={require('../../../assets/logo_bg_removed.png')}/>
				<TextInput
                    style={styles.input} placeholder='Email' placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => {setEmail(text);  seterrorMessage('');}} value={email} 
                    underlineColorAndroid="transparent" autoCapitalize="none"
                    />
                
                <TextInput
                    style={[styles.input,{display:otpsentStatus?"block":"none"}]} placeholder='OTP' placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => {setotp(text);  seterrorMessage('');}} value={otp} 
                    underlineColorAndroid="transparent" autoCapitalize="none"
                    />
                
                {/* Eikhane error message hobe..like wrong email */}
                {errorMessage.length>0 && <Text style={{color:'red',textAlign:'center'}}>*{errorMessage}*</Text>}



                <TouchableOpacity
                    disabled={email.length==0}
                    style={styles.button}
                    onPress={()=>{
                        setloading(true);
                        // ekhane log in function call hobe
                    }}
                    >
                    <Text style={styles.buttonTitle}>
                        {loading? <ActivityIndicator size={25} color={"#fff"}/>: "Send OTP"}
                        {otpsentStatus && "Submit"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.footerView}>
                    <Text>Else, 
                        <Link onPress={()=>{
                            setEmail('');
                            seterrorMessage('')}
                            } href='/authentication/login' 
                            style={styles.footerLink}> Sign in </Link>
                            with passowrd.
                    </Text>
                </View>
                <Modal
                    animationType="fade"
                    visible={otpSendingStatus}
                    transparent={true}
                    >
                    <View style={styles.modalView}>
                        <Text 
                            style={{position:'absolute',right:10,top:10,padding:5}}
                            onPress={()=>{setotpSendingStatus(false)}}
                            >
                                <Entypo name="circle-with-cross" size={24} color="gray" />
                            </Text>
                        <Text style={{fontWeight:'bold', color:'white'}}>OTP sent to your email.</Text>
                    </View>
                    
                </Modal>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        width:300,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        color:'#09D95D',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal:15,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#09D95D',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        width:'40%',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold"
    },
    footerView: {
        alignItems: "baseline",
        textAlign:'left',
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#09D95D",
        fontWeight: "bold",
        fontSize: 16
    },
    modalView: {
        position:'relative',
        margin: 20,
        backgroundColor: '#3ce882',
        borderRadius: 20,
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
})