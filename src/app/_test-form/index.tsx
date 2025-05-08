/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */
"use client";

import { Suspense } from "react";
import { Button, Loader, Text } from "rizzui";

import { useAppForm } from "@/components/form";
import { ProductVariationForm } from "./ProductVariationForm";
import { blankVariation, defaultValues } from "./defaultValues";
import toast from "react-hot-toast";
import { testSchema } from "./schema";
const handleSubmit = async (data: any) => {
  console.log("data", data);
  toast.promise(
    new Promise((resolve) => setTimeout(resolve, 2000)),
    {
      loading: <Text dir="rtl">שולח נתונים...</Text>,
      success: <Text dir="rtl">הפעולה הושלמה בהצלחה!</Text>,
      error: <Text dir="rtl">שגיאה בשליחת הנתונים</Text>,
    },
    {
      style: {
        width: "250px",
      },
    }
  );
  // הודעה לאחר 20 שניות כשכאילו חזר הצלחה
  console.log("הפעולה הושלמה בהצלחה!");
};
const TestForm = () => {
  const form = useAppForm({
    defaultValues: defaultValues,
    onSubmit: handleSubmit,
    validators: {
      onChange: testSchema,
    },
  });
  return (
    <Suspense fallback={<Loader />}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
          console.log("submit");
        }}
      >
        <form.AppField
          name="barkode"
          children={(field) => <field.TextField label="Barkode" />}
        />
        <form.Field name="variations" mode="array">
          {(field) => {
            return (
              <div>
                {(field.state.value || []).map((_, i) => {
                  return (
                    <form.AppField key={i} name={`variations[${i}].name`}>
                      {(subField) => {
                        return (
                          <subField.TextField
                            key={i}
                            label={`Test ${i + 1}`}
                            placeholder="Test"
                          />
                        );
                      }}
                    </form.AppField>
                  );
                })}
                <Button
                  onClick={() => field.pushValue(blankVariation)}
                  type="button"
                >
                  הוסף וריאציה
                </Button>
              </div>
            );
          }}
        </form.Field>
        <ProductVariationForm form={form} title={"וריאציות"} />

        <form.AppForm children={<form.ResetButton />} />

        <form.AppForm children={<form.DebugButton />} />

        <form.AppForm children={<form.SubmitButton />} />
      </form>
    </Suspense>
  );
};
export default TestForm;
