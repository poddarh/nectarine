import React from 'react';
import { sendXHR } from '../server'
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
              <button className=".btn-primary share more-files">
                <span className="glyphicon glyphicon-folder-open"></span>
                Folder1
              </button>
              <button className=".btn-primary share more-files">
                <span className="glyphicon glyphicon-folder-open"></span>
                Folder2
              </button>
              <button className=".btn-primary share more-files">
                <span className="glyphicon glyphicon-folder-open"></span>
                Folder3
              </button>
            </div>
            <div className="col-xs-2 text-center"></div>
          </div>
          <div className="row files">
            <div className="col-xs-2 text-center"></div>
            <div className="col-xs-8 text-center">
              <button className=".btn-primary share more-files">
                <span className="glyphicon glyphicon-open-file"></span>
                File1
              </button>
              <button className=".btn-primary share more-files">
                <span className="glyphicon glyphicon-open-file"></span>
                File2
              </button>
              <button className=".btn-primary share more-files">
                <span className="glyphicon glyphicon-open-file"></span>
                  File3
              </button>
            </div>
            <div className="col-xs-2 text-center"></div>
          </div>
          <div className="row text-center regular-text">
            ...etc, etc, etc
          </div>
        </div>
      </div>
		)
	}
}
