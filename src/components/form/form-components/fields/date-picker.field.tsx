// import { useFieldContext } from "../../form-context";
// import { ComponentProps } from "react";

// type DatePickerFieldProps = {
//   label: string;
//   description?: string;
//   showTimeInput?: boolean; // אם נרצה להרחיב בעתיד
//   dateFormat?: string;
// } & Omit<
//   ComponentProps<typeof ReactDatePicker>,
//   "label" | "value" | "onChange" | "id" | "onBlur" | "error"
// >;

// const DatePickerField = ({
//   label,
//   description,
//   dateFormat = "yyyy-MM-dd",
//   ...props
// }: DatePickerFieldProps) => {
//   const field = useFieldContext<Date>();

//   return (
//     <div className="space-y-2">
//       <ReactDatePicker
//         id={field.name}
//         selected={field.state.value}
//         onChange={(date) => field.handleChange(date)}
//         onBlur={field.handleBlur}
//         // label={label}
//         // helperText={description}
//         error={
//           field.state.meta.isTouched && field.state.meta.errors.length > 0
//             ? field.state.meta.errors.map((error) => error.message).join(", ")
//             : undefined
//         }
//         dateFormat={dateFormat}
//         {...props}
//       />
//     </div>
//   );
// };

// export default DatePickerField;
