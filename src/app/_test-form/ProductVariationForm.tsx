"use client";

/* eslint-disable react/no-children-prop */
import { withForm } from "@/components/form";
import { defaultValues } from "./defaultValues";

export const ProductVariationForm = withForm({
  defaultValues,
  props: {
    title: "test",
  },
  render: function Render({ form, title }) {
    return (
      <div>
        <p>{title}</p>
        <form.AppField
          name="variation.name"
          children={(field) => <field.TextField label="First Name" />}
        />
        <form.AppField
          name="variation.price"
          children={(field) => <field.TextField type="number" label="Price" />}
        />

        <form.AppField
          name="variation.stock"
          children={(field) => <field.TextField label="Stock" type="number" />}
        />
        <form.AppField
          name="variation.sku"
          children={(field) => <field.TextField label="SKU" />}
        />
        <form.AppField
          name="variation.barcode"
          children={(field) => <field.TextField label="Barcode" />}
        />
      </div>
    );
  },
});
