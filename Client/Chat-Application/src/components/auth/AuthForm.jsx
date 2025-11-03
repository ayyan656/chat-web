import React from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";

// Accept the error prop
const AuthForm = ({
  config,
  formData,
  handleInputChange,
  handleSubmit,
  error,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-md rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {config.title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {config.subtitle}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* --- NEW: Error Display --- */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="rounded-md -space-y-px flex flex-col gap-y-4">
            {config.fields.map((field) => (
              <FormInput
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                icon={field.icon}
                value={formData[field.id]}
                onChange={handleInputChange}
              />
            ))}
          </div>

          {config.link && (
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a
                  href={config.link.href}
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  {config.link.text}
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={config.buttonText.includes("...")} // Disable button while loading
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400"
            >
              {config.buttonText}
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          {config.footerText}
          <Link
            to={config.footerLink.to}
            className="font-medium text-teal-600 hover:text-teal-500 ml-1"
          >
            {config.footerLink.text}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
