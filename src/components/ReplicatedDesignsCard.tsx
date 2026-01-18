import { useEffect, useMemo, useState, Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Check, Circle } from 'lucide-react'
import type { MockupInfo } from '@/types/section'

interface ReplicatedDesignsCardProps {
  mocks: MockupInfo[]
  sectionId: string
}

type PreviewPresentation = 'page' | 'mobile' | 'modal'

function inferPresentationFromMock(mock: MockupInfo): PreviewPresentation {
  const haystack = `${mock.fileName} ${mock.componentName} ${mock.displayName}`.toLowerCase()

  if (/(^|[-_ ])(modal|dialog|sheet|drawer)([-_ ]|$)/.test(haystack)) return 'modal'
  if (/(^|[-_ ])(mobile|phone|portrait)([-_ ]|$)/.test(haystack)) return 'mobile'

  return 'page'
}

function PreviewSurface({
  presentation,
  children,
}: {
  presentation: PreviewPresentation
  children: React.ReactNode
}) {
  if (presentation === 'mobile') {
    return (
      <div className="p-4">
        <div className="mx-auto w-full max-w-[420px] aspect-[9/19.5] rounded-[24px] border border-border bg-background shadow-2xl overflow-hidden">
          <div className="h-full w-full overflow-y-auto overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    )
  }

  if (presentation === 'modal') {
    return (
      <div className="w-full max-w-lg mx-auto">
        {children}
      </div>
    )
  }

  return (
    <div className="w-[min(1100px,calc(100vw-2rem))] max-h-[85vh] overflow-y-auto mx-auto">
      {children}
    </div>
  )
}

/**
 * Modal that displays a replicated component preview
 */
function ReplicatedDesignModal({
  mock,
  sectionId,
  isOpen,
  onClose,
}: {
  mock: MockupInfo
  sectionId: string
  isOpen: boolean
  onClose: () => void
}) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [presentation, setPresentation] = useState<PreviewPresentation>(
    inferPresentationFromMock(mock),
  )

  const inferredPresentation = useMemo(() => inferPresentationFromMock(mock), [mock])

  useEffect(() => {
    if (!isOpen || !mock.isReplicated) return

    setPresentation(inferredPresentation)
    setComponent(null)
      setLoading(true)
      setError(null)

      // Dynamically import the component
      import(`../../product/sections/${sectionId}/replicated/${mock.componentName}.tsx`)
        .then((module) => {
          setComponent(() => module.default)
          const modulePresentation = (module as any)?.designOS?.presentation as
            | PreviewPresentation
            | undefined
          if (modulePresentation === 'page' || modulePresentation === 'mobile' || modulePresentation === 'modal') {
            setPresentation(modulePresentation)
          }
          setLoading(false)
        })
        .catch((err) => {
          console.error('Failed to load component:', err)
          setError('Failed to load component')
          setLoading(false)
        })
  }, [inferredPresentation, isOpen, mock.componentName, mock.isReplicated, sectionId])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-none w-auto border-0 bg-transparent p-0 shadow-none"
      >
        {loading && (
          <div className="flex items-center justify-center py-12 px-6">
            <div className="text-muted-foreground">Loading component...</div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-12 gap-3 px-6">
            <div className="text-red-600 dark:text-red-400">{error}</div>
            <p className="text-sm text-muted-foreground">
              Component: {mock.componentName}
            </p>
          </div>
        )}

        {!loading && !error && Component && (
          <PreviewSurface presentation={presentation}>
            <Suspense fallback={<div className="p-6">Loading...</div>}>
              <Component />
            </Suspense>
          </PreviewSurface>
        )}

        {!loading && !error && !Component && mock.isReplicated && (
          <div className="text-center py-12 text-muted-foreground px-6">
            Component could not be loaded
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function ReplicatedDesignsCard({ mocks, sectionId }: ReplicatedDesignsCardProps) {
  const [selectedMock, setSelectedMock] = useState<MockupInfo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Empty state - no mocks exist
  if (mocks.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Replicated Designs
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center py-8 space-y-3">
            <p className="text-muted-foreground">
              No mockups found for this section.
            </p>
            <p className="text-sm text-muted-foreground">
              Add PNG files to{' '}
              <code className="bg-muted px-2 py-0.5 rounded text-xs">
                product/sections/{sectionId}/mocks/
              </code>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const replicatedCount = mocks.filter((m) => m.isReplicated).length
  const totalCount = mocks.length

  const handleMockClick = (mock: MockupInfo) => {
    if (mock.isReplicated) {
      setSelectedMock(mock)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMock(null)
  }

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg font-semibold">
              Replicated Designs
            </CardTitle>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {replicatedCount} of {totalCount} replicated
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {/* Call to action if no replications yet */}
          {replicatedCount === 0 && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground">
                Run <code className="bg-muted px-2 py-0.5 rounded">/design-replication</code>{' '}
                to create design system implementations of these mockups.
              </p>
            </div>
          )}

          {/* Mockup List */}
          <div className="space-y-2">
            {mocks.map((mock) => (
              <button
                key={mock.fileName}
                onClick={() => handleMockClick(mock)}
                disabled={!mock.isReplicated}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border transition-colors text-left ${
                  mock.isReplicated
                    ? 'bg-background hover:bg-muted cursor-pointer'
                    : 'bg-muted/30 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  {mock.isReplicated ? (
                    <Check className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <span className="font-medium">{mock.displayName}</span>
                </div>
                {mock.isReplicated && (
                  <span className="text-xs text-muted-foreground">
                    Click to preview
                  </span>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {selectedMock && (
        <ReplicatedDesignModal
          mock={selectedMock}
          sectionId={sectionId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
