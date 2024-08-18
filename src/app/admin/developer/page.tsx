'use client';

// React
import { useState } from 'react';

// Components
import Admin from 'app/admin/_Admin/Admin';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { createDeveloper } from 'services/common/developers';

// Types
import type { FC, JSX } from 'react';

const DeveloperCreate: FC = (): JSX.Element => {
  // States
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);

  // Event Handlers
  const onSubmit = async (): Promise<void> => {
    const result: { message: string } = await createDeveloper(name, website);
    toast.success(result.message);
    setSubmitted(submitted + 1);
    setName('');
    setWebsite('');
  };

  return (
    <Admin
      type="developer"
      website={website}
      setWebsite={setWebsite}
      name={name}
      setName={setName}
      onSubmit={onSubmit}
      submitted={submitted}
    />
  );
};

export default DeveloperCreate;