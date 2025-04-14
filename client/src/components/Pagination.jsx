import { useState, useEffect } from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
	const [inputValue, setInputValue] = useState(currentPage);

	useEffect(() => {
		setInputValue(currentPage);
	}, [currentPage]);

	useEffect(() => {
		const timer = setTimeout(() => {
			const value = parseInt(inputValue);
			if (value && value > 0 && value <= totalPages && value !== currentPage) {
				onPageChange(value);
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [inputValue, totalPages, currentPage, onPageChange]);

	return (
		<nav className='mt-4' aria-label='Page navigation'>
			<ul className='pagination justify-content-center align-items-center m-0'>
				<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
					<button
						className='page-link'
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						Previous
					</button>
				</li>
				<li className='page-item px-2 d-flex align-items-center'>
					<div className='input-group' style={{ width: 'auto' }}>
						<input
							type='number'
							min='1'
							max={totalPages}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							className='form-control form-control-sm'
							style={{ width: '60px' }}
							aria-label='Page number'
						/>
						<span className='input-group-text'>of {totalPages}</span>
					</div>
				</li>
				<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
					<button
						className='page-link'
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
}
