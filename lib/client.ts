import { createPublicClient, http, fallback } from 'viem'
import { mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: mainnet,
  transport: fallback([
    // Jalur 1: Cloudflare
    http('https://cloudflare-eth.com'),
    // Jalur 2: LlamaRPC (Biasanya sangat stabil)
    http('https://eth.llamarpc.com'),
    // Jalur 3: Ankr
    http('https://rpc.ankr.com/eth')
  ], {
    rank: true // Otomatis pilih yang responnya paling cepat
  }),
})
