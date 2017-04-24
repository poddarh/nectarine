/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, NavigatorIOS } from 'react-native';

var styles = require('./style');
var MobileCloudServices = require('./MobileCloudServices.js')

export default class mobile extends Component {
    renderScene ( route, navigator ) {
      return <route.component navigator={navigator} serviceName={route.serviceName}/>
    }

  render() {
     return (
       <Navigator
         style={styles.container}
         initialRoute={{component: MobileCloudServices }}
         renderScene={this.renderScene.bind(this)}
         />
     );
   }
}
AppRegistry.registerComponent('mobile', () => mobile);
