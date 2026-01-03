import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useRef } from "react";

const usePrivateRoute = () => {
	const { keycloak, initialized } = useKeycloak();
	const hasTriggeredLoginRef = useRef(false);

	const isLoggedIn = Boolean(keycloak?.authenticated);

	useEffect(() => {
		if (
			initialized &&
			keycloak &&
			keycloak.authenticated === false &&
			!hasTriggeredLoginRef.current
		) {
			hasTriggeredLoginRef.current = true;
			keycloak.login();
		}
	}, [initialized, keycloak?.authenticated, keycloak]);

	return isLoggedIn;
};

export default usePrivateRoute;
