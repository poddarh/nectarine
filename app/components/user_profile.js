import React from 'react';
import Body from './body.js';

export default class User_Profile extends React.Component {

	render() {
		return (
			<Body>
				<div className="row">
					<div className="col-md-4 col-md-offset-1">
						Name
						<div className="form-group">
							<input type="text" className="form-control" id="Name"/>
						</div>
						Email Address
						<div className="form-group">
							<input type="text" className="form-control" id="Email"/>
						</div>
						<button className="btn btn-default center-block" type="button">Save Changes</button>
						<br></br>
						Current Password
						<div className="form-group">
							<input type="text" className="form-control" id="CurrentPassword"/>
						</div>
						New Password
						<div className="form-group">
							<input type="text" className="form-control" id="NewPassword"/>
						</div>
						Confirm New Password
						<div className="form-group">
							<input type="text" className="form-control" id="ConfirmPassword"/>
						</div>
						<button className="btn btn-default center-block" type="button">Change Password</button>
					</div>
					<div className="col-md-3 col-md-offset-2">
						<img src="img/profile-temp.jpg" className="img-responsive center-block" width="95%"/>
						<br></br>
						<button className="btn btn-default center-block" type="button">Upload New Image</button>
					</div>
				</div>
			</Body>
		)
	}
}
