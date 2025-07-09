import MultiStepForm, { MentorMenteeFormValues } from '@/components/MultiStepForm';

export default function MentorRegistration() {
  const initialValues: MentorMenteeFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    region: '',
    experienceLevel: '',
  };

  const handleSubmit = (values: MentorMenteeFormValues) => {
    console.log('Mentor application:', values);
    // TODO: send to API / CRM
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Mentor Registration</h1>
      <MultiStepForm initialValues={initialValues} onSubmit={handleSubmit} isMentor />
    </main>
  );
}
