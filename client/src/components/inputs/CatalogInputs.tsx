import { Checkbox, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Catalog, Vertical } from '../../utils/types/catalog';
import { LOCALES } from '../../utils/constants';

type Props = {
	setFormState: React.Dispatch<React.SetStateAction<Omit<Catalog, 'indexedAt' | '_id'>>>;
	formState: Omit<Catalog, 'indexedAt' | '_id'>;
};

export const CatalogInputs = ({ formState, setFormState }: Props) => {
	return (
		<Stack rowGap={2}>
			<TextField
				label='Name'
				value={formState.name}
				onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
			/>

			<Select
				value={formState.vertical}
				onChange={(e) => setFormState((prev) => ({ ...prev, vertical: e.target.value as Vertical }))}
			>
				<MenuItem value={Vertical.general}>General</MenuItem>
				<MenuItem value={Vertical.fashion}>Fashion</MenuItem>
				<MenuItem value={Vertical.home}>Home</MenuItem>
			</Select>

			<FormControlLabel
				control={<Checkbox onChange={(e, checked) => setFormState((prev) => ({ ...prev, primary: checked }))} />}
				label='Primary'
			/>

			<Typography>Locales (multiple)</Typography>
			<Select
				multiple
				value={formState.locales}
				onChange={(e) => {
					setFormState((prev) => ({ ...prev, locales: e.target.value as string[] }));
				}}
			>
				{LOCALES.map((locale) => (
					<MenuItem
						key={locale}
						value={locale}
					>
						{locale}
					</MenuItem>
				))}
			</Select>
		</Stack>
	);
};
