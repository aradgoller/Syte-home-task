import { Table as TableMui, TableBody, TableContainer, Container, Card } from '@mui/material';
import TableHead from '../table/TableHead';
import { TableRow } from './TableRow';
import { useState } from 'react';
import { useFetchCatalogs } from '../../api/hooks/queries/useFetchCatalogs';
import { Catalog } from '../../utils/types/catalog';

export const CatalogTable = () => {
	const [selectedRows, setSelectedRows] = useState<Array<Catalog['_id']>>([]);

	const { data: response } = useFetchCatalogs<Catalog[]>();

	const catalogs = response?.data;

	if (!catalogs || catalogs.length === 0) {
		return null;
	}

	const tableHeadWithoutId = Object.keys(catalogs[0]).filter((field) => field !== '_id') as (keyof Catalog)[];

	const handleSelectAllRows = (checked: boolean, catalogIds: Array<Catalog['_id']>) => {
		if (checked) {
			setSelectedRows(catalogIds);
			return;
		}
		setSelectedRows([]);
	};

	const handleSelectRow = (catalogId: Catalog['_id']) => {
		const newSelected = selectedRows.includes(catalogId)
			? selectedRows.filter((id) => id !== catalogId)
			: [...selectedRows, catalogId];

		setSelectedRows(newSelected);
	};

	return (
		<Card sx={{ borderRadius: '8px' }}>
			<Container disableGutters>
				<TableContainer>
					<TableMui>
						<TableHead
							headLabel={tableHeadWithoutId}
							rowCount={catalogs.length}
							selectedRows={selectedRows}
							onSelectAllRows={(checked) => {
								handleSelectAllRows(
									checked,
									catalogs.map((catalog) => catalog._id)
								);
							}}
						/>

						<TableBody>
							{catalogs?.map((catalog) => (
								<TableRow
									key={catalog._id}
									tableHead={tableHeadWithoutId}
									catalog={catalog}
									selected={selectedRows.includes(catalog._id)}
									handleSelectRow={() => handleSelectRow(catalog._id)}
								/>
							))}
						</TableBody>
					</TableMui>
				</TableContainer>
			</Container>
		</Card>
	);
};
