import {getUserData, updateUserData} from '../server.js';
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
			imagePath: "",
			//current user settings
			data: [],
			//error message
			message: ""
		}
		getUserData('1', (data) => {this.setState({data: data});});
	}

	handleSaveChanges(e) {
		e.preventDefault();
		var changeName = this.state.newName.trim();
		var changeEmail = this.state.newEmail.trim();
		//something is being changed
		if (changeName !== "" || changeEmail !== "") {
			var newData = this.state.data;
			//new name to update
			if (changeName !== "") {
				newData.name = changeName;
				this.setState({newName: ""});
			}
			//new email to update
			if (changeEmail !== "") {
				newData.email = changeEmail;
				this.setState({newEmail: ""});
			}
			updateUserData(newData, (data) => {this.setState({data: data})});
		}
	}

	handleChangePassword(e) {
		e.preventDefault();
		var current = this.state.currentPassword.trim();
		//does entered current password match user's old password
		if (current == this.state.data.password) {
			var changePassword = this.state.newPassword.trim();
			var checkPassword = this.state.newPasswordCheck.trim();
			//does entered new password match confirmed password
			if (changePassword == "" || checkPassword == "") {
				this.setState({currentPassword: "", newPassword: "", newPasswordCheck: "", message: "Password Unchanged: Empty field."});
			}
			else if (changePassword == checkPassword) {
				//TODO fuction to set user password > changePassword
				var newData = this.state.data;
				newData.password = changePassword;
				updateUserData(newData, (data) => {this.setState({data: data})});
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

	handleChangeImage(e) {
		e.preventDefault();
		var newData = this.state.data;
		if (newData.image == "img/profile-temp.jpg"){
			newData.image = "img/cam.jpg";
		}
		else if (newData.image == "img/cam.jpg"){
			newData.image = "img/ryan.jpg";
		}
		else if (newData.image == "img/ryan.jpg"){
			newData.image = "img/brian.jpg";
		}
		else if (newData.image == "img/brian.jpg"){
			newData.image = "img/jackie.jpg";
		}
		else if (newData.image == "img/jackie.jpg"){
			newData.image = "img/harsh.jpg";
		}
		else if (newData.image == "img/harsh.jpg"){
			newData.image = "img/profile-temp.jpg";
		}
		else{
			newData.image = "img/profile-temp.jpg";
		}
		updateUserData(newData, (data) => {this.setState({data: data})});
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
							<input type="text" className="form-control" placeholder={this.state.data.name} value={this.state.newName} onChange={(e) => this.handleChange("newName", e)}/>
						</div>
						Email Address
						<div className="form-group">
							<input type="text" className="form-control" placeholder={this.state.data.email} value={this.state.newEmail} onChange={(e) => this.handleChange("newEmail", e)}/>
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
						<img src={this.state.data.image} className="img-responsive center-block" width="95%"/>
						<br></br>
						<button className="btn btn-default center-block" type="button" onClick={(e) => this.handleChangeImage(e)}>Change Profile Image</button>
					</div>
				</div>
		)
	}
}
