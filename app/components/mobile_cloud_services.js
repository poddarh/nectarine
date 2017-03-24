import React from 'react';
import Body from './body.js';

export default class Home extends React.Component {

	render() {
		return (
      <Body>
      <div class="container">
        <div class="col-xs-12">
          <div class="row text-center title">
            Select a Cloud Service
          </div>
          <div class="row text-center">
            <img src="img/googledrive_logo.png"/>
            <img src="img/dropbox_logo.png"/>
          </div>
          <div class="row text-center title">
            Alternatively, enter the URL for the file you wish to share
          </div>
          <div class="row search">
            <input type="text" class="form-control" placeholder="File URL"></input>
          </div>
          <div class="row text-center">
            <button class=".btn-primary .btn-lg share">Share!</button>
          </div>
        </div>
      </div>
      </Body>
		)
	}
}
