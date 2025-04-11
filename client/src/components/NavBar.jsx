import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
	const { user, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav
			className='navbar navbar-expand-lg'
			style={{ backgroundColor: 'var(--background-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
		>
			<div className='container'>
				<Link to='/' className='navbar-brand' style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
					MoMA Art Browser
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					onClick={() => setIsOpen(!isOpen)}
					style={{ border: 'none' }}
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
					<ul className='navbar-nav ms-auto'>
						<li className='nav-item'>
							<Link to='/' className='btn btn-link nav-link'>
								Home
							</Link>
						</li>
						{user ? (
							<>
								<li className='nav-item'>
									<Link to='/profile' className='btn btn-link nav-link'>
										Profile
									</Link>
								</li>
								<li className='nav-item'>
									<button onClick={logout} className='btn btn-danger nav-link'>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li className='nav-item me-2'>
									<Link to='/login' className='btn btn-primary'>
										Login
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/register' className='btn btn-success'>
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
