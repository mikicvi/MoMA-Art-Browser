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
								<div className='mb-3'>
									<label className='form-label'>Username</label>
									<input
										type='text'
										name='username'
										className='form-control'
										value={formData.username}
										onChange={handleChange}
										required
										autoComplete='username'
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
										autoComplete='email'
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
										autoComplete='new-password'
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
										autoComplete='new-password'
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
