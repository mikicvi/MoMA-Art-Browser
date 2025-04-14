export default function AboutPage() {
	return (
		<div className='container py-5'>
			<div className='card shadow-sm mb-5'>
				<div className='card-body'>
					<h1 className='display-4 mb-4'>About My MoMA Catalogue</h1>
					<p className='lead'>
						Welcome! This application is a modern art catalogue that lets users browse, search, and manage
						various artworks. It's built to showcase a RESTful microservices structure using Node.js and
						Express on the server side, with a React front end.
					</p>

					<div className='accordion' id='aboutAccordion'>
						<div className='accordion-item'>
							<h2 className='accordion-header'>
								<button
									className='accordion-button'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#coreRequirements'
								>
									Core Requirements
								</button>
							</h2>
							<div
								id='coreRequirements'
								className='accordion-collapse collapse show'
								data-bs-parent='#aboutAccordion'
							>
								<div className='accordion-body'>
									<p className='text-muted'>
										The foundation of this project focused on meeting the essentials: reading and
										storing data in MongoDB, enabling full CRUD (Create, Read, Update, and Delete)
										operations on artwork items, and making a client interface for users to interact
										with it all. The Node.js server handles the main functionality, while the React
										application consumes the server's REST API through HTTP requests.
									</p>
									<ul className='list-group list-group-flush'>
										<li className='list-group-item'>CRUD endpoints with Express</li>
										<li className='list-group-item'>MongoDB for data storage</li>
										<li className='list-group-item'>Basic artwork browsing and searching</li>
										<li className='list-group-item'>
											Simple index.html entry point with a React front end
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className='accordion-item'>
							<h2 className='accordion-header'>
								<button
									className='accordion-button collapsed'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#extraFeatures'
								>
									Extra Features
								</button>
							</h2>
							<div
								id='extraFeatures'
								className='accordion-collapse collapse'
								data-bs-parent='#aboutAccordion'
							>
								<div className='accordion-body'>
									<p className='text-muted'>
										Although the main focus was fulfilling the assignment's requirements, I've added
										a few extra features to make the application more refined and interesting.
									</p>
									<div className='row g-4'>
										<div className='col-md-6'>
											<div className='card h-100 bg-light border-0'>
												<div className='card-body'>
													<ul className='list-group list-group-flush'>
														<li className='list-group-item bg-light'>
															JWT-based user authentication and login
														</li>
														<li className='list-group-item bg-light'>
															Advanced search fields (e.g. title, artist, year)
														</li>
														<li className='list-group-item bg-light'>
															Image preview in a lightbox style overlay
														</li>
														<li className='list-group-item bg-light'>
															Consistend and Responsive UI (using Bootstrap) for various
															screen sizes
														</li>
														<li className='list-group-item bg-light'>
															Component based frontend for easy addition or changes of
															features
														</li>
														<li className='list-group-item bg-light'>
															Basic purchasing functionality
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className='col-md-6'>
											<div className='card h-100 bg-light border-0'>
												<div className='card-body'>
													<ul className='list-group list-group-flush'>
														<li className='list-group-item bg-light'>
															Pagination to organise large sets of artwork
														</li>
														<li className='list-group-item bg-light'>
															Simple user profile to showcase 'purchased' items and
															profile info
														</li>
														<li className='list-group-item bg-light'>Toast messages</li>
														<li className='list-group-item bg-light'>
															Downloads the MoMA Artworks.json dataset if not present in
															the project
														</li>
														<li className='list-group-item bg-light'>
															A cute image for artworks that are missing pictures :)
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='accordion-item'>
							<h2 className='accordion-header'>
								<button
									className='accordion-button collapsed'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#technologies'
								>
									Technologies Used
								</button>
							</h2>
							<div
								id='technologies'
								className='accordion-collapse collapse'
								data-bs-parent='#aboutAccordion'
							>
								<div className='accordion-body'>
									<div className='card bg-light border-0'>
										<div className='card-body'>
											<ul className='list-group list-group-flush'>
												<li className='list-group-item bg-light'>Node.js + Express</li>
												<li className='list-group-item bg-light'>
													MongoDB (in-memory) with mongoose for ODM
												</li>
												<li className='list-group-item bg-light'>React + Vite</li>
												<li className='list-group-item bg-light'>
													Axios for making HTTP requests
												</li>
												<li className='list-group-item bg-light'>
													Bootstrap + Bootswatch for styling
												</li>
												<li className='list-group-item bg-light'>
													React Router for navigating between pages
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='accordion-item'>
							<h2 className='accordion-header'>
								<button
									className='accordion-button collapsed'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#limitations'
								>
									Limitations
								</button>
							</h2>
							<div
								id='limitations'
								className='accordion-collapse collapse'
								data-bs-parent='#aboutAccordion'
							>
								<div className='accordion-body'>
									<div className='card bg-light border-0'>
										<div className='card-body'>
											<ul className='list-group list-group-flush'>
												<li className='list-group-item bg-light'>
													Currently no image upload (only link-based images)
												</li>
												<li className='list-group-item bg-light'>
													Limited user profile features
												</li>
												<li className='list-group-item bg-light'>
													Search algorithm is basic (no fuzzy matching)
												</li>
												<li className='list-group-item bg-light'>
													There's a single user role, with no dedicated admin features meaning
													any user can edit or delete any artwork.
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='accordion-item'>
							<h2 className='accordion-header'>
								<button
									className='accordion-button collapsed'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#improvements'
								>
									Possible Future Improvements
								</button>
							</h2>
							<div
								id='improvements'
								className='accordion-collapse collapse'
								data-bs-parent='#aboutAccordion'
							>
								<div className='accordion-body'>
									<div className='card bg-light border-0'>
										<div className='card-body'>
											<ul className='list-group list-group-flush'>
												<li className='list-group-item bg-light'>
													Implement proper image uploading and file storage
												</li>
												<li className='list-group-item bg-light'>
													Add social functions like comments or favourites
												</li>
												<li className='list-group-item bg-light'>
													Introduce advanced artwork filtering and sorting
												</li>
												<li className='list-group-item bg-light'>
													Improve user profile customisation
												</li>
												<li className='list-group-item bg-light'>
													Build out an admin dashboard for content moderation
												</li>
												<li className='list-group-item bg-light'>
													Restrict edit/delete function to admins
												</li>
												<li className='list-group-item bg-light'>
													Enhance the search algorithm with fuzzy searching
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
