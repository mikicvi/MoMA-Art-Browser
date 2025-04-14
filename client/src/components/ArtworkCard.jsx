import { useState } from 'react';
import LightboxImage from './LightboxImage';
import InfoArtworkModal from './InfoArtworkModal';
import noPic from '../assets/no-pic.png';

export default function ArtworkCard({ artwork, onPurchase, onEdit, onDelete }) {
	const [showInfo, setShowInfo] = useState(false);

	return (
		<div className='col'>
			<div
				className='card h-100'
				style={{
					border: '1px solid rgba(66, 66, 66, 0.18)',
					borderRadius: '12px',
					boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
					transition: 'transform 0.2s',
					cursor: 'pointer',
				}}
				onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
				onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
			>
				<LightboxImage src={artwork.ImageURL || noPic} alt={artwork.Title} />
				<div className='card-body'>
					<h5 className='card-title' style={{ color: 'var(--primary-color)' }}>
						{artwork.Title}
					</h5>
					<p className='card-text'>
						<small className='text-muted'>{artwork.Artist?.join(', ')}</small>
					</p>
					<p className='card-text'>
						<small className='text-muted'>{artwork.Date}</small>
					</p>
				</div>
				<div className='card-footer bg-transparent border-0 d-flex justify-content-between align-items-center'>
					<div>
						<button className='btn btn-success btn-sm me-2' onClick={() => onPurchase(artwork._id)}>
							Purchase
						</button>
						<button className='btn btn-info btn-sm' onClick={() => setShowInfo(true)}>
							More Info
						</button>
					</div>
					<div>
						<button className='btn btn-warning btn-sm me-2' onClick={() => onEdit(artwork)}>
							Edit
						</button>
						<button className='btn btn-danger btn-sm' onClick={() => onDelete(artwork._id)}>
							Delete
						</button>
					</div>
				</div>
			</div>
			{showInfo && <InfoArtworkModal artwork={artwork} onClose={() => setShowInfo(false)} />}
		</div>
	);
}
