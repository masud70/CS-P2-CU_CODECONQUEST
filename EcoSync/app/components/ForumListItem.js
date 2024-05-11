import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

const ForumListItem = ({post}) => {
    const router = useRouter()
    const [postDescription, setpostDescription] = useState('')

    useEffect(() => {
        if(post.description.length>0) {
          setpostDescription(post.description)
        }
    }, [post])


    const  truncateDescription = (description) =>{
      // Remove HTML tags from the description
      const cleanDescription = description.replace(/<[^>]*>/g, '');
    
      // Truncate the description to at most 150 characters
      const truncatedDescription = cleanDescription.length > 150 ? cleanDescription.substring(0, 150) + '...' : cleanDescription;
    
      return truncatedDescription;
    }


  return(
    <Pressable onPress={()=>{router.push({pathname:'components/ApostScreen', params:{ post: JSON.stringify(post)}})}} style={styles.blogContainer}>
      <Image source={require('../../assets/1176433.png')} style={styles.profilePic} />
      <View style={styles.blogContent}>
        <Text style={styles.userName}>{post.fullName}</Text>
        <Text style={{fontSize:10}}>{post.postedDate}</Text>
        <Text style={styles.title}>{post.title}</Text>
        <Text>{truncateDescription(postDescription)}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.likeDislikeContainer}>
            <TouchableOpacity disabled style={styles.iconContainer}>
              <Ionicons name="thumbs-up-outline" size={20} color="green" />
              <Text style={styles.countText}>{post.likes.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled style={styles.iconContainer}>
              <Ionicons name="thumbs-down-outline" size={20} color="red" />
              <Text style={styles.countText}>{post.dislikes.length}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.commentsContainer}>
            <Ionicons name="chatbubble-outline" size={20} color="#999" />
            <Text style={styles.countText}>{post.comments.length}</Text>
          </View>
        </View>
      </View>
    </Pressable>
)};

const styles = {
  blogContainer: {
    flexDirection: 'row',
    width:'98%',
    margin:'auto',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  blogContent: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color:'#1a2373'
  },
  title: {
    fontSize: 16,
    color:'#9c0c05',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeDislikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    marginLeft: 5,
    fontSize: 14,
  },
};

export default ForumListItem;