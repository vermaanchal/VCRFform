import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md text-center">
        <CheckCircle2 className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your submission has been received successfully.
        </p>
        {/* <a
          href="/"
          className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
        >
          Go to Home
        </a> */}
      </div>
    </div>
  );
};

export default ThankYouPage;
