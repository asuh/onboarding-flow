export default function Address({ errors, onChange, formData }) {
  return (
    <fieldset className="address">
      <legend>What's your address?</legend>      
      <label htmlFor="street">Street</label>
      <input type="text" onChange={onChange} name="street" value={formData.street} />
      {errors.street && <span className="error">{errors.street}</span>}
      <label htmlFor="city">City</label>
      <input type="text" onChange={onChange} name="city" value={formData.city} />
      {errors.city && <span className="error">{errors.city}</span>}
      <label htmlFor="state">State</label>
      <input type="text" onChange={onChange} name="state" value={formData.state} />
      {errors.state && <span className="error">{errors.state}</span>}
      <label htmlFor="zip">Zip Code</label>
      <input type="number" onChange={onChange} name="zip" value={formData.zip} />
      {errors.zip && <span className="error">{errors.zip}</span>}
    </fieldset>
  );
}