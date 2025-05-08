import { useFieldContext } from "..";
import { Checkbox } from "rizzui";

import { type ComponentProps } from "react";
import { type FieldError } from "../types";

type CheckboxFieldProps = {
  label: string;
  description?: string;
} & Omit<
  ComponentProps<typeof Checkbox>,
  "label" | "checked" | "onChange" | "id" | "onBlur" | "error"
>;

const CheckboxField = ({
  label,
  description,
  ...props
}: CheckboxFieldProps) => {
  const field = useFieldContext<boolean>();

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        iconClassName="scale-y-[-1] -rotate-180"
        helperText={description}
        label={label}
        id={field.name}
        checked={field.state.value}
        onChange={(e) => field.handleChange(e.target.checked)}
        onBlur={field.handleBlur}
        error={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
            ? field.state.meta.errors
                .map((error: FieldError) => error.message)
                .join(", ")
            : undefined
        }
        {...props}
      />
    </div>
  );
};
export default CheckboxField;
