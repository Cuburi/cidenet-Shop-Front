import { InputLabel, FormControl, MenuItem, Select, Grid } from '@mui/material';
import { useState } from 'react';

const SelectFilter = ({ valueCriteria = [], id, text, handleChangeRef }) => {
	const [criteria, setCriteria] = useState([]);
	const handleChange = (event) => {
		setCriteria(event.target.value);
		handleChangeRef(event.target.value, id);
	};
	return (
		<Grid sx={{ display: 'flex', alignItems: 'center' }}>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id={text}>{id}</InputLabel>
				<Select
					labelId={text}
					id={id}
					value={criteria}
					onChange={handleChange}
					label={id}
				>
					<MenuItem value="" id="none">
						<em>None</em>
					</MenuItem>

					{valueCriteria.map((criteriaValue) => (
						<MenuItem value={criteriaValue.name} key={criteriaValue.id}>
							<em>{criteriaValue.name}</em>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Grid>
	);
};
export default SelectFilter;
