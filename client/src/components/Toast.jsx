import { useEffect } from 'react';

export default function Toast({ show, message, type = 'success', onClose }) {
	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => {
				onClose();
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [show, onClose]);

	if (!show) return null;

	return (
		<div className='toast-container position-fixed bottom-0 end-0 p-3'>
			<div className={`toast show bg-${type} text-white`} role='alert'>
				<div className='d-flex'>
					<div className='toast-body'>{message}</div>
					<button type='button' className='btn-close btn-close-white me-2 m-auto' onClick={onClose}></button>
				</div>
			</div>
		</div>
	);
}
