import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, seterrorMessage] = useState('')
    const [loading, setloading] = useState(false)
    const [loggedInStatus, setloggedInStatus] = useState(false)
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);

    const setAllNone = ()=>{
        setPassword('')
        setEmail('')
    }


	return (
        <SafeAreaView>
            <View style={{width:'auto'}} className="flex justify-center bg-white h-screen items-center">
                <Image
                    style={{width:200, height:200, resizeMode:'contain'}}
                    source={require('../../../assets/logo_bg_removed.png')}/>
                <TextInput
                    style={styles.input} placeholder='E-mail' placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => {setEmail(text);  seterrorMessage('');}} value={email} 
                    underlineColorAndroid="transparent" autoCapitalize="none"
                    />
                <TextInput
                    style={styles.input} placeholderTextColor="#aaaaaa" secureTextEntry placeholder='Password'
                    onChangeText={(text) => {setPassword(text); seterrorMessage('')}} value={password}
                    underlineColorAndroid="transparent" autoCapitalize="none"
                />

                <Pressable style={styles.checkboxContainer}  onPress={()=>setIsRememberMeChecked(!isRememberMeChecked)}>
                    <Checkbox
                    style={styles.checkbox}
                    value={isRememberMeChecked}
                    onValueChange={()=>setIsRememberMeChecked(!isRememberMeChecked)}
                    color={isRememberMeChecked ? '#09D95D' : undefined}
                    />
                    <Text style={styles.checkboxLabel}>Remember Me </Text>
                </Pressable>
                
                {/* Eikhane error message hobe..like wrong password */}
                {errorMessage.length>0 && <Text style={{color:'red',textAlign:'center'}}>*{errorMessage}*</Text>}



                <TouchableOpacity
                    disabled={password.length==0 || email.length==0}
                    style={styles.button}
                    onPress={()=>{
                        setloading(true);
                        // ekhane log in function call hobe
                    }}
                    >
                    <Text style={styles.buttonTitle}>
                        {loading? <ActivityIndicator size={25} color={"#fff"}/>: "Log in"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.footerView}>
                    <Link onPress={()=>{
                        setEmail('');
                        setPassword('');
                        seterrorMessage('')}
                        } href='authentication/forgotPassword' 
                        style={styles.footerLink}> Forgot password?</Link>
                </View>

                <View style={styles.footerView}>
                        <Text style={styles.footerText}>Don't have an account? <Link onPress={()=>{
                            setAllNone()
                            }} href={"authentication/signup"} style={styles.footerLink2}>Sign Up</Link></Text>
                    </View>
                
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
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft:40,
        width:'50%',
        alignSelf:'baseline',
    },
    checkbox: {
        alignSelf: 'center',
    
    },
    checkboxLabel: {
        padding: 8,
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
        color: "#e80505",
        fontWeight: "bold",
        fontSize: 16
    },
    footerLink2: {
        color: "#09D95D",
        fontWeight: "bold",
        fontSize: 16
    },
})