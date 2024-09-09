export default function Login({ errors, onChange, formData }) {
  return (
    <fieldset>
      <legend>Login Credentials</legend>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        onChange={onChange} 
        id="email"
        name="email"
        value={formData.email}
        placeholder="username@email.com"
        required />
      {errors.email && <span className="error">{errors.email}</span>}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        onChange={onChange} 
        id="password"
        name="password"
        value={formData.password}
        required />
      {errors.password && <span className="error">{errors.password}</span>}
    </fieldset>
  );
}