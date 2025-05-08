import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext } from "./form-context";

/**
 * קומפוננטות מבנה טופס
 */
const FormLayout = lazy(() => import("./form-components/sections/form-layout"));
const FormSection = lazy(
  () => import("./form-components/sections/form-section")
);
const FormActions = lazy(
  () => import("./form-components/sections/form-actions")
);
const SubmitButton = lazy(
  () => import("./form-components/buttons/submit.button")
);
const ResetButton = lazy(
  () => import("./form-components/buttons/reset.button")
);
const DebugButton = lazy(
  () => import("./form-components/buttons/debug.button")
);
/**
 * שדות קלט בסיסיים
 */
const TextField = lazy(() => import("./form-components/fields/text.field"));
const TextAreaField = lazy(
  () => import("./form-components/fields/text-area.field")
);
const CheckboxField = lazy(
  () => import("./form-components/fields/checkbox.field")
);

const AdvancedCheckboxField = lazy(
  () => import("./form-components/fields/advanced-checkbox.field")
);

const PasswordInputField = lazy(
  () => import("./form-components/fields/password-input.field")
);
// const DatePickerField = lazy(
//   () => import("./form-components/fields/date-picker.field")
// );
// const FileUploadField = lazy(
//   () => import("./form-components/fields/file-upload.field")
// );

/**
 * שדות בחירה
 */
const SelectField = lazy(() => import("./form-components/fields/select.field"));
// const SelectLookupField = lazy(
//   () => import("./form-components/fields/select-lookup.field")
// );
// const SelectMultiLookupField = lazy(
//   () => import("./form-components/fields/select-multi-lookup.field")
// );
// const SelectUserField = lazy(
//   () => import("./form-components/fields/select-user.field")
// );

/**
 * שדות רדיו
 */
const RadioGroupField = lazy(
  () => import("./form-components/fields/radio-group.field")
);
const AdvancedRadioGroupField = lazy(
  () => import("./form-components/fields/advanced-radio-group.field")
);

const SwitchField = lazy(() => import("./form-components/fields/switch.field"));

/**
 * יצירת והגדרת ה-hook של הטופס
 */
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext: formContext,

  // קומפוננטות מבנה
  formComponents: {
    FormLayout,
    FormActions,
    FormSection,
    SubmitButton,
    ResetButton,
    DebugButton,
  },

  // קומפוננטות שדות
  fieldComponents: {
    // שדות קלט בסיסיים
    TextField,
    TextAreaField,
    CheckboxField,
    AdvancedCheckboxField,
    PasswordInputField,
    // DatePickerField,
    // FileUploadField,

    // שדות בחירה
    SelectField,
    // SelectLookupField,
    // SelectMultiLookupField,
    // SelectUserField,

    // שדות רדיו
    RadioGroupField,
    AdvancedRadioGroupField,

    SwitchField,
  },
});
