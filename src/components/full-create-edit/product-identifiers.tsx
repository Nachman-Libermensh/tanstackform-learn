import { useFormContext } from "react-hook-form";
import { Input } from "rizzui";
import cn from "@/ui/utils/class-names";
import FormGroup from "@/app/shared/form-group";
import CustomFields from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/custom-fields";

interface ProductIdentifiersProps {
  className?: string;
}

export default function ProductIdentifiers({
  className,
}: ProductIdentifiersProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="מזהה מוצר"
      description="ערוך את פרטי המוצר והמידע הדרוש מכאן"
      className={cn(className)}
    >
      <Input
        label="מספר מסחרי"
        placeholder="12345"
        {...register("tradeNumber")}
        error={errors.tradeNumber?.message as string}
      />
      <Input
        label="מספר יצרן"
        placeholder="145782"
        {...register("manufacturerNumber")}
        error={errors.manufacturerNumber?.message as string}
      />
      <Input
        label="שם מותג"
        placeholder="שם המותג"
        {...register("brand")}
        error={errors.brand?.message as string}
      />
      <Input
        label="מוצר UPC/EAN"
        placeholder="145782"
        {...register("upcEan")}
        error={errors.upcEan?.message as string}
      />
      <CustomFields />
    </FormGroup>
  );
}
