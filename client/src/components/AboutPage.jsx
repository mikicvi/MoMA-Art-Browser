// client/src/components/AboutPage.jsx
export default function AboutPage() {
	return (
		<div>
			<h2>About This Application</h2>
			<p>
				This is a simple art catalogue application. It demonstrates a RESTful microservices architecture using a
				Node.js server and a React front end.
			</p>
			<h4>How It Works</h4>
			<p>
				A Node.js server (with Express) hosts the REST API and stores artwork data in a MongoDB database. The
				React application (built with Vite) consumes this API via Axios. Users can add, search, update, or
				delete items in the catalogue.
			</p>
			<h4>Technologies Used</h4>
			<ul>
				<li>Node.js + Express for the server</li>
				<li>MongoDB (in-memory via mongodb-memory-server)</li>
				<li>React + Vite for the client</li>
				<li>Axios for HTTP requests</li>
				<li>Bootstrap for styling</li>
			</ul>
			<h4>Weaknesses</h4>
			<ul>
				<li>Search functionality is limited to title field (partial match).</li>
				<li>There is no user authentication or security layer.</li>
				<li>No robust input validation beyond simple field checks.</li>
			</ul>
			<h4>Possible Alternatives</h4>
			<ul>
				<li>Use a production MongoDB database for persistent data storage.</li>
				<li>Implement advanced searching or indexing for more complex queries.</li>
				<li>Introduce JWT-based user authentication for secure CRUD operations.</li>
				<li>Use a different UI framework such as Next.js or a more extensive design library.</li>
			</ul>
		</div>
	);
}
