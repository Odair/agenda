import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DateHeader from './DateHeader'
import { getMetricMetaInfo } from '../utils/helpers'
import { gray } from '../utils/colors'

msToTime = (duration) => {
  var minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  return hours + ":" + minutes ;
}

 export default function MetricCard ({ date, metrics }) {
  return (
    <View>
      {date && <DateHeader date={date} />}
      {Object.keys(metrics).map((metric) => {
        const { getIcon, displayName, unit, backgroundColor } = getMetricMetaInfo(metric)
        return (
          <View style={styles.metric} key={metric}>
            {getIcon()}
            <View>
              <Text style={{fontSize: 20}}>
                {displayName}
              </Text>
              <Text style={{fontSize: 16, color: gray}}>
              {unit} {this.msToTime(metrics[metric])} 
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}
 const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12
  },
}) 