import axiosInstance from '@/config/axios';
import { FilterKey, FilterOption } from '@/model/filter-option';
import { Product } from '@/model/product';

export interface ProductWithFilter {
  products: Product[];
  filterOptions: FilterOption[];
}

const paramsSerializer = (params: Record<string, string[]>): string => {
  const parts: string[] = [];
  for (const key in params) {
    const value = params[key];
    if (value == null) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
      }
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return parts.join('&');
};

export const getProductsWithFilter = async (
  keyword: string,
  filterOptions: Partial<Record<FilterKey, string[]>>
) => {
  const params = keyword !== '' ? { ...filterOptions, keyword } : filterOptions;

  const response = await axiosInstance.get<ProductWithFilter>('/products-with-filter', {
    params,
    paramsSerializer,
  });

  return response.data;
};
