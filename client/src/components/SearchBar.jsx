import { useState } from 'react';
import AdvancedSearch from './AdvancedSearch';

export default function SearchBar({ onSearch, onClear }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [advancedSearch, setAdvancedSearch] = useState({
		artist: '',
		year: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchQuery, advancedSearch);
	};

	const handleClear = () => {
		setSearchQuery('');
		setAdvancedSearch({ artist: '', year: '' });
		setShowAdvanced(false);
		onClear();
	};

	return (
		<div className='row justify-content-center mb-4'>
			<div className='col-md-8'>
				<form onSubmit={handleSubmit} className='search-form'>
					<div className='input-group mb-3'>
						<div className='form-floating'>
							<input
								type='text'
								className='form-control form-control-lg'
								id='searchInput'
								placeholder='Search artworks...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<label htmlFor='searchInput'>Search artworks...</label>
						</div>
						<button
							className='btn btn-outline-info btn-lg'
							type='button'
							onClick={() => setShowAdvanced(!showAdvanced)}
						>
							<i className='bi bi-sliders'></i>
						</button>
						<button type='button' className='btn btn-outline-danger btn-lg' onClick={handleClear}>
							<i className='bi bi-trash'></i>
						</button>
						<button type='submit' className='btn btn-primary btn-lg'>
							Search
						</button>
					</div>
					{showAdvanced && (
						<AdvancedSearch advancedSearch={advancedSearch} setAdvancedSearch={setAdvancedSearch} />
					)}
				</form>
			</div>
		</div>
	);
}
