import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@/ui/utils/class-names';
import FormGroup from '@/app/shared/form-group';

export default function ProductSeo({ className }: { className?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="אופטימיזציה למנועי חיפוש"
      description="הוסף כותרת ותיאור לדף זה"
      className={cn(className)}
    >
      <Input
        label="כותרת דף"
        placeholder="כותרת דף"
        {...register('pageTitle')}
        error={errors.pageTitle?.message as string}
      />
      <Input
        label="מילות מפתח"
        placeholder="מילות מפתח"
        {...register('metaKeywords')}
        error={errors.metaKeywords?.message as string}
      />
      <Input
        label="תיאור דף"
        placeholder="תיאור דף"
        {...register('metaDescription')}
        error={errors.metaDescription?.message as string}
      />
      <Input
        label="קישור למוצר"
        type="url"
        placeholder="https://"
        {...register('productUrl')}
        error={errors.productUrl?.message as string}
      />
    </FormGroup>
  );
}
