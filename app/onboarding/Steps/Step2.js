import Address from '@/components/Address';
import Birthdate from '@/components/Birthdate';

export default function Step2({ errors, onChange, formData }) {
  return (
    <>
      <Address errors={errors} onChange={onChange} formData={formData} />
      <Birthdate errors={errors} onChange={onChange} formData={formData} />
    </>
  );
}