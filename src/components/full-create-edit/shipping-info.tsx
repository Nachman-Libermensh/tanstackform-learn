"use client";

import { useCallback } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Input, Switch, Button, ActionIcon } from "rizzui";
import cn from "@/ui/utils/class-names";
import FormGroup from "@/app/shared/form-group";
import { locationShipping } from "@/components/pages/(hydrogen)/ecommerce/products/full-create-edit/form-utils";
import TrashIcon from "@/ui/components/icons/trash";
import { PiPlusBold } from "react-icons/pi";

export default function ShippingInfo({ className }: { className?: string }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locationShipping",
  });

  const addCustomField = useCallback(
    () => append([...locationShipping]),
    [append]
  );

  return (
    <FormGroup
      title="משלוח"
      description="הוסף פרטי משלוח"
      className={cn(className)}
    >
      <Controller
        name="freeShipping"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Switch
            label="משלוח חינם"
            className="col-span-full"
            value={value}
            checked={value}
            onChange={onChange}
          />
        )}
      />

      <Input
        label="מחיר משלוח"
        placeholder="150.00"
        {...register("shippingPrice")}
        error={errors.shippingPrice?.message as string}
        prefix={"$"}
        type="number"
      />
      <Controller
        name="locationBasedShipping"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Switch
            label="משלוח בהתאם למיקום"
            className="col-span-full"
            value={value}
            checked={value}
            onChange={onChange}
          />
        )}
      />

      {fields.map((item, index) => (
        <div key={item.id} className="col-span-full flex gap-4 xl:gap-7">
          <Input
            label="שם מיקום"
            placeholder="שם המיקום"
            className="flex-grow"
            {...register(`locationShipping.${index}.name`)}
          />
          <Input
            label="דמי משלוח"
            placeholder="150.00"
            className="flex-grow"
            {...register(`locationShipping.${index}.value`)}
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
    </FormGroup>
  );
}
