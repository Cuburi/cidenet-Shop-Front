import { Routes, Route } from 'react-router-dom';

import { UserContextProvider } from './context/UserContext';
import { ShoppingCartContextProvider } from './context/ShoppingCartContext';

import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Home from './pages/Home';

import Navbar from './components/navbar/Navbar';

function App() {
	return (
		<UserContextProvider>
			<ShoppingCartContextProvider>
				<div>
					<Navbar />
					<section>
						<Routes>
							<Route path="/login" element={<Login />}></Route>
							<Route path="/" element={<Home />}></Route>
							<Route path="*" element={<ErrorPage />}></Route>
							<Route path="/register" element={<Register />}></Route>
							<Route path="/checkout" element={<Checkout />}></Route>
						</Routes>
					</section>
				</div>
			</ShoppingCartContextProvider>
		</UserContextProvider>
	);
}

export default App;
