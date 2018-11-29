import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'

export function getDailyReminderValue() {
  return {
    today: "Nenhum paciente agendado hoje!"
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
})

export function getMetricMetaInfo(metric) {
  const info = {
    run: {
      displayName: 'Maria Jose',
      max: 100000000,
      unit: 'Horário',
      step: 900000,
      type: 'steppers',
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor: blue}]}>
            <MaterialIcons
              name='face'
              color={white}
              size={35}
            />
          </View>
        )
      }
    }
  }
  return typeof metric === 'undefined'
    ? info
    : info[metric]
}

export function newMetricMetaInfo() {
  const teste = {
      displayName: 'Maria Jose',
      max: 100000000,
      unit: 'Horário',
      step: 900000,
      type: 'steppers',
      getIcon() {
        return (
          <View style={[styles.iconContainer, {backgroundColor: blue}]}>
            <MaterialIcons
              name='face'
              color={white}
              size={35}
            />
          </View>
        )
      }
    }
  
  return teste
}

export function isBetween(num, x, y) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}


export function timeToString(time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}