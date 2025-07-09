'use client';

import * as Yup from 'yup';
import { MultiStepForm, FormStep } from './MultiStepForm';
import { FormInput } from './FormInput';

interface MenteeFormValues {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Background
  currentRole: string;
  education: string;
  yearsOfExperience: string;
  currentChallenges: string;
  // Goals
  shortTermGoals: string;
  longTermGoals: string;
  areasOfInterest: string;
  mentorPreference: string;
  expectedOutcome: string;
}

const initialValues: MenteeFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  currentRole: '',
  education: '',
  yearsOfExperience: '',
  currentChallenges: '',
  shortTermGoals: '',
  longTermGoals: '',
  areasOfInterest: '',
  mentorPreference: '',
  expectedOutcome: '',
};

const validationSchema = [
  Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
  }),
  Yup.object({
    currentRole: Yup.string().required('Current role is required'),
    education: Yup.string().required('Education level is required'),
    yearsOfExperience: Yup.string().required('Years of experience is required'),
    currentChallenges: Yup.string()
      .min(50, 'Please provide more detail about your challenges')
      .required('Current challenges are required'),
  }),
  Yup.object({
    shortTermGoals: Yup.string()
      .min(30, 'Please provide more detail about your short-term goals')
      .required('Short-term goals are required'),
    longTermGoals: Yup.string()
      .min(30, 'Please provide more detail about your long-term goals')
      .required('Long-term goals are required'),
    areasOfInterest: Yup.string().required('Areas of interest are required'),
    mentorPreference: Yup.string().required('Mentor preference is required'),
    expectedOutcome: Yup.string().required('Expected outcome is required'),
  }),
];

export const MenteeRegistrationForm = () => {
  const handleSubmit = async (values: MenteeFormValues) => {
    console.log('Mentee Registration:', values);
    // Here you would typically send the data to your backend
    alert('Registration submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Mentee Registration</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <MultiStepForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormStep stepNumber={0}>
              <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput name="firstName" label="First Name" required placeholder="Jane" />
                <FormInput name="lastName" label="Last Name" required placeholder="Smith" />
              </div>
              <FormInput
                name="email"
                label="Email"
                type="email"
                required
                placeholder="jane.smith@example.com"
              />
              <FormInput
                name="phone"
                label="Phone Number"
                type="tel"
                required
                placeholder="+1 (555) 123-4567"
              />
            </FormStep>

            <FormStep stepNumber={1}>
              <h3 className="text-xl font-semibold mb-6">Background Information</h3>
              <FormInput
                name="currentRole"
                label="Current Role"
                required
                placeholder="e.g., Junior Developer, Student, Career Changer"
              />
              <FormInput
                name="education"
                label="Education Level"
                as="select"
                required
                options={[
                  { value: 'high-school', label: 'High School' },
                  { value: 'bachelors', label: "Bachelor's Degree" },
                  { value: 'masters', label: "Master's Degree" },
                  { value: 'phd', label: 'PhD' },
                  { value: 'bootcamp', label: 'Bootcamp' },
                  { value: 'self-taught', label: 'Self-taught' },
                ]}
              />
              <FormInput
                name="yearsOfExperience"
                label="Years of Experience"
                as="select"
                required
                options={[
                  { value: '0-1', label: '0-1 years' },
                  { value: '1-3', label: '1-3 years' },
                  { value: '3-5', label: '3-5 years' },
                  { value: '5+', label: '5+ years' },
                ]}
              />
              <FormInput
                name="currentChallenges"
                label="Current Challenges"
                as="textarea"
                required
                placeholder="Describe the challenges you're currently facing in your career or learning journey..."
              />
            </FormStep>

            <FormStep stepNumber={2}>
              <h3 className="text-xl font-semibold mb-6">Goals & Preferences</h3>
              <FormInput
                name="shortTermGoals"
                label="Short-term Goals (Next 6 months)"
                as="textarea"
                required
                placeholder="What do you hope to achieve in the next 6 months?"
              />
              <FormInput
                name="longTermGoals"
                label="Long-term Goals (1-3 years)"
                as="textarea"
                required
                placeholder="Where do you see yourself in 1-3 years?"
              />
              <FormInput
                name="areasOfInterest"
                label="Areas of Interest"
                required
                placeholder="e.g., Web Development, Data Science, Leadership, Career Transition"
              />
              <FormInput
                name="mentorPreference"
                label="Mentor Preference"
                as="textarea"
                required
                placeholder="Describe the type of mentor you're looking for (experience, industry, communication style)..."
              />
              <FormInput
                name="expectedOutcome"
                label="Expected Outcome from Mentorship"
                as="select"
                required
                options={[
                  { value: 'career-guidance', label: 'Career guidance and advice' },
                  { value: 'skill-development', label: 'Technical skill development' },
                  { value: 'networking', label: 'Networking and connections' },
                  { value: 'interview-prep', label: 'Interview preparation' },
                  { value: 'leadership', label: 'Leadership development' },
                  { value: 'career-change', label: 'Career transition support' },
                ]}
              />
            </FormStep>
          </MultiStepForm>
        </div>
      </div>
    </div>
  );
};
