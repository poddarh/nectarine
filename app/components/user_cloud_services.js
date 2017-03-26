import React from 'react';
import Body from './body.js';

export default class User_Cloud_Services extends React.Component {

	render() {
    return(
      <Body>
        <div className="container">
          <div className="col-xs-12">
            <div className="row text-center title">
              Select a Cloud Service
            </div>

            <div className="row text-center">
              <img src="img/googledrive_logo.png"/>
              <img src="img/dropbox_logo.png"/>
            </div>

            <div className="row text-center title">
              Alternatively, enter the URL for the file you wish to share
            </div>

            <div className="row search">
              <input type="text" className="form-control" placeholder="File URL"></input>
            </div>

            <div className="row text-center">
              <button className=".btn-primary .btn-lg share">Share!</button>
            </div>
          </div>
        </div>

      </Body>

    )
  }
}
