import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Dimensions,ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { RichEditor } from 'react-native-pell-rich-editor';
import HRline from './HRLine';
import { useLocalSearchParams } from 'expo-router'

const APostScreen = () => {

  const editorRef = useRef(null);

  const [postData, setpostData] = useState({})

  const {post} = useLocalSearchParams()

  useEffect(() => {

  const getParams = ()=> { 
    setpostData(JSON.parse(post))
    setComments(JSON.parse(post).comments)
    setlikes(JSON.parse(post).likes)
    setdislikes(JSON.parse(post).dislikes)
  }
  getParams()
    
  }, [])
  
  
  const [blogData, setBlogData] = useState(null);
  const [comments, setComments] = useState([
    {
        date:'15 sec ago',
        username:'Atanu Kumar Dey',
        commentText:'A new Comment'
    }
  ]);
  const [commentInput, setcommentInput] = useState('')
  const [likes, setlikes] = useState([])
  const [dislikes, setdislikes] = useState([])


  const contentWidth = Dimensions.get('window').width;
  
  const fetchBlogData = async () => {
      try {
          setBlogData(TempBlogData);
          setComments(TempBlogData.comments);
          setlikes(TempBlogData.likes)
          setdislikes(TempBlogData.dislikes)
      } catch (error) {
          console.error('Error fetching blog data:', error);
      }
  };

  

  const AddANewComment = async ()=>{
    const date = moment();
    const formattedDate = date.format('hh:mm:ss DD MMMM, YYYY');

    const newCommentInfo = {
      "commentText":commentInput,
      "userProfilePic":'userProfilePic',
      "userRef":'userRef',
      "username":'userName',
      "date": formattedDate
    }
    try {
      setComments([...comments,newCommentInfo])
      setcommentInput('')
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  const removeLike = async ()=>{
    try {
      const tempLikes = likes.filter(item=>item!='userRef')
      setlikes(tempLikes)
      
    } catch (error) {
      console.error('Error removing likes:', error);
    }
  }

  const addLike = async()=>{
    try {
      setlikes([...likes,'userRef'])
    } 
    catch (error) {
      console.error('Error adding likes:', error);
    }
  }

  const removeDislike = async()=>{
    try {
      const tempDislikes = dislikes.filter(item=>item!='userRef')
      setdislikes(tempDislikes)
      
    } catch (error) {
      console.error('Error removing dislikes:', error);
    }
  }

  const addDislike =  async()=>{
    try {
      setdislikes([...dislikes,'userRef'])
    } 
    catch (error) {
      console.error('Error adding dislikes:', error);
    }
  }

  const newLikeOrRemoveLike = ()=>{
    if(likes.includes('userRef')==true){  ///Remove the Like
      removeLike()
    }
    else{ ///new Like + remove dislike
      addLike()
      removeDislike()
    }
  }

  const newDislikeOrRemoveDislike = ()=>{
    if(dislikes.includes('userRef')==true){
      removeDislike()
    }
    else{
      addDislike()
      removeLike()
    }
  }
  
    


  const renderComment = (comment) => {
    return (
      <View key={comment.date+comment.username} style={styles.commentContainer}>
        <Image source={require('../../assets/1176433.png')} style={styles.commentAuthorImage} />
        <View style={styles.commentContent}>
          <Text style={styles.commentAuthor}>{comment.username}
          </Text>
          {/* <Text style={{fontSize:10,color:'gray',fontWeight:'bold',marginTop:-3,padding:0}}>{comment.date.slice(0,5)+' '+comment.date.slice(8)}</Text> */}
          <Text style={{fontSize:10,color:'gray',fontWeight:'bold',marginTop:-3,padding:0}}>{comment.time}</Text>
          
          <Text style={styles.commentText}>{comment.commentDescription}</Text>
        </View>
      </View>
    );
  };

  
    const [editorHeight, setEditorHeight] = useState(0);

  if (!postData) {
    return <View style={{height:500,display:'flex',justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator color={"#09D95D"} size={50} />
            <Text style={{textAlign:'center',verticalAlign:'middle',color:'#09D95D'}}>Loading blog...</Text>
          </View>;
  }
else{
  return (
    <ScrollView style={styles.container}  showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={require('../../assets/1176433.png')} style={styles.authorImage} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{postData.fullName}</Text>
          <Text style={styles.date}>{postData.postedDate}</Text>
        </View>
      </View>
      
      <View style={styles.blogContent}>
        <Text style={styles.title}>{postData.title}</Text>
        <View disabled={true} style={styles.richtexteditorContainer}>
          <RichEditor 
              useContainer={true}
              ref={editorRef}
              disabled={true}
              style={{flex: 1,backgroundColor:'transparent',borderRadius:8}}
              placeholder="Write your cool content here :)"
              initialContentHTML={postData.description}
              onHeightChange={(height) => setEditorHeight(height)}
            />
        </View>
        
        {/* <HTML source={{ html: blogData.description }} tagsStyles={{body:{minHeight:250},a:{textDecorationLine:'none',fontWeight:'600'}}} contentWidth={contentWidth}/> */}
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={newLikeOrRemoveLike} style={[styles.likeDislikeCommentBtn]}>
          {
            likes.includes("userRef")==true?
              <AntDesign name="like1" size={20} color="blue" />:
              <Feather name="thumbs-up" size={20} color="green" />
          }
          <Text style={styles.likeDislikeCount}>({likes.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={newDislikeOrRemoveDislike} style={[styles.likeDislikeCommentBtn]}>
          {
            dislikes.includes("userRef")==true?
            <AntDesign name="dislike1" size={20} color="#db190b" />:
            <Feather name="thumbs-down" size={20} color="red" />
          }
          <Text style={styles.likeDislikeCount}>({dislikes.length})</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.likeDislikeCommentBtn]}>
          <FontAwesome name="share" size={20} color="black" />
          {/* <Text style={styles.likeDislikeCount}>({comments.length})</Text> */}
        </TouchableOpacity>
      </View>
      
      <HRline/>
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsHeading}>Comments ({comments.length})</Text>
        {comments.map((comment) => renderComment(comment))}
      </View>
      <View style={styles.commentBox}>
        <Image source={require('../../assets/1176433.png')} style={styles.commentBoxImage} />
        <TextInput style={styles.commentInput} multiline={true} value={commentInput} onChangeText={(text)=>setcommentInput(text)} placeholder="Add a comment..." />
        <TouchableOpacity style={styles.commentSubmitButton} disabled={commentInput.trim().length==0} onPress={AddANewComment}>
          <Ionicons name="send" size={24} color="#09D95D" />
        </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
}
  
export default APostScreen;
  
  const styles = {
    container: {
      flex: 1,
      paddingHorizontal: 8,
      paddingTop:30,
      
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical:10,
    },
    authorImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 8,
    },
    authorInfo: {
      flex: 1,
    },
    authorName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    date: {
      fontSize: 12,
      color: 'gray',
    },
    blogContent: {
      marginBottom: 16,
      width:'100%',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 8,
      color:'#250994',
      borderTopColor:'#fff',
      borderWidth:1,
      paddingVertical:6,
      borderBottomColor:'#fff',
      borderRightColor:'transparent',
      borderLeftColor:'transparent',
      backgroundColor:'white',
      paddingHorizontal:5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    richtexteditorContainer:{
      height:'auto',
      minHeight:320,
      borderRadius:5,
      overflow:'hidden',
      backgroundColor:'white',
      borderWidth:1,
      borderColor:'#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical:8,
      justifyContent:'space-evenly',
    },
    likeDislikeCommentBtn:{
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth:1,
      width:'30%',
      justifyContent:'center',
      paddingVertical:5,
      borderRadius:20,
      backgroundColor:'white',
      borderColor:'#09D95D',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    likeDislikeCount: {
      marginLeft: 4,
      fontWeight:'bold',
      color:'#250994'
    },
    commentsContainer: {
      marginBottom: 10,
      minHeight:150
    },
    commentsHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color:'#1a1370'
    },
    commentContainer: {
      flexDirection: 'row',
      marginVertical: 4,
    },
    commentAuthorImage: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      marginRight: 8,
      marginTop:4
    },
    commentContent: {
      flex: 1,
    },
    commentAuthor: {
        color:'#250994',
        fontSize: 13,
        fontWeight: 'bold',
    },
    commentText: {
      fontSize: 14,
      color: '#16114f',
    },
    commentBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: 'lightgray',
      paddingTop: 8,
      paddingBottom:60,
    },
    commentBoxImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    commentInput: {
      flex: 1,
      minHeight: 40,
      maxHeight:100,
      borderWidth: 1,
      borderColor: '#09D95D',
      borderRadius: 20,
      padding: 8,
      marginLeft: 8,
      overflow:'hidden',
      paddingRight:40
    },
    commentSubmitButton: {
      padding: 8,
      textAlign:'center',
      borderRadius: 4,
      position:'absolute',
      right:0.5,
      top:10,
      overflow:'hidden',
      borderRadius:15,
      height:'95%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    commentSubmitButtonText: {
      alignSelf:'center',
      color: 'white',
      fontWeight: 'bold',
    },
  };
  