import { Routes, Route } from 'react-router-dom';

import { UserContextProvider } from './context/UserContext';
import { ShoppingCartContextProvider } from './context/ShoppingCartContext';

import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import ChangePassword from './pages/ChangePassword';
import PageAdmin from './pages/Admin';

import Navbar from './components/navbar/Navbar';
import { useState } from 'react';
import Notification from './components/Notification';
import PrivateRoute from './components/routesConfig/PrivateRoute';

function App() {
	const [notification, setNotification] = useState(false);

	return (
		<UserContextProvider>
			<ShoppingCartContextProvider>
				<div>
					<Navbar notificationRef={setNotification} />
					<section>
						<Routes>
							<Route path="/login" element={<Login />}></Route>
							<Route path="/" element={<Home />}></Route>
							<Route path="*" element={<ErrorPage />}></Route>
							<Route path="/register" element={<Register />}></Route>
							<Route path="/checkout" element={<Checkout />}></Route>
							<Route
								path="/change-password/:tokenPassword"
								element={<ChangePassword />}
							></Route>
							<Route
								path="/pageAdmin"
								element={
									<PrivateRoute>
										<PageAdmin />
									</PrivateRoute>
								}
							></Route>
						</Routes>
					</section>
				</div>
				{notification && (
					<Notification
						type="error"
						tittle="Error"
						text="No hay productos en el carrito"
					/>
				)}
			</ShoppingCartContextProvider>
		</UserContextProvider>
	);
}

export default App;
