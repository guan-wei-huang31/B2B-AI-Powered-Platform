import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { FilterKey, SelectedFilterOptions } from '@/model/filter-option';
import { FilterOption } from '@/model/filter-option';
import { Product } from '@/model/product';
import { getProductsWithFilter } from '@/service/core/products-with-filter';

type FilterOptionParams = Record<FilterKey, string[]>;

interface UseProductsProps {
  searchTerm: string;
  selectedFilterOptions: SelectedFilterOptions;
}

export const useProducts = ({ searchTerm, selectedFilterOptions }: UseProductsProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const prevSearchTerm = useRef<string | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const currentRequestId = ++requestId.current;

      try {
        const filterOptionParams: FilterOptionParams = Object.entries(selectedFilterOptions).reduce(
          (acc, [key, value]) => {
            acc[key as FilterKey] = value.map((item) => item.id);
            return acc;
          },
          {} as FilterOptionParams
        );

        const response = await getProductsWithFilter(searchTerm, filterOptionParams);

        if (currentRequestId === requestId.current) {
          setProducts(response.products);

          if (prevSearchTerm.current === null || prevSearchTerm.current !== searchTerm) {
            setFilterOptions(response.filterOptions);
            prevSearchTerm.current = searchTerm;
          }
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(`[useProducts] API Error: ${err.response?.status} - ${err.message}`);
          console.error('API 回應錯誤:', err.response?.data);
        } else if (err instanceof Error) {
          setError(`[useProducts] ${err.message}`);
          console.error('未知錯誤:', err);
        } else {
          setError('[useProducts] An unknown error occurred');
          console.error('未知錯誤:', err);
        }
      } finally {
        if (currentRequestId === requestId.current) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [searchTerm, selectedFilterOptions]);

  return { filterOptions, products, error, isLoading };
};
