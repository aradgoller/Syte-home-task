import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// ----------------------------------------------------------------------

export type Props = Omit<DialogProps, 'title' | 'content'> & {
	title: React.ReactNode;
	content?: React.ReactNode;
	action: React.ReactNode;
	onClose: VoidFunction;
};

export default function ConfirmDialog({ title, content, action, open, onClose, ...other }: Props) {
	return (
		<Dialog
			fullWidth
			maxWidth='xs'
			open={open}
			onClose={onClose}
			{...other}
		>
			<DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>
			{content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}
			<DialogActions>
				{action}

				<Button
					variant='outlined'
					color='inherit'
					onClick={onClose}
				>
					Cancel
				</Button>
			</DialogActions>
			 
		</Dialog>
	);
}
