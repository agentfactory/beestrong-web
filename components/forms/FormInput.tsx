'use client';

import { Field, ErrorMessage } from 'formik';

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  as?: 'input' | 'textarea' | 'select';
  options?: { value: string; label: string }[];
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  as = 'input',
  options,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {as === 'select' ? (
        <Field
          as="select"
          id={name}
          name={name}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select an option</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          as={as}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            as === 'textarea' ? 'min-h-[100px]' : ''
          }`}
        />
      )}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};
