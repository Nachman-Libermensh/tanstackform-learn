import { useFieldContext } from "..";
import { AdvancedRadio, RadioGroup, Text } from "rizzui";
import { ComponentProps, ReactNode } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

// הגדרת סוג אפשרות מתקדמת
type AdvancedRadioOption = {
  value: string;
  title: string;
  description?: string;
  disabled?: boolean;
  icon?: ReactNode;
};

type AdvancedRadioGroupFieldProps = {
  label?: string;
  options: AdvancedRadioOption[];
  description?: string;
  columns?: 1 | 2 | 3 | 4;
  showIcons?: boolean;
} & Omit<
  ComponentProps<typeof RadioGroup>,
  "label" | "value" | "setValue" | "children" | "error"
>;

const AdvancedRadioGroupField = ({
  label,
  options,
  description,
  columns = 1,
  showIcons = true,
  ...props
}: AdvancedRadioGroupFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      {label && <div className="font-medium text-sm">{label}</div>}

      <RadioGroup
        value={field.state.value || ""}
        setValue={(value) => field.handleChange(value)}
        className={`grid grid-cols-1 ${
          columns === 1
            ? ""
            : columns === 2
              ? "sm:grid-cols-2"
              : columns === 3
                ? "sm:grid-cols-3"
                : "sm:grid-cols-4"
        } gap-4`}
        {...props}
      >
        {options.map((option) => (
          <AdvancedRadio
            key={option.value}
            name={field.name}
            value={option.value}
            disabled={option.disabled}
            inputClassName="[&:checked~span_.icon]:block"
            onBlur={field.handleBlur}
          >
            <span className="flex justify-between">
              <Text as="b">{option.title}</Text>
              {showIcons && (
                <CheckCircleIcon className="icon hidden h-5 w-5 text-primary" />
              )}
            </span>
            {option.description && <Text>{option.description}</Text>}
            {option.icon && <div className="mt-2">{option.icon}</div>}
          </AdvancedRadio>
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

export default AdvancedRadioGroupField;
