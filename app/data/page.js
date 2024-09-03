export default async function Data() {
  const users = await prisma.user.findMany();

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Password</th>
          <th>Address</th>
          <th>Birthdate</th>
          <th>About Me</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.street}, {user.city}, {user.state} {user.zip}</td>
            <td>{user.birthdate ? user.birthdate.toISOString().split('T')[0] : ''}</td>
            <td>{user.aboutMe}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}