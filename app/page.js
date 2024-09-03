import Wizard from './onboarding/Wizard';
import styles from "./page.module.css";

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>
          Onboarding Flow
        </h1>
        <Wizard />
      </div>
    </main>
  );
}
