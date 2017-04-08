import React from 'react';

export default class Contact extends React.Component {

	render() {
		return (
				<div className="row">
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-10">
								<div className="form-group">
									<label htmlFor="InputName">Full Name</label>
									<input type="text" className="form-control" id="InputName"/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-10">
								<div className="form-group">
									<label htmlFor="InputName">Your Email</label>
									<input type="text" className="form-control" id="Email"/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-10">
								<div className="form-group">
									<label htmlFor="InputName">Type of Issue</label>
									<input type="text" className="form-control" id="TypeofIssue"/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-10">
								<div className="form-group">
									<label htmlFor="exampleTextarea">Question</label>
									<textarea className="form-control" id="QuestionText" rows="5"></textarea>
								</div>
							</div>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
				</div>
		)
	}
}
