import { useEffect } from 'react';

export default function InfoArtworkModal({ artwork, onClose }) {
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	const excludedFields = [
		'_id',
		'__v',
		'createdAt',
		'updatedAt',
		'purchased',
		'purchasedBy',
		'ImageURL',
		'Title',
		'Cataloged',
	];

	const formatFieldName = (field) => {
		return field
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, (str) => str.toUpperCase())
			.trim();
	};

	const formatValue = (value) => {
		if (Array.isArray(value)) {
			return value.join(', ');
		}
		if (value === null || value === undefined) {
			return 'N/A';
		}
		if (typeof value === 'boolean') {
			return value ? 'Yes' : 'No';
		}
		return value.toString();
	};

	return (
		<>
			<div className='offcanvas offcanvas-end show' tabIndex='-1'>
				<div className='offcanvas-header'>
					<h5 className='offcanvas-title'>{artwork.Title}</h5>
					<button type='button' className='btn-close' onClick={onClose}></button>
				</div>
				<div className='offcanvas-body'>
					<div className='list-group list-group-flush'>
						{Object.entries(artwork)
							.filter(([key]) => !excludedFields.includes(key))
							.map(([key, value]) => (
								<div key={key} className='list-group-item'>
									<div className='fw-bold'>{formatFieldName(key)}</div>
									<div className='text-muted'>{formatValue(value)}</div>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className='offcanvas-backdrop fade show' onClick={onClose}></div>
		</>
	);
}
