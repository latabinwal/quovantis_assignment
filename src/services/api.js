import axios from "axios";

const api = axios.create({
	baseURL: 'https://reqres.in/',
	crossDomain: true,
});

export const loginUserApi = async(loginData) => {
	const params = { "email": loginData.email.toLowerCase(), "password": loginData.password}
	try {
		return api.post(`api/login`,params)
			.then((resp)=>{
				return resp;
			})
			.catch(error => {
				return error.response;
			});
	}
	catch(error) {
		return error.response;
	}
};

export const userListApi = async(page) => {
	try {
		return api.get(`api/users?page=${page}`)
			.then((resp)=>{
				return resp;
			})
			.catch(error => {
				return error.response;
			});
	}
	catch(error) {
		return error.response;
	}
};

export const singleUserApi = async(userId) => {
	try {
		return api.get(`api/users/${userId}`)
			.then((resp)=>{
				return resp.data;
			})
			.catch(error => {
				return error.response;
			});
	}
	catch(error) {
		return error.response;
	}
};