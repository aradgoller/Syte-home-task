import { Checkbox, FormControlLabel, MenuItem, Stack, TextField } from '@mui/material';
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

			<TextField
				value={formState.vertical}
				select
				onChange={(e) => setFormState((prev) => ({ ...prev, vertical: e.target.value as Vertical }))}
				label='Vertical'
			>
				<MenuItem value={Vertical.general}>General</MenuItem>
				<MenuItem value={Vertical.fashion}>Fashion</MenuItem>
				<MenuItem value={Vertical.home}>Home</MenuItem>
			</TextField>

			<FormControlLabel
				control={
					<Checkbox
						checked={formState.primary}
						onChange={(e, checked) => setFormState((prev) => ({ ...prev, primary: checked }))}
					/>
				}
				label='Primary'
			/>

			<TextField
				value={formState.locales}
				onChange={(e) => {
					setFormState((prev) => ({ ...prev, locales: e.target.value as unknown as string[] }));
				}}
				select
				slotProps={{ select: { multiple: true } }}
				label='Locales'
			>
				{LOCALES.map((locale) => (
					<MenuItem
						key={locale}
						value={locale}
					>
						{locale}
					</MenuItem>
				))}
			</TextField>
		</Stack>
	);
};
