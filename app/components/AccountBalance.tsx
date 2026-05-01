'use client'
import { useState } from 'react'
import { client } from '@/lib/client'
import { formatEther, isAddress } from 'viem'
import { Wallet, Loader2, AlertCircle, Copy, CheckCircle2 } from 'lucide-react'

export default function AccountBalance() {
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (balance) {
      navigator.clipboard.writeText(`${balance} ETH`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getBalance = async () => {
    const cleanAddress = address.trim()

    if (!isAddress(cleanAddress)) {
      return alert('Format Address tidak valid!')
    }

    setLoading(true)
    setBalance(null)
    
    try {
      const b = await client.getBalance({ 
        address: cleanAddress as `0x${string}` 
      })
      setBalance(formatEther(b))
    } catch (err) {
      console.error(err)
      alert('RPC Error: Coba lagi dalam beberapa saat.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {/* Input Field */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input 
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-blue-500/50 transition-all text-blue-400 placeholder:text-zinc-700 font-mono"
            placeholder="Paste 0x address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            spellCheck={false}
          />
        </div>
        <button 
          onClick={getBalance}
          disabled={loading || !address}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-900 text-white px-6 py-2 rounded-xl transition-all active:scale-95 flex items-center justify-center min-w-[90px] border border-blue-500/20"
        >
          {loading ? <Loader2 size={18} className="animate-spin text-blue-200" /> : <span className="text-[10px] font-black uppercase tracking-tighter">Check</span>}
        </button>
      </div>

      {/* Balance Display Card */}
      {balance && (
        <div 
          onClick={copyToClipboard}
          className="group bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-5 rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1 bg-green-500/10 rounded-md">
                <Wallet size={12} className="text-green-500" />
              </div>
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Available ETH</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white italic tracking-tighter">
                {parseFloat(balance).toLocaleString('en-US', { maximumFractionDigits: 6 })}
              </span>
              <span className="text-[10px] font-bold text-green-500/80 uppercase">Mainnet</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {copied ? (
              <CheckCircle2 size={16} className="text-green-500 animate-bounce" />
            ) : (
              <Copy size={16} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
            )}
            <span className="text-[8px] text-zinc-800 font-bold uppercase tracking-widest">
              {copied ? 'Copied!' : 'Click to Copy'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
