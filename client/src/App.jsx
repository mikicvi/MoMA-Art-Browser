import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ArtworkList from './components/ArtworkList';
import AboutPage from './components/AboutPage';

function App() {
	return (
		<>
			<NavBar />
			<div className='container my-3'>
				<Routes>
					<Route path='/' element={<ArtworkList />} />
					<Route path='/about' element={<AboutPage />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
