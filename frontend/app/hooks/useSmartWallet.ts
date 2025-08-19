// hooks/useSmartWallet.ts
import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { Address, formatEther, parseEther, parseUnits, formatUnits } from 'viem'
import { smartWalletService } from '@/lib/contracts/contracts'
import { getTokenAddress, getContractAddress } from '@/lib/contracts/address'
//import { MANTLE_TESTNET_CONFIG } from '@/lib/contract/address'
import toast from 'react-hot-toast'

// Types
export interface TokenBalance {
  symbol: string
  name: string
  balance: string
  usdValue: string
  change: string
  changeType: 'positive' | 'negative'
  color: string
  address?: Address
}

export interface Transaction {
  id: string
  type: 'sent' | 'received'
  amount: string
  token: string
  identifier: string
  identifierType: 'phone' | 'username'
  timestamp: Date
  status: 'completed' | 'pending' | 'failed'
  txHash: string
  gasUsed?: string
  message?: string
}

export interface UserIdentifier {
  id: string
  identifier: string
  type: 'phone' | 'username'
  verified: boolean
  registeredAt: Date
  isDefault: boolean
}

// Main Smart Wallet Hook
export function useSmartWallet() {
  const { address: userAddress } = useAccount()
  const [smartWalletAddress, setSmartWalletAddress] = useState<Address | null>(null)
  const [hasWallet, setHasWallet] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize wallet
  useEffect(() => {
    async function initializeWallet() {
      if (!userAddress) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        console.log('🔍 Initializing wallet for user:', userAddress)
        
        const walletExists = await smartWalletService.hasWallet(userAddress)
        console.log('📋 Wallet exists check result:', walletExists)
        setHasWallet(walletExists)

        if (walletExists) {
          const walletAddr = await smartWalletService.getUserWallet(userAddress)
          console.log('🏦 Retrieved wallet address:', walletAddr)
          console.log('🏦 Expected SmartWallet contract:', getContractAddress('SMART_WALLET'))
          console.log('🏦 Are they the same?', walletAddr === getContractAddress('SMART_WALLET'))
          
          setSmartWalletAddress(walletAddr)
        } else {
          console.log('❌ No wallet found for user')
        }
      } catch (err) {
        console.error('❌ Failed to initialize wallet:', err)
        setError('Failed to load wallet information')
      } finally {
        setLoading(false)
      }
    }

    initializeWallet()
  }, [userAddress])

  // Create wallet
  const createWallet = useCallback(async (identifier?: string, identifierType?: 'phone' | 'username') => {
    if (!userAddress) throw new Error('User not connected')

    try {
      setLoading(true)
      console.log('🚀 Creating wallet for user:', userAddress)
      console.log('🚀 Using WalletFactory address:', getContractAddress('WALLET_FACTORY'))
      
      let txHash: Address

      if (identifier && identifierType) {
        console.log('🚀 Creating wallet with identifier:', identifier, identifierType)
        txHash = await smartWalletService.createWalletWithIdentifier(
          identifier,
          identifierType,
          userAddress
        )
      } else {
        console.log('🚀 Creating wallet without identifier')
        txHash = await smartWalletService.createWallet(userAddress)
      }

      console.log('🚀 Wallet creation transaction hash:', txHash)
      console.log('🚀 Waiting for transaction confirmation...')

      // Wait for transaction
      await smartWalletService.waitForTransaction(txHash)
      console.log('🚀 Transaction confirmed!')
      
      // Refresh wallet state
      console.log('🚀 Getting user wallet address...')
      const walletAddr = await smartWalletService.getUserWallet(userAddress)
      console.log('🚀 New wallet address:', walletAddr)
      console.log('🚀 Expected SmartWallet contract:', getContractAddress('SMART_WALLET'))
      console.log('🚀 Are they the same?', walletAddr === getContractAddress('SMART_WALLET'))
      
      setSmartWalletAddress(walletAddr)
      setHasWallet(true)
      
      toast.success('Smart wallet created successfully!')
      return walletAddr
    } catch (err) {
      console.error('❌ Failed to create wallet:', err)
      toast.error('Failed to create wallet')
      throw err
    } finally {
      setLoading(false)
    }
  }, [userAddress])

  return {
    smartWalletAddress,
    hasWallet,
    loading,
    error,
    createWallet,
  }
}

// Hook for wallet balances
export function useWalletBalances() {
  const { address: userAddress } = useAccount()
  const { smartWalletAddress } = useSmartWallet()
  const [balances, setBalances] = useState<TokenBalance[]>([])
  const [totalUsdValue, setTotalUsdValue] = useState(0)
  const [loading, setLoading] = useState(false)

  const refreshBalances = useCallback(async () => {
    if (!userAddress || !smartWalletAddress) return

    try {
      setLoading(true)
      
      // Get ETH balance
      const ethBalance = await smartWalletService.getBalance(smartWalletAddress, userAddress)
      const ethBalanceFormatted = formatEther(ethBalance)
      
      // TODO: Add token addresses for your deployment
      // Get USDC balance (example)
      // const usdcBalance = await smartWalletService.getTokenBalance(
      //   smartWalletAddress, 
      //   userAddress, 
      //   '0x...' // USDC token address
      // )

      // Mock prices for now - integrate with price API later
      const ethPrice = 2450.0
      
      const newBalances: TokenBalance[] = [
        {
          symbol: 'MNT',
          name: 'Mantle',
          balance: parseFloat(ethBalanceFormatted).toFixed(4),
          usdValue: (parseFloat(ethBalanceFormatted) * ethPrice).toFixed(2),
          change: '+12.5%',
          changeType: 'positive',
          color: 'from-blue-500 to-blue-600'
        },
        // Add more tokens as needed
      ]
      
      setBalances(newBalances)
      setTotalUsdValue(newBalances.reduce((sum, token) => 
        sum + parseFloat(token.usdValue.replace(',', '')), 0
      ))
    } catch (err) {
      console.error('Failed to fetch balances:', err)
      toast.error('Failed to refresh balances')
    } finally {
      setLoading(false)
    }
  }, [userAddress, smartWalletAddress])

  useEffect(() => {
    refreshBalances()
  }, [refreshBalances])

  return {
    balances,
    totalUsdValue,
    loading,
    refreshBalances,
  }
}

// Hook for user identifiers
export function useUserIdentifiers() {
  const { address: userAddress } = useAccount()
  const { smartWalletAddress } = useSmartWallet()
  const [identifiers, setIdentifiers] = useState<UserIdentifier[]>([])
  const [loading, setLoading] = useState(false)

  const loadIdentifiers = useCallback(async () => {
    if (!userAddress || !smartWalletAddress) return

    try {
      setLoading(true)
      const identifierStrings = await smartWalletService.getIdentifiersByWallet(smartWalletAddress)
      
      // Transform to UserIdentifier format
      const userIdentifiers: UserIdentifier[] = identifierStrings.map((identifier, index) => ({
        id: `${index}`,
        identifier,
        type: identifier.startsWith('+') ? 'phone' : 'username',
        verified: true, // Assume verified since it's registered
        registeredAt: new Date(), // TODO: Get actual registration date from events
        isDefault: index === 0 // First one is default
      }))
      
      setIdentifiers(userIdentifiers)
    } catch (err) {
      console.error('Failed to load identifiers:', err)
    } finally {
      setLoading(false)
    }
  }, [userAddress, smartWalletAddress])

  useEffect(() => {
    loadIdentifiers()
  }, [loadIdentifiers])

  const registerIdentifier = useCallback(async (
    identifier: string, 
    type: 'phone' | 'username'
  ) => {
    if (!userAddress || !smartWalletAddress) throw new Error('Wallet not initialized')

    try {
      setLoading(true)
      const txHash = await smartWalletService.registerUser(
        identifier,
        type,
        smartWalletAddress,
        userAddress
      )
      
      await smartWalletService.waitForTransaction(txHash)
      await loadIdentifiers() // Refresh list
      
      toast.success('Identifier registered successfully!')
      return txHash
    } catch (err) {
      console.error('Failed to register identifier:', err)
      toast.error('Failed to register identifier')
      throw err
    } finally {
      setLoading(false)
    }
  }, [userAddress, smartWalletAddress, loadIdentifiers])

  const checkAvailability = useCallback(async (identifier: string) => {
    try {
      return await smartWalletService.isIdentifierAvailable(identifier)
    } catch (err) {
      console.error('Failed to check availability:', err)
      return false
    }
  }, [])

  return {
    identifiers,
    loading,
    registerIdentifier,
    checkAvailability,
    refreshIdentifiers: loadIdentifiers,
  }
}

// Hook for transactions
export function useTransactions() {
  const { address: userAddress } = useAccount()
  const { smartWalletAddress } = useSmartWallet()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)

  const loadTransactions = useCallback(async () => {
    if (!userAddress || !smartWalletAddress) return

    try {
      setLoading(true)
      
      // Get sent and received payments
      const [sentPayments, receivedPayments] = await Promise.all([
        smartWalletService.getSentPayments(smartWalletAddress, userAddress),
        smartWalletService.getReceivedPayments(smartWalletAddress, userAddress)
      ])

      // Transform contract data to Transaction format
      const allTransactions: Transaction[] = [
        // Process sent payments
        ...(sentPayments as any[]).map((payment, index) => ({
          id: `sent-${index}`,
          type: 'sent' as const,
          amount: formatEther(payment.amount),
          token: payment.token === '0x0000000000000000000000000000000000000000' ? 'MNT' : 'TOKEN',
          identifier: payment.identifier,
          identifierType: payment.identifier.startsWith('+') ? 'phone' as const : 'username' as const,
          timestamp: new Date(Number(payment.timestamp) * 1000),
          status: 'completed' as const,
          txHash: `0x${index.toString(16).padStart(64, '0')}`, // Mock hash
          message: ''
        })),
        // Process received payments
        ...(receivedPayments as any[]).map((payment, index) => ({
          id: `received-${index}`,
          type: 'received' as const,
          amount: formatEther(payment.amount),
          token: payment.token === '0x0000000000000000000000000000000000000000' ? 'MNT' : 'TOKEN',
          identifier: payment.identifier,
          identifierType: payment.identifier.startsWith('+') ? 'phone' as const : 'username' as const,
          timestamp: new Date(Number(payment.timestamp) * 1000),
          status: 'completed' as const,
          txHash: `0x${index.toString(16).padStart(64, '0')}`, // Mock hash
          message: ''
        }))
      ]

      // Sort by timestamp
      allTransactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      setTransactions(allTransactions)
    } catch (err) {
      console.error('Failed to load transactions:', err)
      toast.error('Failed to load transaction history')
    } finally {
      setLoading(false)
    }
  }, [userAddress, smartWalletAddress])

  useEffect(() => {
    loadTransactions()
  }, [loadTransactions])

  return {
    transactions,
    loading,
    refreshTransactions: loadTransactions,
  }
}

// Hook for sending payments
export function useSendPayment() {
  const { address: userAddress } = useAccount()
  const { smartWalletAddress } = useSmartWallet()
  const [loading, setLoading] = useState(false)

  const sendPayment = useCallback(async (
    identifier: string,
    amount: string,
    token: 'MNT' | 'USDC' | 'USDT' = 'MNT'
  ) => {
    if (!userAddress || !smartWalletAddress) throw new Error('Wallet not initialized')

    try {
      setLoading(true)
      console.log('💸 Starting payment process...')
      console.log('💸 User address:', userAddress)
      console.log('💸 Smart wallet address being used:', smartWalletAddress)
      console.log('💸 Expected SmartWallet contract:', getContractAddress('SMART_WALLET'))
      console.log('💸 Are they the same?', smartWalletAddress === getContractAddress('SMART_WALLET'))
      console.log('💸 Payment details:', { identifier, amount, token })
      
      // Check if recipient identifier exists and is registered
      const isIdentifierAvailable = await smartWalletService.isIdentifierAvailable(identifier)
      if (isIdentifierAvailable) {
        // If identifier is available, it means it's NOT registered, so we can't send to it
        throw new Error(`Recipient identifier "${identifier}" is not registered. Please ask them to register first.`)
      }
      
      let txHash: Address
      
      if (token === 'MNT') {
        console.log('Sending MNT payment...')
        const amountWei = parseEther(amount)
        console.log('Amount in Wei:', amountWei.toString())
        console.log('Amount in MNT:', amount)
        
        // Check MNT balance before sending
        const balance = await smartWalletService.getBalance(smartWalletAddress, userAddress)
        console.log('Current MNT balance in user wallet:', formatEther(balance), 'MNT')
        console.log('Required amount:', formatEther(amountWei), 'MNT')
        
        if (balance < amountWei) {
          throw new Error(`Insufficient MNT balance. You have ${formatEther(balance)} MNT, but trying to send ${amount} MNT`)
        }
        
        console.log('User wallet balance check passed')
        
        // Check if recipient exists in UserRegistry
        try {
          const recipientWallet = await smartWalletService.getWalletByIdentifier(identifier)
          console.log('Recipient wallet address:', recipientWallet)
          
          if (recipientWallet === '0x0000000000000000000000000000000000000000') {
            throw new Error(`Recipient identifier "${identifier}" is not registered in UserRegistry`)
          }
          
          // Check if recipient is the same as sender
          if (recipientWallet.toLowerCase() === userAddress.toLowerCase()) {
            throw new Error(`Cannot send payment to yourself`)
          }
          
          // Check if recipient is the smart wallet contract itself
          if (recipientWallet.toLowerCase() === smartWalletAddress.toLowerCase()) {
            throw new Error(`Cannot send payment to the smart wallet contract`)
          }
          
          console.log('Recipient validation passed')
        } catch (error) {
          console.error('Error checking recipient:', error)
          throw new Error(`Failed to verify recipient: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
        
        // Check if user has any identifiers to prevent self-payment
        try {
          const userIdentifiers = await smartWalletService.getIdentifiersByWallet(userAddress)
          console.log('User identifiers:', userIdentifiers)
          
          if (userIdentifiers.includes(identifier)) {
            throw new Error(`Cannot send payment to your own identifier "${identifier}"`)
          }
          
          console.log('Self-payment check passed')
        } catch (error) {
          console.error('Error checking user identifiers:', error)
          // Don't throw here, just log the warning
          console.warn('Could not verify user identifiers, proceeding with caution')
        }
        
        console.log('All pre-flight checks passed, proceeding with payment...')
        console.log('Using smart wallet address:', smartWalletAddress)
        console.log('Main smart wallet contract address:', getContractAddress('SMART_WALLET'))
        console.log('User registry address:', getContractAddress('USER_REGISTRY'))
        
        // Use the user's individual smart wallet address, not the main contract
        // The sendPayment function should read balances from the user's wallet
        
        txHash = await smartWalletService.sendPayment(
          smartWalletAddress,
          identifier,
          amountWei,
          userAddress
        )
        console.log('Payment transaction hash:', txHash)
      } else {
        // Handle ERC20 token payments
        console.log(`Sending ${token} payment...`)
        const tokenAddress = getTokenAddress(token)
        console.log('Token address:', tokenAddress)
        
        // For ERC20 tokens, we need to handle decimals properly
        const tokenDecimals = token === 'USDC' || token === 'USDT' ? 6 : 18
        const amountWei = parseUnits(amount, tokenDecimals)
        console.log('Amount in token units:', amountWei.toString())
        
        // Check token balance before sending
        const tokenBalance = await smartWalletService.getTokenBalance(smartWalletAddress, userAddress, tokenAddress)
        if (tokenBalance < amountWei) {
          const formattedBalance = formatUnits(tokenBalance, tokenDecimals)
          throw new Error(`Insufficient ${token} balance. You have ${formattedBalance} ${token}, but trying to send ${amount} ${token}`)
        }
        
        txHash = await smartWalletService.sendTokenPayment(
          smartWalletAddress,
          identifier,
          tokenAddress,
          amountWei,
          userAddress
        )
        console.log('Token payment transaction hash:', txHash)
      }

      console.log('Waiting for transaction confirmation...')
      await smartWalletService.waitForTransaction(txHash)
      console.log('Transaction confirmed!')
      toast.success(`Payment sent successfully!`)
      
      return txHash
    } catch (err) {
      console.error('Failed to send payment:', err)
      console.error('Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined,
        name: err instanceof Error ? err.name : 'Unknown'
      })
      toast.error(`Failed to send payment: ${err instanceof Error ? err.message : 'Unknown error'}`)
      throw err
    } finally {
      setLoading(false)
    }
  }, [userAddress, smartWalletAddress])

  return {
    sendPayment,
    loading,
  }
}