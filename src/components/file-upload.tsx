/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  PiEyeBold,
  PiFile,
  PiFileCsv,
  PiFileDoc,
  PiFilePdf,
  PiFileXls,
  PiFileZip,
  PiTrashBold,
} from "react-icons/pi";
import { ActionIcon, Button, Modal, Text, cn } from "rizzui";
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
  /** האם לאפשר תצוגה מקדימה של תמונות */
  allowImagePreview?: boolean;
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
  allowImagePreview = false,
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
    sm: "min-h-[160px]",
    md: "min-h-[200px]",
    lg: "min-h-[260px]",
  }[dropzoneHeight];

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Text className="mb-1.5 block font-medium text-gray-700">{label}</Text>
      )}

      <Upload
        label={fieldLabel}
        ref={fileInputRef}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className={cn(
          "mb-4 justify-center border-dashed bg-gray-50",
          dropzoneHeightClass
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
                  allowPreview={allowImagePreview}
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
  allowPreview?: boolean;
}
function FilePreviewItem({
  file,
  onDelete,
  compact,
  allowPreview = false,
}: FilePreviewProps) {
  // סטייט לניהול המודל והתצוגות
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});

  // פונקציה לפתיחת/סגירת המודל
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // בדיקה האם הקובץ הוא תמונה וניתן להציג אותו
  const isPreviewable = allowPreview && file.type.includes("image");

  // יצירה ושחרור של URLs לתצוגה מקדימה
  useEffect(() => {
    // יוצר URL רק אם הקובץ הוא תמונה וניתן לתצוגה מקדימה
    if ((isPreviewable && isModalOpen) || file.type.includes("image")) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({
        ...prev,
        [file.name]: fileUrl,
      }));

      // שחרור משאבים בעת עזיבת הקומפוננטה או סגירת המודל
      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    }
  }, [file, isModalOpen, isPreviewable]);

  // מקבל את ה-URL של הקובץ לתצוגה
  const getFileUrl = () => previewUrls[file.name] || "";

  return (
    <>
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
            getFileUrl() ? (
              <Image
                src={getFileUrl()}
                fill
                className="object-contain"
                priority
                alt={file.name}
                sizes={compact ? "32px" : "40px"}
              />
            ) : (
              // הצג אייקון כברירת מחדל אם התמונה לא זמינה
              <PiFile className={compact ? "h-4 w-4" : "h-5 w-5"} />
            )
          ) : (
            FILE_ICONS[file.type] || (
              <PiFile className={compact ? "h-4 w-4" : "h-5 w-5"} />
            )
          )}
        </div>
        <div className={cn("truncate px-2.5", compact ? "text-xs" : "text-sm")}>
          {file.name}
        </div>
        {/* כפתורי פעולה */}
        <div className="ms-auto flex flex-shrink-0 gap-2">
          {/* כפתור תצוגה מקדימה - רק אם הקובץ הוא תמונה ואפשרנו תצוגה מקדימה */}
          {isPreviewable && (
            <ActionIcon
              onClick={toggleModal}
              size={compact ? "sm" : "md"}
              variant="flat"
              color="primary"
              title="הצג תמונה"
            >
              <PiEyeBold className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
            </ActionIcon>
          )}

          {/* כפתור מחיקה */}
          <ActionIcon
            onClick={onDelete}
            size={compact ? "sm" : "md"}
            variant="flat"
            color="danger"
            title="הסר קובץ"
          >
            <PiTrashBold className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          </ActionIcon>
        </div>
        {/* מודל תצוגה מקדימה */}
        <Modal isOpen={isModalOpen} onClose={toggleModal} size="xl">
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <Text className="font-semibold">{file.name}</Text>
              <Button
                variant="text"
                size="sm"
                onClick={toggleModal}
                className="h-auto p-0 font-semibold text-gray-500 underline"
              >
                סגור
              </Button>
            </div>

            <div className="max-h-[70vh] overflow-auto rounded-lg border border-gray-200 bg-gray-50">
              {/* תצוגת תמונה */}
              <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                  src={getFileUrl()}
                  fill
                  className="object-contain"
                  alt={file.name}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

// קומפוננטה לתצוגת קבצי טקסט (משודרגת)
function FileTextPreview({ file }: { file: File }) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // פונקצית סניטציה לתוכן טקסט
  const sanitizeContent = (text: string): string => {
    // סניטציה בסיסית - מסיר תווים מסוכנים
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`/g, "&#x60;");
  };

  // קריאת תוכן הקובץ
  useEffect(() => {
    // מגביל את גודל הקובץ לקריאה
    const MAX_FILE_SIZE = 1024 * 1024; // 1MB

    if (file.size > MAX_FILE_SIZE) {
      setError(
        `הקובץ גדול מדי (${(file.size / 1024 / 1024).toFixed(
          2
        )}MB). תצוגה מוגבלת ל-1MB`
      );
      // נמשיך לקרוא את תחילת הקובץ למרות הגודל
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        if (typeof e.target?.result === "string") {
          // מבצע סניטציה לתוכן לפני הצגתו
          const sanitizedContent = sanitizeContent(e.target.result);
          setContent(sanitizedContent);
        } else {
          throw new Error("תוכן הקובץ אינו תקין");
        }
        setIsLoading(false);
      } catch (err) {
        setError("שגיאה בקריאת הקובץ");
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError("שגיאה בקריאת הקובץ");
      setIsLoading(false);
    };

    // אם הקובץ גדול, נקרא רק את החלק הראשון שלו
    if (file.size > MAX_FILE_SIZE) {
      const slice = file.slice(0, MAX_FILE_SIZE);
      reader.readAsText(slice);
    } else {
      reader.readAsText(file);
    }

    // ניקוי בעת עזיבת הקומפוננטה
    return () => {
      reader.abort();
    };
  }, [file]);

  if (isLoading)
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary"></div>
          <p className="text-sm text-gray-500">טוען תוכן קובץ...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-4">
        <div className="mb-2 rounded-md bg-red-50 p-3">
          <Text className="text-center text-red-600">{error}</Text>
        </div>
        {content && (
          <pre className="max-h-[40vh] whitespace-pre-wrap break-words p-4 text-sm">
            {content}
            <span className="font-bold text-gray-400"> [...]</span>
          </pre>
        )}
      </div>
    );

  return (
    <pre className="max-h-[60vh] whitespace-pre-wrap break-words p-4 text-sm overflow-auto">
      {content}
    </pre>
  );
}
