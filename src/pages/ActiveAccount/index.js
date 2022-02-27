import './index.css';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { changePassword } from '../../services/registerService';

const ActiveAccountPage = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/login');
	};

	const { tokenActive } = useParams();

	useEffect(() => {
		changePassword({ tokenActive });
	}, [tokenActive]);

	return (
		<>
			<body className="body">
				<div className="div">
					<aside>
						<img
							src="https://thumbs.dreamstime.com/b/mujer-eligiendo-ropa-en-la-percha-personaje-femenino-una-tienda-de-moda-caricatura-femenina-compras-tiendas-centros-comerciales-o-209933554.jpg"
							alt="active account "
						/>
					</aside>
					<main>
						<h1>Cuenta activada!</h1>
						<p>
							Felicitaciones ahora eres parte de nuestra comunidad tu cuenta ha
							sido activada<em>. . . Como tu estilo</em>
						</p>
						<button onClick={handleClick}>Iniciar sesión</button>
					</main>
				</div>
			</body>
		</>
	);
};

export default ActiveAccountPage;
