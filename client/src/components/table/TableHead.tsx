import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { Button, IconButton, Stack, TableHead as TableHeadMui, Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { match } from 'ts-pattern';
import DeleteIcon from '@mui/icons-material/Delete';
import { Catalog } from '../../utils/types/catalog';
import { useDeleteCatalog } from '../../api/hooks/mutations/useDeleteCatalog';
import { useQueryClient } from '@tanstack/react-query';
import { CATALOGS } from '../../utils/constants';
import ConfirmDialog from '../dialog/Dialog';
import { useState } from 'react';

type Props = {
	headLabel: (keyof Catalog)[];
	selectedRows: string[];
	rowCount?: number;
	onSelectAllRows: (checked: boolean) => void;
};

export default function TableHead({ rowCount = 0, headLabel, selectedRows, onSelectAllRows }: Props) {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const { mutate: deleteCatalogsMutation } = useDeleteCatalog<string>();

	const queryClient = useQueryClient();

	const formatColumns = (column: keyof Catalog) => {
		return match(column)
			.with('locales', () => 'Multi Locale')
			.otherwise(() => column);
	};

	const handleDeleteCatalogs = () => {
		deleteCatalogsMutation(selectedRows.join(','), {
			onSuccess: () => {
				onSelectAllRows(false);
				setDeleteModalOpen(false);
				queryClient.invalidateQueries({ queryKey: [CATALOGS] });
			},
			onError: (err) => {
				console.log('err: ', err);
			},
		});
	};

	return (
		<TableHeadMui sx={{ bgcolor: '#ededed' }}>
			<TableRow>
				<TableCell padding='checkbox'>
					<Stack
						direction='row'
						columnGap={1}
						sx={{ alignItems: 'center', justifyContent: 'center' }}
					>
						<Checkbox
							checked={!!rowCount && selectedRows.length === rowCount}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectAllRows(event.target.checked)}
						/>
						{!!selectedRows.length && (
							<IconButton onClick={() => setDeleteModalOpen(true)}>
								<DeleteIcon color='action' />
							</IconButton>
						)}
					</Stack>

					<ConfirmDialog
						open={deleteModalOpen}
						onClose={() => setDeleteModalOpen(false)}
						title={<Typography>Are you sure you want to delete those catalogs?</Typography>}
						action={
							<Button
								variant='outlined'
								onClick={handleDeleteCatalogs}
							>
								Confirm
							</Button>
						}
					/>
				</TableCell>

				{headLabel.map((headCell) => (
					<TableCell
						sx={{ fontSize: '16px', fontWeight: 600, color: '#696969' }}
						key={headCell}
					>
						{formatColumns(headCell)}
					</TableCell>
				))}

				<TableCell />
			</TableRow>
		</TableHeadMui>
	);
}
