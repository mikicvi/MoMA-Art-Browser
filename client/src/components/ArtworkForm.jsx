import { useState } from 'react';

export default function ArtworkForm({ addArtwork }) {
	const [title, setTitle] = useState('');
	const [artist, setArtist] = useState('');
	const [date, setDate] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title) return;
		addArtwork({
			Title: title,
			Artist: [artist],
			Date: date,
		});
		setTitle('');
		setArtist('');
		setDate('');
	};

	return (
		<form className='row g-3' onSubmit={handleSubmit}>
			<div className='col-md-4'>
				<label className='form-label'>Title</label>
				<input
					type='text'
					className='form-control'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>
			<div className='col-md-4'>
				<label className='form-label'>Artist</label>
				<input
					type='text'
					className='form-control'
					value={artist}
					onChange={(e) => setArtist(e.target.value)}
				/>
			</div>
			<div className='col-md-4'>
				<label className='form-label'>Date</label>
				<input type='text' className='form-control' value={date} onChange={(e) => setDate(e.target.value)} />
			</div>
			<div className='col-md-12'>
				<button type='submit' className='btn btn-success mt-3'>
					Add Artwork
				</button>
			</div>
		</form>
	);
}
