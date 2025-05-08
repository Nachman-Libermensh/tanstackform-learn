import { useFieldContext } from "../../form-context";
import { Radio, RadioGroup } from "rizzui";
import { ComponentProps } from "react";

// הגדרת סוג אפשרות
type RadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type RadioGroupFieldProps = {
  label?: string;
  options: RadioOption[];
  description?: string;
  orientation?: "horizontal" | "vertical";
} & Omit<
  ComponentProps<typeof RadioGroup>,
  "label" | "value" | "setValue" | "children" | "error"
>;

const RadioGroupField = ({
  label,
  options,
  description,
  orientation = "horizontal",
  ...props
}: RadioGroupFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      {label && <div className="font-medium text-sm">{label}</div>}

      <RadioGroup
        value={field.state.value || ""}
        setValue={(value) => field.handleChange(value)}
        className={
          orientation === "horizontal" ? "flex gap-4" : "flex flex-col gap-2"
        }
        {...props}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            label={option.label}
            value={option.value}
            disabled={option.disabled}
            onBlur={field.handleBlur}
          />
        ))}
      </RadioGroup>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
        <p className="text-sm text-red-500">
          {field.state.meta.errors.join(", ")}
        </p>
      )}
    </div>
  );
};

export default RadioGroupField;
