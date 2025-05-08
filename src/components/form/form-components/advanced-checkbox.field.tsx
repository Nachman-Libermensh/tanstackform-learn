import { useFieldContext } from "..";
import { AdvancedCheckbox, Text } from "rizzui";
import { ComponentProps, ReactNode } from "react";

type AdvancedCheckboxFieldProps = {
  value: string;
  children: ReactNode;
} & Omit<
  ComponentProps<typeof AdvancedCheckbox>,
  "checked" | "onChange" | "name" | "onBlur"
>;

const AdvancedCheckboxField = ({
  value,
  children,
  className,
  ...props
}: AdvancedCheckboxFieldProps) => {
  const field = useFieldContext<string[]>();
  console.log("checkbox renerd");

  const isChecked = field.state.value.includes(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newValue = checked
      ? [...field.state.value, value]
      : field.state.value.filter((v) => v !== value);
    field.handleChange(newValue);
  };

  const errorMessage =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? field.state.meta.errors.map((err) => err.message).join(", ")
      : null;

  return (
    <div className="space-y-1">
      <AdvancedCheckbox
        value={value}
        name={field.name}
        checked={isChecked}
        onChange={handleChange}
        onBlur={field.handleBlur}
        className={className}
        {...props}
      >
        {children}
      </AdvancedCheckbox>
      {errorMessage && (
        <Text className="text-sm text-red truncate">{errorMessage}</Text>
      )}
    </div>
  );
};

export default AdvancedCheckboxField;
