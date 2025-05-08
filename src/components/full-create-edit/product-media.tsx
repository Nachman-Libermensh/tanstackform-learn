import { Controller, useFormContext } from "react-hook-form";
import FormGroup from "@/app/shared/form-group";
import cn from "@/ui/utils/class-names";
import FileUpload from "@/app/shared/file-upload";

interface ProductMediaProps {
  className?: string;
}

export default function ProductMedia({ className }: ProductMediaProps) {
  const { control } = useFormContext();

  return (
    <FormGroup
      title="העלה תמונות מוצר חדשות"
      description="העלה את גלריית תמונות המוצרים שלך לכאן"
      className={cn(className, "w-full")}
    >
      <Controller
        name="images"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FileUpload
            className="w-full"
            accept="img"
            // multiple
            label="תמונות מוצר"
            fieldLabel="העלה תמונות המוצר שלך כאן. ניתן להעלות מספר תמונות בבת אחת"
            btnLabel="בחר קובץ"
            onChange={(files) => {
              // אם files הוא מערך של קבצים
              if (Array.isArray(files)) {
                onChange(files);
              }
              // אם files הוא קובץ בודד
              else if (files instanceof File) {
                onChange([files]);
              }
            }}
          />
        )}
      />
    </FormGroup>
  );
}
