"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  PiFile,
  PiFileCsv,
  PiFileDoc,
  PiFilePdf,
  PiFileXls,
  PiFileZip,
  PiTrashBold,
} from "react-icons/pi";
import { ActionIcon, Text, cn } from "rizzui";
import SimpleBar from "./simplebar";
import Upload from "./upload";

// טיפוסי קבצים ואייקונים
const FILE_ICONS: Record<string, React.ReactElement> = {
  "text/csv": <PiFileCsv className="h-5 w-5" />,
  "text/plain": <PiFile className="h-5 w-5" />,
  "application/pdf": <PiFilePdf className="h-5 w-5" />,
  "application/xml": <PiFileXls className="h-5 w-5" />,
  "application/zip": <PiFileZip className="h-5 w-5" />,
  "application/gzip": <PiFileZip className="h-5 w-5" />,
  "application/msword": <PiFileDoc className="h-5 w-5" />,
};

export type AcceptedFileTypes = "img" | "pdf" | "csv" | "imgAndPdf" | "all";

export interface FileUploadProps {
  /** כותרת */
  label?: string;
  // /** כותרת כפתור ההעלאה */
  // btnLabel?: string;
  /** תווית השדה */
  fieldLabel?: string;
  /** תמיכה במספר קבצים */
  multiple?: boolean;
  /** סוגי קבצים שמותר להעלות */
  accept?: AcceptedFileTypes;
  /** פעולה שתופעל כשיש שינוי בקבצים */
  onChange?: (file: File | File[] | null) => void;
  /** הודעת שגיאה */
  error?: string;
  /** סגנון מותאם אישית */
  className?: string;
  /** גובה אזור הגרירה */
  dropzoneHeight?: "sm" | "md" | "lg";
  /** האם להציג את שורת הקבצים באופן קומפקטי */
  compact?: boolean;
  /** קבצים שכבר נבחרו */
  value?: File | File[] | null;
  /** קבצים התחלתיים - משמש רק במצב לא מנוהל (uncontrolled) */
  defaultValue?: File | File[] | null;
}

/**
 * קומפוננטת העלאת קבצים המאפשרת גרירה או בחירה מהמערכת
 */
export default function FileUpload({
  label,

  fieldLabel,
  className,
  multiple = false,
  accept = "all",
  onChange,
  error,
  dropzoneHeight = "md",
  compact = false,
  value,
  defaultValue,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // מגדירים את ניהול הסטייט בהתאם למצב (מנוהל/לא מנוהל)
  const isControlled = value !== undefined;
  const [internalFiles, setInternalFiles] = useState<File[]>(() => {
    // אם הקומפוננטה מנוהלת נשתמש בערך שהועבר, אחרת בערך ברירת המחדל
    const initialValue = isControlled ? value : defaultValue;

    if (!initialValue) return [];
    return Array.isArray(initialValue) ? initialValue : [initialValue];
  });

  // נקבל את הקבצים הנוכחיים בהתאם למצב הקומפוננטה
  const files = isControlled
    ? Array.isArray(value)
      ? value
      : value
      ? [value]
      : []
    : internalFiles;

  // טיפול בבחירת קבצים
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles?.length) return;

    const newFiles = Array.from(uploadedFiles);
    let updatedFiles: File[];

    if (!multiple) {
      // במצב של קובץ בודד, החלף את הקובץ הקיים
      updatedFiles = newFiles;
    } else {
      // במצב של מספר קבצים, הוסף לרשימה הקיימת
      updatedFiles = [...files, ...newFiles];
    }

    // עדכן את הסטייט הפנימי אם הקומפוננטה אינה מנוהלת
    if (!isControlled) {
      setInternalFiles(updatedFiles);
    }

    // קריאה לפונקצית השינוי החיצונית
    if (onChange) {
      if (updatedFiles.length === 0) {
        onChange(null);
      } else if (multiple) {
        onChange(updatedFiles);
      } else {
        onChange(updatedFiles[0]);
      }
    }
  }

  // מחיקת קובץ
  function handleFileDelete(indexToRemove: number) {
    const updatedFiles = files.filter((_, i) => i !== indexToRemove);

    // עדכן את הסטייט הפנימי אם הקומפוננטה אינה מנוהלת
    if (!isControlled) {
      setInternalFiles(updatedFiles);
    }

    // אפס את שדה הקלט
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // קריאה לפונקצית השינוי החיצונית
    if (onChange) {
      if (updatedFiles.length === 0) {
        onChange(null);
      } else if (multiple) {
        onChange(updatedFiles);
      } else {
        onChange(updatedFiles[0]);
      }
    }
  }

  // חישוב גובה אזור הגרירה
  const dropzoneHeightClass = {
    sm: compact ? "min-h-[100px]" : "min-h-[160px]",
    md: compact ? "min-h-[140px]" : "min-h-[200px]",
    lg: compact ? "min-h-[180px]" : "min-h-[260px]",
  }[dropzoneHeight];

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Text
          className={cn(
            "mb-1.5 block font-medium text-gray-700",
            compact && "text-sm"
          )}
        >
          {label}
        </Text>
      )}

      <Upload
        label={fieldLabel}
        ref={fileInputRef}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className={cn(
          "mb-4 justify-center border-dashed bg-gray-50",
          dropzoneHeightClass,
          // הוספת קלאסים למצב קומפקטי
          compact && "p-3 md:ps-6"
        )}
        // העברת מידע על מצב קומפקטי לקומפוננטת Upload
        // compact={compact}
        // אייקון קטן יותר במצב קומפקטי
        iconClassName={cn(
          compact ? "w-16 h-16" : "@3xl:w-44 @3xl:h-44 w-28 shrink-0 @2xl:w-36"
        )}
      />

      {/* הצג שגיאה אם יש */}
      {error && <Text className="mt-1 mb-2 text-xs text-red-500">{error}</Text>}

      {files.length > 0 && (
        <div>
          {multiple && files.length > 1 && (
            <Text className="mb-2 text-gray-500">{files.length} קבצים</Text>
          )}

          <SimpleBar
            className={cn(
              "max-h-[280px]",
              !multiple && "max-h-fit",
              compact && "max-h-[140px]"
            )}
          >
            <div
              className={cn(
                "grid gap-2",
                compact ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"
              )}
            >
              {files.map((file, index) => (
                <FilePreviewItem
                  key={`${file.name}-${index}`}
                  file={file}
                  onDelete={() => handleFileDelete(index)}
                  compact={compact}
                />
              ))}
            </div>
          </SimpleBar>
        </div>
      )}
    </div>
  );
}

// קומפוננטה לתצוגה מקדימה של קבצים
interface FilePreviewProps {
  file: File;
  onDelete: () => void;
  compact?: boolean;
}

function FilePreviewItem({ file, onDelete, compact }: FilePreviewProps) {
  return (
    <div
      className={cn(
        "flex items-center rounded-lg border border-gray-200",
        compact ? "px-2 py-1.5" : "px-3 py-2"
      )}
    >
      <div
        className={cn(
          "relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-100 bg-gray-50",
          compact ? "h-8 w-8" : "h-10 w-10"
        )}
      >
        {file.type.includes("image") ? (
          <Image
            src={URL.createObjectURL(file)}
            fill
            className="object-contain"
            priority
            alt={file.name}
            sizes={compact ? "32px" : "40px"}
          />
        ) : (
          FILE_ICONS[file.type] || (
            <PiFile className={compact ? "h-4 w-4" : "h-5 w-5"} />
          )
        )}
      </div>
      <div className={cn("truncate px-2.5", compact ? "text-xs" : "text-sm")}>
        {file.name}
      </div>
      <ActionIcon
        onClick={onDelete}
        size={compact ? "sm" : "md"}
        variant="flat"
        color="danger"
        className="ms-auto flex-shrink-0"
        title="הסר קובץ"
      >
        <PiTrashBold className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </ActionIcon>
    </div>
  );
}
