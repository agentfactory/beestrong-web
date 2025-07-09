import MultiStepForm, { MentorMenteeFormValues } from '@/components/MultiStepForm';

export default function MenteeRegistration() {
  const initialValues: MentorMenteeFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    region: '',
    serviceBranch: '',
  };

  const handleSubmit = (values: MentorMenteeFormValues) => {
    console.log('Mentee application:', values);
    // TODO: send to API / CRM
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Mentee Registration</h1>
      <MultiStepForm initialValues={initialValues} onSubmit={handleSubmit} />
    </main>
  );
}
