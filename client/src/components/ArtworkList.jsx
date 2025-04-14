import { useEffect, useState } from 'react';
import axios from 'axios';
import ArtworkForm from './ArtworkForm';
import EditArtworkModal from './EditArtworkModal';
import Toast from './Toast';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import ArtworkCard from './ArtworkCard';
import Pagination from './Pagination';

export default function ArtworkList() {
	const [artworks, setArtworks] = useState([]);
	const [originalArtworks, setOriginalArtworks] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [editingArtwork, setEditingArtwork] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const { user, token } = useAuth();
	const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

	const fetchArtworks = async (page = 1) => {
		setLoading(true);
		try {
			const res = await axios.get(`/api/items?page=${page}&limit=21`);
			setArtworks(res.data.items);
			setOriginalArtworks(res.data.items);
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

	const handleSearch = async (query, advanced, page = 1) => {
		setLoading(true);
		try {
			if (!query && !advanced.artist && !advanced.year) {
				await fetchArtworks(page);
				return;
			}

			const params = new URLSearchParams();
			if (query) params.append('title', query);
			if (advanced.artist) params.append('artist', advanced.artist);
			if (advanced.year) params.append('year', advanced.year.toString());
			params.append('page', page.toString());
			params.append('limit', '21');

			const response = await axios.get(`/api/items/search/advanced?${params}`);
			setArtworks(response.data.items);
			setCurrentPage(response.data.currentPage);
			setTotalPages(response.data.totalPages);
		} catch (err) {
			console.error('Search error:', err);
		} finally {
			setLoading(false);
		}
	};

	const handleClear = () => {
		setArtworks(originalArtworks);
		setCurrentPage(1);
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

	const purchaseArtwork = async (artworkId) => {
		if (!user) {
			setToast({ show: true, message: 'Please login to purchase artworks', type: 'danger' });
			return;
		}

		try {
			await axios.post(
				`/api/users/${user.id}/purchase/${artworkId}`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setToast({ show: true, message: 'Artwork purchased successfully!', type: 'success' });
		} catch (error) {
			setToast({
				show: true,
				message: error.response?.data?.message || 'Failed to purchase artwork',
				type: 'danger',
			});
		}
	};

	return (
		<div className='container py-4'>
			<h2 className='mb-4 text-center'>Art Collection</h2>

			<SearchBar onSearch={handleSearch} onClear={handleClear} />

			<div className='mb-4'>
				<button
					className='btn btn-success btn-lg w-100 w-md-auto'
					type='button'
					onClick={() => setShowForm(!showForm)}
				>
					{showForm ? 'Hide Form' : 'Add New Artwork'}
				</button>

				{showForm && <ArtworkForm addArtwork={addArtwork} />}
			</div>

			{loading ? (
				<div className='text-center py-5'>
					<div className='spinner-border text-primary' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			) : (
				<>
					<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3'>
						{artworks.map((artwork) => (
							<ArtworkCard
								key={artwork._id}
								artwork={artwork}
								onPurchase={purchaseArtwork}
								onEdit={(artwork) => {
									setEditingArtwork(artwork);
									setShowEditModal(true);
								}}
								onDelete={deleteArtwork}
							/>
						))}
					</div>

					{artworks.length === 0 && (
						<div className='text-center py-5'>
							<p className='text-muted'>No artworks found.</p>
						</div>
					)}

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={(page) => handleSearch(null, {}, page)}
					/>
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

			<Toast
				show={toast.show}
				message={toast.message}
				type={toast.type}
				onClose={() => setToast({ ...toast, show: false })}
			/>
		</div>
	);
}
