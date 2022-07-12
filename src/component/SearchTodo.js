import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import Axios from "axios";

class SearchTodo extends Component {
	state = {
		tmpdata: [],
	};

	handleChange = (e) => {
		this.setState({
			content: e.target.value,
			date: Date().toLocaleString("en-US"),
		});
	};

	// main things they will do is submit a form
	// which will trigger the call to the searchitem backend service,
	// as part of that submit we will take the name of the Todo to search for
	// from the "this.state.content" parameter,
	// the a user would type in the UI text box.

	//also we have state associated with this component "tmpdata",
	// this state will be set to the data returned from the backend service
	// via the "this.setState({tmpdata: JSON.stringify(res.data),});"
	// code we just put in the HandleSubmit method.

	// will use this state in the render function, underneath the search UI components you'll see "
	// {this.state.tmpdata}
	// this is empty initially, because we haven't searched for anything,
	// but once you supply a search parameter and click the "Search" button,
	// we will set the state in the HandleSubmit,
	// which will then update the state in our div to hold the return data from the backend service for the search.
	handleSubmit = (e) => {
		//Begin Here
		e.preventDefault();
		// HTTP Client to send a GET request
		Axios({
			method: "GET",
			url: "http://localhost:8080/get/searchitem",
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				taskname: this.state.content,
			},
		}).then((res) => {
			this.setState({
				tmpdata: JSON.stringify(res.data),
			});
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<TextField
						id="search-item-input"
						label="Search for ToDo Item"
						variant="outlined"
						onChange={this.handleChange}
						value={this.state.value}
					/>
					<Button
						id="search-item-button"
						name="submit"
						style={{ marginLeft: "10px", marginTop: 10 }}
						onClick={this.handleSubmit}
						variant="contained"
						color="primary"
					>
						Search
					</Button>
				</form>
				<div>{this.state.tmpdata}</div>
			</div>
		);
	}
}

export default SearchTodo;
