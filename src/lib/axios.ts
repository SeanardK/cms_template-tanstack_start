import axios from "axios";
import keycloak from "../config/keycloack";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use(
	async (config) => {
		if (keycloak.authenticated && keycloak.token) {
			await keycloak.updateToken(30);
			config.headers.Authorization = `Bearer ${keycloak.token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
		if (response.status === 200) {
			return response.data;
		}

		return response;
	},
	(error) => {
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	},
);

export default instance;
