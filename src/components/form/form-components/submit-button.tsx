import { useStore } from "@tanstack/react-form";
import { useFormContext } from "..";
import { Button, cn } from "rizzui";
// import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  lable?: string;
  className?: string;
};

const SubmitButton = ({ className = "", lable }: SubmitButtonProps) => {
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
    >
      {lable}
    </Button>
  );
};
export default SubmitButton;
