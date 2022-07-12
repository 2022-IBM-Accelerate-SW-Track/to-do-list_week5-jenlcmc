import React, { useEffect, useState } from "react";
import Axios from "axios";

// makes use of the "useEffect" hook in react, and the await keyword,
// this combination is essentially telling react to wait for a call to a backend service to complete,
// then proceeds with the rest of the render. Remember that nodeJS is asynchronous platform,
// so statements can get executed before data is prepared and ready to return.
// In the case of our Axios.get above, if we didn't have the await in front of it
// then the rest of the code will proceed and attempt to render before our response is returned from the backend service.
// To solve this we said that this function is asynchronous and hence we will receive a response from the backend service before proceeding.

// An alternative is you could do something like we've seen in other services,
// store the response in state and update it as the data is returned,
// an example of this will be used in the search functionality next.
const ShowTodos = () => {
	//Begin Here
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await Axios.get("http://localhost:8080/get/items");
				setTodos(JSON.stringify(res.data));
				console.log(JSON.stringify(res.data));
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, []);
	return <div>{todos}</div>;
};
export default ShowTodos;
