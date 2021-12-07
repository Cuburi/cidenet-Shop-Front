import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Register from './pages/Register';

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
						<Route path="/register" element={<Register />}></Route>
					</Routes>
				</section>
			</div>
		</UserContextProvider>
	);
}

export default App;
