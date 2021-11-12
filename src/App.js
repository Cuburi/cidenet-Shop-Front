import ImageHome from './Layout/ImageHome';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import Footer from './Layout/Footer';

function App() {
	return (
		<div>
			<Navbar />
			<ImageHome />
			<Products />
			<Footer />
		</div>
	);
}

export default App;
