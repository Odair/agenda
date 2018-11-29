import React from 'react'
import { View, Platform } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { createBottomTabNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const Tabs = createBottomTabNavigator(
  {
    Pacientes: History,
    Adicionar: AddEntry,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return routeName === 'Pacientes' ? (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ) : (
            <FontAwesome name="plus-square" size={30} color={tintColor} />
          );
      },
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <Tabs />
        </View>
      </Provider>
    );
  }
}

