import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Product } from '@/model/product';
import { getProducts } from '@/service/core/products';

import ProductImageCard from './ProductImageCard';
import ProductTable from './ProductTable';
import RecommendSection from './RecommendSection';

export default function ProductPage() {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDDe7gzMQHgqjltST4_lk1J7RZlp8WkjQI';
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error('pid is undefined.');
        return;
      }

      try {
        const response = await getProducts(id);
        setProduct(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const ingredients = product?.ingredients?.map((e) => e.ingredientsName).join(', ') ?? 'N/A';

  const hashtags = [
    ...(product?.applications?.map((e) => e.applicationName) ?? []),
    ...(product?.healthclaims?.map((e) => e.healthclaimName) ?? []),
    ...(product?.materialCat?.materialCatName ? [product.materialCat.materialCatName] : []),
    ...(product?.materialForm?.materialFormName ? [product.materialForm.materialFormName] : []),
  ];

  const productInfo = [
    { label: 'Ingredients', value: ingredients ?? 'N/A' },
    { label: 'Product Weight/Volume', value: product?.weightVolume ?? 'N/A' },
    { label: 'Supplier', value: product?.suppliers[0]?.supplierName ?? 'N/A' },
    { label: 'Place of Origin', value: product?.placeOfOrigin ?? 'N/A' },
    { label: 'Manufacturing Location', value: product?.manufacturingLocation ?? 'N/A' },
    { label: 'Best Before Date', value: '2025/05/01' },
  ];

  if (!id) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {product && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="w-full lg:w-1/3 space-y-8">
            <ProductImageCard images={product?.images ?? []} />
          </div>

          {/* Right column */}
          <div className="w-full lg:w-2/3 space-y-8">
            <h1 className="text-3xl font-bold">{product?.productName}</h1>
            <p className="mb-3 text-wrap">{product?.featuresDesc}</p>
            <div className="flex gap-2 flex-wrap">
              {hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="rounded-2xl bg-primary px-3 py-1 text-white text-sm whitespace-nowrap"
                >
                  {hashtag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold !my-3">PRODUCT INFORMATION</h2>
            <ProductTable data={productInfo} headerBgColor="bg-secondary" />

            {product?.manufacturingLocation && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-3">Manufacturing Location</h2>
                <iframe
                  title="Manufacturing Location"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
                    product.manufacturingLocation
                  )}`}
                  className="rounded-lg shadow-lg w-full h-[300px]"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <RecommendSection productId={id} />
    </div>
  );
}
