import AuthForm from '../components/AuthForm';

export default function RegisterPage() {
  const handleRegister = (data) => {
    // You would send data to your backend to create a new user
    console.log('Registering:', data);
  };

  return (
    <div className="auth-container">
      <AuthForm mode="register" onSubmit={handleRegister} />
    </div>
  );
}
