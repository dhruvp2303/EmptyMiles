import { ResponsiveShell } from '@/components/shell/responsive-shell'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <ResponsiveShell>{children}</ResponsiveShell>
}
