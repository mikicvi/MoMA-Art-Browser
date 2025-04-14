import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/NavBar.css';

export default function NavBar() {
	const { user, logout } = useAuth();

	return (
		<nav
			className='navbar navbar-expand-lg'
			style={{ backgroundColor: 'var(--background-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
		>
			<div className='container'>
				<Link
					to='/'
					className='navbar-brand d-flex align-items-center'
					style={{
						color: 'var(--primary-color)',
						fontWeight: 'bold',
						transition: 'transform 0.3s ease',
					}}
					onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
					onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
				>
					<i className='bi bi-palette me-2'></i>
					MoMA Art Browser
				</Link>

				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarContent'
					aria-controls='navbarContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navbarContent'>
					<ul className='navbar-nav ms-auto'>
						<li className='nav-item'>
							<Link to='/' className='nav-link px-3 py-2'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/about' className='nav-link px-3 py-2'>
								About this page
							</Link>
						</li>
						{user ? (
							<li className='nav-item dropdown'>
								<a
									className='nav-link dropdown-toggle px-3 py-2'
									href='#'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									Account
								</a>
								<ul className='dropdown-menu dropdown-menu-end'>
									<li>
										<Link className='dropdown-item' to='/profile'>
											Profile
										</Link>
									</li>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<button onClick={logout} className='dropdown-item text-danger'>
											Logout
										</button>
									</li>
								</ul>
							</li>
						) : (
							<li className='nav-item dropdown'>
								<a
									className='nav-link dropdown-toggle px-3 py-2'
									href='#'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									Account
								</a>
								<ul className='dropdown-menu dropdown-menu-end'>
									<li>
										<Link className='dropdown-item' to='/login'>
											Login
										</Link>
									</li>
									<li>
										<Link className='dropdown-item' to='/register'>
											Register
										</Link>
									</li>
								</ul>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
