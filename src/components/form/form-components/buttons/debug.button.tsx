/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "@tanstack/react-form";
import { useState } from "react";
import { Button, cn, Modal, ActionIcon, Code, Text } from "rizzui";
import { useFormContext } from "../../form-context";
import { MdContentCopy, MdDownload, MdClose } from "react-icons/md";
import toast from "react-hot-toast";

type DebugPart =
  | "values"
  | "errors"
  | "dirtyFields"
  | "touchedFields"
  | "state";

type DebugButtonProps = {
  /** טקסט הכפתור */
  label?: string;
  /** מחלקות CSS לכפתור */
  className?: string;
  /** האם להציג מודל עם המידע */
  showModal?: boolean;
  /** אילו חלקים מהטופס להציג */
  parts?: DebugPart[];
  /** כותרת המודל */
  modalTitle?: string;
  /** הפעלת קולבק אחרי דיבוג */
  onDebug?: (formState: any) => void;
  /** להציג גם בסביבת ייצור (ברירת מחדל: false) */
  showInProduction?: boolean;
} & Omit<React.ComponentProps<typeof Button>, "onClick">;

const DebugButton = ({
  className,
  label = "Debug",
  showModal = true,
  parts = ["values", "errors", "dirtyFields", "touchedFields", "state"],
  modalTitle = "מידע על הטופס",
  onDebug,
  showInProduction = false,
  ...props
}: DebugButtonProps) => {
  const form = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);
  // בדיקה האם להציג את הכפתור בהתבסס על סביבת הריצה
  const isDevelopment = process.env.NODE_ENV !== "production";
  const shouldShow = isDevelopment || showInProduction;

  // אם לא צריך להציג את הכפתור בסביבה הנוכחית, החזר null
  if (!shouldShow) {
    return null;
  }

  const handleDebugClick = () => {
    // מדפיסים לקונסול בצורה מסודרת
    console.log("Form State:", form.store.state);
    console.log("Form Values:", form.store.state.values);
    console.log("Form Errors:", form.store.state.errors);

    // הפעלת קולבק אם קיים
    if (onDebug) {
      onDebug(form.store.state);
    }

    // אם מוגדר להציג מודל
    if (showModal) {
      setIsModalOpen(true);
    }
  };

  const copyToClipboard = () => {
    const data = JSON.stringify(form.state, null, 2);
    navigator.clipboard.writeText(data);
    toast.success("המידע הועתק ללוח!");
  };

  const downloadAsJson = () => {
    const data = JSON.stringify(form.state, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "form-debug-data.json";
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
  };

  // פורמט מסודר של JSON להצגה במודל
  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <>
      <Button
        //   isLoading={isSubmitting}
        type="button"
        variant={props.variant ?? "outline"}
        className={cn(className)}
        //   disabled={isSubmitting}
        onClick={handleDebugClick}
        {...props}
      >
        {label}
      </Button>

      {showModal && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">{modalTitle}</h3>
              <div className="flex gap-2">
                <ActionIcon
                  variant="outline"
                  onClick={copyToClipboard}
                  title="העתק ללוח"
                >
                  <MdContentCopy size={18} />
                </ActionIcon>
                <ActionIcon
                  variant="outline"
                  onClick={downloadAsJson}
                  title="הורד כקובץ JSON"
                >
                  <MdDownload size={18} />
                </ActionIcon>
                <ActionIcon
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  title="סגור"
                >
                  <MdClose size={18} />
                </ActionIcon>
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {parts.includes("values") && (
                <div className="mb-4">
                  <Text as="p" className="font-medium mb-1">
                    ערכי הטופס:
                  </Text>
                  <Code
                    dir="ltr"
                    className="bg-gray-50 p-3 rounded text-sm overflow-x-auto"
                  >
                    {formatJson(form.state.values)}
                  </Code>
                </div>
              )}

              {parts.includes("errors") &&
                form.state.errors &&
                Object.keys(form.state.errors).length > 0 && (
                  <div className="mb-4">
                    <Text as="p" className="font-medium mb-1">
                      שגיאות הטופס:
                    </Text>
                    <Code
                      dir="ltr"
                      className="bg-gray-50 p-3 rounded text-sm overflow-x-auto"
                    >
                      {formatJson(form.state.errors)}
                    </Code>
                  </div>
                )}

              {parts.includes("dirtyFields") && (
                <div className="mb-4">
                  <Text as="p" className="font-medium mb-1">
                    שדות שהשתנו:
                  </Text>
                  <Code
                    dir="ltr"
                    className="bg-gray-50 p-3 rounded text-sm overflow-x-auto"
                  >
                    {formatJson(
                      Object.entries(form.store.state.fieldMeta || {})
                        .filter(
                          ([_, meta]) => (meta as { isDirty: boolean }).isDirty
                        )
                        .reduce<Record<string, boolean>>((acc, [key]) => {
                          acc[key] = true;
                          return acc;
                        }, {})
                    )}
                  </Code>
                </div>
              )}

              {parts.includes("touchedFields") && (
                <div className="mb-4">
                  <Text as="p" className="font-medium mb-1">
                    שדות שנגעו בהם:
                  </Text>
                  <Code dir="ltr">
                    {formatJson(
                      Object.entries(form.store.state.fieldMeta || {})
                        .filter(
                          ([_, meta]) =>
                            (meta as { isTouched: boolean }).isTouched
                        )
                        .reduce<Record<string, boolean>>((acc, [key]) => {
                          acc[key] = true;
                          return acc;
                        }, {})
                    )}
                  </Code>
                </div>
              )}

              {parts.includes("state") && (
                <div className="mb-4">
                  <Text as="p" className="font-medium mb-1">
                    מצב הטופס המלא:
                  </Text>
                  <Code
                    dir="ltr"
                    className="bg-gray-50 p-3 rounded text-sm overflow-x-auto"
                  >
                    {formatJson(form.state)}
                  </Code>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DebugButton;
