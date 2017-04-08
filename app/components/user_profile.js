import React from 'react';

export default class User_Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//input fields
			newName: "",
			newEmail: "",
			currentPassword: "",
			newPassword: "",
			newPasswordCheck: "",
			//current user settings
			//TODO pull from database
			userName: "userName",
			userEmail: "userEmail",
			userPassword: "password",
			userImage: "img/profile-temp.jpg",
			//error message
			message: ""
		}
	}

	handleSaveChanges(e) {
		e.preventDefault();
		var changeName = this.state.newName.trim();
		var changeEmail = this.state.newEmail.trim();
		if (changeName !== "") {
			//TODO function to set user name > changeName
			this.setState({newName: "", userName: changeName});
		}
		if (changeEmail !== "") {
			//TODO function to set user email > changeEmail
			this.setState({newEmail: "", userEmail: changeEmail});
		}
	}

	handleChangePassword(e) {
		e.preventDefault();
		var current = this.state.currentPassword.trim();
		//does entered current password match user's old password
		if (current == this.state.userPassword) {
			var changePassword = this.state.newPassword.trim();
			var checkPassword = this.state.newPasswordCheck.trim();
			//does entered new password match confirmed password
			if (changePassword == "" || checkPassword == "") {
				this.setState({currentPassword: "", newPassword: "", newPasswordCheck: "", message: "Password Unchanged: Empty field."});
			}
			else if (changePassword == checkPassword) {
				//TODO fuction to set user password > changePassword
				this.setState({currentPassword: "", newPassword: "", newPasswordCheck: "", message: "Password Changed"});
			}
			else {
				this.setState({currentPassword: "", newPassword: "", newPasswordCheck: "", message: "Password Unchanged: Did not match new password."});
			}
		}
		else {
			this.setState({currentPassword: "", newPassword: "", newPasswordCheck: "", message: "Password Unchanged: Did not match current password."});
		}
	}

	handleChange(key, e) {
		e.preventDefault();
		var state = {}
		state[key] = e.target.value;
		this.setState(state);
	}

	render() {
		return (
				<div className="row">
					<div className="col-md-4 col-md-offset-1">
						Name
						<div className="form-group">
							<input type="text" className="form-control" placeholder={this.state.userName} value={this.state.newName} onChange={(e) => this.handleChange("newName", e)}/>
						</div>
						Email Address
						<div className="form-group">
							<input type="text" className="form-control" placeholder={this.state.userEmail} value={this.state.newEmail} onChange={(e) => this.handleChange("newEmail", e)}/>
						</div>
						<button className="btn btn-default center-block" type="button" onClick={(e) => this.handleSaveChanges(e)}>Save Changes</button>
						<br></br>
						Current Password
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.currentPassword} onChange={(e) => this.handleChange("currentPassword", e)}/>
						</div>
						New Password
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.newPassword} onChange={(e) => this.handleChange("newPassword", e)}/>
						</div>
						Confirm New Password
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.newPasswordCheck} onChange={(e) => this.handleChange("newPasswordCheck", e)}/>
						</div>
						<button className="btn btn-default center-block" type="button" onClick={(e) => this.handleChangePassword(e)}>Change Password</button>
						<br></br>
						{this.state.message}
					</div>
					<div className="col-md-3 col-md-offset-2">
						<img src={this.state.userImage} className="img-responsive center-block" width="95%"/>
						<br></br>
						<button className="btn btn-default center-block" type="button">Upload New Image</button>
					</div>
				</div>
		)
	}
}
