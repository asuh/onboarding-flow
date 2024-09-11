import Steps from './components/steps';
import { updateConfig } from '@/actions/actions';
import './admin.css'
import { fetchInitialAdminFields } from '@/actions/actions';

/**
 * Admin page
 *
 * Fetches the initial fields from the database using Prisma and displays
 * them in a Steps component.
 *
 * Allows the user to modify the fields and save the new configuration.
 */
const Admin = async () => {
  const initialFields = await fetchInitialAdminFields();

  return (
    <>
      <h1>Admin Page</h1>
      <p>Modify which step each component appears on. For example, select Birthdate and About Me for the 2nd step, then just address on the 3rd step.</p>
      <form action={updateConfig}>
        <Steps initialFields={initialFields} />
        <button type="submit">Save Configuration</button>
      </form>
    </>
  );
};

export default Admin;