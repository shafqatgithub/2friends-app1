import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data/products'

export type CartItem = {
  product: Product
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  wishlistItems: Product[]
  wishlistCount: number
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isWishlisted: (productId: string) => boolean
  toggleWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  clearWishlist: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const CART_STORAGE_KEY = '2friends-cart'
const WISHLIST_STORAGE_KEY = '2friends-wishlist'

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CartItem[]
  } catch {
    return []
  }
}

function loadWishlist(): Product[] {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Product[]
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart())
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => loadWishlist())

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)

      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }

      return [...prev, { product, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId))
      return
    }

    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const isWishlisted = useCallback(
    (productId: string) => {
      return wishlistItems.some((p) => p.id === productId)
    },
    [wishlistItems],
  )

  const toggleWishlist = useCallback((product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((p) => p.id === product.id)

      if (exists) {
        return prev.filter((p) => p.id !== product.id)
      }

      return [...prev, product]
    })
  }, [])

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const clearWishlist = useCallback(() => {
    setWishlistItems([])
  }, [])

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  )

  const wishlistCount = wishlistItems.length

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      wishlistItems,
      wishlistCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [
      items,
      itemCount,
      subtotal,
      wishlistItems,
      wishlistCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}