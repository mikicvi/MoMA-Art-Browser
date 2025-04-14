import { useState, useRef } from 'react';
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
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const submitTimeoutRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isSubmitting) return;

		setError('');
		setIsSubmitting(true);

		// Clear any existing timeout
		if (submitTimeoutRef.current) {
			clearTimeout(submitTimeoutRef.current);
		}

		// Set a new timeout
		submitTimeoutRef.current = setTimeout(async () => {
			try {
				if (!formData.username || !formData.email || !formData.password) {
					setError('All fields are required');
					return;
				}

				if (formData.password !== formData.confirmPassword) {
					setError('Passwords do not match');
					return;
				}

				if (formData.password.length < 6) {
					setError('Password must be at least 6 characters long');
					return;
				}

				const response = await axios.post('/api/users/register', {
					username: formData.username,
					email: formData.email,
					password: formData.password,
				});

				if (response.status === 201) {
					navigate('/login');
				}
			} catch (err) {
				setError(err.response?.data?.error || 'Registration failed. Please try again.');
			} finally {
				setIsSubmitting(false);
			}
		}, 100); // Small delay to prevent double submissions
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
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
								<div className='form-floating mb-3'>
									<input
										type='text'
										className='form-control'
										id='username'
										name='username'
										value={formData.username}
										onChange={handleChange}
										placeholder='Username'
										required
										autoComplete='username'
									/>
									<label htmlFor='username'>Username</label>
								</div>
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
										autoComplete='new-password'
									/>
									<label htmlFor='password'>Password</label>
								</div>
								<div className='form-floating mb-3'>
									<input
										type='password'
										className='form-control'
										id='confirmPassword'
										name='confirmPassword'
										value={formData.confirmPassword}
										onChange={handleChange}
										placeholder='Confirm Password'
										required
										autoComplete='new-password'
									/>
									<label htmlFor='confirmPassword'>Confirm Password</label>
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
