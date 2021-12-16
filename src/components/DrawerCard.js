import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import useShoppingCart from '../hooks/useShoppingCart';

const DrawerCard = ({ product }) => {
	const { addItemShoppingCart, removeItemShoppingCart } = useShoppingCart();

	return (
		<Card
			sx={{ display: 'flex', maxWidth: 300, maxHeight: 270, padding: '10px' }}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component="div" variant="subtitle1">
						{product.size.product.name}
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						{` ${Intl.NumberFormat('es-MX', {
							style: 'currency',
							currency: 'MXN',
							minimumFractionDigits: 0,
						}).format(product.size.product.salePrice)}`}
					</Typography>
				</CardContent>
				<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
					<IconButton onClick={() => removeItemShoppingCart(product)}>
						<RemoveIcon />
					</IconButton>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						{product.acount}
					</Typography>

					<IconButton
						onClick={() => addItemShoppingCart({ ...product, acount: 1 })}
					>
						<AddIcon />
					</IconButton>
				</Box>
			</Box>
			<CardMedia
				component="img"
				sx={{ width: 151 }}
				image={`data:image/jpeg;base64,${product.size.product.image}`}
				alt={product.size.product.name}
			/>
		</Card>
	);
};

export default DrawerCard;
