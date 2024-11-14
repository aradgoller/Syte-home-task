import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../../axiosClient';

export const useCreateCatalog = <T>() => {
	return useMutation({
		mutationFn: (newCatalog: T) => {
			return axiosClient.post('/catalogs/create', newCatalog);
		},
	});
};
