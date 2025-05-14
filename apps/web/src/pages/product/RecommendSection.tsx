import { useMemo } from 'react';
import { NavLink } from 'react-router';

import { ProductCard } from '@/components/card/ProductCard';
import { FilterKey, FilterOptionItem } from '@/model/filter-option';
import { Image } from '@/model/image';
import { Product } from '@/model/product';
import { ProductCardProps } from '@/model/product-card';

import { useProducts } from '../home/useProducts';

const selectedFilterOptions: Partial<Record<FilterKey, FilterOptionItem[]>> = {};
interface RecommendSectionProps {
  productId: string;
}

export default function RecommendSection({ productId }: RecommendSectionProps) {
  const { products, isLoading, error } = useProducts({ searchTerm: '', selectedFilterOptions });
  const recommendations = useMemo<ProductCardProps[]>(() => {
    if (isLoading || error || products.length === 0) return [];

    const filteredProducts = products.filter((product) => product.productId !== productId);

    return [...filteredProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((product: Product) => ({
        id: product.productId,
        title: product.productName,
        description: product.featuresDesc,
        contentWeight: product.weightVolume || 'N/A',
        imageUrl:
          product.images.find((img: Image) => img.mainImage === '1')?.imageUrl ||
          product.images[0]?.imageUrl ||
          '/placeholder.svg',
      }));
  }, [error, isLoading, products, productId]);

  return (
    <section className="mt-16">
      <h2 className="text-center font-medium text-xl mb-8">RECOMMENDATION</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.length > 0 ? (
          recommendations.map((item) => (
            <NavLink to={`/product/${item.id}`} key={item.id}>
              <ProductCard {...item} />
            </NavLink>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No recommendations available</p>
        )}
      </div>
    </section>
  );
}
