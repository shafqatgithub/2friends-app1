import type { CartItem } from '../context/CartContext'
import { isFirebaseConfigured, isSupabaseConfigured } from '../lib/env'
import { saveOrderToFirestore, trackEvent } from '../lib/firebase'
import { getSupabase } from '../lib/supabase'

export type PlaceOrderInput = {
  userId?: string | null
  customerName: string
  customerEmail: string
  shippingAddress: string
  city: string
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export async function placeOrder(input: PlaceOrderInput) {
  const lineItems = input.items.map(({ product, quantity }) => ({
    id: product.id,
    name: product.name,
    quantity,
    price: product.price,
  }))

  let supabaseOrderId: string | null = null
  let firebaseOrderId: string | null = null

  const supabase = getSupabase()
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: input.userId ?? null,
        customer_name: input.customerName,
        customer_email: input.customerEmail,
        shipping_address: input.shippingAddress,
        city: input.city,
        items: lineItems,
        subtotal: input.subtotal,
        shipping: input.shipping,
        tax: input.tax,
        total: input.total,
      } as Record<string, unknown>)
      .select('id')
      .single()

    if (error) throw new Error(error.message)
    supabaseOrderId = data?.id ?? null
  }

  if (isFirebaseConfigured) {
    firebaseOrderId = await saveOrderToFirestore({
      userId: input.userId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      shippingAddress: input.shippingAddress,
      city: input.city,
      items: lineItems,
      subtotal: input.subtotal,
      shipping: input.shipping,
      tax: input.tax,
      total: input.total,
    })
    trackEvent('purchase', {
      value: input.total,
      currency: 'USD',
      transaction_id: firebaseOrderId ?? supabaseOrderId ?? 'local',
    })
  }

  return { supabaseOrderId, firebaseOrderId }
}
