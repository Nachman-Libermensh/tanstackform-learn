import React from "react";
import { cn } from "rizzui";

type FormActionsProps = {
  /** הצמדה לימין או לשמאל או מרכוז */
  align?: "start" | "center" | "end";
  /** הוספת גבול מפריד למעלה */
  divider?: boolean;
  /** מחלקות CSS מותאמות */
  className?: string;
  /** תוכן האיזור */
  children: React.ReactNode;
};

export default function FormActions({
  align = "end",
  divider = true,
  className,
  children,
}: FormActionsProps) {
  return (
    <div
      className={cn(
        "flex gap-3 mt-6 pt-3",
        {
          "border-t": divider,
          "justify-start": align === "start",
          "justify-center": align === "center",
          "justify-end": align === "end",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
