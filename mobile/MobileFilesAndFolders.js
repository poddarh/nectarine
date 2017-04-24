import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, TextInput, Navigator, TouchableHighlight } from 'react-native';


var styles = require('./style');
var QRCodeScreen = require('./QRCodeScreen');

class MobileFilesAndFolders extends Component {

  constructor(props){
    super(props);
    this.pressButton = this.pressButton.bind(this);
  }

  pressButton(){
    this.props.navigator.push({component: QRCodeScreen});
  }

  render() {
    return (
      <ScrollView style={styles.body}>
        <TouchableHighlight onPress={this.pressButton}>
          <Text>Touch Here for Camera!</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}
module.exports = MobileFilesAndFolders
