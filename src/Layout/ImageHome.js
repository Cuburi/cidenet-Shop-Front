import { Grid } from '@mui/material';
import imageHome from '../assets/image-home.png';

const ImageHome = () => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<img
					src={imageHome}
					alt="moda"
					style={{ width: '100%', height: '250px' }}
				/>
			</Grid>
		</Grid>
	);
};

export default ImageHome;
