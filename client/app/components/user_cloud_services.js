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

	windowpop(url, width, height) {
    var leftPosition, topPosition;
    //Allow for borders.
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    //Open the window.
    return window.open(url, "Window2", "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
	}

	handleDriveButtonClick(clickEvent) {
		clickEvent.preventDefault();
		// 0 represents the 'main mouse button' -- typically a left click
		// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
		if (clickEvent.button === 0) {
			if (this.didUserConnect("google_drive") === true) {
				// User clicked 'Delete Connection' button.
				removeUserCloudServices('1', "google_drive", (updatedCloudServices) => {
					this.setState({cloud_services: updatedCloudServices});
					alert("Removed Connection!");
				});
			} else {
				// User clicked 'Connect Now' button.
				var url = "/user/cloudservices/google_drive/oauth";
				var new_win = this.windowpop(url, 500, 600);
				var is_in_callback = false;

				var pollTimer = window.setInterval(function() {
					if (new_win.closed !== false) { // !== is required for compatibility with Opera
						window.clearInterval(pollTimer);
						if (is_in_callback === false) {
							alert("Error Adding Connection!");
						}
					}
				}, 200);

				window.popup_callback = (key) => {
					is_in_callback = true;
					let authDetails = {
						"key": key
					}
					addUserCloudServices('1', "google_drive", authDetails, (updatedCloudServices) => {
						this.setState({cloud_services: updatedCloudServices});
						alert("Added Connection!");
					});
				}
			}
		}
	}

	handleDropboxButtonClick(clickEvent) {
		clickEvent.preventDefault();
		// 0 represents the 'main mouse button' -- typically a left click
		// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
		if (clickEvent.button === 0) {
			if (this.didUserConnect("dropbox") === true) {
				// User clicked 'Delete Connection' button.
				removeUserCloudServices('1', "dropbox", (updatedCloudServices) => {
					this.setState({cloud_services: updatedCloudServices});
					alert("Removed Connection!");
				});
			} else {
				// User clicked 'Connect Now' button.
				var url = "/user/cloudservices/dropbox/oauth";
				var new_win = this.windowpop(url, 500, 600);
				var is_in_callback = false;

				var pollTimer = window.setInterval(function() {
					if (new_win.closed !== false) { // !== is required for compatibility with Opera
						window.clearInterval(pollTimer);
						if (is_in_callback === false) {
							alert("Error Adding Connection!");
						}
					}
				}, 200);

				window.popup_callback = (key) => {
					is_in_callback = true;
					let authDetails = {
						"key": key
					}
					addUserCloudServices('1', "dropbox", authDetails, (updatedCloudServices) => {
						this.setState({cloud_services: updatedCloudServices});
						alert("Added Connection!");
					});
				}
			}
		}
	}

	didUserConnect(type) {
    // Look for a likeCounter entry with userId 4 -- which is the
    // current user.
		return this.state.cloud_services[type] !== undefined;
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
						<div className="col-xs-5">
							<div className="pull-right">
								<img src="img/googledrive_logo.png"/>
								<div className="cloudservices-alignment">
									<span className={googleGlyph}></span>
								</div>
								<div>
									<button type="button" onClick={(e) => this.handleDriveButtonClick(e)}>{googleText}</button>
								</div>
							</div>
						</div>
						<div className="col-xs-2"></div>
						<div className="col-xs-5">
							<div className="pull-left">
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
				</div>
			</div>
		)
	}
}
