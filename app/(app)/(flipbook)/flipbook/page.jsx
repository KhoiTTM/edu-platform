'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FlipbookRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dynamic flipbook route
    router.push('/flipbooks/khtn-7-sbt');
  }, [router]);

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b0b0e', color: '#f4f4f5' }}>
      <p>Chuyển hướng...</p>
    </div>
  );
}
