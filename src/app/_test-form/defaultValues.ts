export type IDefaultValues = {
  barkode?: string;
  tests?: string[];
  variation?: {
    name?: string;
    price?: number | undefined | null;
    stock?: number;
    sku?: string;
    barcode?: string;
  };
};

export const defaultValues: IDefaultValues = {
  barkode: "",
  tests: [],
  variation: {
    name: "",
    price: undefined,
    stock: undefined,
    sku: "",
    barcode: "",
  },
};
