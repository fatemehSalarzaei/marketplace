'use client';

import LoginForm from '@/components/auth/LoginForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendLoginCode } from '@/services/auth/loginWithOtp';

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (phone_number: string) => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await sendLoginCode(phone_number);
      setMessage('کد با موفقیت ارسال شد');
      router.push(`/auth/verify-code?phone_number=${phone_number}`);
    } catch {
      setError('ارسال کد با خطا مواجه شد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} message={message} />
    </div>
  );
}
