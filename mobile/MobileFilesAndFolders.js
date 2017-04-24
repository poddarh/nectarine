import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, TextInput, Navigator, TouchableHighlight } from 'react-native';
import { sendXHR } from './server'

var styles = require('./style');
var QRCodeScreen = require('./QRCodeScreen');

class MobileFilesAndFolders extends Component {

  constructor(props){
    super(props);
    this.pressButton = this.pressButton.bind(this);
    this.state = { data: { files: [], path: "" } };
  }

  componentWillMount(){
    sendXHR('GET', '/user/cloudservices/google_drive/files', undefined, (xhr) => {
      var data = JSON.parse(xhr.responseText);
      this.setState({ data: data });
    });
  }

  pressButton(){
    this.props.navigator.push({component: QRCodeScreen});
  }

  render() {
    return (
      <ScrollView style={styles.body}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Showing files and folders</Text>
          <Text style={styles.title}>from {this.props.serviceName}</Text>
          <Text>{JSON.stringify(this.state.data)}</Text>
          <TouchableHighlight onPress={this.pressButton}>
            <Text>Touch Here for Camera!</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}
module.exports = MobileFilesAndFolders
