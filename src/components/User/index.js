import React, { useEffect, useState } from 'react'
import {
  Animated,
  View,
  Text,
  Image,
  Alert,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from './style'

const User = ( { user, onPress } ) => {

  const { width } = Dimensions.get( 'window' )
  const [ panResponser, setPanResponder ] = useState( {} )
  const [ offset, setOffset ] = useState( new Animated.ValueXY( { x: 0, y: 50 } ) )
  const [ opacity, setOpacity ] = useState( new Animated.Value( 0 ) )

  useEffect( () => {
    setPanResponder( PanResponder.create( {
      
      onPanResponderTerminationRequest: () => false,

      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event( [ null, {
        dx: offset.x,
      } ] ),

      onPanResponderRelease: () => {

        if( offset.x._value < -200 ) {
          Alert.alert( 'Deletar', 'Post deletado' )
        }

        Animated.spring( offset.x, {
          toValue: 0,
          bounciness: 30,
        } ).start()
      },

      onPanResponderTerminate: () => {
        Animated.spring( offset.x, {
          toValue: 0,
          bounciness: 10,
        } ).start()
      },
    } ) )
  }, [] )

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
    <Animated.View 
      { ...panResponser.panHandlers }
      style={ [
        { transform: [ 
          ...offset.getTranslateTransform(),
          { rotateZ: offset.x.interpolate( {
            inputRange: [ width * -1, width ],
            outputRange: [ '-50deg', '50deg' ],
          } ) } 
        ] },
        { opacity }
      ] }
    >
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