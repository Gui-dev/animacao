import React from 'react'
import {
  View,
  Text,
  Image,
  Alert,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from './style'

const User = ( { user, onPress } ) => {

  return (
    <TouchableWithoutFeedback onPress={ onPress }>
      <View style={styles.userContainer}>
        <Image style={styles.thumbnail} source={{ uri: user.thumbnail }} />

        <View style={[styles.infoContainer, { backgroundColor: user.color }]}>
          <View style={styles.bioContainer}>
            <Text style={styles.name}>{user.name.toUpperCase()}</Text>
            <Text style={styles.description}>{user.description}</Text>
          </View>
          <View style={styles.likesContainer}>
            <Icon name="heart" size={12} color="#FFF" />
            <Text style={styles.likes}>{user.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default User;