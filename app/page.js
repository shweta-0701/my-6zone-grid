'use client';

import { useState } from 'react';
import GridContainer6Zone from '@/components/GridTemplate/GridContainer6Zone';

export default function HomePage() {
  const [layoutId, setLayoutId] = useState('185'); // Default layout ID

  return (
    <div>
      <GridContainer6Zone layoutId={layoutId} />
    </div>
  );
}