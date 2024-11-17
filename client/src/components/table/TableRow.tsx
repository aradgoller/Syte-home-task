import { Button, Checkbox, TableCell, TableRow as TableRowMui } from '@mui/material';
import { match } from 'ts-pattern';
import { format } from 'date-fns';
import { Catalog } from '../../utils/types/catalog';
import { useState } from 'react';
import ConfirmDialog from '../dialog/Dialog';
import { CatalogInputs } from '../inputs/CatalogInputs';
import { useUpdateCatalog } from '../../api/hooks/mutations/useUpdateCatalog';
import { useQueryClient } from '@tanstack/react-query';
import { CATALOGS } from '../../utils/constants';

type Props = {
	tableHead: (keyof Catalog)[];
	catalog: Catalog;
	selected: boolean;
	handleSelectRow: VoidFunction;
};

export const TableRow = ({ tableHead, catalog, selected, handleSelectRow }: Props) => {
	const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

	const initialValues: Omit<Catalog, 'indexedAt' | '_id'> = {
		locales: catalog.locales,
		name: catalog.name,
		primary: catalog.primary,
		vertical: catalog.vertical,
	};

	const [formState, setFormState] = useState<typeof initialValues>(initialValues);

	const queryClient = useQueryClient();

	const { mutate: updateCatalogMutation } = useUpdateCatalog<typeof initialValues>(catalog._id);

	const getValueByColumn = (column: keyof Catalog) => {
		return match(column)
			.with('locales', (value) => {
				return catalog[value].length > 1 ? 'Yes' : 'No';
			})
			.with('primary', (value) => {
				return catalog[value] ? 'Yes' : 'No';
			})
			.with('indexedAt', (value) => format(catalog[value], 'MMM d, yyyy h:mm a'))
			.otherwise((value) => catalog[value]);
	};

	const handleUpdateCatalog = () => {
		updateCatalogMutation(formState, {
			onSuccess: () => {
				setUpdateDialogOpen(false);
				queryClient.invalidateQueries({ queryKey: [CATALOGS] });
			},
			onError: (err) => {
				console.log('err: ', err);
			},
		});
	};

	const handleCloseDialog = () => {
		setUpdateDialogOpen(false);
		setFormState(initialValues);
	};

	return (
		<TableRowMui hover>
			<TableCell padding='checkbox'>
				<Checkbox
					checked={selected}
					onClick={handleSelectRow}
				/>
			</TableCell>

			{tableHead?.map((tableColumn) => {
				return <TableCell key={tableColumn}>{getValueByColumn(tableColumn)}</TableCell>;
			})}

			<TableCell>
				<Button
					sx={{ textTransform: 'none' }}
					onClick={() => setUpdateDialogOpen(true)}
				>
					Edit
				</Button>
			</TableCell>

			<ConfirmDialog
				open={updateDialogOpen}
				onClose={handleCloseDialog}
				action={
					<Button
						variant='outlined'
						onClick={handleUpdateCatalog}
					>
						Update
					</Button>
				}
				content={
					<CatalogInputs
						formState={formState}
						setFormState={setFormState}
					/>
				}
				title='Create Catalog'
			/>
		</TableRowMui>
	);
};
