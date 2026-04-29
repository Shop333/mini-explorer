import { Suspense } from 'react'
import { client } from '@/lib/client'
import { Hash, ArrowRightLeft, Clock, Search, Wallet } from 'lucide-react'
import { formatEther } from 'viem'

// --- Bagian 1: Komponen Cek Saldo (Client Side) ---
// Kita buat sederhana dalam satu file saja dulu
import AccountBalance from './components/AccountBalance' 

async function BlockData() {
  try {
    const block = await client.getBlock({ blockTag: 'finalized' })
    const txPreview = block.transactions.slice(0, 5)

    return (
      <>
        {/* Fitur Search Balance Baru */}
        <section className="mb-8">
          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Search size={12} /> Check Wallet Balance
          </h2>
          <AccountBalance />
        </section>

        {/* Stat Card - Nomor Block */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl mb-8 shadow-2xl">
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Latest Block</p>
          <p className="text-5xl font-black text-green-500 tracking-tighter italic">
            {block.number?.toString()}
          </p>
          <div className="flex items-center gap-2 mt-3 text-zinc-500 text-[11px] border-t border-zinc-800/50 pt-2 font-mono">
            <Clock size={12} />
            <span>{new Date(Number(block.timestamp) * 1000).toLocaleTimeString()}</span>
            <span className="text-zinc-700 ml-auto uppercase text-[9px]">Confirmed</span>
          </div>
        </div>

        {/* TX List tetap di bawah */}
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[10px] font-bold flex items-center gap-2 text-white uppercase">
            <ArrowRightLeft size={14} className="text-blue-500" /> Transactions
          </h2>
          <span className="text-[10px] text-zinc-600 font-mono">#{block.transactions.length}</span>
        </div>
        
        <div className="space-y-2">
          {txPreview.map((txHash: any) => (
            <div key={txHash} className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg">
              <p className="text-[10px] text-zinc-600 uppercase mb-1 font-bold">TX Hash</p>
              <p className="text-[11px] text-blue-400 truncate font-mono">{txHash}</p>
            </div>
          ))}
        </div>
      </>
    )
  } catch (e) {
    return <div className="text-red-500 text-xs italic">RPC Connection Failed</div>
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-300 p-6 font-mono">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1 rounded shadow-[0_0_10px_#2563eb]">
            <Hash size={16} className="text-white" />
          </div>
          <h1 className="text-lg font-black tracking-tighter text-white italic uppercase">
            Mini<span className="text-blue-500">Explorer</span>
          </h1>
        </div>
        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></div>
      </header>

      <Suspense fallback={<div className="py-20 text-center text-[10px] animate-pulse italic">CONNECTING TO ETHEREUM...</div>}>
        <BlockData />
      </Suspense>
    </main>
  )
}
