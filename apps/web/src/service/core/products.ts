import axiosInstance from '@/config/axios';
import { Product } from '@/model/product';

export const getProducts = async (id: string) => {
  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return response.data;
};
