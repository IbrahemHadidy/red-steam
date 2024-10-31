// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Actions
import { initializeWishlist, updateWishlist } from './wishlistSlice';

// APIs
import gameDataApi from '@store/apis/game/data';

// Types
import type { Game } from '@interfaces/game';
import type { AppDispatch, RootState } from '@store/store';

// Create listener middleware
const wishlistListener = createListenerMiddleware();
const listen = wishlistListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for wishlist initialization
listen({
  actionCreator: initializeWishlist,
  effect: async (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;

    const userWishlist = getState().auth.currentUserData?.wishlist ?? [];
    let wishlistItems: Game[] = [];

    try {
      if (userWishlist.length > 0) {
        wishlistItems = await dispatch(
          gameDataApi.endpoints.getByIds.initiate(userWishlist.map((item) => item.id))
        ).unwrap();
      }

      // Update wishlist
      dispatch(updateWishlist(wishlistItems));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  },
});

// Export the listener
export default wishlistListener;
