'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { initializeLanguagesAdmin } from '@store/features/admin/adminSlice';

// Components
import Admin from '@app/admin/_Admin/Admin';

export default function LanguagesAdmin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeLanguagesAdmin());
  }, [dispatch]);

  return <Admin />;
}
