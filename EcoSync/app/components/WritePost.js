import Checkbox from 'expo-checkbox';
import moment from 'moment';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { SafeAreaView } from 'react-native-safe-area-context';

const WritePost = ({navigation}) => {

  const editorRef = useRef(null);


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>


  const [question, setquestion] = useState(false)
  const [Educational, setEducational] = useState(false)
  const [guidelines, setguidelines] = useState(false)
  const [story, setstory] = useState(false)




  const postABlog = async ()=>{
    
    if(title.trim().length>0 && content.trim().length>0){
        setTitle(title.trim())
        setContent(content.trim())
        const date = moment();
        const formattedDate = date.format('hh:mm:ss DD MMMM, YYYY');

        const blogData = {
            comments:[],
            likes:[],
            dislikes:[],
            username:userName,
            profilePicUrl:userProfilePic,
            title:title,
            date:formattedDate,
            description:content
        }
        try {
            alert("Your Blog has been published!")
            setTitle('')
            setContent('')
          } 
          catch (error) {
            alert("Something Went Wrong! :(")
            console.error('Error adding blog:', error);
          }
    }
    else if(title.trim().length<1){
        alert('Please write a title first')
    }
    else{
        alert('Please write something minimum for your blog content')
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Write a post..</Text>
        <TextInput value={title} onChangeText={(text)=>setTitle(text)} style={styles.input} placeholder='Title of the Post..'/>
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
        <View style={styles.editorContainer}>
          <RichToolbar
              editor={editorRef}
              actions={[ actions.insertImage, actions.setBold, actions.setItalic, actions.setUnderline,actions.setStrikethrough, actions.heading1,actions.insertLink, actions.insertBulletsList,actions.insertOrderedList,actions.code,actions.blockquote,actions.alignLeft,actions.alignCenter,actions.alignRight,actions.setSuperscript, actions.setSubscript, actions.removeFormat,actions.undo,actions.redo ]}
              iconMap={{ [actions.heading1]: handleHead }}
              selectedIconTint="#000"
              disabledIconTint="#bfbfbf"
              // style={{marginBottom:10}}
          />
          <RichEditor
              useContainer={false}
              value={content}
              ref={editorRef}
              style={[styles.editor]}
              placeholder='Write your blog here...'
              onChange={ descriptionText => {
                  setContent(descriptionText);
              }}
          />
          </View>

        
        <TouchableOpacity onPress={postABlog} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingBottom:50,
    backgroundColor:'#fff'
  },
  title: {
    color:'gray',
    fontSize:30,
    fontWeight:'bold',
    marginBottom:15
  },
  input: {
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor:'white',
    borderRadius:8,
    borderWidth:1,
    borderColor:'#09D95D'
  },
  editorContainer:{
    borderRadius:10,
    overflow:'hidden',
    borderWidth:1,
    borderColor:'#09D95D'
  },
  editor: {
    minHeight:350,
  },
  postButton: {
    backgroundColor: '#09D95D',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical:30,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WritePost;