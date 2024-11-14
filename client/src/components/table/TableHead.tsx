import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { IconButton, Stack, TableHead as TableHeadMui } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import type { SxProps, Theme } from '@mui/material/styles';
import { match } from 'ts-pattern';
import DeleteIcon from '@mui/icons-material/Delete';
import { Catalog } from '../../utils/types/catalog';

type Props = {
	headLabel: (keyof Catalog)[];
	rowCount?: number;
	numSelected?: number;
	onSelectAllRows: (checked: boolean) => void;
	sx?: SxProps<Theme>;
};

export default function TableHead({ rowCount = 0, headLabel, numSelected = 0, onSelectAllRows, sx }: Props) {
	const formatColumns = (column: keyof Catalog) => {
		return match(column)
			.with('locales', () => 'Multi Locale')
			.otherwise(() => column);
	};

	return (
		<TableHeadMui sx={sx}>
			<TableRow>
				{onSelectAllRows && (
					<TableCell padding='checkbox'>
						<Stack
							direction='row'
							columnGap={1}
							sx={{ alignItems: 'center', justifyContent: 'center' }}
						>
							<Checkbox
								checked={!!rowCount && numSelected === rowCount}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectAllRows(event.target.checked)}
							/>
							{!!numSelected && (
								<IconButton>
									<DeleteIcon color='action' />
								</IconButton>
							)}
						</Stack>
					</TableCell>
				)}

				{headLabel.map((headCell) => (
					<TableCell
						sx={{ fontSize: '16px', fontWeight: 600, color: '#696969' }}
						key={headCell}
					>
						{formatColumns(headCell)}
					</TableCell>
				))}

				<TableCell></TableCell>
			</TableRow>
		</TableHeadMui>
	);
}
