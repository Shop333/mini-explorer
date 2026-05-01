import { createPublicClient, http, fallback } from 'viem'
import { mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: mainnet,
  transport: fallback([
    // Jalur 1: LlamaRPC - Sangat stabil untuk publik tanpa API Key
    http('https://eth.llamarpc.com'),
    // Jalur 2: MeowRPC - Alternatif cepat dan gratis
    http('https://rpc.meowrpc.com'),
    // Jalur 3: Cloudflare - Backup standar
    http('https://cloudflare-eth.com')
  ], {
    rank: {
      interval: 30_000, // Cek ulang kecepatan setiap 30 detik
    }
  }),
})
