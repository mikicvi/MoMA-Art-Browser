import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar() {
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

	const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<Link to='/' className='navbar-brand'>
					Art Catalogue
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					onClick={handleNavCollapse}
					aria-expanded={!isNavCollapsed}
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id='navbarNav'>
					<ul className='navbar-nav ms-auto'>
						<li className='nav-item'>
							<Link to='/' className='nav-link'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/about' className='nav-link'>
								About
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
