"use client";

import TestForm from "./_test-form";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              טופס בדיקה
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              זהו טופס לבדיקת רכיב הטפסים
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <TestForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
