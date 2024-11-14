import { Button, Stack, Typography } from '@mui/material';
import { CatalogTable } from '../components/table/CatalogsTable';

import { useState } from 'react';
import ConfirmDialog from '../components/dialog/Dialog';
import { CatalogInputs } from '../components/inputs/CatalogInputs';
import { useCreateCatalog } from '../api/hooks/mutations/useCreateCatalog';
import { Catalog, Vertical } from '../utils/types/catalog';
import { useQueryClient } from '@tanstack/react-query';
import { CATALOGS } from '../utils/constants';

const initialValues = {
	name: '',
	vertical: Vertical.general,
	locales: [],
	primary: false,
};

export const Home = () => {
	const [createDialogOpen, setCreateDialogOpen] = useState(false);

	const [formState, setFormState] = useState<Omit<Catalog, 'indexedAt' | '_id'>>({ ...initialValues });

	const queryClient = useQueryClient();

	const { mutate: createCatalogMutation } = useCreateCatalog<typeof formState>();

	const handleCreateCatalog = () => {
		createCatalogMutation(formState, {
			onSuccess: () => {
				setCreateDialogOpen(false);
				setFormState({ ...initialValues });
				queryClient.invalidateQueries({ queryKey: [CATALOGS] });
			},
		});
	};

	return (
		<Stack
			alignItems='center'
			width='100vw'
			rowGap={4}
		>
			<Typography
				variant='h2'
				fontWeight={600}
			>
				Catalogs
			</Typography>

			<Stack rowGap={2}>
				<Button
					variant='contained'
					sx={{ width: 'fit-content', textTransform: 'none' }}
					onClick={() => setCreateDialogOpen(true)}
				>
					Add new catalog
				</Button>
				<CatalogTable />
			</Stack>

			<ConfirmDialog
				open={createDialogOpen}
				onClose={() => setCreateDialogOpen(false)}
				action={
					<Button
						variant='outlined'
						onClick={handleCreateCatalog}
					>
						Create
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
		</Stack>
	);
};
