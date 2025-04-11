import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			return;
		}
		try {
			await axios.post('/api/users/register', {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});
			navigate('/login');
		} catch (err) {
			setError(err.response?.data?.error || 'Registration failed');
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
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
								Register
							</h2>
							{error && <div className='alert alert-danger'>{error}</div>}
							<form onSubmit={handleSubmit}>
								<div className='mb-3'>
									<label className='form-label'>Username</label>
									<input
										type='text'
										name='username'
										className='form-control'
										value={formData.username}
										onChange={handleChange}
										required
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Email</label>
									<input
										type='email'
										name='email'
										className='form-control'
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Password</label>
									<input
										type='password'
										name='password'
										className='form-control'
										value={formData.password}
										onChange={handleChange}
										required
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Confirm Password</label>
									<input
										type='password'
										name='confirmPassword'
										className='form-control'
										value={formData.confirmPassword}
										onChange={handleChange}
										required
									/>
								</div>
								<button type='submit' className='btn btn-success w-100'>
									Register
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
