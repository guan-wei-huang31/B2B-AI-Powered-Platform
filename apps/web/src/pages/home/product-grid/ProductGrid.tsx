import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { ProductCard } from '@/components/card/ProductCard';
import { Button } from '@/components/ui/button';
import { Product } from '@/model/product';
import { ProductCardProps } from '@/model/product-card';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const hasProduct = products.length > 0;
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [products]);

  const items: ProductCardProps[] = products.map((product) => ({
    id: product.productId,
    title: product.productName,
    description: product.featuresDesc,
    contentWeight: product.weightVolume,
    imageUrl:
      product.images.find((img) => img.mainImage === '1')?.imageUrl ||
      product.images[0]?.imageUrl ||
      '',
  }));

  const visibleProducts = showAll ? items : items.slice(0, 9);

  return (
    <div className="container mx-auto">
      {hasProduct ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleProducts.map((item) => (
              <NavLink to={`/product/${item.id}`} className="w-full h-full" key={item.id}>
                <ProductCard {...item} />
              </NavLink>
            ))}
          </div>
          {products.length > 9 && !showAll && (
            <div className="flex justify-center my-5">
              <Button
                variant="ghost"
                className="text-sm font-bold rounded-full hover:bg-primary hover:text-white shadow-neumorphic ease-in-out duration-500"
                onClick={() => setShowAll(true)}
              >
                SEE MORE
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-lg text-muted-foreground">No products found</p>
      )}
    </div>
  );
}
