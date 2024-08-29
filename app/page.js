import styles from "./page.module.css";
import OnboardingWizard from './onboarding/OnboardingWizard';

export default async function Home() {
  const pageConfig = await [];

  // Prepare the steps based on the fetched page configuration
  const steps = [
    {
      component: (
        <fieldset key="step1">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="username@email.com" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </fieldset>
      ),
    },
    ...pageConfig.map((config) => ({
      component: (
        <fieldset key={config.id}>
          {config.component === 'address' && (
            <div>
              <label htmlFor="street">Street</label>
              <input type="text" name="street" />
              <label htmlFor="city">City</label>
              <input type="text" name="city" />
              <label htmlFor="state">State</label>
              <input type="text" name="state" />
              <label htmlFor="zip">Zip Code</label>
              <input type="text" name="zip" />
            </div>
          )}
          {config.component === 'birthdate' && (
            <div>
              <label htmlFor="birthdate">Birthdate</label>
              <input type="date" name="birthdate" />
            </div>
          )}
          {config.component === 'aboutMe' && (
            <div>
              <label htmlFor="aboutMe">About Me</label>
              <textarea name="aboutMe" />
            </div>
          )}
        </fieldset>
      ),
    })),
  ];
  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
          Onboarding Flow
        </h1>
        <OnboardingWizard steps={steps} />
      </div>
    </main>
  );
}
