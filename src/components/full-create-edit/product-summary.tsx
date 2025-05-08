import { Controller, useFormContext } from "react-hook-form";
import { Input } from "rizzui";
import cn from "@/ui/utils/class-names";
import FormGroup from "@/app/shared/form-group";
import {
  categoryOption,
  typeOption,
} from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/form-utils";
import dynamic from "next/dynamic";
import SelectLoader from "@/ui/components/loader/select-loader";
import QuillLoader from "@/ui/components/loader/quill-loader";
import SelectLookup from "@/components/global/select/SelectLookup";
import SelectMultiLookup from "@/components/global/select/SelectMultiLookup";

const Select = dynamic(() => import("rizzui").then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import("@/ui/ui/quill-editor"), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="תקציר"
      description="ערוך את תיאור המוצר ופרטים בסיסיים"
      className={cn(className)}
    >
      <Input
        label="שם המוצר"
        placeholder="לדוגמה: צמיג לרכב פרטי"
        {...register("name")}
        error={errors.name?.message as string}
      />

      <Controller
        name="brand_id"
        control={control}
        render={({ field }) => (
          <SelectLookup
            {...field}
            onSelect={field.onChange}
            lookupName="brand"
            label="מותג"
            // placeholder="בחר מותג"
            // error={errors?.brand_id?.message as string}
          />
        )}
      />

      <Controller
        name="variations.0.product_type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="h-auto"
            options={typeOption}
            value={value}
            onChange={onChange}
            label="סוג מוצר"
            // error={errors?.variations?.[0]?.product_type?.message as string}
            getOptionValue={(option) => option.value}
            placeholder="בחר סוג מוצר"
          />
        )}
      />
      {/* <Controller
        name="categories"
        control={control}
        render={({ field }) => (
          <SelectMultiLookup
            {...field}
            lookupName="category"
            label="קטגוריות"
            placeholder="בחר קטגוריות"
            error={errors?.categories?.message as string}
          />
        )}
      /> */}

      <Controller
        name="categories"
        control={control}
        render={({ field }) => (
          <SelectLookup
            lookupName="category"
            value={field.value}
            onSelect={(val) => field.onChange([val])}
            label="קטגוריה"
            // error={errors?.categories?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="תיאור"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />
    </FormGroup>
  );
}
