import React, { useEffect, useState } from 'react'
import { Animated, SafeAreaView, PanResponder } from 'react-native'

import styles from './style'

const Home = () => {

  const [ ball, setBall ] = useState( new Animated.ValueXY( { x: 0, y: 0 } ) )
  const [ panResponder, setPanResponder ] = useState( {} )

  useEffect( () => {   
    setPanResponder( PanResponder.create( {
      onMoveShouldSetPanResponder: ( e, gestureState ) => true,

      onPanResponderGrant: ( e, gestureState ) => {
        ball.setOffset( {
          x: ball.x._value,
          y: ball.y._value
        } )
        ball.setValue( { x: 0, y: 0 } )
      },

      onPanResponderMove: Animated.event( [ null, {
        dx: ball.x,
        dy: ball.y
      } ], {
        listener: ( e, gestureState ) => {
          console.log( gestureState )
        }
      } ),

      onPanResponderRelease: () => {
        ball.flattenOffset()
      }
    } ) ) 
  }, [] ) 

  return (
    <SafeAreaView style={ styles.container }>
      <Animated.View 
        { ...panResponder.panHandlers } 
        style={ [ styles.ball, {
          transform: [
            { translateX: ball.x },
            { translateY: ball.y },
          ]
        } ] }
      >
      </Animated.View>
    </SafeAreaView>
  )
}

export default Home