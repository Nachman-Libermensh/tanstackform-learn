"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Element } from "react-scroll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Alert, Button, Text } from "rizzui";
import cn from "@/ui/utils/class-names";
import FormNav, {
  formParts,
} from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/form-nav";
import ProductSummary from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/product-summary";
import { defaultValues } from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/form-utils";
import ProductMedia from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/product-media";
import PricingInventory from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/pricing-inventory";
import ProductIdentifiers from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/product-identifiers";
import ShippingInfo from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/shipping-info";
import ProductSeo from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/product-seo";
import DeliveryEvent from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/delivery-event";
import ProductVariants from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/product-variants";
import ProductTaxonomies from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/product-tags";
import FormFooter from "@/ui/components/form-footer";
import { useLayout } from "@/layouts/use-layout";
import { LAYOUT_OPTIONS } from "@/config/enums";
import {
  createProductSchema,
  type ICreateProductDto,
} from "shared_allcar/dist/products/products.schema";
import { createProduct, updateProduct } from "@/services/product.service";

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  [formParts.media]: ProductMedia,
  [formParts.variantOptions]: ProductVariants,
  [formParts.tagsAndCategory]: ProductTaxonomies,
};

interface IndexProps {
  slug?: number;
  className?: string;
  product?: ICreateProductDto;
}

export default function CreateEditProduct({
  slug,
  product,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [showPostUpdateOptions, setShowPostUpdateOptions] = useState(false);

  const initialValues = defaultValues(product);
  const methods = useForm<ICreateProductDto>({
    resolver: zodResolver(createProductSchema as any),
    defaultValues: initialValues,
  });

  const {
    watch,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form Errors:", errors);
    }
  }, [errors]);

  const handleCreateProduct = async (data: ICreateProductDto) => {
    const payload = {
      ...data,
      slug: `product-${Math.random().toString(36).substring(2, 10)}`,
    };
    await createProduct(payload);
    toast.success(<Text as="b">המוצר נוצר בהצלחה</Text>);
    // reset();
  };

  const handleEditProduct = async (data: ICreateProductDto) => {
    if (!slug) {
      console.error("❌ שגיאה: מזהה מוצר לא נמצא לעדכון");
      toast.error("שגיאה: מזהה מוצר לא נמצא לעדכון");
      return;
    }
    await updateProduct(slug, data);
    setShowPostUpdateOptions(true);
  };

  const onSubmit: SubmitHandler<ICreateProductDto> = async (data) => {
    try {
      setLoading(true);
      if (slug) {
        await handleEditProduct(data);
      } else {
        await handleCreateProduct(data);
      }
    } catch (error) {
      console.error("❌ שגיאה בטופס מוצר:", error);
      toast.error("שגיאה בעת שמירת המוצר");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="@container">
      <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && "z-[999] 2xl:top-[72px]"
        )}
      />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            "relative z-[19] [&_label.block>span]:font-medium",
            className
          )}
        >
          {showPostUpdateOptions && (
            <Alert color="success" variant="flat" className="mb-6">
              <Text className="font-semibold mb-2">המוצר עודכן בהצלחה.</Text>
              <div className="flex gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    reset(defaultValues(product));
                    setShowPostUpdateOptions(false);
                  }}
                >
                  השאר בדף
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => router.push("/ecommerce/products")}
                >
                  לעמוד המוצרים
                </Button>
              </div>
            </Alert>
          )}

          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? "עדכון מוצר" : "יצירת מוצר"}
          />
        </form>
      </FormProvider>
    </div>
  );
}

// const MAP_STEP_TO_COMPONENT = {
//   [formParts.summary]: ProductSummary,
//   [formParts.media]: ProductMedia,
//   [formParts.variantOptions]: ProductVariants,
//   [formParts.tagsAndCategory]: ProductTaxonomies,
//   // [formParts.productIdentifiers]: ProductIdentifiers,
//   // [formParts.pricingInventory]: PricingInventory,
//   // [formParts.shipping]: ShippingInfo,
//   // [formParts.seo]: ProductSeo,
//   // [formParts.deliveryEvent]: DeliveryEvent,
// };
