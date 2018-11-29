import React from 'react'
import { Platform, View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { purple, gray, white } from '../utils/colors'
import { Dropdown } from 'react-native-material-dropdown';

msToTime = (duration) => {
  var minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  return hours + ":" + minutes ;
}

export default function UdaciSteppers({ max, unit, step, value, onIncrement, onDecrement }) {

  return (
    <View style={[styles.row, { justifyContent: 'space-between' }]}>
      {Platform.OS === 'ios'
        ?
        <View>
          <View style={{ flexDirection: 'row', width:100 }}>
            
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[styles.iosBtn, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
              onPress={onDecrement}>
              <Entypo name='minus' size={30} color={purple} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iosBtn, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0 }]}
              onPress={onIncrement}>
              <Entypo name='plus' size={30} color={purple} />
            </TouchableOpacity>
          </View>
        </View>
        : <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.androidBtn} onPress={onDecrement}>
            <FontAwesome name='minus' size={30} color={white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.androidBtn} onPress={onIncrement}>
            <FontAwesome name='plus' size={30} color={white} />
          </TouchableOpacity>
        </View>}
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>{this.msToTime(value)}</Text>
        <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropDown:{
    width: 100
  }
}) 