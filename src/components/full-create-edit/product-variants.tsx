"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Input, Button, Switch, Text } from "rizzui";
import { MdAdd, MdDelete } from "react-icons/md";
import FormGroup from "@/app/shared/form-group";
import cn from "@/ui/utils/class-names";
import { ICreateProductDto } from "shared_allcar/dist/products/products.schema";
import { Sources } from "shared_allcar/dist/variation-source/sources.enum";
import { ProductType } from "shared_allcar/dist/product-variation/product-type.enum";

export default function ProductVariants({ className }: { className?: string }) {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ICreateProductDto>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });

  const variations = watch("variations");

  return (
    <FormGroup
      title="וריאציות מוצר"
      description="הזן אחת או יותר וריאציות עם מחירים, מלאי ופרטי צמיג"
      className={cn(className)}
    >
      <div className="flex flex-col gap-10 col-span-full">
        {fields.map((field, index) => {
          const isFreeShipping = variations?.[index]?.free_shipping;

          return (
            <div
              key={field.id}
              className="relative w-full rounded-xl border border-gray-200 p-8 bg-gray-50 shadow-sm"
            >
              <button
                type="button"
                className="absolute top-4 left-4 text-red-600 hover:text-red-800"
                onClick={() => remove(index)}
                title="מחק וריאציה"
              >
                <MdDelete size={20} />
              </button>

              {/* 🧾 מידע בסיסי */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 mb-6">
                <Input
                  label="SKU"
                  {...register(`variations.${index}.sku`)}
                  error={errors?.variations?.[index]?.sku?.message as string}
                />

                <Input
                  label="קוד EAN"
                  {...register(`variations.${index}.tire_details.code_ean`)}
                  error={
                    errors?.variations?.[index]?.tire_details?.code_ean
                      ?.message as string
                  }
                />
                <div className="flex items-center gap-3 mt-2">
                  <Switch
                    switchKnobClassName="scale-y-[-1] -rotate-180"
                    {...register(`variations.${index}.free_shipping`)}
                    checked={isFreeShipping}
                    onChange={(e) =>
                      setValue(
                        `variations.${index}.free_shipping`,
                        e.target.checked
                      )
                    }
                  />
                  <label className="text-sm font-medium">משלוח חינם</label>
                  {!isFreeShipping && (
                    <Input
                      label="מחיר משלוח"
                      suffix={"₪"}
                      type="number"
                      {...register(`variations.${index}.shipping_price`, {
                        valueAsNumber: true,
                      })}
                      error={
                        errors?.variations?.[index]?.shipping_price
                          ?.message as string
                      }
                    />
                  )}
                </div>

                <Input
                  label="מחיר"
                  type="number"
                  suffix={"₪"}
                  {...register(`variations.${index}.sources.0.price`, {
                    valueAsNumber: true,
                  })}
                  error={
                    errors?.variations?.[index]?.sources?.[0]?.price
                      ?.message as string
                  }
                />

                <Input
                  label="מחיר מבצע"
                  type="number"
                  suffix={"₪"}
                  {...register(`variations.${index}.sources.0.sale_price`, {
                    valueAsNumber: true,
                  })}
                  error={
                    errors?.variations?.[index]?.sources?.[0]?.sale_price
                      ?.message as string
                  }
                />

                <Input
                  label="מחיר עלות"
                  suffix={"₪"}
                  type="number"
                  {...register(`variations.${index}.sources.0.cost_price`, {
                    valueAsNumber: true,
                  })}
                  error={
                    errors?.variations?.[index]?.sources?.[0]?.cost_price
                      ?.message as string
                  }
                />

                <Input
                  label="כמות במלאי"
                  type="number"
                  {...register(`variations.${index}.sources.0.stock_quantity`, {
                    valueAsNumber: true,
                  })}
                  error={
                    errors?.variations?.[index]?.sources?.[0]?.stock_quantity
                      ?.message as string
                  }
                />
              </div>

              {/* 🛞 פרטי צמיג */}
              <div className="mt-6 pt-4 border-t">
                <Text as="strong" className="font-semibold text-sm mb-4 block">
                  פרטי צמיג
                </Text>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-5">
                  <Input
                    label="רוחב"
                    type="number"
                    {...register(`variations.${index}.tire_details.width`, {
                      valueAsNumber: true,
                    })}
                    error={
                      errors?.variations?.[index]?.tire_details?.width
                        ?.message as string
                    }
                  />
                  <Input
                    label="גובה"
                    type="number"
                    {...register(`variations.${index}.tire_details.height`, {
                      valueAsNumber: true,
                    })}
                    error={
                      errors?.variations?.[index]?.tire_details?.height
                        ?.message as string
                    }
                  />
                  <Input
                    label="קוטר"
                    {...register(`variations.${index}.tire_details.diameter`)}
                    error={
                      errors?.variations?.[index]?.tire_details?.diameter
                        ?.message as string
                    }
                  />
                  <Input
                    label="פרופיל"
                    {...register(`variations.${index}.tire_details.profile`)}
                    error={
                      errors?.variations?.[index]?.tire_details?.profile
                        ?.message as string
                    }
                  />
                  <Input
                    label="מיקום"
                    {...register(`variations.${index}.tire_details.position`)}
                    error={
                      errors?.variations?.[index]?.tire_details?.position
                        ?.message as string
                    }
                  />
                  <Input
                    label="סוג רכב"
                    {...register(
                      `variations.${index}.tire_details.vehicle_type`
                    )}
                    error={
                      errors?.variations?.[index]?.tire_details?.vehicle_type
                        ?.message as string
                    }
                  />
                  <Input
                    label="הומולוגציה OE"
                    {...register(
                      `variations.${index}.tire_details.oe_homologation`
                    )}
                    error={
                      errors?.variations?.[index]?.tire_details?.oe_homologation
                        ?.message as string
                    }
                  />
                  <Input
                    label="DOT"
                    {...register(`variations.${index}.tire_details.dot`)}
                    error={
                      errors?.variations?.[index]?.tire_details?.dot
                        ?.message as string
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}

        <div className="w-full col-span-full">
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() =>
              append({
                sku: "",
                product_type: ProductType.TIRE,
                shipping_price: null,
                free_shipping: false,
                tire_details: {
                  code_ean: "",
                  width: undefined,
                  height: undefined,
                  diameter: "",
                  profile: "",
                  position: "",
                  vehicle_type: "",
                  oe_homologation: "",
                  dot: "",
                },
                sources: [
                  {
                    source: Sources.SELF,
                    external_system_id: "",
                    price: 0,
                    cost_price: undefined,
                    retail_price: undefined,
                    sale_price: undefined,
                    stock_quantity: 0,
                    inventory_tracking: true,
                    min_stock_quantity: undefined,
                  },
                ],
              })
            }
          >
            <MdAdd className="mr-2" size={20} />
            הוסף וריאציה
          </Button>
        </div>
      </div>
    </FormGroup>
  );
}
