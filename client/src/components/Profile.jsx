import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
	const [purchasedArtworks, setPurchasedArtworks] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user, token } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
			return;
		}

		const fetchPurchasedArtworks = async () => {
			try {
				const response = await axios.get(`/api/users/${user.id}/purchased`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setPurchasedArtworks(response.data);
			} catch (error) {
				console.error('Failed to fetch purchased artworks:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPurchasedArtworks();
	}, [user, token, navigate]);

	if (loading) {
		return <div className='text-center mt-5'>Loading...</div>;
	}

	return (
		<div className='container mt-4'>
			<h2 className='mb-4'>Your Profile</h2>
			<div className='card mb-4'>
				<div className='card-body'>
					<h5 className='card-title'>Account Details</h5>
					<p className='card-text'>Username: {user.username}</p>
					<p className='card-text'>Email: {user.email}</p>
				</div>
			</div>

			<h3 className='mb-3'>Your Purchased Artworks</h3>
			{purchasedArtworks.length === 0 ? (
				<p className='text-muted'>You haven't purchased any artworks yet.</p>
			) : (
				<div className='row row-cols-1 row-cols-md-3 g-4'>
					{purchasedArtworks.map((artwork) => (
						<div key={artwork._id} className='col'>
							<div className='card h-100'>
								{artwork.ImageURL && (
									<img
										src={artwork.ImageURL}
										className='card-img-top'
										alt={artwork.Title}
										style={{ height: '200px', objectFit: 'cover' }}
									/>
								)}
								<div className='card-body'>
									<h5 className='card-title'>{artwork.Title}</h5>
									<p className='card-text'>
										<small className='text-muted'>{artwork.Artist?.join(', ')}</small>
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
