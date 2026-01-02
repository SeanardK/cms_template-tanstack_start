import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
	url: "http://192.168.100.56:8085",
	realm: "Seanard",
	clientId: "seanard-backend",
});

export default keycloak;
