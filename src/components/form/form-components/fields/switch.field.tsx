import { useFieldContext } from "../../form-context";
import { Switch } from "rizzui";
import { ComponentProps } from "react";

type SwitchFieldProps = {
  label: string;
  description?: string;
} & Omit<
  ComponentProps<typeof Switch>,
  "label" | "checked" | "onChange" | "id" | "onBlur" | "error" | "helperText"
>;

const SwitchField = ({ label, description, ...props }: SwitchFieldProps) => {
  const field = useFieldContext<boolean>();

  return (
    <div className="space-y-2">
      <Switch
        label={label}
        switchKnobClassName="scale-y-[-1] -rotate-180"
        helperText={description}
        id={field.name}
        checked={field.state.value}
        onChange={(e) => field.handleChange(e.target.checked)}
        onBlur={field.handleBlur}
        error={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
            ? field.state.meta.errors.map((error) => error.message).join(", ")
            : undefined
        }
        {...props}
      />
    </div>
  );
};

export default SwitchField;
