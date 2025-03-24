import { useEffect, useState } from 'react';
import axios from 'axios';
import ArtworkForm from './ArtworkForm';

export default function ArtworkList() {
	const [artworks, setArtworks] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);

	const fetchArtworks = async (page = 1) => {
		setLoading(true);
		try {
			const res = await axios.get(`/api/items?page=${page}&limit=21`);
			setArtworks(res.data.items);
			setCurrentPage(res.data.currentPage);
			setTotalPages(res.data.totalPages);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchArtworks();
	}, []);

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!searchQuery) {
			fetchArtworks();
			return;
		}
		try {
			const res = await axios.get(`/api/items/search/title?q=${searchQuery}`);
			setArtworks(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const addArtwork = async (artwork) => {
		try {
			await axios.post('/api/items', artwork);
			fetchArtworks();
		} catch (err) {
			console.error(err);
		}
	};

	const deleteArtwork = async (id) => {
		try {
			await axios.delete(`/api/items/${id}`);
			fetchArtworks();
		} catch (err) {
			console.error(err);
		}
	};

	const updateArtwork = async (id, updatedFields) => {
		try {
			await axios.put(`/api/items/${id}`, updatedFields);
			fetchArtworks();
		} catch (err) {
			console.error(err);
		}
	};

	const handlePageChange = (page) => {
		fetchArtworks(page);
	};

	return (
		<div className='container py-4'>
			<h2 className='mb-4 text-center'>Art Collection</h2>

			{/* Search Bar with modern styling */}
			<div className='row justify-content-center mb-4'>
				<div className='col-md-8'>
					<form className='d-flex gap-2' onSubmit={handleSearch}>
						<input
							type='text'
							className='form-control form-control-lg'
							placeholder='Search artworks...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button type='submit' className='btn btn-primary px-4'>
							Search
						</button>
					</form>
				</div>
			</div>

			<ArtworkForm addArtwork={addArtwork} />

			{loading ? (
				<div className='text-center py-5'>
					<div className='spinner-border text-primary' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			) : (
				<>
					<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3'>
						{artworks.map((art) => (
							<div key={art._id} className='col'>
								<div className='card h-100 shadow-sm'>
									{art.ImageURL && (
										<img
											src={art.ImageURL}
											className='card-img-top'
											alt={art.Title}
											style={{
												height: '200px',
												objectFit: 'cover',
											}}
										/>
									)}
									<div className='card-body'>
										<h5 className='card-title'>{art.Title}</h5>
										<p className='card-text'>
											<small className='text-muted'>{art.Artist?.join(', ')}</small>
										</p>
										<p className='card-text'>
											<small className='text-muted'>{art.Date}</small>
										</p>
									</div>
									<div className='card-footer bg-transparent border-0 d-flex justify-content-between'>
										<button
											className='btn btn-outline-primary btn-sm'
											onClick={() =>
												updateArtwork(art._id, {
													Title: art.Title + ' (UPDATED)',
												})
											}
										>
											Edit
										</button>
										<button
											className='btn btn-outline-danger btn-sm'
											onClick={() => deleteArtwork(art._id)}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{artworks.length === 0 && (
						<div className='text-center py-5'>
							<p className='text-muted'>No artworks found.</p>
						</div>
					)}

					<nav className='mt-4' aria-label='Page navigation'>
						<ul className='pagination justify-content-center'>
							<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
								<button
									className='page-link'
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
								>
									Previous
								</button>
							</li>
							<li className='page-item'>
								<span className='page-link'>
									Page {currentPage} of {totalPages}
								</span>
							</li>
							<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
								<button
									className='page-link'
									onClick={() => handlePageChange(currentPage + 1)}
									disabled={currentPage === totalPages}
								>
									Next
								</button>
							</li>
						</ul>
					</nav>
				</>
			)}
		</div>
	);
}
