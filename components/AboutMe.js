export default function AboutMe({ errors, onChange, formData }) {
  return (
    <fieldset className="about-me">
      <legend>Tell me about yourself</legend>
      <label htmlFor="aboutMe">About Me</label>
      <textarea type="text" onChange={onChange} id="about-me" name="aboutMe" value={formData.AboutMe} />
      {errors.aboutMe && <span className="error">{errors.aboutMe}</span>}
    </fieldset>
  );
}