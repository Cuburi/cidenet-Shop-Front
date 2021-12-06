import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import { UserContextProvider } from './context/UserContext';

function App() {
	return (
		<UserContextProvider>
			<div>
				<Navbar />
				<section>
					<Routes>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/" element={<Home />}></Route>
						<Route path="*" element={<ErrorPage />}></Route>
					</Routes>
				</section>
			</div>
		</UserContextProvider>
	);
}

export default App;
