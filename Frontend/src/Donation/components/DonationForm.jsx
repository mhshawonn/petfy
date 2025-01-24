import { useState } from 'react';

function DonationForm({ onDonationComplete }) {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onDonationComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Make a Donation</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {['25', '50', '100', '200'].map((value) => (
          <button
            key={value}
            type="button"
            className={`p-4 rounded-lg border ${
              amount === value ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => setAmount(value)}
          >
            ${value}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Custom Amount</label>
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-purple-700"
      >
        Complete Donation
      </button>
    </form>
  );
}

export default DonationForm;