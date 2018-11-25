import React from 'react'
import { View, Slider, StyleSheet, Text, Fab } from 'react-native'

export default function AddTodoButton({ onPress }) {
    return (
    <Fab
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: COLORS.primary }}
        position="bottomRight"
        onPress={onPress}
    >
        <Icon name="add" />
    </Fab>
  )}