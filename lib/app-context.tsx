'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { LanguageCode, translate } from './i18n'
import { Cargo, Truck } from './match'
import {
  UserProfile,
  initialUser,
  initialTruck,
  initialCargos,
  initialTrips,
  initialTransactions,
  initialNotifications,
  Trip,
  TripStatus,
  TransactionRecord,
  NotificationItem,
} from './data'

export type UserRole = 'truck_owner' | 'shipper' | 'fleet' | 'admin'

export interface VehicleItem {
  id: string
  model: string
  registration: string
  totalCapacityTon: number
  bodyType: string
  driverName: string
  driverPhone: string
  status: 'active' | 'in_transit' | 'maintenance'
  insuranceValidUntil: string
  fitnessValidUntil: string
  isVerified: boolean
}

export interface ShipperPostItem {
  id: string
  origin: string
  destination: string
  weightTon: number
  cargoType: string
  pickupDate: string
  deliveryDeadline: string
  budget: number
  status: 'searching' | 'matched' | 'in_transit' | 'delivered'
  matchedTruckId?: string
  createdAt: string
  notes?: string
}

export interface PodRecord {
  id: string
  tripId: string
  cargoId: string
  consigneeName: string
  consigneePhone: string
  deliveredAt: string
  locationGps: string
  signatureData: string
  photoProofUrl?: string
  notes?: string
  verified: boolean
  settledAmount: number
}

interface AppContextType {
  // Auth & Profile
  user: UserProfile
  isLoggedIn: boolean
  loginWithPhone: (phone: string) => { otpSent: boolean; message: string }
  verifyOtp: (otp: string) => { success: boolean; message: string }
  loginWithGoogle: () => Promise<void>
  logout: () => void
  verifyEmail: (token?: string) => boolean
  resendVerificationEmail: () => void
  updateUserProfile: (updates: Partial<UserProfile>) => void

  // Role & i18n
  role: UserRole
  setRole: (role: UserRole) => void
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: string) => string

  // Vehicle Management
  truck: Truck
  setTruck: React.Dispatch<React.SetStateAction<Truck>>
  vehicles: VehicleItem[]
  addVehicle: (vehicle: Omit<VehicleItem, 'id' | 'isVerified'>) => void
  updateVehicle: (id: string, updates: Partial<VehicleItem>) => void
  deleteVehicle: (id: string) => void
  setActiveVehicle: (id: string) => void

  // Cargo Management
  cargosList: Cargo[]
  addCargo: (cargo: Omit<Cargo, 'id' | 'createdAt' | 'status'>) => Cargo
  updateCargoStatus: (id: string, status: Cargo['status']) => void

  // Shipper Posts
  shipperPosts: ShipperPostItem[]
  addShipperPost: (post: Omit<ShipperPostItem, 'id' | 'createdAt' | 'status'>) => ShipperPostItem
  cancelShipperPost: (id: string) => void

  // Trip & Booking Lifecycle
  activeTrip: Trip | null
  trips: Trip[]
  createBookingFromCargo: (cargoId: string) => Trip
  updateTripStatus: (status: TripStatus) => void
  completeTrip: () => void

  // POD
  podRecords: PodRecord[]
  submitPod: (podData: Omit<PodRecord, 'id' | 'verified'>) => void

  // Wallet & Ledger
  walletBalance: number
  pendingBalance: number
  transactions: TransactionRecord[]
  addWalletMoney: (amount: number, method?: string) => Promise<boolean>
  withdrawWalletMoney: (amount: number, upiOrBank: string) => Promise<boolean>

  // Notifications
  notifications: NotificationItem[]
  unreadNotifications: number
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void

  // Layout presentation mode (Responsive desktop vs mobile preview)
  deviceViewMode: 'responsive' | 'compact_simulator'
  setDeviceViewMode: (mode: 'responsive' | 'compact_simulator') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const DEFAULT_VEHICLES: VehicleItem[] = [
  {
    id: 'V-101',
    model: 'Tata 407',
    registration: 'MH 12 AB 1234',
    totalCapacityTon: 20,
    bodyType: 'Closed Container',
    driverName: 'Rahul Sharma',
    driverPhone: '+91 98765 43210',
    status: 'in_transit',
    insuranceValidUntil: '15 Dec 2026',
    fitnessValidUntil: '20 Oct 2026',
    isVerified: true,
  },
  {
    id: 'V-102',
    model: 'Ashok Leyland Ecomet',
    registration: 'GJ 01 CD 5678',
    totalCapacityTon: 15,
    bodyType: 'Open Tarpaulin',
    driverName: 'Vikram Patel',
    driverPhone: '+91 98111 22334',
    status: 'active',
    insuranceValidUntil: '08 Jan 2027',
    fitnessValidUntil: '12 Nov 2026',
    isVerified: true,
  },
  {
    id: 'V-103',
    model: 'BharatBenz 2823R',
    registration: 'MH 04 EF 9012',
    totalCapacityTon: 28,
    bodyType: 'High Side Deck',
    driverName: 'Suresh Kumar',
    driverPhone: '+91 97222 33445',
    status: 'active',
    insuranceValidUntil: '22 Mar 2027',
    fitnessValidUntil: '30 Dec 2026',
    isVerified: true,
  },
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(initialUser)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
  const [role, setRoleState] = useState<UserRole>('truck_owner')
  const [language, setLanguageState] = useState<LanguageCode>('en')
  const [truck, setTruck] = useState<Truck>(initialTruck)
  const [vehicles, setVehicles] = useState<VehicleItem[]>(DEFAULT_VEHICLES)
  const [cargosList, setCargosList] = useState<Cargo[]>(initialCargos)
  const [trips, setTrips] = useState<Trip[]>(initialTrips)
  const [activeTrip, setActiveTrip] = useState<Trip | null>(initialTrips[0] || null)
  const [podRecords, setPodRecords] = useState<PodRecord[]>([])
  const [walletBalance, setWalletBalance] = useState<number>(24850)
  const [pendingBalance, setPendingBalance] = useState<number>(8400)
  const [transactions, setTransactions] = useState<TransactionRecord[]>(initialTransactions)
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)
  const [deviceViewMode, setDeviceViewMode] = useState<'responsive' | 'compact_simulator'>('responsive')

  const [shipperPosts, setShipperPosts] = useState<ShipperPostItem[]>([
    {
      id: 'SP-101',
      origin: 'Ahmedabad (Sanand GIDC)',
      destination: 'Surat (Textile Market)',
      weightTon: 6.0,
      cargoType: 'General Goods',
      pickupDate: 'Today, 2:00 PM to 6:00 PM',
      deliveryDeadline: 'Tomorrow, 12:00 PM',
      budget: 8400,
      status: 'in_transit',
      matchedTruckId: 'V-101',
      createdAt: '2 hours ago',
      notes: 'Textile rolls packed in protective plastic film.',
    },
    {
      id: 'SP-102',
      origin: 'Vadodara (Makarpura GIDC)',
      destination: 'Surat (Ring Road)',
      weightTon: 4.5,
      cargoType: 'FMCG Goods',
      pickupDate: 'Tomorrow, 9:00 AM',
      deliveryDeadline: 'Tomorrow, 5:00 PM',
      budget: 6500,
      status: 'searching',
      createdAt: '4 hours ago',
    },
  ])

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('emptymiles_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
        setIsLoggedIn(true)
      }
      const savedRole = localStorage.getItem('emptymiles_role') as UserRole
      if (savedRole) setRoleState(savedRole)

      const savedLang = localStorage.getItem('emptymiles_lang') as LanguageCode
      if (savedLang) {
        setLanguageState(savedLang)
        if (typeof document !== 'undefined') {
          document.documentElement.lang = savedLang
          document.documentElement.dir = savedLang === 'ur' ? 'rtl' : 'ltr'
        }
      }

      const savedBalance = localStorage.getItem('emptymiles_wallet')
      if (savedBalance) setWalletBalance(Number(savedBalance))

      const savedVehicles = localStorage.getItem('emptymiles_vehicles')
      if (savedVehicles) setVehicles(JSON.parse(savedVehicles))
    } catch (e) {
      console.error('Failed to load local storage state:', e)
    }
  }, [])

  // Sync state to local storage
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
    try {
      localStorage.setItem('emptymiles_role', newRole)
    } catch {}
  }

  const setLanguage = (newLang: LanguageCode) => {
    setLanguageState(newLang)
    try {
      localStorage.setItem('emptymiles_lang', newLang)
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang
        document.documentElement.dir = newLang === 'ur' ? 'rtl' : 'ltr'
      }
    } catch {}
  }

  const t = (key: string) => translate(key, language)

  // Auth methods
  const loginWithPhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      return { otpSent: false, message: 'Please enter a valid 10-digit mobile number' }
    }
    return { otpSent: true, message: `OTP sent to +91 ${cleanPhone.slice(-10)}` }
  }

  const verifyOtp = (otp: string) => {
    if (otp.length === 6) {
      setIsLoggedIn(true)
      const updatedUser: UserProfile = {
        ...user,
        phone: user.phone || '+91 98765 43210',
      }
      setUser(updatedUser)
      try {
        localStorage.setItem('emptymiles_user', JSON.stringify(updatedUser))
      } catch {}
      return { success: true, message: 'Authentication successful' }
    }
    return { success: false, message: 'Invalid OTP. Please enter the 6-digit verification code.' }
  }

  const loginWithGoogle = async () => {
    const googleUser: UserProfile = {
      ...user,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@gmail.com',
      emailVerified: true,
    }
    setUser(googleUser)
    setIsLoggedIn(true)
    try {
      localStorage.setItem('emptymiles_user', JSON.stringify(googleUser))
    } catch {}
  }

  const logout = () => {
    setIsLoggedIn(false)
    try {
      localStorage.removeItem('emptymiles_user')
    } catch {}
  }

  const verifyEmail = (token?: string) => {
    const updated = { ...user, emailVerified: true }
    setUser(updated)
    try {
      localStorage.setItem('emptymiles_user', JSON.stringify(updated))
    } catch {}
    addNotification({
      category: 'system',
      title: 'Email Verified',
      message: 'Your email address has been successfully verified.',
    })
    return true
  }

  const resendVerificationEmail = () => {
    addNotification({
      category: 'system',
      title: 'Verification Email Dispatched',
      message: `A secure verification link has been sent to ${user.email}.`,
    })
  }

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    try {
      localStorage.setItem('emptymiles_user', JSON.stringify(updated))
    } catch {}
  }

  // Vehicle Management
  const addVehicle = (newVeh: Omit<VehicleItem, 'id' | 'isVerified'>) => {
    const v: VehicleItem = {
      ...newVeh,
      id: `V-${Date.now().toString().slice(-4)}`,
      isVerified: true,
    }
    const nextVehicles = [v, ...vehicles]
    setVehicles(nextVehicles)
    try {
      localStorage.setItem('emptymiles_vehicles', JSON.stringify(nextVehicles))
    } catch {}
    addNotification({
      category: 'system',
      title: 'Vehicle Added',
      message: `${v.model} (${v.registration}) successfully added to your fleet.`,
    })
  }

  const updateVehicle = (id: string, updates: Partial<VehicleItem>) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)))
  }

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id))
  }

  const setActiveVehicle = (id: string) => {
    const found = vehicles.find((v) => v.id === id)
    if (found) {
      setTruck((prev) => ({
        ...prev,
        id: found.id,
        model: found.model,
        registration: found.registration,
        totalCapacityTon: found.totalCapacityTon,
        bodyType: found.bodyType,
        availableTon: Math.max(0, found.totalCapacityTon - prev.loadedTon),
      }))
    }
  }

  // Cargo Management
  const addCargo = (newCargo: Omit<Cargo, 'id' | 'createdAt' | 'status'>) => {
    const c: Cargo = {
      ...newCargo,
      id: `CG-${Date.now().toString().slice(-4)}`,
      status: 'published',
      createdAt: 'Just now',
    }
    setCargosList((prev) => [c, ...prev])
    addNotification({
      category: 'cargo',
      title: 'Cargo Published',
      message: `${c.weightTon}T ${c.cargoType} from ${c.origin} to ${c.destination} published on Cargo Hunt.`,
    })
    return c
  }

  const updateCargoStatus = (id: string, status: Cargo['status']) => {
    setCargosList((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))
  }

  // Shipper Posts
  const addShipperPost = (post: Omit<ShipperPostItem, 'id' | 'createdAt' | 'status'>) => {
    const newPost: ShipperPostItem = {
      ...post,
      id: `SP-${Date.now().toString().slice(-4)}`,
      status: 'searching',
      createdAt: 'Just now',
    }
    setShipperPosts((prev) => [newPost, ...prev])

    // Also add to cargo matching pool
    addCargo({
      shipperName: user.name || 'Shipper Direct',
      shipperPhone: user.phone || '+91 98765 43210',
      weightTon: post.weightTon,
      cargoType: post.cargoType,
      origin: post.origin,
      destination: post.destination,
      price: post.budget,
      detourKm: 2,
      detourMinutes: 8,
      pickupWindow: post.pickupDate,
      deliveryWindow: post.deliveryDeadline,
      shipperVerified: user.kycStatus === 'verified',
      routeOverlap: 0.95,
      pickupOverlap: 0.9,
      deliveryOverlap: 0.9,
      vehicleFit: 0.95,
      priceFairness: 0.9,
      notes: post.notes,
    })

    return newPost
  }

  const cancelShipperPost = (id: string) => {
    setShipperPosts((prev) => prev.filter((p) => p.id !== id))
  }

  // Booking & Trip state machine
  const createBookingFromCargo = (cargoId: string): Trip => {
    const cargo = cargosList.find((c) => c.id === cargoId)
    const tripId = `TR-${Date.now().toString().slice(-4)}`

    const newTrip: Trip = {
      id: tripId,
      cargoId: cargo?.id || 'CG-GEN',
      cargoTitle: `${cargo?.weightTon || 6.0}T ${cargo?.cargoType || 'General Goods'}`,
      origin: cargo?.origin || truck.origin,
      destination: cargo?.destination || truck.destination,
      originAddress: `${cargo?.origin || truck.origin} Industrial Corridor, Gate 1`,
      destinationAddress: `${cargo?.destination || truck.destination} Freight Logistics Park`,
      weightTon: cargo?.weightTon || 6.0,
      cargoType: cargo?.cargoType || 'General Goods',
      vehicleModel: truck.model,
      vehicleReg: truck.registration,
      driverName: user.name,
      driverPhone: user.phone,
      shipperName: cargo?.shipperName || 'Verified Shipper',
      shipperPhone: cargo?.shipperPhone || '+91 98250 12345',
      fare: cargo?.price || 8400,
      detourKm: cargo?.detourKm || 2,
      status: 'confirmed',
      currentKm: 0,
      totalKm: 280,
      etaMinutes: 240,
      currentLocationName: `${truck.origin} Loading Dock`,
      gpsCoordinates: { lat: 23.0225, lng: 72.5714 },
      createdAt: 'Just now',
    }

    // Lock capacity
    setTruck((prev) => ({
      ...prev,
      loadedTon: prev.loadedTon + (cargo?.weightTon || 6.0),
      availableTon: Math.max(0, prev.availableTon - (cargo?.weightTon || 6.0)),
    }))

    // Update cargo status to prevent double booking
    if (cargo) {
      updateCargoStatus(cargo.id, 'booked')
    }

    setTrips((prev) => [newTrip, ...prev])
    setActiveTrip(newTrip)

    // Escrow payment pending
    setPendingBalance((prev) => prev + (cargo?.price || 8400))

    addNotification({
      category: 'trips',
      title: 'Booking Confirmed',
      message: `Booking ${tripId} created for ${newTrip.cargoTitle}. Shipper escrow held.`,
      link: '/trip',
    })

    return newTrip
  }

  const updateTripStatus = (status: TripStatus) => {
    if (!activeTrip) return

    let currentKm = activeTrip.currentKm
    let etaMinutes = activeTrip.etaMinutes
    let currentLocationName = activeTrip.currentLocationName
    let gpsCoordinates = activeTrip.gpsCoordinates

    if (status === 'en_route_pickup') {
      currentKm = 5
      etaMinutes = 230
      currentLocationName = 'Heading towards Ahmedabad GIDC loading bay'
      gpsCoordinates = { lat: 22.99, lng: 72.58 }
    } else if (status === 'pickup_arrived') {
      currentKm = 12
      etaMinutes = 210
      currentLocationName = 'Ahmedabad GIDC Logistics Dock'
      gpsCoordinates = { lat: 22.95, lng: 72.62 }
    } else if (status === 'in_transit') {
      currentKm = 198
      etaMinutes = 85
      currentLocationName = 'NH 48 near Bharuch Bypass'
      gpsCoordinates = { lat: 21.7051, lng: 72.9959 }
    } else if (status === 'delivery_arrived') {
      currentKm = 280
      etaMinutes = 0
      currentLocationName = 'Surat Industrial Estate, Gate 4'
      gpsCoordinates = { lat: 21.1702, lng: 72.8311 }
    } else if (status === 'pod_submitted' || status === 'settled' || status === 'completed') {
      currentKm = 280
      etaMinutes = 0
      currentLocationName = 'Surat Delivery Hub - Completed'
      gpsCoordinates = { lat: 21.1702, lng: 72.8311 }
    }

    const updatedTrip: Trip = {
      ...activeTrip,
      status,
      currentKm,
      etaMinutes,
      currentLocationName,
      gpsCoordinates,
    }

    setActiveTrip(updatedTrip)
    setTrips((prev) => prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t)))

    addNotification({
      category: 'trips',
      title: `Trip Status Updated: ${status.replace(/_/g, ' ').toUpperCase()}`,
      message: `${updatedTrip.cargoTitle} is now at ${currentLocationName}.`,
      link: '/trip',
    })
  }

  const completeTrip = () => {
    if (!activeTrip) return
    updateTripStatus('completed')
  }

  // POD Submission
  const submitPod = (podData: Omit<PodRecord, 'id' | 'verified'>) => {
    const record: PodRecord = {
      ...podData,
      id: `POD-${Date.now().toString().slice(-4)}`,
      verified: true,
    }
    setPodRecords((prev) => [record, ...prev])
    updateTripStatus('pod_submitted')

    // Settle payment from escrow to available balance
    const settlementAmount = podData.settledAmount || 8400
    setPendingBalance((prev) => Math.max(0, prev - settlementAmount))
    setWalletBalance((prev) => {
      const updated = prev + settlementAmount
      try {
        localStorage.setItem('emptymiles_wallet', String(updated))
      } catch {}
      return updated
    })

    // Create immutable ledger record
    const newTx: TransactionRecord = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      referenceId: podData.tripId,
      title: `Trip Settlement: ${podData.tripId}`,
      subtitle: `Digital POD Verified for ${podData.consigneeName}`,
      amount: settlementAmount,
      kind: 'credit',
      type: 'settlement',
      timestamp: 'Just now',
      status: 'completed',
      paymentMethod: 'Instant Wallet Credit',
    }
    setTransactions((prev) => [newTx, ...prev])

    addNotification({
      category: 'payment',
      title: 'Payment Settled',
      message: `INR ${settlementAmount.toLocaleString('en-IN')} has been released to your available balance for trip ${podData.tripId}.`,
      link: '/wallet',
    })
  }

  // Wallet
  const addWalletMoney = async (amount: number, method: string = 'Razorpay / UPI'): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setWalletBalance((prev) => {
          const updated = prev + amount
          try {
            localStorage.setItem('emptymiles_wallet', String(updated))
          } catch {}
          return updated
        })

        const newTx: TransactionRecord = {
          id: `TX-${Date.now().toString().slice(-4)}`,
          referenceId: `PAY-${Date.now().toString().slice(-6)}`,
          title: 'Wallet Deposit',
          subtitle: `Added via ${method}`,
          amount,
          kind: 'credit',
          type: 'wallet_topup',
          timestamp: 'Just now',
          status: 'completed',
          paymentMethod: method,
        }
        setTransactions((prev) => [newTx, ...prev])

        addNotification({
          category: 'payment',
          title: 'Money Added',
          message: `INR ${amount.toLocaleString('en-IN')} credited to wallet via ${method}.`,
          link: '/wallet',
        })

        resolve(true)
      }, 700)
    })
  }

  const withdrawWalletMoney = async (amount: number, upiOrBank: string): Promise<boolean> => {
    if (amount > walletBalance) return false

    return new Promise((resolve) => {
      setTimeout(() => {
        setWalletBalance((prev) => {
          const updated = prev - amount
          try {
            localStorage.setItem('emptymiles_wallet', String(updated))
          } catch {}
          return updated
        })

        const newTx: TransactionRecord = {
          id: `TX-${Date.now().toString().slice(-4)}`,
          referenceId: `WD-${Date.now().toString().slice(-4)}`,
          title: 'Instant Withdrawal',
          subtitle: `Transferred to ${upiOrBank}`,
          amount,
          kind: 'debit',
          type: 'withdrawal',
          timestamp: 'Just now',
          status: 'completed',
          paymentMethod: 'IMPS Direct Payout',
        }
        setTransactions((prev) => [newTx, ...prev])

        addNotification({
          category: 'payment',
          title: 'Withdrawal Processed',
          message: `INR ${amount.toLocaleString('en-IN')} transferred to ${upiOrBank}.`,
          link: '/wallet',
        })

        resolve(true)
      }, 800)
    })
  }

  // Notifications
  const unreadNotifications = notifications.filter((n) => !n.read).length

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `NT-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      read: false,
    }
    setNotifications((prev) => [newNotif, ...prev])
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        loginWithPhone,
        verifyOtp,
        loginWithGoogle,
        logout,
        verifyEmail,
        resendVerificationEmail,
        updateUserProfile,
        role,
        setRole,
        language,
        setLanguage,
        t,
        truck,
        setTruck,
        vehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        setActiveVehicle,
        cargosList,
        addCargo,
        updateCargoStatus,
        shipperPosts,
        addShipperPost,
        cancelShipperPost,
        activeTrip,
        trips,
        createBookingFromCargo,
        updateTripStatus,
        completeTrip,
        podRecords,
        submitPod,
        walletBalance,
        pendingBalance,
        transactions,
        addWalletMoney,
        withdrawWalletMoney,
        notifications,
        unreadNotifications,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        deviceViewMode,
        setDeviceViewMode,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
