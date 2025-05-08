type IVariation = {
  name?: string;
  price?: number | undefined | null;
  stock?: number;
  sku?: string;
  barcode?: string;
};

export type IDefaultValues = {
  barkode?: string;
  variations?: IVariation[];
  variation?: {
    name?: string;
    price?: number | undefined | null;
    stock?: number;
    sku?: string;
    barcode?: string;
  };
};
export const blankVariation: IVariation = {
  name: "",
  price: undefined,
  stock: undefined,
  sku: "",
  barcode: "",
};
export const defaultValues: IDefaultValues = {
  barkode: "",
  variations: [blankVariation],
  variation: {
    name: "",
    price: undefined,
    stock: undefined,
    sku: "",
    barcode: "",
  },
};
