import FormGroup from "@/app/shared/form-group";
import cn from "@/ui/utils/class-names";
import ProductAvailability from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/product-availability";
import InventoryTracing from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/inventory-tracking";
import ProductPricing from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/product-pricing";

interface PricingInventoryProps {
  className?: string;
}

export default function PricingInventory({ className }: PricingInventoryProps) {
  return (
    <>
      <FormGroup
        title="מחירון"
        description="הוסף את תמחור המוצר שלך כאן"
        className={cn(className)}
      >
        <ProductPricing />
      </FormGroup>
      <FormGroup
        title="מעקב מלאי"
        description="הוסף את פרטי מלאי המוצרים שלך כאן"
        className={cn(className)}
      >
        <InventoryTracing />
      </FormGroup>
      <FormGroup
        title="זמינות"
        description="הוסף את פרטי מלאי המוצרים שלך כאן"
        className={cn(className)}
      >
        <ProductAvailability />
      </FormGroup>
    </>
  );
}
