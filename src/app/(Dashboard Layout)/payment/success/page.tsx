export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-xl border bg-white p-8 text-center shadow-lg">
        <div className="mb-4 text-6xl">✅</div>
        <h1 className="text-3xl font-bold text-green-600">Payment Successful</h1>
        <p className="mt-4 text-gray-600">Thank you! Your payment has been completed successfully.</p>
      </div>
    </main>
  );
}