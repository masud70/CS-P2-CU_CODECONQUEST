import { Link } from 'expo-router'
import React, { useState,useEffect } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'



export default function SignUp({navigation}) {

    const [userName, setUserName]= useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [errorMessage, seterrorMessage] = useState('')
    const [userNameErrorMessage, setuserNameErrorMessage] = useState(['',''])
    const [loading, setloading] = useState(false)



    const userNameMessages = [
        ["This is a unique Username",'green'],
        ["The Username has already been taken.",'red'],
        ['','']
    ]

    const setAllNone = ()=>{
        seterrorMessage('')
        setEmail('')
        setPassword('')
        setconfirmPassword('')
        setUserName('')
        setuserNameErrorMessage(['',''])
    }

    useEffect(() => {
        const checkUniqueUserName = async ()=>{
            if(userName!=''){    
                try{
                    const querySnapshot = [] //ekhane query hobe unique username er jnno
                    if(querySnapshot.size==0) setuserNameErrorMessage(userNameMessages[0])
                    else setuserNameErrorMessage(userNameMessages[1])
                }
                catch(e){
                    console.log(e)
                }
            }
            else setuserNameErrorMessage(userNameMessages[2])
        }
        checkUniqueUserName()
        
    }, [userName])
    

    
    

    const registerWithEmail = async () => {
        try {
            setloading(true)
            // ekhane register hobe email diye..jodi sob thikvabe hoy tahole email e verification link jabe
            alert("Account Created! Please check your email and verify yourself.");
        }
        catch(e){
            if(e.code==='auth/email-already-in-use') seterrorMessage("Email has already been used")
            else if(e.code==='auth/weak-password') seterrorMessage("Please provide a strong password")
            else if(e.code === 'auth/invalid-email') seterrorMessage("Please provide a valid email")
            alert(errorMessage)
            setloading(false)
        }
    }

    const onSingUpPress = async ()=>{
        if(email.length==0 || password.length == 0 || userName.length == 0){
            seterrorMessage("Please provide all the necessarry informations")
        }
        else if(email.length>0 && password.length>0 && confirmPassword.length>0 && userName.length>0) {
            if(password===confirmPassword && userNameErrorMessage[1]=='green') registerWithEmail()
            else if(password!==confirmPassword) seterrorMessage("Passwords do not match")
            else seterrorMessage("Please provide a valid username")
        }
        else{
            seterrorMessage("Something is missing!")
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{backgroundColor:'#fff',height:'100%'}} showsVerticalScrollIndicator={false}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo_bg_removed.png')}
                />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='User Name'
                        onChangeText={(text) => {
                            setUserName(text); 
                        }}
                        value={userName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    {userNameErrorMessage[0].length>0 && userName.length>0 && <Text style={{color:userNameErrorMessage[1],paddingLeft:20,fontSize:13}}>*{userNameErrorMessage[0]}*</Text>}
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => {setEmail(text);  seterrorMessage('');}}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => {setPassword(text); seterrorMessage('')}}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Confirm password'
                        onChangeText={(text) => {setconfirmPassword(text);   seterrorMessage('');}}
                        value={confirmPassword}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    {errorMessage.length>0 && <Text style={{color:'red',textAlign:'center'}}>*{errorMessage}*</Text>}
                    <TouchableOpacity
                        disabled={password.length==0 || email.length==0}
                        style={styles.button}
                        onPress={() => onSingUpPress()}>
                        <Text style={styles.buttonTitle}>
                            {loading? <ActivityIndicator size={20} color={"#fff"}/>: "Sign up"}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Already have an account? <Link onPress={()=>{
                            setAllNone()
                            }} href={"authentication/login"} style={styles.footerLink}>Log In</Link></Text>
                    </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff'
    },
    title: {
        fontSize:22,
        fontWeight:'600',
        fontStyle:'italic',
        marginBottom:20
    },
    logo: {
        alignSelf:'center',
        color:"#0274ed",
        height:200,
        width:200,
        marginBottom:20,
        marginTop:40
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        color:'#5591ad',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#09D95D',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
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
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        paddingBottom:50,
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#09D95D",
        fontWeight: "bold",
        fontSize: 16
    }
})