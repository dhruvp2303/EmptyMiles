import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'

export default function Page() {
  return (
    <main className="min-h-screen w-full max-w-lg mx-auto flex flex-col bg-background text-foreground shadow-sm">
      <OnboardingFlow />
    </main>
  )
}
