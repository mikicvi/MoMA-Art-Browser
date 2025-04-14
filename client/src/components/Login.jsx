import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/api/users/login', formData);
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
								<div className='form-floating mb-3'>
									<input
										type='email'
										className='form-control'
										id='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										placeholder='name@example.com'
										required
										autoComplete='email'
									/>
									<label htmlFor='email'>Email address</label>
								</div>
								<div className='form-floating mb-3'>
									<input
										type='password'
										className='form-control'
										id='password'
										name='password'
										value={formData.password}
										onChange={handleChange}
										placeholder='Password'
										required
										autoComplete='current-password'
									/>
									<label htmlFor='password'>Password</label>
								</div>
								<button type='submit' className='btn btn-success w-100'>
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
