/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */
"use client";

import { Suspense } from "react";
import { Button, Grid, Loader, Text } from "rizzui";

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
        <form.FormLayout dir="rtl" bordered spacing={"8"}>
          <form.AppField
            name="barkode"
            children={(field) => <field.TextField label="Barkode" />}
          />
          <form.Field name="variations" mode="array">
            {(field) => {
              return (
                <div className="space-y-4">
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
          <form.FormSection
            collapsible
            title="פרטי מוצר"
            description="פרטי מוצר"
          >
            <Grid columns="2" gap="4">
              <form.AppField
                name="name"
                children={(field) => <field.TextField label="Name" />}
              />
              <form.Subscribe
                selector={(state) => state.values.name}
                children={(name) =>
                  name === "test" && (
                    <ProductVariationForm form={form} title="פרטי צמיג" />
                  )
                }
              />
            </Grid>
          </form.FormSection>

          <form.FormActions align="start" divider>
            <form.AppForm children={<form.ResetButton />} />

            <form.AppForm children={<form.DebugButton />} />

            <form.AppForm children={<form.SubmitButton />} />
          </form.FormActions>
        </form.FormLayout>
      </form>
    </Suspense>
  );
};
export default TestForm;
