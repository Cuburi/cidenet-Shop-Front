import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const useStyles = makeStyles(({ theme }) => ({
	image: {
		width: 128,
		height: 128,
	},
	iconBtn: {
		backgroundColor: 'black',
		color: 'white',
	},
}));

const TableShoppingCart = ({
	shoppingCart,
	addItemShoppingCart,
	removeItemShoppingCart,
}) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const removeItem = (product) => {
		removeItemShoppingCart(product);
		shoppingCart.length === 1 && shoppingCart[0].acount === 0 && navigate('/');
	};
	return (
		<Paper
			sx={{
				width: '100%',
			}}
		>
			<TableContainer sx={{ maxHeight: 400 }}>
				<Table stickyHeader sx={{ minWidth: 500 }} aria-label="sticky table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Poducto</StyledTableCell>
							<StyledTableCell>Nombre</StyledTableCell>
							<StyledTableCell>Talla</StyledTableCell>
							<StyledTableCell>Precio</StyledTableCell>
							<StyledTableCell>Cantidad</StyledTableCell>
							<StyledTableCell>Total</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{shoppingCart.map((product) => (
							<StyledTableRow
								key={product.size.idProduct + '' + product.size.idSize}
							>
								<StyledTableCell component="th" scope="row">
									<img
										src={`data:image/jpeg;base64,${product.size.product.image}`}
										className={classes.image}
										alt="Producto"
									/>
								</StyledTableCell>
								<StyledTableCell>{product.size.product.name}</StyledTableCell>
								<StyledTableCell>{product.size.size.name}</StyledTableCell>
								<StyledTableCell>{` ${Intl.NumberFormat('es-MX', {
									style: 'currency',
									currency: 'MXN',
									minimumFractionDigits: 0,
								}).format(product.size.product.salePrice)}`}</StyledTableCell>
								<StyledTableCell>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											pl: 1,
											pb: 1,
										}}
									>
										<IconButton onClick={() => removeItem(product)}>
											<RemoveIcon className={classes.iconBtn} />
										</IconButton>

										{product.acount}

										<IconButton
											onClick={() =>
												addItemShoppingCart({ ...product, acount: 1 })
											}
										>
											<AddIcon className={classes.iconBtn} />
										</IconButton>
									</Box>
								</StyledTableCell>
								<StyledTableCell>{` ${Intl.NumberFormat('es-MX', {
									style: 'currency',
									currency: 'MXN',
									minimumFractionDigits: 0,
								}).format(
									product.size.product.salePrice * product.acount
								)}`}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default TableShoppingCart;
