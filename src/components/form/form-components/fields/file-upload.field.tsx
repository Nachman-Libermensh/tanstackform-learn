"use client";

import FileUpload from "@/components/file-upload";
import { useFieldContext } from "../../form-context";
import { ComponentProps } from "react";
import { type FieldError } from "../../types";

/**
 * שדה העלאת קבצים לטפסים
 * משתמש ב-useFieldContext להתחברות למערכת הטפסים
 */
type FileUploadFieldProps = {
  /** כותרת השדה */
  label?: string;
  /** תווית עבור אזור ההעלאה */
  fieldLabel?: string;
} & Omit<
  ComponentProps<typeof FileUpload>,
  "label" | "fieldLabel" | "onChange" | "error" | "value"
>;

const FileUploadField = ({
  label,
  fieldLabel,
  ...props
}: FileUploadFieldProps) => {
  // התחברות להקשר השדה
  const field = useFieldContext<File | File[] | null>();

  // טיפול בשינוי קבצים
  const handleFileChange = (fileOrFiles: File | File[] | null) => {
    field.handleChange(fileOrFiles);
  };

  // ניהול הודעות שגיאה
  const errorMessage =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? field.state.meta.errors
          .map((error: FieldError) => error.message)
          .join(", ")
      : undefined;

  return (
    <div className="space-y-2">
      <FileUpload
        compact
        label={label}
        fieldLabel={fieldLabel}
        onChange={handleFileChange}
        error={errorMessage}
        {...props}
      />
    </div>
  );
};

export default FileUploadField;
