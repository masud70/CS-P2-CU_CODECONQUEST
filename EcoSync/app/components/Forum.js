import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'
import { Searchbar } from 'react-native-paper';
import ForumListItem from './ForumListItem';
import Checkbox from 'expo-checkbox';

export default function Forum() {
    const [searchQuery, setSearchQuery] = useState('');

    const [question, setquestion] = useState(false)
    const [Educational, setEducational] = useState(false)
    const [guidelines, setguidelines] = useState(false)
    const [story, setstory] = useState(false)

    return (
        <SafeAreaView>
            <ScrollView className="h-screen p-3 mt-8 bg-white">

            <Searchbar
                placeholder="Search for a topic..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                />
                <View className="flex justify-between flex-row flex-wrap">
                    <Pressable style={styles.checkboxContainer}  onPress={()=>{setquestion(!question)}}>
                        <Checkbox
                            style={styles.checkbox}
                            value={question}
                            onValueChange={()=>{setquestion(!question)}}
                            color={question ? '#09D95D' : undefined}
                            />
                        <Text style={styles.checkboxLabel}>Question</Text>
                    </Pressable>
                    <Pressable style={styles.checkboxContainer}  onPress={()=>{setEducational(!Educational)}}>
                        <Checkbox
                            style={styles.checkbox}
                            value={Educational}
                            onValueChange={()=>{setEducational(!Educational)}}
                            color={Educational ? '#09D95D' : undefined}
                            />
                        <Text style={styles.checkboxLabel}>Educational</Text>
                    </Pressable>
                    <Pressable style={styles.checkboxContainer}  onPress={()=>{setguidelines(!guidelines)}}>
                        <Checkbox
                            style={styles.checkbox}
                            value={guidelines}
                            onValueChange={()=>{setguidelines(!guidelines)}}
                            color={guidelines ? '#09D95D' : undefined}
                            />
                        <Text style={styles.checkboxLabel}>Guidelines</Text>
                    </Pressable>
                    <Pressable style={styles.checkboxContainer}  onPress={()=>{setstory(!story)}}>
                        <Checkbox
                            style={styles.checkbox}
                            value={story}
                            onValueChange={()=>{setstory(!story)}}
                            color={story ? '#09D95D' : undefined}
                            />
                        <Text style={styles.checkboxLabel}>Story</Text>
                    </Pressable>
                </View>
                
                <View className="w-[95%] mt-5 mx-auto flex justify-center items-center ">

                    <ForumListItem/>
                    <ForumListItem/>
                    <ForumListItem/>
                </View>

                

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 0,
        marginLeft:10,
        width:'auto',
    },
    checkbox: {
        alignSelf: 'center',
    
    },
    checkboxLabel: {
        padding: 8,
    },
})