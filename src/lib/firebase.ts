import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAnalytics, logEvent, type Analytics } from 'firebase/analytics'
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore'
import { isFirebaseConfigured } from './env'

let app: FirebaseApp | null = null
let analytics: Analytics | null = null
let firestore: Firestore | null = null

export function initFirebase() {
  if (!isFirebaseConfigured || app) return

  app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  })

  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app)
    } catch {
      // Analytics may fail in some WebViews until fully loaded
    }
  }

  firestore = getFirestore(app)
}

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (!analytics) return
  logEvent(analytics, name, params)
}

export type OrderPayload = {
  customerName: string
  customerEmail: string
  shippingAddress: string
  city: string
  items: { id: string; name: string; quantity: number; price: number }[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  userId?: string | null
}

export async function saveOrderToFirestore(order: OrderPayload) {
  if (!firestore) return null
  const docRef = await addDoc(collection(firestore, 'orders'), {
    ...order,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}
