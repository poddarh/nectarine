import React from 'react';
import {GetURLParameter} from '../server'

export default class MobileFilesAndFolders extends React.Component {
	render() {
		return (
      <div className="container">
        <div className="col-xs-12">
          <div className="row text-center title">
            {'Showing Files and Folders from ' + this.props.params.service}
          </div>

          <div className="row text-center regular-text">
            Account Name: nectarine@example.com
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
