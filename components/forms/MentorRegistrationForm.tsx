'use client';

import * as Yup from 'yup';
import { MultiStepForm, FormStep } from './MultiStepForm';
import { FormInput } from './FormInput';

interface MentorFormValues {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Professional Information
  jobTitle: string;
  company: string;
  yearsOfExperience: string;
  expertise: string;
  bio: string;
  // Availability
  availability: string;
  preferredCommunication: string;
  timezone: string;
  menteePreference: string;
}

const initialValues: MentorFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  jobTitle: '',
  company: '',
  yearsOfExperience: '',
  expertise: '',
  bio: '',
  availability: '',
  preferredCommunication: '',
  timezone: '',
  menteePreference: '',
};

const validationSchema = [
  Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
  }),
  Yup.object({
    jobTitle: Yup.string().required('Job title is required'),
    company: Yup.string().required('Company is required'),
    yearsOfExperience: Yup.string().required('Years of experience is required'),
    expertise: Yup.string().required('Area of expertise is required'),
    bio: Yup.string().min(50, 'Bio should be at least 50 characters').required('Bio is required'),
  }),
  Yup.object({
    availability: Yup.string().required('Availability is required'),
    preferredCommunication: Yup.string().required('Preferred communication method is required'),
    timezone: Yup.string().required('Timezone is required'),
    menteePreference: Yup.string().required('Mentee preference is required'),
  }),
];

export const MentorRegistrationForm = () => {
  const handleSubmit = async (values: MentorFormValues) => {
    console.log('Mentor Registration:', values);
    // Here you would typically send the data to your backend
    alert('Registration submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Mentor Registration</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <MultiStepForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormStep stepNumber={0}>
              <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput name="firstName" label="First Name" required placeholder="John" />
                <FormInput name="lastName" label="Last Name" required placeholder="Doe" />
              </div>
              <FormInput
                name="email"
                label="Email"
                type="email"
                required
                placeholder="john.doe@example.com"
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
              <h3 className="text-xl font-semibold mb-6">Professional Information</h3>
              <FormInput
                name="jobTitle"
                label="Job Title"
                required
                placeholder="Senior Software Engineer"
              />
              <FormInput name="company" label="Company" required placeholder="Tech Corp" />
              <FormInput
                name="yearsOfExperience"
                label="Years of Experience"
                as="select"
                required
                options={[
                  { value: '0-2', label: '0-2 years' },
                  { value: '3-5', label: '3-5 years' },
                  { value: '6-10', label: '6-10 years' },
                  { value: '10+', label: '10+ years' },
                ]}
              />
              <FormInput
                name="expertise"
                label="Areas of Expertise"
                required
                placeholder="e.g., JavaScript, React, Leadership, Career Development"
              />
              <FormInput
                name="bio"
                label="Short Bio"
                as="textarea"
                required
                placeholder="Tell us about yourself and what you can offer as a mentor..."
              />
            </FormStep>

            <FormStep stepNumber={2}>
              <h3 className="text-xl font-semibold mb-6">Availability & Preferences</h3>
              <FormInput
                name="availability"
                label="Availability"
                as="select"
                required
                options={[
                  { value: '1-2', label: '1-2 hours per week' },
                  { value: '3-5', label: '3-5 hours per week' },
                  { value: '5-10', label: '5-10 hours per week' },
                  { value: '10+', label: '10+ hours per week' },
                ]}
              />
              <FormInput
                name="preferredCommunication"
                label="Preferred Communication Method"
                as="select"
                required
                options={[
                  { value: 'video', label: 'Video calls' },
                  { value: 'phone', label: 'Phone calls' },
                  { value: 'email', label: 'Email' },
                  { value: 'chat', label: 'Chat/Messaging' },
                  { value: 'any', label: 'Any method' },
                ]}
              />
              <FormInput
                name="timezone"
                label="Timezone"
                as="select"
                required
                options={[
                  { value: 'PST', label: 'Pacific Time (PST)' },
                  { value: 'MST', label: 'Mountain Time (MST)' },
                  { value: 'CST', label: 'Central Time (CST)' },
                  { value: 'EST', label: 'Eastern Time (EST)' },
                  { value: 'GMT', label: 'Greenwich Mean Time (GMT)' },
                  { value: 'CET', label: 'Central European Time (CET)' },
                  { value: 'IST', label: 'India Standard Time (IST)' },
                  { value: 'JST', label: 'Japan Standard Time (JST)' },
                ]}
              />
              <FormInput
                name="menteePreference"
                label="Mentee Preference"
                as="textarea"
                required
                placeholder="Describe the type of mentees you'd like to work with (e.g., career stage, goals, interests)..."
              />
            </FormStep>
          </MultiStepForm>
        </div>
      </div>
    </div>
  );
};
