import React from 'react';
import {getUserCloudServices} from '../server';
import Link from 'react-router';

export default class MobileCloudServices extends React.Component {

	constructor(props){
		super(props);
		this.state = { "cloud_services": { } }
		getUserCloudServices('1', (data) => {this.setState({cloud_services: data});})
	}


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
									return <Link to={"/files_and_folders/google_drive"}><img src="img/googledrive_logo.png"/></Link>
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
              <input type="text" className="form-control" placeholder="File URL"></input>
            </div>

            <div className="row text-center">
              <button className=".btn-primary .btn-lg share">Share!</button>
            </div>
          </div>
        </div>
		)
	}
}
