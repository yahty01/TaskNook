import axios from "axios";
//Позволяет упаковать baseUrl и headers +много чего еще
export const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
		'API-KEY':  process.env.REACT_APP_API_KEY
	}
})