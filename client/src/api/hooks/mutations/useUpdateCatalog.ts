import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../../axiosClient';
import { Catalog } from '../../../utils/types/catalog';

export const useUpdateCatalog = <T>(catalogId: Catalog['_id']) => {
	return useMutation({
		mutationFn: (catalogData: T) => {
			return axiosClient.put(`/catalogs/update`, catalogData, { params: { catalogId } });
		},
	});
};
