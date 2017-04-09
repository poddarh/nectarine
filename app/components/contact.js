import {sendContactEmail} from '../server.js';
import React from 'react';

export default class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//input fields
			name: "",
			email: "",
			typeOfIssue: "",
			question: "",
			data: [],
			message: ""
		}
	}

	handleSubmit(e){
		e.preventDefault();
		var thisName = this.state.name.trim();
		var thisEmail = this.state.email.trim();
		var thisTOI = this.state.typeOfIssue.trim();
		var thisQuestion = this.state.question.trim();
		if (thisName !== "" || thisEmail !== "" || thisTOI !== "" || thisQuestion !== "") {
			var newData = this.state.data;
			if (thisName !== "") {
				newData.name = thisName;
				this.setState({name: ""});
			}
			if (thisEmail !== "") {
				newData.email = thisEmail;
				this.setState({email: ""});
			}
			if (thisTOI !== "") {
				newData.typeOfIssue = thisTOI;
				this.setState({typeOfIssue: ""});
			}
			if (thisName !== "") {
				newData.question = thisQuestion;
				this.setState({question: ""});
			}
			sendContactEmail(newData, (data) => {this.setState({data: data})});
			this.setState({message: "Your form has been submitted!"});
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
				<div className="col-md-6">
					<div className="row">
						<div className="col-md-10">
							<div className="form-group">
								Full Name
								<input type="text" className="form-control" placeholder={this.state.data.name} value={this.state.name} onChange={(e) => this.handleChange("name", e)}/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-10">
							<div className="form-group">
								Email
								<input type="text" className="form-control" placeholder={this.state.data.email} value={this.state.email} onChange={(e) => this.handleChange("email", e)}/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-10">
							<div className="form-group">
								Type of Issue
								<input type="text" className="form-control" placeholder={this.state.data.typeOfIssue} value={this.state.typeOfIssue} onChange={(e) => this.handleChange("typeOfIssue", e)}/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-10">
							<div className="form-group">
								Question
								<textarea className="form-control" rows="5" placeholder={this.state.data.question} value={this.state.question} onChange={(e) => this.handleChange("question", e)}/>
							</div>
						</div>
					</div>
					<button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Submit</button>
					<p></p>{this.state.message}
					<div id="db-reset"></div>
				</div>
			</div>
		)
	}
}
