import { useState } from 'react';

export default function ArtworkForm({ addArtwork }) {
	const [title, setTitle] = useState('');
	const [artist, setArtist] = useState('');
	const [date, setDate] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const newArtwork = {
			Title: title,
			Artist: artist
				.split(',')
				.map((a) => a.trim())
				.filter(Boolean),
			Date: date,
			ImageURL: imageUrl,
		};
		addArtwork(newArtwork);
		setTitle('');
		setArtist('');
		setDate('');
		setImageUrl('');
	};

	return (
		<div className='card'>
			<div className='card-body'>
				<form onSubmit={handleSubmit}>
					<div className='row g-3'>
						<div className='col-md-6'>
							<div className='form-floating'>
								<input
									type='text'
									className='form-control'
									id='titleInput'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
									placeholder='Title'
								/>
								<label htmlFor='titleInput'>Title</label>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='form-floating'>
								<input
									type='text'
									className='form-control'
									id='artistInput'
									value={artist}
									onChange={(e) => setArtist(e.target.value)}
									placeholder='Artist(s)'
								/>
								<label htmlFor='artistInput'>Artist(s) - separate with commas</label>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='form-floating'>
								<input
									type='text'
									className='form-control'
									id='dateInput'
									value={date}
									onChange={(e) => setDate(e.target.value)}
									placeholder='Date'
								/>
								<label htmlFor='dateInput'>Date</label>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='form-floating'>
								<input
									type='url'
									className='form-control'
									id='imageInput'
									value={imageUrl}
									onChange={(e) => setImageUrl(e.target.value)}
									placeholder='Image URL'
								/>
								<label htmlFor='imageInput'>Image URL</label>
							</div>
						</div>
						<div className='col-12'>
							<button type='submit' className='btn btn-success'>
								Add Artwork
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
