export default function AdvancedSearch({ advancedSearch, setAdvancedSearch }) {
	return (
		<div className='card mb-3'>
			<div className='card-body'>
				<div className='row g-3'>
					<div className='col-md-6'>
						<div className='form-floating'>
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
							<label htmlFor='titleInput'>Artists(s) - separate with commas</label>
						</div>
					</div>
					<div className='col-md-6'>
						<div className='form-floating'>
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
							<label htmlFor='yearInput'>Year</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
