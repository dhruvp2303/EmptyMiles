export type LanguageCode =
  | 'en'
  | 'hi'
  | 'gu'
  | 'mr'
  | 'bn'
  | 'ta'
  | 'te'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'ur'

export interface LanguageMeta {
  code: LanguageCode
  label: string
  native: string
  dir?: 'ltr' | 'rtl'
}

export type TranslationDictionary = {
  // Brand & Taglines
  appName: string
  tagline: string
  platformTagline: string
  instantCapacityMatch: string
  instantMatch: string
  kycGstVerified: string
  escrowPayouts: string
  logisticsSupport247: string
  allRightsReserved: string
  networkLoading: string
  gotUnusedTruckSpace: string
  weHaveVerifiedCargo: string
  valuePropSubtitle: string

  // Common Actions & Statuses
  home: string
  dashboard: string
  search: string
  save: string
  cancel: string
  continueText: string
  getStarted: string
  skip: string
  close: string
  back: string
  viewDetails: string
  viewAll: string
  seeAll: string
  clear: string
  submit: string
  verified: string
  pending: string
  active: string
  completed: string
  inTransit: string
  delivered: string
  cancelled: string
  status: string
  date: string
  amount: string
  action: string
  goodMorning: string
  welcomeBack: string
  loading: string
  success: string
  error: string

  // Roles & Modes
  switchRole: string
  chooseWorkspaceMode: string
  workspaceModeSubtitle: string
  truckOwner: string
  truckOwnerSubtitle: string
  shipper: string
  shipperSubtitle: string
  fleetManager: string
  fleetManagerSubtitle: string
  admin: string
  adminSubtitle: string

  // Onboarding & Auth
  onboardingRoleTitle: string
  onboardingRoleSubtitle: string
  roleHaveTruck: string
  roleHaveTruckSub: string
  roleHaveCargo: string
  roleHaveCargoSub: string
  roleHaveBoth: string
  roleHaveBothSub: string
  welcomeToApp: string
  enterMobileToVerify: string
  mobileNumber: string
  sendOtp: string
  orText: string
  continueWithGoogle: string
  agreeToTermsAndPrivacy: string
  enterOtpTitle: string
  otpSentTo: string
  resendOtpIn: string
  resendOtp: string
  verifying: string
  verifyEmailTitle: string
  verifyEmailSubtitle: string
  skipForNow: string
  verifyEmailAction: string
  setupVehicleTitle: string
  setupVehicleSubtitle: string
  vehicleModel: string
  vehicleRegistration: string
  payloadCapacityTons: string
  finishSetup: string

  // Truck & Fleet Capacity
  yourTruck: string
  activeVehicle: string
  availableCapacity: string
  loadedCapacity: string
  totalCapacity: string
  capacityUtilization: string
  emptyKmReduced: string
  emptyKmSaved: string
  activeVehicles: string
  idleVehicles: string
  fleetOverview: string
  myVehicles: string
  addVehicle: string
  vehicleType: string
  registrationNumber: string
  driverName: string
  driverPhone: string
  insuranceValid: string
  fitnessValid: string
  manageFleet: string

  // Cargo Hunt & Matching
  cargoHunt: string
  huntSubtitle: string
  opportunitiesFound: string
  topCompatible: string
  smartMatch: string
  whyThisMatches: string
  estimatedEarnings: string
  detour: string
  accept: string
  negotiate: string
  navigate: string
  call: string
  support: string
  origin: string
  destination: string
  freightValue: string
  acceptFreight: string
  allMatches: string
  highProfit: string
  shortDetour: string
  urgentPickup: string
  filterByRoute: string
  searchRoutes: string
  returnRideFinder: string
  returnRideTitle: string
  returnRideSubtitle: string
  filterCargoHunt: string
  cargoCategory: string
  minMatchScore: string
  listView: string
  routeMap: string
  noMatchingCargo: string

  // Shipper & Post Cargo
  postCargo: string
  postCargoTitle: string
  postCargoSubtitle: string
  findTrucks: string
  findSpaceTitle: string
  findSpaceSubtitle: string
  myShipments: string
  trackShipment: string
  weightInTonnes: string
  cargoType: string
  budgetInInr: string
  pickupDate: string
  deliveryDeadline: string
  broadcastCargo: string
  bookCapacity: string
  pickupWindow: string
  truckAssigned: string
  searchingTrucks: string

  // Navigation, Trips & POD
  activeTrip: string
  myTrips: string
  distanceRemaining: string
  eta: string
  speed: string
  fastagToll: string
  submitPod: string
  digitalPod: string
  signPod: string
  receiverName: string
  receiverMobile: string
  receiverSignature: string
  gpsVerified: string
  consigneeName: string
  consigneePhone: string
  uploadPodPhoto: string
  clearSignature: string
  confirmAndRelease: string
  deliveryNotes: string
  drawSignatureHere: string

  // Wallet & Earnings
  wallet: string
  earnings: string
  availableBalance: string
  tripEscrow: string
  withdraw: string
  addMoney: string
  recentSettlements: string
  bankUpi: string
  totalRevenue: string
  fuelSavings: string
  tripsCompleted: string
  instantPayout: string

  // Profile, KYC & Settings
  profile: string
  language: string
  selectLanguage: string
  chooseIndianLanguage: string
  documents: string
  logOut: string
  accountSettings: string
  aadhaarCard: string
  panCard: string
  drivingLicense: string
  quickActions: string
  helpCenter: string
  contactSupport: string
  terms: string
  privacy: string
  refundPolicy: string
  cancellationPolicy: string

  // Notifications
  notifications: string
  notificationsTitle: string
  markAllAsRead: string
  noNotifications: string

  // Trust Footer Sections
  footerPlatform: string
  footerManagement: string
  footerTrustLegal: string
  footerCompany: string
  footerLiveTracking: string
  footerVehicleManagement: string
  footerWalletSettlements: string
  footerEarningsAnalytics: string
  footerOpsAdmin: string
  footerAbout: string
  footerContact: string
  footerFaqs: string
  footerHelpline: string
}
