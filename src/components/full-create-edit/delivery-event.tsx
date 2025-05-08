import FormGroup from '@/app/shared/form-group';
import { Checkbox, Input } from 'rizzui';
import cn from '@/ui/utils/class-names';
import { DatePicker } from '@/ui/ui/datepicker';
import { Controller, useFormContext } from 'react-hook-form';

export default function DeliveryEvent({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormGroup
      title="תאריך משלוח או אירוע"
      description="הוסף תאריך משלוח או אירוע למוצר"
      className={cn(className)}
    >
      <Controller
        name="isPurchaseSpecifyDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="כן, לקוחות חייבים לציין תאריך לרכישת מוצר זה"
            className="col-span-full"
          />
        )}
      />
      <Input
        label="תאריך משלוח"
        placeholder="תאריך משלוח"
        className="col-span-full"
        {...register('dateFieldName')}
        error={errors.dateFieldName?.message as string}
      />
      <Controller
        name="isLimitDate"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="אני רוצה להגביל את טווח התאריכים"
            className="col-span-full"
          />
        )}
      />
      <Controller
        name="availableDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <DatePicker
            inputProps={{ label: 'תאריך התחלה' }}
            placeholderText="בחר תאריך"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
          />
        )}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <DatePicker
            inputProps={{ label: 'תאריך סיום' }}
            placeholderText="בחר תאריך"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
          />
        )}
      />
    </FormGroup>
  );
}
