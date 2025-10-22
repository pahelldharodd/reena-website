import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function TestNewsletter() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // You can switch between endpoints for testing
      // const endpoint = '/api/newsletter'; // Real endpoint
      const endpoint = '/api/test-newsletter'; // Test endpoint
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      
      const data = await response.json();
      setResult(data);
      setStatus(response.ok ? 'success' : 'error');
    } catch (error) {
      console.error('Error testing newsletter subscription:', error);
      setStatus('error');
      setResult({ success: false, message: 'An unexpected error occurred' });
    }
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test Newsletter Subscription</h1>
      
      <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="font-medium mb-2">Test Instructions</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>This page is for testing the newsletter subscription API endpoints</li>
          <li>Modify the endpoint in the code to switch between test and real APIs</li>
          <li>Check the response below to verify the API is working correctly</li>
        </ul>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter phone number"
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {status === 'loading' ? 'Submitting...' : 'Test Subscription'}
        </Button>
      </form>
      
      {result && (
        <div className={`p-4 rounded-md ${status === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <h3 className="font-medium mb-2">API Response</h3>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}