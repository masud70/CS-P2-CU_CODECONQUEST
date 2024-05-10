import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

const ForumListItem = ({navigation}) => {
    const router = useRouter()

  return(
    <Pressable onPress={()=>{router.push('components/ApostScreen')}} style={styles.blogContainer}>
      <Image source={require('../../assets/1176433.png')} style={styles.profilePic} />
      <View style={styles.blogContent}>
        <Text style={styles.userName}>Masud Mazumdar</Text>
        <Text style={{fontSize:10}}>15-July, 2024</Text>
        <Text style={styles.title}>A forum title</Text>
        <View style={styles.infoContainer}>
          <View style={styles.likeDislikeContainer}>
            <TouchableOpacity disabled style={styles.iconContainer}>
              <Ionicons name="thumbs-up-outline" size={20} color="green" />
              <Text style={styles.countText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled style={styles.iconContainer}>
              <Ionicons name="thumbs-down-outline" size={20} color="red" />
              <Text style={styles.countText}>1</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.commentsContainer}>
            <Ionicons name="chatbubble-outline" size={20} color="#999" />
            <Text style={styles.countText}>2</Text>
          </View>
        </View>
      </View>
    </Pressable>
)};

const styles = {
  blogContainer: {
    flexDirection: 'row',
    width:'100%',
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