import React from 'react';
import {addUserCloudServices, removeUserCloudServices, getUserCloudServices} from '../server.js';

export default class User_Cloud_Services extends React.Component {

	//THE CODE BELOW IS BROKEN, WE NEED THE "CONNECTED" FIELDS TO BE POPULATED FROM DATABASE.JS, RIGHT NOW THESE VALUES ARE HARDCODED
	constructor(props){
		super(props);
		this.state = {
			"cloud_services": { }
		}
		getUserCloudServices('1', (data) => {this.setState({cloud_services: data});})
	}

	handleDriveButtonClick(clickEvent) {
		clickEvent.preventDefault();
		// 0 represents the 'main mouse button' -- typically a left click
		// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
		if (clickEvent.button === 0) {
			var callbackFunction = (updatedCloudServices) => {
				this.setState({cloud_services: updatedCloudServices});
			};

			if (this.didUserConnect("google_drive") === true) {
				// User clicked 'Delete Connection' button.
				removeUserCloudServices('1', "google_drive", callbackFunction);
				alert("Removed Connection!");
			} else {
				// User clicked 'Connect Now' button.
				addUserCloudServices('1', "google_drive", callbackFunction);
				alert("Added Connection!");
			}
		}
	}

	handleDropboxButtonClick(clickEvent) {
		clickEvent.preventDefault();
		// 0 represents the 'main mouse button' -- typically a left click
		// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
		if (clickEvent.button === 0) {
			var callbackFunction = (updatedCloudServices) => {
				this.setState({cloud_services: updatedCloudServices});
			};

			if (this.didUserConnect("dropbox") === true) {
				// User clicked 'Delete Connection' button.
				removeUserCloudServices('1', "dropbox", callbackFunction);
				alert("Removed Connection!");
			} else {
				// User clicked 'Connect Now' button.
				addUserCloudServices('1', "dropbox", callbackFunction);
				alert("Added Connection!");
			}
		}
	}

	didUserConnect(type) {
    // Look for a likeCounter entry with userId 4 -- which is the
    // current user.
		if(type === "dropbox") {
			if (this.state.cloud_services.dropbox === undefined){
				return false;
			}
			return true;
		}
		if(type === "google_drive") {
			if (this.state.cloud_services.google_drive === undefined){
				return false;
			}
			return true;
		}
		return false;
  }

	render() {
		var googleGlyph = "glyphicon glyphicon-ok";
		var dropGlyph = "glyphicon glyphicon-ok";
		var googleText = "Delete Connection";
		var dropText = "Delete Connection"
		if (this.state.cloud_services.dropbox === undefined){
			dropGlyph = "glyphicon glyphicon-remove";
			dropText = "Connect Now";
		}
		if (this.state.cloud_services.google_drive === undefined){
			googleGlyph = "glyphicon glyphicon-remove";
			googleText = "Connect Now";
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
						<div>
							<button type="button" onClick={(e) => this.handleDriveButtonClick(e)}>{googleText}</button>
						</div>
						<img src="img/dropbox_logo.png"/>
						<div className="cloudservices-alignment">
							<span className={dropGlyph}></span>
						</div>
						<div>
							<button type="button" onClick={(e) => this.handleDropboxButtonClick(e)}>{dropText}</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
