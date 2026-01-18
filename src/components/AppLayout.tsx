import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layers, ArrowLeft } from 'lucide-react'
import { PhaseNav } from './PhaseNav'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'

interface AppLayoutProps {
  children: ReactNode
  /** Optional title shown in the header (for sub-pages) */
  title?: string
  /** Optional back navigation path */
  backTo?: string
  /** Optional back label */
  backLabel?: string
  /** Whether to show the phase nav (default: true) */
  showPhaseNav?: boolean
}

export function AppLayout({
  children,
  title,
  backTo,
  backLabel = 'Back',
  showPhaseNav = true,
}: AppLayoutProps) {
  const navigate = useNavigate()

  // Determine if this is a sub-page (has back navigation)
  const isSubPage = !!backTo

  return (
    <div className="min-h-screen bg-background animate-fade-in flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="px-4 sm:px-6 py-3">
          {isSubPage ? (
            /* Sub-page header with back button */
            <div className="max-w-3xl mx-auto flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(backTo)}
                className="text-muted-foreground hover:text-foreground -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
                {backLabel}
              </Button>
              {title && (
                <>
                  <div className="h-4 w-px bg-border" />
                  <h1 className="text-sm font-medium text-foreground truncate">
                    {title}
                  </h1>
                </>
              )}
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>
          ) : (
            /* Main page header with phase nav - full width */
            <div className="flex items-center justify-between gap-4">
              {/* Theme Toggle on left for balance */}
              <div className="w-10 shrink-0">
                {/* Empty spacer for balance */}
              </div>

              {/* Phase Navigation - centered */}
              {showPhaseNav && (
                <div className="flex-1 flex justify-center">
                  <PhaseNav />
                </div>
              )}

              {/* Theme Toggle */}
              <div className="w-10 shrink-0 flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        {children}
      </main>

      {/* Footer with logo */}
      <footer className="py-8 flex justify-center">
        <a
          href="https://buildermethods.com/design-os"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-xs">Powered by</span>
          <div className="w-5 h-5 rounded bg-muted flex items-center justify-center transition-colors group-hover:bg-accent">
            <Layers className="w-3 h-3 text-foreground" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-medium">Design OS</span>
        </a>
      </footer>
    </div>
  )
}
