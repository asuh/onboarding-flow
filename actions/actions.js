'use server'

import prisma from '@/lib/prisma'

/**
 * Updates the component configuration for the onboarding wizard
 * @param {FormData} formData - A FormData object containing the new
 * configuration.
 * @returns {Promise} - A promise that resolves to an
 * object containing a single property, `success`, which is a boolean
 * indicating whether the configuration was successfully updated.
 * @throws {Error} If there is an error while updating the configuration.
 */
export async function updateConfig(formData) {
  try {
    // Convert FormData to JSON
    const data = Object.fromEntries(formData.entries());
    console.log('FormData as JSON:', data);

    // Extract IDs from data and ensure proper structure
    const fieldset1Updates = Object.entries(data)
      .filter(([key, value]) => key.startsWith('fieldset1') && value === 'on')
      .map(([key]) => {
        // Extract id from key (assuming key includes the id, e.g., fieldset1[1])
        const id = Number.parseInt(key.match(/\d+/)[0], 10);  // Extract numeric ID
        return {
          where: { id },  // Use ID for update
          data: { component: key.replace('fieldset1[', '').replace(']', '') },  // Use component name from key
        };
      });

    const fieldset2Updates = Object.entries(data)
      .filter(([key, value]) => key.startsWith('fieldset2') && value === 'on')
      .map(([key]) => {
        // Extract id from key (assuming key includes the id, e.g., fieldset2[2])
        const id = Number.parseInt(key.match(/\d+/)[0], 10);  // Extract numeric ID
        return {
          where: { id },  // Use ID for update
          data: { component: key.replace('fieldset2[', '').replace(']', '') },  // Use component name from key
        };
      });

    console.log('Fieldset1 Updates:', fieldset1Updates);
    console.log('Fieldset2 Updates:', fieldset2Updates);

    // Perform the updates in Prisma
    await Promise.all([
      ...fieldset1Updates.map(update => prisma.admin.update(update)),
      ...fieldset2Updates.map(update => prisma.admin.update(update)),
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error updating configuration:', error);
    throw new Error('Error updating configuration');
  }
}

/**
 * Fetches the initial admin fields data from the database
 * @returns {Promise} - A promise that resolves to an array of objects containing the page number and component name.
 */
export async function fetchInitialAdminFields() {
  // Fetch the admin records from the database
  // We exclude Step 1 because it is a login step and does not have any fields
  const admins = await prisma.admin.findMany({
    where: {
      pageNumber: {
        not: 0,  // Exclude Step 1
      },
    },
    orderBy: { pageNumber: 'asc' },
    select: {
      id: true,
      pageNumber: true,
      component: true,
    },
  });

  // Transform the records into the appropriate format
  return admins.map(admin => ({
    id: admin.id,
    pageNumber: admin.pageNumber,
    component: admin.component,
  }));
};
