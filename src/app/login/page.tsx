'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type LoginInputs = {
  email: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  // Redirect to issues if already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) router.push('/issues');
  }, [router]);

  const onSubmit = (data: LoginInputs) => {
    localStorage.setItem('user', JSON.stringify({ email: data.email }));
    router.push('/issues');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-8 w-80"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          {...register('email', { required: 'Email is required' })}
          className="border p-2 w-full mb-2 rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}