import { useStore } from "@tanstack/react-form";

import { Button, cn } from "rizzui";
import { useFormContext } from "../../form-context";

type ResetButtonProps = {
  lable?: string;
  className?: string;
} & React.ComponentProps<typeof Button>;

const ResetButton = ({ className, lable, ...props }: ResetButtonProps) => {
  const form = useFormContext();

  const [isSubmitting] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button
      type="reset"
      variant="outline"
      className={cn(className)}
      disabled={isSubmitting}
      onClick={() => form.reset()}
      {...props}
    >
      {lable ?? "Reset"}
    </Button>
  );
};
export default ResetButton;
