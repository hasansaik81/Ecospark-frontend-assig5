'use client'; 


import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-3xl font-bold">Oops!</h2>
      <p className="mt-4 text-lg">We couldn't find the page you're looking for.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        Return Home
      </Link>
    </div>
  );
}