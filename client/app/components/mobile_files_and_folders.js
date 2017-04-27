import React from 'react';
import { getUserData, sendXHR } from '../server'

export default class MobileFilesAndFolders extends React.Component {

	constructor(props){
		super(props);
		this.state = { "user": { }, data: { files: [], path: "" } };
	}

	parseServiceName(){
		if(this.props.params.service === "google_drive"){ return "Google Drive" }
		else { return "Dropbox" }
	}

	componentWillMount(){
    sendXHR('GET', '/user/cloudservices/' + this.props.serviceName + '/files', undefined, (xhr) => {
      var data = JSON.parse(xhr.responseText);
      this.setState({ data: data });
    });
    getUserData('1', (data) => {this.setState({user: data});});
	}

	render() {
		return (
      <div className="container">
        <div className="col-xs-12">
          <div className="row text-center title">
            {'Showing Files and Folders from ' + this.parseServiceName()}
          </div>

          <div className="row files">
            <div className="col-xs-2 text-center"></div>
            <div className="col-xs-8 text-center">
							{this.state.data.files.map((file) => {
								if(file.type === "folder"){
									return <button className=".btn-primary share more-files"><span className="glyphicon glyphicon-folder-open"></span>{file.name}</button>
									}
							})}
            </div>
            <div className="col-xs-2 text-center"></div>
          </div>
          <div className="row files">
            <div className="col-xs-2 text-center"></div>
            <div className="col-xs-8 text-center">
							{this.state.data.files.map((file) => {
								if(file.type === "file"){
									return <button className=".btn-primary share more-files"><span className="glyphicon glyphicon-folder-open"></span>{file.name}</button>
								}
							})}
            </div>
            <div className="col-xs-2 text-center"></div>
          </div>
        </div>
      </div>
		)
	}
}
