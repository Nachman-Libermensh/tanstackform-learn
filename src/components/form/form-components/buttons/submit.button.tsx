import { useStore } from "@tanstack/react-form";

import { Button, cn } from "rizzui";
import { useFormContext } from "../../form-context";

type SubmitButtonProps = {
  lable?: string;
  className?: string;
} & React.ComponentProps<typeof Button>;

const SubmitButton = ({ className, lable, ...props }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button
      isLoading={isSubmitting}
      type="submit"
      className={cn(className)}
      disabled={isSubmitting || !canSubmit}
      {...props}
    >
      {lable ?? "Submit"}
    </Button>
  );
};
export default SubmitButton;
