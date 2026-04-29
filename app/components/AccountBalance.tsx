  'use client'
import { useState } from 'react'
import { client } from '@/lib/client'
import { formatEther, isAddress } from 'viem' // Tambah isAddress
import { Wallet, Loader2, AlertCircle } from 'lucide-react'

export default function AccountBalance() {
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getBalance = async () => {
    // 1. Bersihkan spasi di awal/akhir yang sering muncul di keyboard HP
    const cleanAddress = address.trim()

    // 2. Validasi format menggunakan fungsi bawaan Viem
    if (!isAddress(cleanAddress)) {
      return alert('Format Address tidak valid! Pastikan diawali 0x dan berjumlah 42 karakter.')
    }

    setLoading(true)
    setBalance(null) // Reset saldo saat loading
    
    try {
      // 3. Tarik data saldo
      const b = await client.getBalance({ 
        address: cleanAddress as `0x${string}` 
      })
      setBalance(formatEther(b))
    } catch (err) {
      console.error(err)
      alert('Gagal mengambil saldo. Cek koneksi internet terminal Alpine Anda.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input 
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-xs outline-none focus:border-blue-500 transition-all text-blue-400 placeholder:text-zinc-700"
          placeholder="Paste 0x address here..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          spellCheck={false}
        />
        <button 
          onClick={getBalance}
          disabled={loading || !address}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 text-white px-5 py-2 rounded-lg transition-all active:scale-95 flex items-center justify-center min-w-[80px]"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <span className="text-xs font-bold uppercase">Check</span>}
        </button>
      </div>

      {balance && (
        <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Wallet size={12} className="text-green-500" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Available Balance</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white italic">
                {parseFloat(balance).toLocaleString('en-US', { maximumFractionDigits: 6 })}
              </span>
              <span className="text-xs font-bold text-green-500 uppercase">ETH</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
