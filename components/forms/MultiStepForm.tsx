'use client';

import React, { useState } from 'react';
import { Form, Formik, FormikConfig, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormStepProps {
  stepNumber: number;
  children: React.ReactNode;
  onSubmit?: (values: FormikValues) => void | Promise<void>;
}

export const FormStep: React.FC<FormStepProps> = ({ children }) => {
  return <>{children}</>;
};

interface MultiStepFormProps<T extends FormikValues>
  extends Omit<FormikConfig<T>, 'validationSchema'> {
  children: React.ReactNode;
  validationSchema?: Yup.AnySchema | Yup.AnySchema[];
}

export function MultiStepForm<T extends FormikValues>({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}: MultiStepFormProps<T>) {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: T) => {
    setSnapshot(values);
    setStepNumber(stepNumber + 1);
  };

  const previous = (values: T) => {
    setSnapshot(values);
    setStepNumber(stepNumber - 1);
  };

  const handleSubmit = async (values: T, actions: FormikHelpers<T>) => {
    if (step && React.isValidElement<FormStepProps>(step) && step.props.onSubmit) {
      await step.props.onSubmit(values);
    }

    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  const currentValidationSchema = Array.isArray(validationSchema)
    ? validationSchema[stepNumber]
    : validationSchema;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={currentValidationSchema}
      >
        {(formik) => (
          <Form className="space-y-6">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Step {stepNumber + 1} of {totalSteps}
                </h2>
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-8 rounded ${
                        index <= stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((stepNumber + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {step}

            <div className="flex justify-between pt-6">
              {stepNumber > 0 && (
                <button
                  type="button"
                  onClick={() => previous(formik.values)}
                  className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                className={`px-6 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  stepNumber === 0 ? 'ml-auto' : ''
                } ${
                  isLastStep ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLastStep ? 'Submit' : 'Next'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
