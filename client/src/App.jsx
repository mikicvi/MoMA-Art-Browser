import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import ArtworkList from './components/ArtworkList';
import AboutPage from './components/AboutPage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
	return (
		<AuthProvider>
			<NavBar />
			<div className='container my-3'>
				<Routes>
					<Route path='/' element={<ArtworkList />} />
					<Route path='/about' element={<AboutPage />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
			</div>
		</AuthProvider>
	);
}

export default App;
