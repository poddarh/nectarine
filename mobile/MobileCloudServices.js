import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, TextInput, Navigator, TouchableHighlight } from 'react-native';

var styles = require('./style');
var MobileFilesAndFolders = require('./MobileFilesAndFolders');

export class MobileCloudServices extends Component {

  constructor(props){
    super(props);
    this.pressButton = this.pressButton.bind(this);
  }

  pressButton(service){
    this.props.navigator.push({component: MobileFilesAndFolders, serviceName: service});
  }

  render(){
    return (
      <ScrollView style={styles.body}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Select a Cloud Service</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableHighlight onPress={() => this.pressButton("Google Drive")}>
              <Image source={require('./assets/googledrive_logo.png')} style={styles.img}/>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.pressButton("Dropbox")}>
              <Image source={require('./assets/dropbox_logo.png')} style={styles.img}/>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    )
  }
}
module.exports = MobileCloudServices
