export type Product = {
  id: string
  name: string
  subtitle?: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
}

export const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDdZ_-4rIA5qOfGScd4V5JEOADvss6mFqFprE9-3jkUBS8UW92VdPpNZMW_6LhEnUZ4I74Miez0VnUstgAS56itnU5Q0pCUxFw-6oTxHPDQpDTrUVxpuAaVf5SKx-pXK1OxGvgdmEleHYuQJwTSYbNWpjM1iPFlRmbMSioRNA6ckHXN3n83wGIAbuSbR_aWVRQH7SdB0aodplb5HltEMpEOBVp4SR3anCrbPRSLnR7minkQmgojBY6bS-0pErh3f0dagZfdrpIW-qJz'

export const products: Product[] = [
  {
    id: 'watch-classic',
    name: 'Classic Timepiece',
    subtitle: 'Premium Edition',
    category: 'Lifestyle',
    price: 129,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-5PloOaosXv02wy6GdMlUPl94AVayzBl8tWsIv6hbgK-p4DieMvc9JbY56b-OG5eZaqAPz0J_V81-X2fHtIVeHDlf3EgePiCYZOPuNov29a17JBmqoowK5Mm2q1iFqScd2f7OxaYaJlxrtpAbjV13nhwXQOFs8BozLxe1iRLTzKkIS3gHgLMifRslnUtulzb6zad_Ed09TRmtro5Xkb-grAUKfserBcGjwzRDPb1OxhvREjtnhMLPqInGKnoxVBpJZayJv5BV3yrN',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 'headphones-acoustic',
    name: 'Acoustic Pro Headphones',
    subtitle: 'Noise Cancelling',
    category: 'Tech',
    price: 249,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBAVuefv_LsSztdDdD3Cd8AeygeAH72aacaQtyG0aFL1O8IeAxc83fszl_o7jK15be5EhFfH4JNOrcYqDL4hPY-tU5WBl8QG0bq5I-ErZJ_x71CUuQkDmsC90xIRL8dcBsvia1iJEqDNdhs3mIImI-UI2WbxFB1BzU0u8nFVkdptU7Pmqli5Wgs4XCHJPPA0qG5hBAQngwmptRPfTo-X5Z9V15aoD5nigLllv9gGWT2XRJAOA1tOKqfUyiCbDiKNaUSUdPynFTpjxCU',
    rating: 4.9,
    reviews: 2100,
  },
  {
    id: 'runners-vibrant',
    name: 'Vibrant Runners',
    subtitle: 'Lightweight Series',
    category: 'Footwear',
    price: 85,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAv2iBpjHF8em34w6EerR9NaXhZiZIVJSeCmtpjtVV0nnb9KAC_B_8bOKrGp6VudcUeZumN9z1TeUYj6cl4v3MajH0a5uZcKWWHZqw7M5M83hAjBJBoSZPyFGGjjDjo4YhK4PAlCoqfrcqQwLWr_PiuRHQpvuvEucJWX_v6X_ObusJTBG2zUpWvjp_-EhEnXoOQTwaqz7PYmafYSG0K8cJnJ6Dz_uDfKJK4AosyV9Kpa8i631zIqdA6gje0hsbcF3lHMJ9kuXFPdLAu',
    rating: 4.7,
    reviews: 856,
  },
  {
    id: 'pack-urban',
    name: 'Urban Leather Pack',
    subtitle: 'Water Resistant',
    category: 'Accessories',
    price: 110,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnjoFkO-uhffc_Wlo6xknvSx7QBfcqQwQwTBIgN5w63ptr2_2AuPvvFnh5rajYQS0BLdj45UxzPnJW1zQBsO6_H1PAISFohSuizZjt9tLoskKqYAQSi4hVdAZFz3w0Q9OISUpaYNS-vLvgImerjXVbblX4L9NFM3Cv-7JMvGzwdqD9oi5pIL-159cLsOkRbhj_W2Orztl-Pxe-DaRvUk6xbpF3Z1WRiAdZsm0gGT5kfUCeHUPtMwVFXHcHzICTr0MwkA6AATKXr2nS',
    rating: 4.8,
    reviews: 189,
  },
  {
    id: 'watch-horizon',
    name: 'Classic Horizon Watch',
    category: 'Lifestyle',
    price: 189,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRnjdBv6xGXSfZCN76ZEuddRTrnF-sUKPkObkhubH9Sin2WSHMGson0ugjtkyljIwHm6mm3KKgEficVjSOGNGFNeXAkCAxUSoDdQO7ls7SMrVUQ4Yi8obo7CNsETW4GyxJfT5Unbf57Pl-mgTunna_NyXbpJ6VoUXRhp7gfe0UPep22bxOfS7FewIvha2TmjHC_W7Wjwk2zPukhrNXaw-K2StpWryvrxTIO3_5JQipbV-TjN79_lVzgq3Q1x76bDUWPc4eilnSy9v6',
    rating: 4.8,
    reviews: 124,
    badge: 'New Arrival',
  },
  {
    id: 'headphones-studio',
    name: 'Studio Wireless ANC',
    category: 'Tech',
    price: 299,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQXhRzLSkeNeH_jDR_rekXfVJKsOFzhF1if5pla9CyKw3hE_2W7HnDeuVYJLLE2ftZ2ncpWtEAIrmp1gYx5GkbQKbugB4PuyuhaB_JqNNJ2AEYSndwID-FsMq6i1Pm-h8jUY_dCOK_xqKjh-v_Ii48xBQN03eHC9VzKagn8P7xRBYHg-sBFBy59gCGy6rEvLxvQq0xD-CKWA-RsKYZbZ1_D3q3SDiHwDq-nRFZ1j5xP3HSvcjPSzDYnXUxdXnzrucIlmWORbKA4rYV',
    rating: 4.9,
    reviews: 2100,
  },
  {
    id: 'trainer-velocity',
    name: 'Velocity Run Trainer',
    category: 'Footwear',
    price: 145,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBT3p-5Xwf8TaLfUoBUOthPeLsreRswA-PZX3nXUZy3XKp4bM2BZfnT9LevlXnK_wkI10lneLcEx_N6rXqYOnRmYAL17IUMTUJYWjmfcgjOTr4_aMA6o9awmB8HF8_9NXOT5oxLxHfQO_5Wc4gFa9Ri8dIRtd5lhcjNGyH8MszeZBc5esvvdl0D6p4aB4Y3TZgFJN-9rTU2THzimPoiMba8y71DchB5qMfvOTMheNfjOewqHXwXPvcR_r8txe3Nu2oAFI6lZm4NGqAI',
    rating: 4.7,
    reviews: 856,
  },
  {
    id: 'tote-executive',
    name: 'Executive Leather Tote',
    category: 'Accessories',
    price: 420,
    originalPrice: 550,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9FUis2YwEQ9cNS8qfKV-rpNG_hk7ZkUjFVXOHlFnIZInFpvuD0BE6JWQlpDzksSCBgvro1Gl7dPukNF4VYKjj63vHVTjp1fZpieNKbYvfbFow76xPt2ZYtv-kkSs_KuRjJJB5HDM0dDhW5fuM3DmchCphNcvn65KGwoO8Sx-XAphDgkWl1BCW8EE3Mvwe5BZmIoa4qeH18ogszBRz9lG1y6vY6i3P5Unbv5Ha6pzL_MQXQkjgiLAIL-aXy9t2CkqpLqN3Hre3eZIF',
    rating: 4.9,
    reviews: 42,
  },
  {
    id: 'camera-retro',
    name: 'Retro Snap Camera',
    category: 'Lifestyle',
    price: 89.99,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxIZ5fxeCqxTb9-FPsbxOvU8kY6JeXAn-03vs50U4sVUlY7P1iZyeul6Wsu9DXTwqZ-DnUU3svVHBTV_sFA8qZA4_ybZG19km1---v54nfKioP7yHWpyxkbCoIODpDMll-QwgzZgReatY7iQ38JoqQCcDfqveqyOEgjneFY5EcLdCYH3f-OodO1EhKi7-2fup9cWltiuxzqP3AqFC0oEBIizyl0yKjf4aOeaJLPVV4_mBMmN_P-0vxZ1aLj7zaPMoT-RfS02fYdEsj',
    rating: 4.5,
    reviews: 310,
  },
  {
    id: 'sunglasses-golden',
    name: 'Golden Wayfarer',
    category: 'Accessories',
    price: 210,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIdI6Z_D8L8bEDV21GUn7xb8rzL8I1UhtyLFj8bLTK3JUTGfWEFTVmLE55nWGyzQn8pCy7TaiHGxTFPGRiNoHqQt22wAp5PR1P_6edCRZToIBQASL6wsl_FIQEbj6GPrnZx0Qhdh-_sr1lt0EU6QRwqyNbPHz4WKbQfTBLiY301gE5kPw6SuaBV_yUj41v4oxwESk-tUatEtfuEYQ1PZx0ncc9llGp-KtztkpNovXPMR-4NT9UqkR5bOz9HGs_yLYISfJYulkMFptd',
    rating: 4.8,
    reviews: 189,
  },
]

export const featuredProducts = products.slice(0, 4)

export const categories = [
  { id: 'apparel', label: 'Clothing', icon: 'apparel' },
  { id: 'accessories', label: 'Accessories', icon: 'watch' },
  { id: 'gadgets', label: 'Gadgets', icon: 'devices' },
  { id: 'home', label: 'Home', icon: 'living' },
  { id: 'sports', label: 'Sports', icon: 'sports_tennis' },
]

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`
}

export function formatReviews(count: number) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return String(count)
}
