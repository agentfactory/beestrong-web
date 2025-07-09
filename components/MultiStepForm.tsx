import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

export interface MentorMenteeFormValues {
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  serviceBranch?: string; // mentee-only
  experienceLevel?: string; // mentor-only
}

const stepSchemas = [
  Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  }),
  Yup.object({
    region: Yup.string().required('Required'),
    serviceBranch: Yup.string(),
    experienceLevel: Yup.string(),
  }),
];

type Props = {
  initialValues: MentorMenteeFormValues;
  onSubmit: (values: MentorMenteeFormValues) => void;
  isMentor?: boolean;
};

export default function MultiStepForm({ initialValues, onSubmit, isMentor }: Props) {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const isLast = step === stepSchemas.length - 1;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={stepSchemas[step]}
      onSubmit={(values, helpers: FormikHelpers<MentorMenteeFormValues>) => {
        if (!isLast) {
          next();
          helpers.setTouched({});
          return;
        }
        onSubmit(values);
      }}
    >
      {() => (
        <Form className="space-y-6">
          {step === 0 && (
            <>
              <label className="block">
                First Name
                <Field name="firstName" className="input" />
                <ErrorMessage component="div" name="firstName" className="text-red-500" />
              </label>
              <label className="block">
                Last Name
                <Field name="lastName" className="input" />
                <ErrorMessage component="div" name="lastName" className="text-red-500" />
              </label>
              <label className="block">
                Email
                <Field name="email" type="email" className="input" />
                <ErrorMessage component="div" name="email" className="text-red-500" />
              </label>
            </>
          )}

          {step === 1 && (
            <>
              <label className="block">
                Region
                <Field name="region" as="select" className="input">
                  <option value="">Select region</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                </Field>
                <ErrorMessage component="div" name="region" className="text-red-500" />
              </label>

              {!isMentor && (
                <label className="block">
                  Service Branch (for mentees)
                  <Field name="serviceBranch" className="input" />
                </label>
              )}

              {isMentor && (
                <label className="block">
                  Experience Level (for mentors)
                  <Field name="experienceLevel" as="select" className="input">
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Field>
                </label>
              )}
            </>
          )}

          <div className="flex justify-between">
            {step > 0 && (
              <button type="button" onClick={prev} className="btn-secondary">
                Back
              </button>
            )}
            <button type="submit" className="btn-primary">
              {isLast ? 'Submit' : 'Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
