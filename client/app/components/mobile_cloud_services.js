import React from 'react';
import {getUserCloudServices} from '../server';
import {Link} from 'react-router';

export default class MobileCloudServices extends React.Component {

	constructor(props){
		super(props);
		this.port = location.port ? parseInt(location.port) : (location.protocol == "https:" ? 443 : 80);
		this.host = location.hostname;
		this.state = { "cloud_services": { } }
		getUserCloudServices('1', (data) => {this.setState({cloud_services: data});})
	}

	send(url) {
		// var peer = new Peer({host: this.host, port: this.port, path: '/api'});
		// peer.on('open', function() {
		// 	var conn = peer.connect(prompt("Enter Peer ID:"));
		// 	conn.on('open', function(){
		// 		conn.send({url: url});
		// 	});
		// });
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
