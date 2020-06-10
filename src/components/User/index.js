import React, { useEffect, useState } from 'react'
import {
  Animated,
  View,
  Text,
  Image,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from './style'

const User = ( { user, onPress } ) => {

  const [ offset, setOffset ] = useState( new Animated.ValueXY( { x: 0, y: 50 } ) )
  const [ opacity, setOpacity ] = useState( new Animated.Value( 0 ) )

  useEffect( () => {

    Animated.parallel( [

      Animated.spring( offset.y, {
        toValue: 0,
        speed: 5,
        bounciness: 20
      } ),

      Animated.timing( opacity, {
        toValue: 1,
        duration: 500
      } )

    ] ).start()

    
  }, [] )

  return (
    <Animated.View style={ [
      { transform: [ ...offset.getTranslateTransform() ] },
      { opacity }
    ] }>
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
    </Animated.View>
  )
}

export default User;