import { useEffect, useState } from 'react';
import axios from 'axios';
import ArtworkForm from './ArtworkForm';
import EditArtworkModal from './EditArtworkModal';
import { useAuth } from '../contexts/AuthContext';

export default function ArtworkList() {
	const [artworks, setArtworks] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);
	// Edit state
	const [editingArtwork, setEditingArtwork] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [advancedSearch, setAdvancedSearch] = useState({
		artist: '',
		year: '',
	});
	const { user, token } = useAuth();

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
		setLoading(true);
		try {
			let results;
			if (!searchQuery && !advancedSearch.artist && !advancedSearch.year) {
				await fetchArtworks();
				return;
			}

			const params = new URLSearchParams();
			if (searchQuery) params.append('title', searchQuery);
			if (advancedSearch.artist) params.append('artist', advancedSearch.artist);
			if (advancedSearch.year) params.append('year', advancedSearch.year.toString());

			const response = await axios.get(`/api/items/search/advanced?${params}`);
			setArtworks(response.data);
			setTotalPages(1); // Reset pagination for search results
		} catch (err) {
			console.error('Search error:', err);
		} finally {
			setLoading(false);
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
			setShowEditModal(false);
			setEditingArtwork(null);
		} catch (err) {
			console.error(err);
		}
	};

	const handlePageChange = (page) => {
		fetchArtworks(page);
	};

	const purchaseArtwork = async (artworkId) => {
		if (!user) {
			alert('Please login to purchase artworks');
			return;
		}

		try {
			await axios.post(
				`/api/users/${user.id}/purchase/${artworkId}`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			alert('Artwork purchased successfully!');
		} catch (error) {
			alert(error.response?.data?.message || 'Failed to purchase artwork');
		}
	};

	return (
		<div className='container py-4'>
			<h2 className='mb-4 text-center'>Art Collection</h2>

			{/* Search Bar */}
			<div className='row justify-content-center mb-4'>
				<div className='col-md-8'>
					<form onSubmit={handleSearch}>
						<div className='input-group mb-3'>
							<input
								type='text'
								className='form-control form-control-lg'
								placeholder='Search artworks...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<button
								className='btn btn-outline-secondary'
								type='button'
								onClick={() => setShowAdvanced(!showAdvanced)}
							>
								<i className='bi bi-sliders'></i>
							</button>
							<button type='submit' className='btn btn-primary px-4'>
								Search
							</button>
						</div>
						{/* Advanced Search */}
						{showAdvanced && (
							<div className='card mb-3'>
								<div className='card-body'>
									<div className='row g-3'>
										<div className='col-md-6'>
											<input
												type='text'
												className='form-control'
												placeholder='Artist'
												value={advancedSearch.artist}
												onChange={(e) =>
													setAdvancedSearch({
														...advancedSearch,
														artist: e.target.value,
													})
												}
											/>
										</div>
										<div className='col-md-6'>
											<input
												type='number'
												className='form-control'
												placeholder='Year'
												value={advancedSearch.year}
												onChange={(e) =>
													setAdvancedSearch({
														...advancedSearch,
														year: e.target.value,
													})
												}
											/>
										</div>
									</div>
								</div>
							</div>
						)}
					</form>
				</div>
			</div>

			<ArtworkForm addArtwork={addArtwork} />
			{/* Artworks List */}
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
											className='btn btn-primary btn-sm'
											onClick={() => purchaseArtwork(art._id)}
										>
											Purchase
										</button>
										<div>
											<button
												className='btn btn-outline-primary btn-sm me-2'
												onClick={() => {
													setEditingArtwork(art);
													setShowEditModal(true);
												}}
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
							</div>
						))}
					</div>

					{artworks.length === 0 && (
						<div className='text-center py-5'>
							<p className='text-muted'>No artworks found.</p>
						</div>
					)}

					{/* Pagination */}
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
			{showEditModal && (
				<EditArtworkModal
					artwork={editingArtwork}
					onSave={(updatedFields) => updateArtwork(editingArtwork._id, updatedFields)}
					onClose={() => {
						setShowEditModal(false);
						setEditingArtwork(null);
					}}
				/>
			)}
		</div>
	);
}
