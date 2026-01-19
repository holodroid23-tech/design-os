import { useEffect, useMemo, useRef, useState, Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Check, Circle } from 'lucide-react'
import type { MockupInfo } from '@/types/section'
import { loadProductData } from '@/lib/product-loader'
import { applyDesignSystemToElement } from '@/lib/apply-design-system'
import { PreviewPortalContainerProvider } from '@/components/previews/PreviewPortalContext'

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
  presentation: _presentation,
  children,
  onFrameRectRef,
}: {
  presentation: PreviewPresentation
  children: React.ReactNode
  onFrameRectRef?: (el: HTMLDivElement | null) => void
}) {
  void _presentation
  const designSystem = useMemo(() => loadProductData().designSystem, [])
  const scopeRef = useRef<HTMLDivElement | null>(null)
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    applyDesignSystemToElement(scopeRef.current, designSystem)
  }, [designSystem])

  return (
    <div
      ref={(el) => {
        scopeRef.current = el
        onFrameRectRef?.(el)
      }}
      className="w-[420px] max-w-[calc(100vw-2rem)] aspect-[9/19.5] rounded-[24px] border border-border bg-background shadow-2xl overflow-hidden relative transform-gpu"
    >
      <PreviewPortalContainerProvider container={portalContainer}>
        <div className="h-full w-full overflow-y-auto overscroll-contain">{children}</div>
        {/* Portal root for Radix-based overlays inside the preview. */}
        <div ref={setPortalContainer} className="absolute left-0 top-0 h-0 w-0" />
      </PreviewPortalContainerProvider>
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
  const frameElRef = useRef<HTMLDivElement | null>(null)

  const inferredPresentation = useMemo(() => inferPresentationFromMock(mock), [mock])

  useEffect(() => {
    if (!isOpen || !mock.isReplicated) return

    setPresentation(inferredPresentation)
    setComponent(null)
      setLoading(true)
      setError(null)

      // Dynamically import the component
      import(`../../product/sections/${sectionId}/replicated/${mock.componentName}.tsx`)
        .then((module: unknown) => {
          const typedModule = module as {
            default: React.ComponentType
            designOS?: { presentation?: PreviewPresentation }
          }

          setComponent(() => typedModule.default)

          const modulePresentation = typedModule.designOS?.presentation
          if (
            modulePresentation === 'page' ||
            modulePresentation === 'mobile' ||
            modulePresentation === 'modal'
          ) {
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

  // Preview-only: reliably close when clicking outside the phone frame,
  // even if the replicated component renders its own full-viewport overlays.
  useEffect(() => {
    if (!isOpen) return

    const handlePointerDownCapture = (event: PointerEvent) => {
      const frameEl = frameElRef.current
      if (!frameEl) return

      // If click is inside the visible phone frame bounds, don't close.
      const rect = frameEl.getBoundingClientRect()
      const x = event.clientX
      const y = event.clientY
      const isInside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom

      if (!isInside) onClose()
    }

    document.addEventListener('pointerdown', handlePointerDownCapture, true)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDownCapture, true)
    }
  }, [isOpen, onClose])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        showCloseButton={false}
        showOverlay
        className="w-fit max-w-none sm:max-w-none border-0 bg-transparent p-0 shadow-none"
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
          <PreviewSurface
            presentation={presentation}
            onFrameRectRef={(el) => {
              frameElRef.current = el
            }}
          >
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
