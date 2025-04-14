import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Overlay = ({ src, alt, onClose }) => (
	<div
		className='position-fixed top-0 start-0'
		style={{
			backgroundColor: 'rgba(0,0,0,0.95)',
			zIndex: 99999,
			width: '100vw',
			height: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			left: 0,
			top: 0,
			opacity: 1,
			transition: 'opacity 0.3s ease',
			cursor: 'pointer',
		}}
		onClick={onClose}
	>
		<div
			className='position-relative d-flex align-items-center justify-content-center'
			style={{ pointerEvents: 'none' }}
			onClick={(e) => e.stopPropagation()}
		>
			<button
				className='btn-close btn-close-black position-absolute'
				style={{
					top: '20px',
					right: '20px',
					transform: 'scale(1.5)',
					pointerEvents: 'auto',
				}}
				onClick={onClose}
			/>
			<img
				src={src}
				alt={alt}
				style={{
					maxHeight: '95vh',
					maxWidth: '95vw',
					objectFit: 'contain',
					margin: 'auto',
					pointerEvents: 'auto',
				}}
			/>
		</div>
	</div>
);

export default function LightboxImage({ src, alt }) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			const handleEscape = (e) => {
				if (e.key === 'Escape') {
					setIsOpen(false);
				}
			};
			window.addEventListener('keydown', handleEscape);
			return () => {
				document.body.style.overflow = 'unset';
				window.removeEventListener('keydown', handleEscape);
			};
		}
	}, [isOpen]);

	const handleClick = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<img
				src={src}
				alt={alt}
				className='card-img-top'
				style={{
					height: '200px',
					objectFit: 'cover',
					cursor: 'pointer',
				}}
				onClick={handleClick}
			/>

			{isOpen && ReactDOM.createPortal(<Overlay src={src} alt={alt} onClose={handleClose} />, document.body)}
		</>
	);
}
