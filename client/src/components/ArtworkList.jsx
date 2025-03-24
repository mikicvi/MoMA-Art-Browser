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
			const res = await axios.get(`/api/items?page=${page}&limit=20`);
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
		<div>
			<h2>Artwork Catalogue</h2>
			<form className='row mb-3' onSubmit={handleSearch}>
				<div className='col-sm-10'>
					<input
						type='text'
						className='form-control'
						placeholder='Search by title...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className='col-sm-2'>
					<button type='submit' className='btn btn-primary w-100'>
						Search
					</button>
				</div>
			</form>

			<ArtworkForm addArtwork={addArtwork} />

			{loading ? (
				<div className='text-center'>
					<div className='spinner-border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			) : (
				<>
					<table className='table table-striped mt-4'>
						<thead>
							<tr>
								<th>Title</th>
								<th>Artist(s)</th>
								<th>Date</th>
								<th colSpan='2'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{artworks.map((art) => (
								<tr key={art._id}>
									<td>{art.Title}</td>
									<td>{art.Artist?.join(', ')}</td>
									<td>{art.Date}</td>
									<td>
										<button
											className='btn btn-warning btn-sm'
											onClick={() =>
												updateArtwork(art._id, {
													Title: art.Title + ' (UPDATED)',
												})
											}
										>
											Quick Update
										</button>
									</td>
									<td>
										<button
											className='btn btn-danger btn-sm'
											onClick={() => deleteArtwork(art._id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
							{artworks.length === 0 && (
								<tr>
									<td colSpan='5' className='text-center'>
										No artworks found.
									</td>
								</tr>
							)}
						</tbody>
					</table>

					<nav aria-label='Page navigation'>
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
