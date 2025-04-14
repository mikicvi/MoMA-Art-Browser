import LightboxImage from './LightboxImage';
import noPic from '../../public/no-pic.png';

export default function ArtworkCard({ artwork, onPurchase, onEdit, onDelete }) {
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
				<div className='card-footer bg-transparent border-0 d-flex justify-content-between'>
					<button className='btn btn-success btn-sm' onClick={() => onPurchase(artwork._id)}>
						Purchase
					</button>
					<div>
						<button className='btn btn-info btn-sm me-2' onClick={() => onEdit(artwork)}>
							Edit
						</button>
						<button className='btn btn-danger btn-sm' onClick={() => onDelete(artwork._id)}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
