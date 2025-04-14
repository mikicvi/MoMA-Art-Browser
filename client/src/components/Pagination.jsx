export default function Pagination({ currentPage, totalPages, onPageChange }) {
	return (
		<nav className='mt-4' aria-label='Page navigation'>
			<ul className='pagination justify-content-center'>
				<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
					<button
						className='btn btn-primary'
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						Previous
					</button>
				</li>
				<li className='page-item mx-2'>
					<span className='btn btn-outline-primary disabled'>
						Page {currentPage} of {totalPages}
					</span>
				</li>
				<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
					<button
						className='btn btn-primary'
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
