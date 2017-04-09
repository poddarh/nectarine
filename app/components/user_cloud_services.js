import React from 'react';
import {addUserCloudServices, removeUserCloudServices, getUserCloudServices, getUserData} from '../server.js';

export default class User_Cloud_Services extends React.Component {

//THE CODE BELOW IS BROKEN, WE NEED THE "CONNECTED" FIELDS TO BE POPULATED FROM DATABASE.JS, RIGHT NOW THESE VALUES ARE HARDCODED
	constructor(props){
		super(props);
		this.state = {
			"cloud_services": {
        "dropbox": {
          "connected": false,
          "token": 0,
          "expiry": 0
        },
        "google_drive": {
          "connected": true,
          "token": 0
        }
      }
		}
		getUserCloudServices('1', (data) => {this.setState({data: data});})
	}

	render() {
		var googleGlyph = "glyphicon glyphicon-remove";
		var dropGlyph = "glyphicon glyphicon-remove";
		if (this.state.cloud_services.dropbox.connected){
			dropGlyph = "glyphicon glyphicon-ok";
		}
		if (this.state.cloud_services.google_drive.connected){
			googleGlyph = "glyphicon glyphicon-ok";
		}
		return(
			<div className="container">
				<div className="col-xs-12">
					<div className="row text-center title">
						Select a Cloud Service
					</div>
					<div className="row text-center">
						<img src="img/googledrive_logo.png"/>
						<div className="cloudservices-alignment">
							<span className={googleGlyph}></span>
						</div>
						<img src="img/dropbox_logo.png"/>
						<div className="cloudservices-alignment">
							<span className={dropGlyph}></span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
