import { useSession } from 'next-auth/react';
import SignIn from './auth/signin';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user.name}!</h1>
        <a href="/auth/signout">Sign out</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Sign in</h1>
      <SignIn />
    </div>
  );
}
