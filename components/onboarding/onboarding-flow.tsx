'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Package,
  ShieldCheck,
  Truck,
  Layers,
  Phone,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import { LogoMark, Wordmark } from '@/components/brand/logo'
import { cn } from '@/lib/utils'
import { useApp } from '@/lib/app-context'
import { LanguageCode, SUPPORTED_LANGUAGES, LanguageMeta } from '@/lib/i18n'

type Step = 'splash' | 'value' | 'language' | 'role' | 'login' | 'otp'

export function OnboardingFlow() {
  const router = useRouter()
  const { setRole, setLanguage, loginWithPhone, verifyOtp, loginWithGoogle } = useApp()
  const [step, setStep] = useState<Step>('splash')
  const [phone, setPhone] = useState('')
  const [otpDigits, setOtpDigits] = useState<string[]>([])
  const [otpError, setOtpError] = useState('')
  const [seconds, setSeconds] = useState(45)

  const handleComplete = () => {
    router.push('/home')
  }

  return (
    <div className="flex flex-1 flex-col h-full min-h-screen w-full bg-background overflow-hidden">
      {step === 'splash' && <Splash onDone={() => setStep('value')} />}
      {step === 'value' && (
        <ValueProp onNext={() => setStep('language')} onLogin={() => setStep('login')} />
      )}
      {step === 'language' && (
        <LanguageStep
          onBack={() => setStep('value')}
          onNext={(lang) => {
            setLanguage(lang as LanguageCode)
            setStep('role')
          }}
        />
      )}
      {step === 'role' && (
        <RoleStep
          onBack={() => setStep('language')}
          onNext={(roleKey, directDashboard) => {
            if (roleKey === 'cargo') setRole('shipper')
            else if (roleKey === 'both') setRole('fleet')
            else setRole('truck_owner')
            
            if (directDashboard) {
              handleComplete()
            } else {
              setStep('login')
            }
          }}
        />
      )}
      {step === 'login' && (
        <LoginStep
          phone={phone}
          setPhone={setPhone}
          onBack={() => setStep('role')}
          onSkip={handleComplete}
          onGoogle={async () => {
            await loginWithGoogle()
            handleComplete()
          }}
          onNext={() => {
            const res = loginWithPhone(phone || '9876543210')
            if (res.otpSent) {
              setSeconds(45)
              setOtpDigits(['1', '2', '3', '4', '5', '6'])
              setOtpError('')
              setStep('otp')
            }
          }}
        />
      )}
      {step === 'otp' && (
        <OtpStep
          phone={phone}
          digits={otpDigits}
          setDigits={setOtpDigits}
          error={otpError}
          setError={setOtpError}
          seconds={seconds}
          setSeconds={setSeconds}
          onBack={() => setStep('login')}
          onVerify={(code) => {
            const res = verifyOtp(code)
            if (res.success) {
              handleComplete()
            } else {
              setOtpError(res.message)
            }
          }}
        />
      )}
    </div>
  )
}

/* ---------- 1. Splash Screen ---------- */
function Splash({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(15)

  useEffect(() => {
    const timer = setInterval(() => setProgress((p) => Math.min(100, p + 25)), 120)
    const done = setTimeout(onDone, 1200)
    return () => {
      clearInterval(timer)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <div className="relative flex flex-1 flex-col justify-between bg-[#0B192C] h-full min-h-screen w-full text-white p-8">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <LogoMark className="h-24 w-24 mb-2" />
        <h1 className="mt-2 font-sans text-3xl font-black tracking-tight text-white">
          Empty<span className="text-[#F06524]">Miles</span>
        </h1>
        <p className="mt-1 text-xs text-orange-400 font-bold uppercase tracking-widest">
          More Capacity. More Earnings.
        </p>
        <p className="mt-3 text-xs text-slate-300 font-medium max-w-xs">
          India&apos;s Smart Freight &amp; Return Load Platform
        </p>
      </div>

      <div className="pb-8 space-y-3">
        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-[#F06524] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-xs text-slate-400 font-mono">Connecting highway corridors...</p>
      </div>
    </div>
  )
}

/* ---------- 2. Value Proposition ---------- */
function ValueProp({ onNext, onLogin }: { onNext: () => void; onLogin: () => void }) {
  return (
    <div className="flex flex-1 flex-col justify-between max-w-lg mx-auto w-full p-6 min-h-screen">
      <div className="flex items-center justify-between pt-2">
        <Wordmark />
        <button onClick={onNext} className="text-xs font-bold text-slate-500 hover:text-slate-900">
          Skip
        </button>
      </div>

      <div className="my-auto py-8 space-y-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-orange-50 px-2.5 py-1 text-xs font-bold text-[#F06524] mb-3">
            <Zap className="h-3.5 w-3.5" /> 0% Empty Miles Guarantee
          </span>
          <h1 className="font-sans text-3xl font-black text-slate-900 leading-tight">
            Turn unused truck capacity into revenue.
          </h1>
          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
            Match passing vehicles with verified shippers along your highway corridor in real-time.
          </p>
        </div>

        {/* Value metrics box */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <Truck className="h-5 w-5 text-[#0B192C] mb-2" />
            <p className="text-xs text-slate-500 font-medium">For Transporters</p>
            <p className="font-sans text-sm font-extrabold text-slate-900 mt-0.5">Find Part-Loads &amp; Returns</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <Package className="h-5 w-5 text-[#F06524] mb-2" />
            <p className="text-xs text-slate-500 font-medium">For Shippers</p>
            <p className="font-sans text-sm font-extrabold text-slate-900 mt-0.5">30% Cheaper Freight Rates</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <button className="btn-primary w-full py-3.5" onClick={onNext}>
          Get Started <ArrowRight className="h-4 w-4" />
        </button>

        <p className="text-center text-xs text-slate-600">
          Already registered?{' '}
          <button onClick={onLogin} className="font-bold text-[#0B192C] underline underline-offset-2">
            Log in with Phone
          </button>
        </p>

        <div className="flex items-center justify-center gap-5 text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> GST &amp; KYC Verified
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Escrow Payments
          </span>
        </div>
      </div>
    </div>
  )
}

/* ---------- 3. Language Selection ---------- */
function LanguageStep({ onBack, onNext }: { onBack: () => void; onNext: (lang: string) => void }) {
  const { language, setLanguage } = useApp()
  const [selected, setSelected] = useState(language || 'en')

  return (
    <div className="flex flex-1 flex-col max-w-lg mx-auto w-full p-6 min-h-screen justify-between">
      <div className="pt-2">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="font-sans text-2xl font-black text-slate-900">Choose Language / भाषा</h1>
        <p className="mt-1 text-xs text-slate-500">Select your preferred regional language</p>

        <div className="mt-5 space-y-2 max-h-[58vh] overflow-y-auto no-scrollbar">
          {SUPPORTED_LANGUAGES.map((lang: LanguageMeta) => {
            const active = selected === lang.code
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setSelected(lang.code)
                  setLanguage(lang.code as LanguageCode)
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition',
                  active
                    ? 'border-[#0B192C] bg-slate-50 ring-1 ring-[#0B192C]'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                )}
              >
                <div>
                  <span className="block font-sans text-sm font-bold text-slate-900">{lang.native}</span>
                  <span className="text-xs text-slate-500">{lang.label}</span>
                </div>

                <span
                  className={cn(
                    'grid h-5 w-5 place-items-center rounded-full border-2 transition',
                    active ? 'border-[#0B192C] bg-[#0B192C]' : 'border-slate-300'
                  )}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="pt-4">
        <button className="btn-primary w-full" onClick={() => onNext(selected)}>
          Continue
        </button>
      </div>
    </div>
  )
}

/* ---------- 4. Role Selection ---------- */
function RoleStep({
  onBack,
  onNext,
}: {
  onBack: () => void
  onNext: (role: string, directDashboard?: boolean) => void
}) {
  const [selected, setSelected] = useState('truck')

  const roles = [
    {
      id: 'truck',
      title: 'I have a Truck / Transport Space',
      subtitle: 'Find matching cargo to fill empty payload and return legs',
      icon: Truck,
    },
    {
      id: 'cargo',
      title: 'I have Cargo to Ship',
      subtitle: 'Book passing truck capacity at discounted backhaul rates',
      icon: Package,
    },
    {
      id: 'both',
      title: 'Fleet Manager / Logistics Broker',
      subtitle: 'Manage multi-truck fleets, drivers, and corporate loads',
      icon: Layers,
    },
  ]

  return (
    <div className="flex flex-1 flex-col max-w-lg mx-auto w-full p-6 min-h-screen justify-between">
      <div className="pt-2">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="font-sans text-2xl font-black text-slate-900">What brings you to EmptyMiles?</h1>
        <p className="mt-1 text-xs text-slate-500">Choose your primary logistics workflow</p>

        <div className="mt-6 space-y-3">
          {roles.map((r) => {
            const active = selected === r.id
            const Icon = r.icon
            return (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={cn(
                  'flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition shadow-sm',
                  active
                    ? 'border-[#0B192C] bg-slate-50 ring-2 ring-[#0B192C]/10'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                )}
              >
                <div
                  className={cn(
                    'grid h-10 w-10 place-items-center rounded-lg shrink-0',
                    active ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-700'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-sans text-sm font-bold text-slate-900">{r.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{r.subtitle}</p>
                </div>
                <span
                  className={cn(
                    'mt-1 grid h-5 w-5 place-items-center rounded-full border-2',
                    active ? 'border-[#0B192C] bg-[#0B192C]' : 'border-slate-300'
                  )}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2 pt-4">
        <button className="btn-primary w-full py-3.5 justify-center font-bold" onClick={() => onNext(selected, true)}>
          Enter Dashboard Directly <ArrowRight className="h-4 w-4" />
        </button>
        <button
          className="btn-outline w-full py-2.5 text-xs justify-center"
          onClick={() => onNext(selected, false)}
        >
          Verify Phone &amp; Complete Profile
        </button>
      </div>
    </div>
  )
}

/* ---------- 5. Mobile Login ---------- */
function LoginStep({
  phone,
  setPhone,
  onBack,
  onNext,
  onSkip,
  onGoogle,
}: {
  phone: string
  setPhone: (p: string) => void
  onBack: () => void
  onNext: () => void
  onSkip: () => void
  onGoogle: () => void
}) {
  const valid = (phone || '9876543210').replace(/\D/g, '').length === 10

  return (
    <div className="flex flex-1 flex-col max-w-lg mx-auto w-full p-6 min-h-screen justify-between">
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={onSkip}
            className="text-xs font-bold text-[#F06524] hover:underline"
          >
            Skip to Dashboard →
          </button>
        </div>
        <LogoMark className="h-10 w-10 mb-3" />
        <h1 className="font-sans text-2xl font-black text-slate-900">Enter Mobile Number</h1>
        <p className="mt-1 text-xs text-slate-500">We will send a 6-digit verification code</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
              Phone Number
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-1 focus-within:border-[#0B192C] focus-within:ring-2 focus-within:ring-[#0B192C]/10 shadow-sm">
              <span className="border-r border-slate-200 pr-3 font-sans text-sm font-bold text-slate-900">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="98765 43210"
                className="h-11 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <button
            className="btn-primary w-full py-3.5"
            onClick={() => {
              if (!phone) setPhone('9876543210')
              onNext()
            }}
          >
            Get OTP <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onSkip}
            className="btn-accent w-full py-3 text-xs justify-center font-bold"
          >
            ⚡ Instant Transporter Demo Login
          </button>

          <div className="flex items-center gap-3 text-xs text-slate-400 py-1">
            <span className="h-px flex-1 bg-slate-200" /> or <span className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            onClick={onGoogle}
            className="btn-outline w-full py-3 text-xs"
          >
            <GoogleIcon /> Continue with Google
          </button>
        </div>
      </div>

      <p className="text-center text-[11px] text-slate-500 pb-4">
        By proceeding, you agree to EmptyMiles Terms of Service &amp; Transporter Security Policy.
      </p>
    </div>
  )
}

/* ---------- 6. OTP Verification ---------- */
function OtpStep({
  phone,
  digits,
  setDigits,
  error,
  seconds,
  setSeconds,
  onBack,
  onVerify,
}: {
  phone: string
  digits: string[]
  setDigits: (d: string[]) => void
  error?: string
  setError: (e: string) => void
  seconds: number
  setSeconds: (fn: (s: number) => number) => void
  onBack: () => void
  onVerify: (code: string) => void
}) {
  useEffect(() => {
    if (seconds <= 0) return
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(timer)
  }, [seconds, setSeconds])

  const handleKeypadPress = (val: string) => {
    if (val === 'back') {
      setDigits(digits.slice(0, -1))
    } else if (digits.length < 6) {
      const next = [...digits, val]
      setDigits(next)
      if (next.length === 6) {
        onVerify(next.join(''))
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col max-w-lg mx-auto w-full p-6 min-h-screen justify-between">
      <div className="pt-2">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="font-sans text-2xl font-black text-slate-900">Enter OTP Code</h1>
        <p className="mt-1 text-xs text-slate-500">
          Sent to <strong className="text-slate-900">+91 {phone || '98765 43210'}</strong>
        </p>

        {/* 6 OTP Boxes */}
        <div className="mt-6 flex justify-between gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={cn(
                'grid h-12 w-11 place-items-center rounded-xl border text-base font-extrabold transition shadow-sm',
                digits[i]
                  ? 'border-[#0B192C] bg-slate-50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-400'
              )}
            >
              {digits[i] || ''}
            </div>
          ))}
        </div>

        {error && <p className="mt-2 text-center text-xs font-semibold text-rose-600">{error}</p>}

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>Resend code in 00:{seconds < 10 ? `0${seconds}` : seconds}</span>
          {seconds === 0 && (
            <button
              onClick={() => {
                setSeconds(() => 45)
                alert('New OTP sent!')
              }}
              className="font-bold text-[#F06524] hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>

      {/* Practical Numeric Keypad */}
      <div className="grid grid-cols-3 gap-2 pt-4 pb-6">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'].map((k, idx) => {
          if (!k) return <div key={idx} />
          return (
            <button
              key={k}
              type="button"
              onClick={() => handleKeypadPress(k)}
              className="grid h-12 place-items-center rounded-xl bg-slate-100 font-sans text-lg font-bold text-slate-900 hover:bg-slate-200 active:scale-95 transition"
            >
              {k === 'back' ? '⌫' : k}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  )
}
