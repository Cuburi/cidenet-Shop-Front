import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import img from './PantalonNegro.jpg';
import { Box } from '@mui/system';

const useStyles = makeStyles(() => ({
	price: {
		alignContent: 'center',
	},
	footerCard: {
		backgroundColor: '#F0F3F8',
	},
}));

const Product = ({ product }) => {
	const classes = useStyles();
	return (
		<Card
			sx={{ maxWidth: 200, maxHeight: 486 }}
			style={{ border: 'none', boxShadow: 'none' }}
		>
			<CardActionArea>
				<CardMedia
					component="img"
					height="300"
					image={img}
					alt="green iguana"
				/>
				<CardContent className={classes.footerCard}>
					<Grid
						container
						justify="center"
						alignItems="center"
						direction="column"
					>
						<Grid item>
							<Typography variant="h5" color="text.secondary">
								{product.name}
							</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={8}>
						<Grid item xs={6}>
							<Box>
								<Typography variant="body2" color="text.secondary">
									Price
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box>
								<Typography variant="body2" color="text.secondary">
									150
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default Product;
