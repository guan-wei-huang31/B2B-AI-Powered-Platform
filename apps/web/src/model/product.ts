import { Application } from '@/model/application';
import { Healthclaim } from '@/model/healthclaim';
import { Image } from '@/model/image';
import { Ingredient } from '@/model/ingredients';
import { MaterialCategory } from '@/model/material-category';
import { MaterialForm } from '@/model/material-form';
import { Supplier } from '@/model/supplier';

export interface Product {
  productId: string;
  productName: string;
  placeOfOrigin: string | null;
  manufacturingLocation: string;
  weightVolume: string;
  featuresDesc: string;
  materialCat: MaterialCategory | null;
  materialForm: MaterialForm | null;
  applications: Application[];
  ingredients: Ingredient[];
  suppliers: Supplier[];
  healthclaims: Healthclaim[];
  images: Image[];
}
