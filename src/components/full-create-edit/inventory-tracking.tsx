import { Controller, useFormContext } from 'react-hook-form';
import { Radio, RadioGroup, Input } from 'rizzui';

const options = [
  {
    value: 'yes',
    label: 'עקוב אחר מלאי עבור מוצר זה',
  },
  {
    value: 'no',
    label: 'אל תעקוב אחר מלאי עבור מוצר זה',
  },
  {
    value: 'by-options',
    label: 'עקוב אחר מלאי עבור כל אפשרות',
  },
];

export default function InventoryTracing() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        name="inventoryTracking"
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            value={value}
            setValue={onChange}
            className="col-span-full grid gap-4"
          >
            {options.map((item) => (
              <Radio
                key={item.value}
                value={item.value}
                label={item.label}
                inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-muted dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
              />
            ))}
          </RadioGroup>
        )}
      />

      <Input
        type="number"
        label="מלאי נוכחי"
        placeholder="150"
        {...register('currentStock')}
        error={errors.currentStock?.message as string}
      />
      <Input
        type="number"
        label="מלאי מינימלי"
        placeholder="20"
        {...register('lowStock')}
        error={errors.lowStock?.message as string}
      />
    </>
  );
}
