import './index.css';

import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/');
	};
	return (
		<>
			<body className="body">
				<div className="div">
					<aside>
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png"
							alt="404 "
						/>
					</aside>
					<main>
						<h1>Perdón!</h1>
						<p>
							O no eres lo suficientemente genial como para visitar esta página
							o no existe <em>. . . Como tu estilo</em>
						</p>
						<button onClick={handleClick}>Mejor compra con nosotros</button>
					</main>
				</div>
			</body>
		</>
	);
};

export default ErrorPage;
