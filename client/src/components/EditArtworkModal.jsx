import { useState, useEffect } from 'react';

export default function EditArtworkModal({ artwork, onSave, onClose }) {
	const [editedArtwork, setEditedArtwork] = useState({
		Title: '',
		Artist: '',
		Date: '',
		ImageURL: '',
	});

	useEffect(() => {
		if (artwork) {
			setEditedArtwork({
				Title: artwork.Title || '',
				Artist: artwork.Artist ? artwork.Artist.join(', ') : '',
				Date: artwork.Date || '',
				ImageURL: artwork.ImageURL || '',
			});
		}
	}, [artwork]);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave({
			...editedArtwork,
			Artist: editedArtwork.Artist.split(',')
				.map((a) => a.trim())
				.filter(Boolean),
		});
	};

	const handleBackdropClick = (e) => {
		if (e.target.classList.contains('modal')) {
			onClose();
		}
	};

	return (
		<>
			<div className='modal show d-block' tabIndex='-1' onClick={handleBackdropClick}>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title'>Edit Artwork</h5>
							<button type='button' className='btn-close' onClick={onClose}></button>
						</div>
						<form onSubmit={handleSubmit}>
							<div className='modal-body'>
								<div className='form-floating mb-3'>
									<input
										type='text'
										className='form-control'
										id='titleInput'
										value={editedArtwork.Title}
										onChange={(e) =>
											setEditedArtwork({
												...editedArtwork,
												Title: e.target.value,
											})
										}
										placeholder='Title'
										required
									/>
									<label htmlFor='titleInput'>Title</label>
								</div>
								<div className='form-floating mb-3'>
									<input
										type='text'
										className='form-control'
										id='artistInput'
										value={editedArtwork.Artist}
										onChange={(e) =>
											setEditedArtwork({
												...editedArtwork,
												Artist: e.target.value,
											})
										}
										placeholder='Artist(s)'
									/>
									<label htmlFor='artistInput'>Artist(s) - Separate with commas</label>
								</div>
								<div className='form-floating mb-3'>
									<input
										type='text'
										className='form-control'
										id='dateInput'
										value={editedArtwork.Date}
										onChange={(e) =>
											setEditedArtwork({
												...editedArtwork,
												Date: e.target.value,
											})
										}
										placeholder='Date'
									/>
									<label htmlFor='dateInput'>Date</label>
								</div>
								<div className='form-floating mb-3'>
									<input
										type='url'
										className='form-control'
										id='imageInput'
										value={editedArtwork.ImageURL}
										onChange={(e) =>
											setEditedArtwork({
												...editedArtwork,
												ImageURL: e.target.value,
											})
										}
										placeholder='Image URL'
									/>
									<label htmlFor='imageInput'>Image URL</label>
								</div>
							</div>
							<div className='modal-footer'>
								<button type='button' className='btn btn-secondary' onClick={onClose}>
									Cancel
								</button>
								<button type='submit' className='btn btn-primary'>
									Save Changes
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className='modal-backdrop show' onClick={onClose}></div>
		</>
	);
}
