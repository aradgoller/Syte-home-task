import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../axiosClient';
import { CATALOGS } from '../../../utils/constants';

export const useFetchCatalogs = <T>() => {
	return useQuery({
		queryKey: [CATALOGS],
		queryFn: () => {
			return axiosClient.get<T>('/catalogs');
		},
	});
};
