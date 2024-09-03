export default function Birthdate({ errors, onChange, formData }) {
  return (
    <fieldset className="birthdate">
      <legend>What's your birthday?</legend>
      <label htmlFor="birthdate">Birthdate</label>
      <input type="date" onChange={onChange} name="birthdate" value={formData.birthdate} />
      {errors.birthdate && <span className="error">{errors.birthdate}</span>}
    </fieldset>
  );
}