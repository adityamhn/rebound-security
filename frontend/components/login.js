import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  const handleLogin = (data) => {
    // You would send data to your backend for authentication
    console.log('Logging in:', data);
  };

  return (
    <div className="auth-container">
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
}
