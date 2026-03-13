import { Link } from "@tanstack/react-router";

export default function NotFoundComponent() {
	return (
		<div style={{ padding: "2rem", textAlign: "center" }}>
			<h2>404 Not Found</h2>
			<p>Sorry, the page you are looking for does not exist.</p>
			<Link to="/">Go Home</Link>
		</div>
	);
}
