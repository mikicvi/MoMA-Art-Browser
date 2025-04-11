import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/api/users/login', { email, password });
			login(response.data.user, response.data.token);
			navigate('/profile');
		} catch (err) {
			setError(err.response?.data?.message || 'Failed to login');
		}
	};

	return (
		<div className='container mt-5'>
			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<div
						className='card'
						style={{
							border: '1px solid rgba(66, 66, 66, 0.18)',
							borderRadius: '12px',
							boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
						}}
					>
						<div className='card-body p-4'>
							<h2 className='text-center mb-4' style={{ color: 'var(--primary-color)' }}>
								Login
							</h2>
							{error && <div className='alert alert-danger'>{error}</div>}
							<form onSubmit={handleSubmit}>
								<div className='mb-3'>
									<label className='form-label'>Email</label>
									<input
										type='email'
										className='form-control'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Password</label>
									<input
										type='password'
										className='form-control'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<button type='submit' className='btn btn-primary w-100'>
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
