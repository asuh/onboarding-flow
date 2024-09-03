import AboutMe from "@/components/AboutMe";

export default function Step3({ errors, onChange, formData }) {
  return (
    <AboutMe errors={errors} onChange={onChange} formData={formData} />
  );
}