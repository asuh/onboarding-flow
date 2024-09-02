export default async function DataPage() {
  const users = await prisma.user.findMany();

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>About Me</th>
          <th>Address</th>
          <th>Birthdate</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.aboutMe}</td>
            <td>{user.streetAddress}, {user.city}, {user.state} {user.zip}</td>
            <td>{user.birthdate ? user.birthdate.toISOString().split('T')[0] : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}