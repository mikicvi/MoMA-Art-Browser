import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);
	const { user, logout } = useAuth();

	const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<Link to='/' className='navbar-brand'>
					The Museum Of Modern Art (MoMA) Catalogue Manager
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
						{user ? (
							<>
								<li className='nav-item'>
									<Link to='/profile' className='nav-link'>
										Profile
									</Link>
								</li>
								<li className='nav-item'>
									<button onClick={logout} className='nav-link btn btn-link'>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li className='nav-item'>
									<Link to='/login' className='nav-link'>
										Login
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/register' className='nav-link'>
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
