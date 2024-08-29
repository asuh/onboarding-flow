import styles from "./page.module.css";

export default async function Home() {

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
    }
  ];
  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
          Onboarding Flow
        </h1>
        <form action="#">
          <legend>User Onboarding</legend>

          {steps.map((step, index) => (
            <div key={index}>
              {step.component}
            </div>
          ))}
          <button>Previous</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
