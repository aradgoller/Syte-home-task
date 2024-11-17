import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../../axiosClient';

export const useDeleteCatalog = <T>() => {
	return useMutation({
		mutationFn: (catalogIds: T) => {
			return axiosClient.delete(`/catalogs/delete/?ids=${catalogIds}`);
		},
	});
};
