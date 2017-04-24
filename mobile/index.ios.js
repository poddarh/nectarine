/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, TextInput, Navigator, TouchableHighlight } from 'react-native';

var styles = require('./style');

export default class mobile extends Component {
 render() {
   const routes = [
   {title: 'First Scene', index: 0},
   {title: 'Second Scene', index: 1},
 ];
 return (
   <Navigator
     initialRoute={routes[0]}
     initialRouteStack={routes}
     renderScene={(route, navigator) =>
       <TouchableHighlight onPress={() => {
         if (route.index === 0) {
           navigator.push(routes[1]);
         } else {
           navigator.pop();
         }
       }}>
       <Text>Hello {route.title}!</Text>
       </TouchableHighlight>
     }
     style={{padding: 100}}
   />
 );
  };
}
AppRegistry.registerComponent('mobile', () => mobile);

class MobileCloudServices extends Component {
  render(){
    return (
      <ScrollView style={styles.body}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Select a Cloud Service</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Image source={require('./assets/googledrive_logo.png')} style={styles.img}/>
            <Image source={require('./assets/dropbox_logo.png')} style={styles.img}/>
          </View>
        </View>
      </ScrollView>
    )
  }
}

class MobileFilesAndFolders extends Component {
  render() {
    return (
      <ScrollView style={styles.body}>
      </ScrollView>
    )
  }
}
