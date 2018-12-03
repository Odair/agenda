import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native'
import {
  getMetricMetaInfo,
  newMetricMetaInfo,
  timeToString,
  getDailyReminderValue
} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons, Entypo } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { purple, white } from '../utils/colors'
import { AddTodoButton } from './AddTodoButton'

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

function AdicionarHorario({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.btnAdicionar : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}><Entypo name='plus' size={30} color={white}/></Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    pacientes: []
  }

  componentDidMount(){

    const pacientes  = getMetricMetaInfo(); 
    
    this.setState({ pacientes });

  }

  increment = (paciente) => {
    let pacientes = this.state.pacientes;
    
    pacientes.forEach((item) =>{
      if(item._id == paciente._id){
        item.horario = item.horario + 900000
      }

    })

    this.setState((state) => {
      return {
        ...state,
        pacientes
      }
    })
  }
  decrement = (paciente) => {
    
    this.setState((state) => {

    let pacientes = this.state.pacientes;

    pacientes.forEach((item) =>{
      if(item._id == paciente._id){
        item.horario = item.horario - 900000
      }

    })
      return {
        ...state,
        pacientes,
      }
    })
  }
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state
    this.props.dispatch(addEntry({
      [key]: entry
    }))
    this.setState(() => ({ run: 0 }))
    // Navigate to home
    submitEntry({ key, entry })
    // Clear local notification

    
  }

  reset = () => {
    const key = timeToString()
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))
    // Route to Home
    submitEntry({ key, entry })
  }

  adicionaHorario = () => { 
    const novoPaciente = newMetricMetaInfo();

    console.log("teste");
  }

   

  render() {


    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
            size={100}
          />
          <Text>You already logged your information for today.</Text>
          <TextButton style={{ padding: 10 }} onPress={this.reset}>
            Reset
            </TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()} />
         
        {this.state.pacientes.map(paciente => {
          const { getIcon, ...rest } = paciente
          const value = paciente.horario
          return (
            <View key={paciente._id} style={styles.row}>
              {getIcon()}
              { <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(paciente)}
                  onDecrement={() => this.decrement(paciente)}
                  {...rest}
                />}

            </View>
          )
        })}
        <AdicionarHorario onPress={this.adicionaHorario()} />
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  btnAdicionar: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: purple,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})


function mapStateToProps(state) {
  const key = timeToString()
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}
export default connect(
  mapStateToProps
)(AddEntry)

