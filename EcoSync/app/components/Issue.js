import { View, Text, StyleSheet, SafeAreaView, Platform, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from 'expo-checkbox';

const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>

export default function Issue() {
  
    const richText = React.useRef();


    const [issueTitle, setissueTitle] = useState('')
    const [issueDescription, setissueDescription] = useState('')

    const [openIssueTypelist, setopenIssueTypelist] = useState(false);
    const [issueType, setissueType] = useState(null);
    const [issues, setIssues] = useState([
        {label: 'Overflowing bins', value: 'Overflowingbins'},
        {label: 'Littering', value: 'Littering'},
        {label: 'Illegal Dumping', value: 'IllegalDumping'},
        {label: 'Damaged Infrastructure', value: 'DamagedInfrastructure'}
    ]);

    const [postannonymously, setpostannonymously] = useState(false)
    const [loading, setloading] = useState(false)
  
    return (
        <SafeAreaView  className="bg-white">
            <View style={{margin:'auto', width:'94%', zIndex:10}} className="flex justify-center mt-8 items-center pt-5 bg-white">
                <Text className="mr-auto font-bold text-[25px]">Issue a report</Text>
                <DropDownPicker
                open={openIssueTypelist}
                value={issueType}
                items={issues}
                setOpen={setopenIssueTypelist}
                setValue={setissueType}
                setItems={setIssues}
                style={{borderColor:'#09D95D'}}
                placeholder='Select issue type'
                searchable={true}
                />
            </View>
            <ScrollView  className="h-screen p-3 bg-white">
                <TextInput
                    style={styles.input} placeholder='Issue Title' placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => {setissueTitle(text)}} value={issueTitle} 
                    underlineColorAndroid="transparent" autoCapitalize="none"
                    />
                    
                    
                <View style={styles.editorContainer}>
                    <RichToolbar
                        editor={richText}
                        actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1 ]}
                        iconMap={{ [actions.heading1]: handleHead }}
                    />
                    <RichEditor
                        style={[styles.editor]}
                        ref={richText}
                        onChange={ descriptionText => {
                            setissueDescription(issueDescription)
                        }}
                    />
                </View>
                <Pressable style={styles.checkboxContainer}  onPress={()=>{setpostannonymously(!postannonymously)}}>
                    <Checkbox
                        style={styles.checkbox}
                        value={postannonymously}
                        onValueChange={()=>setpostannonymously(!postannonymously)}
                        color={postannonymously ? '#09D95D' : undefined}
                        />
                    <Text style={styles.checkboxLabel}>Post Anonymously </Text>
                </Pressable>

                <TouchableOpacity
                    disabled={issueTitle.length==0 || issueDescription.length==0}
                    style={styles.button}
                    onPress={()=>{
                        setloading(true);
                        // ekhane post issue function call hobe
                    }}
                    >
                    <Text style={styles.buttonTitle}>
                        {loading? <ActivityIndicator size={25} color={"#fff"}/>: "Post"}
                    </Text>
                </TouchableOpacity>

                
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 48,
        width:'100%',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        color:'#09D95D',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 16,
        borderColor:'#09D95D',
        borderWidth:1
    },
    button: {
        backgroundColor: '#09D95D',
        margin:'auto',
        marginTop: 10,
        marginBottom:20,
        height: 48,
        width:'40%',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',

    },
    editorContainer:{
        borderRadius:10,
        overflow:'hidden',
        borderWidth:1,
        borderColor:'#09D95D',
        minHeight:350
      },
      editor: {
        minHeight:350,
      },
      checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft:10,
        width:'50%',
        alignSelf:'baseline',
    },
    checkbox: {
        alignSelf: 'center',
    
    },
    checkboxLabel: {
        padding: 8,
    },
})