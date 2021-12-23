import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

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
				<InputLabel id={text}>{text}</InputLabel>
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
