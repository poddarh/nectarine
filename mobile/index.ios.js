/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';

export default class mobile extends Component {
  render(){
		return(
        <div className="container">
          <div className="col-xs-12">
            <div className="row text-center title">
              Select a Cloud Service
            </div>

            <div className="row text-center">
							{(function(bool) {
								if(bool)
									return <Link to={"/files_and_folders/Google Drive"}><img src="img/googledrive_logo.png"/></Link>
							})(this.state.cloud_services.google_drive !== undefined)}
							{(function(bool) {
								if(bool)
									return <Link to="/files_and_folders/Dropbox"><img src="img/dropbox_logo.png"/></Link>
							})(this.state.cloud_services.dropbox !== undefined)}
            </div>

            <div className="row text-center title">
              Alternatively, enter the URL for the file you wish to share
            </div>

            <div className="row search">
              <input type="text" className="form-control" placeholder="File URL" id="url-input"></input>
            </div>

            <div className="row text-center">
              <button className=".btn-primary .btn-lg share" onClick={() => this.send(document.getElementById("url-input").value)}>Share!</button>
            </div>
          </div>
        </div>
		)
	}
}
AppRegistry.registerComponent('mobile', () => mobile);
