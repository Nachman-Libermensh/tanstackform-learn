
import { ProductType } from 'shared_allcar/dist/product-variation/product-type.enum';
import { ICreateProductDto } from 'shared_allcar/dist/products/products.schema';
import { Sources } from 'shared_allcar/dist/variation-source/sources.enum';
// import { isEmpty } from 'lodash';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    label: '',
    value: '',
  },
];


// export function defaultValues(product?: Partial<ICreateProductDto>): ICreateProductDto {
//   return {
//     name: product?.name ?? '',
//     description: product?.description ?? '',
//     slug: product?.slug ?? `product-${Math.random().toString(36).substring(2, 10)}`,
//     brand_id: product?.brand_id ?? 225,
//     categories: product?.categories ?? [],
//     tags: product?.tags ?? [],
//     images: product?.images ?? [],
//     variations: (product?.variations ?? []).length
//       ? product?.variations?.map((v) => ({
//         name_override: v.name_override ?? '',
//         sku: v.sku ?? '',
//         product_type: v.product_type ?? ProductType.TIRE,
//         free_shipping: v.free_shipping ?? false,
//         shipping_price: v.shipping_price ?? 0,
//         tire_details: {
//           code_ean: v.tire_details?.code_ean ?? '',
//           width: v.tire_details?.width ?? undefined,
//           height: v.tire_details?.height ?? undefined,
//           diameter: v.tire_details?.diameter ?? '',
//           profile: v.tire_details?.profile ?? '',
//           position: v.tire_details?.position ?? '',
//           vehicle_type: v.tire_details?.vehicle_type ?? '',
//           oe_homologation: v.tire_details?.oe_homologation ?? '',
//           dot: v.tire_details?.dot ?? '',
//         },
//         sources:
//           v.sources?.length
//             ? v.sources.map((s) => ({
//               source: s.source ?? Sources.SELF,
//               external_system_id: s.external_system_id ?? '',
//               price: s.price ?? 0,
//               cost_price: s.cost_price ?? 0,
//               retail_price: s.retail_price ?? 0,
//               sale_price: s.sale_price ?? 0,
//               stock_quantity: s.stock_quantity ?? 0,
//               inventory_tracking: s.inventory_tracking ?? true,
//               min_stock_quantity: s.min_stock_quantity ?? 0,
//             }))
//             : [
//               {
//                 source: Sources.SELF,
//                 external_system_id: '',
//                 price: 0,
//                 cost_price: 0,
//                 retail_price: 0,
//                 sale_price: 0,
//                 stock_quantity: 0,
//                 inventory_tracking: true,
//                 min_stock_quantity: 0,
//               },
//             ],
//       }))


//       : [
//         {
//           name_override: '',
//           sku: '',
//           product_type: ProductType.TIRE,
//           free_shipping: false,
//           shipping_price: 0,
//           tire_details: {
//             code_ean: '',
//             width: undefined,
//             height: undefined,
//             diameter: '',
//             profile: '',
//             position: '',
//             vehicle_type: '',
//             oe_homologation: '',
//             dot: '',
//           },
//           sources: [
//             {
//               source: Sources.SELF,
//               external_system_id: '',
//               price: 0,
//               cost_price: 0,
//               retail_price: 0,
//               sale_price: 0,
//               stock_quantity: 0,
//               inventory_tracking: true,
//               min_stock_quantity: 0,
//             },
//           ],
//         },
//       ],
//   };
// }
export function defaultValues(product?: Partial<ICreateProductDto>): ICreateProductDto {
  return {
    name: product?.name ?? '',
    description: product?.description ?? '',
    slug: product?.slug ?? `product-${Math.random().toString(36).substring(2, 10)}`,
    brand_id: product?.brand_id ?? 225,
    categories: product?.categories ?? [],
    tags: product?.tags ?? [],
    images: product?.images ?? [],
    variations: [
      ...(product?.variations?.map((v) => ({
        product_type: v.product_type ?? ProductType.TIRE,
        free_shipping: v.free_shipping ?? false,
        shipping_price: v.shipping_price ?? null,
        name_override: v.name_override ?? undefined,
        sku: v.sku ?? undefined,
        tire_details: v.tire_details ? {
          code_ean: v.tire_details.code_ean,
          width: v.tire_details.width,
          height: v.tire_details.height,
          diameter: v.tire_details.diameter,
          profile: v.tire_details.profile,
          position: v.tire_details.position,
          vehicle_type: v.tire_details.vehicle_type,
          oe_homologation: v.tire_details.oe_homologation,
          dot: v.tire_details.dot,
        } : undefined,
        sources: v.sources?.map(s => ({
          source: s.source ?? Sources.SELF,
          external_system_id: s.external_system_id,
          price: s.price ?? 0,
          cost_price: s.cost_price ?? 0,
          retail_price: s.retail_price ?? 0,
          sale_price: s.sale_price ?? 0,
          stock_quantity: s.stock_quantity ?? 0,
          inventory_tracking: s.inventory_tracking ?? true,
          min_stock_quantity: s.min_stock_quantity ?? 0,
        }))
      })) ?? []),
      // Default variation if no variations exist
      ...((!product?.variations || product.variations.length === 0) ? [{
        product_type: ProductType.TIRE,
        free_shipping: false,
        shipping_price: null,
        name_override: undefined,
        sku: undefined,
        tire_details: undefined,
        sources: [{
          source: Sources.SELF,
          external_system_id: undefined,
          price: 0,
          cost_price: 0,
          retail_price: 0,
          sale_price: 0,
          stock_quantity: 0,
          inventory_tracking: true,
          min_stock_quantity: 0,
        }]
      }] : [])
    ]
  };
}

// export function defaultValues(product?: CreateProductInput) {
//   return {
//     title: product?.title ?? '',
//     sku: product?.sku ?? '',
//     type: product?.type ?? '',
//     categories: product?.categories ?? '',
//     description: product?.description ?? '',
//     price: product?.price ?? undefined,
//     costPrice: product?.costPrice ?? undefined,
//     retailPrice: product?.retailPrice ?? undefined,
//     salePrice: product?.salePrice ?? undefined,
//     inventoryTracking: product?.inventoryTracking ?? '',
//     currentStock: product?.currentStock ?? '',
//     lowStock: product?.lowStock ?? '',
//     productAvailability: product?.productAvailability ?? '',
//     productImages: product?.productImages ?? undefined,
//     tradeNumber: product?.tradeNumber ?? '',
//     manufacturerNumber: product?.manufacturerNumber ?? '',
//     brand: product?.brand ?? '',
//     upcEan: product?.upcEan ?? '',
//     customFields: isEmpty(product?.customFields)
//       ? customFields
//       : product?.customFields,

//     freeShipping: product?.freeShipping ?? false,
//     shippingPrice: product?.shippingPrice ?? undefined,
//     locationBasedShipping: product?.locationBasedShipping ?? false,
//     locationShipping: isEmpty(product?.locationShipping)
//       ? locationShipping
//       : product?.locationShipping,
//     pageTitle: product?.pageTitle ?? '',
//     metaDescription: product?.metaDescription ?? '',
//     metaKeywords: product?.metaKeywords ?? '',
//     productUrl: product?.productUrl ?? '',
//     isPurchaseSpecifyDate: product?.isPurchaseSpecifyDate ?? false,
//     isLimitDate: product?.isLimitDate ?? false,
//     dateFieldName: product?.dateFieldName ?? '',
//     productVariants: isEmpty(product?.productVariants)
//       ? productVariants
//       : product?.productVariants,
//     tags: product?.tags ?? [],
//   };
// }

export const productData = {
  title: 'Apple',
  description: 'Fresh Express Iceberg Garden Salad Blend',
  sku: 'SKU-28935',
  type: 'Digital Product',
  categories: 'Grocery',
  price: 10,
  costPrice: 20,
  retailPrice: 15,
  salePrice: 25,
  productImages: undefined,
  inventoryTracking: 'no',
  currentStock: '150',
  lowStock: '20',
  productAvailability: 'online',
  tradeNumber: '12345',
  manufacturerNumber: '154',
  brand: 'Foska',
  upcEan: 'Ean',
  customFields: [
    {
      label: 'Color',
      value: 'Red',
    },
  ],
  freeShipping: false,
  shippingPrice: 45,
  locationBasedShipping: true,
  locationShipping: [
    {
      name: 'USA',
      shippingCharge: '150',
    },
  ],
  pageTitle: 'apple',
  metaDescription: 'apple',
  metaKeywords: 'grocery, foods',
  productUrl: 'http://localhost:3000/',
  isPurchaseSpecifyDate: true,
  isLimitDate: true,
  dateFieldName: 'Date Field',
  productVariants: [
    {
      name: 'Jhon',
      value: '150',
    },
  ],
  tags: ['iPhone', 'mobile'],
};

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
  {
    label: 'Images & Gallery',
    value: 'images_gallery',
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing_inventory',
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: 'product_identifiers',
  },
  {
    label: 'Shipping & Availability',
    value: 'shipping_availability',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Variant Options',
    value: 'variant_options',
  },
];

// Category option
export const categoryOption = [
  {
    value: 'fruits',
    label: 'פירות',
  },
  {
    value: 'grocery',
    label: 'מצרכים',
  },
  {
    value: 'meat',
    label: 'בשר',
  },
  {
    value: 'cat food',
    label: 'מזון לחתולים',
  },
];

// Type option
export const typeOption = [
  {
    value: ProductType.TIRE,
    label: 'צמיג',
  }
];

// Variant option
export const variantOption = [
  {
    value: 'single',
    label: 'יחיד',
  },
  {
    value: 'multiple',
    label: 'מרובה',
  },
];
