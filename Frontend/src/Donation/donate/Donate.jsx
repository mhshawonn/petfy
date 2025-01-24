import { useState } from 'react';
import DonationForm from '../components/DonationForm';
import ThankYou from '../components/ThankYou';

function Donate() {
  const [isDonationComplete, setIsDonationComplete] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {isDonationComplete ? (
        <ThankYou />
      ) : (
        <DonationForm onDonationComplete={() => setIsDonationComplete(true)} />
      )}
    </div>
  );
}

export default Donate;