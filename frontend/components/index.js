import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js Authentication</h1>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <br />
      <Link href="/register">
        <a>Register</a>
      </Link>
    </div>
  );
}
