'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import { resetMedia } from '@store/features/admin/game/gameAdminSlice';

// Components
import GameAdmin from '@app/admin/_GameAdmin/GameAdmin';

export default function GameCreate() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  // Reset Media on Mount
  useEffect(() => {
    dispatch(resetMedia());
  }, [dispatch]);

  return <GameAdmin />;
}
