import { createContext, useContext, useState, useCallback } from 'react';

const WishlistContext = createContext(null);

function loadWishlist() {
  try { return JSON.parse(localStorage.getItem('eg_wishlist') || '[]'); }
  catch { return []; }
}
function saveWishlist(list) {
  localStorage.setItem('eg_wishlist', JSON.stringify(list));
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      const next = exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
      saveWishlist(next);
      return next;
    });
  }, []);

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
