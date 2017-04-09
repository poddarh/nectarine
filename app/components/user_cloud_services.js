import React from 'react';

export default class User_Cloud_Services extends React.Component {

	render() {
    return(
        <div className="container">
          <div className="col-xs-12">
            <div className="row text-center title">
              Select a Cloud Service
            </div>

            <div className="row text-center">
              <img src="img/googledrive_logo.png"/>
              <img src="img/dropbox_logo.png"/>
            </div>
						<div className="row text-center">
							<span className="glyphicon glyphicon-ok glyphicon-lg"></span>
							<span className="glyphicon glyphicon-ok glyphicon-lg"></span>
						</div>
          </div>
        </div>
    )
  }
}
