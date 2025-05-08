"use client";

import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input, Button, ActionIcon } from "rizzui";
import TrashIcon from "@/ui/components/icons/trash";
import { customFields } from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/form-utils";
import { PiPlusBold } from "react-icons/pi";

export default function CustomFields() {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  const addCustomField = useCallback(() => append([...customFields]), [append]);

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            label="שם שדה מותאם אישית"
            placeholder="שם שדה מותאם אישית"
            className="flex-grow"
            {...register(`customFields.${index}.label`)}
          />
          <Input
            label="ערך שדה מותאם אישית"
            placeholder="ערך שדה מותאם אישית"
            className="flex-grow"
            {...register(`customFields.${index}.value`)}
          />
          {fields.length > 1 && (
            <ActionIcon
              onClick={() => remove(index)}
              variant="flat"
              className="mt-7 shrink-0"
            >
              <TrashIcon className="h-4 w-4" />
            </ActionIcon>
          )}
        </div>
      ))}
      <Button
        onClick={addCustomField}
        variant="outline"
        className="col-span-full ml-auto w-auto"
      >
        <PiPlusBold className="me-2 h-4 w-4" strokeWidth={2} /> הוספת פריט
      </Button>
    </>
  );
}
