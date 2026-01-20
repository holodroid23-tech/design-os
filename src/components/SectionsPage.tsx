import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { PhaseWarningBanner } from '@/components/PhaseWarningBanner'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { loadProductData } from '@/lib/product-loader'
import { hasSectionSpec, hasSectionData, loadSectionMocks } from '@/lib/section-loader'
import { ChevronRight, Check } from 'lucide-react'

interface SectionProgress {
  hasSpec: boolean
  hasData: boolean
  designsDone: number
  designsTotal: number
}

function getSectionProgress(sectionId: string): SectionProgress {
  const mocks = loadSectionMocks(sectionId)
  const designsTotal = mocks.length
  const designsDone = mocks.filter((m) => m.isReplicated).length

  return {
    hasSpec: hasSectionSpec(sectionId),
    hasData: hasSectionData(sectionId),
    designsDone,
    designsTotal,
  }
}

export function SectionsPage() {
  const navigate = useNavigate()
  const productData = loadProductData()

  const sections = productData.roadmap?.sections || []

  // Calculate progress for each section
  const sectionProgressMap = useMemo(() => {
    const map: Record<string, SectionProgress> = {}
    for (const section of sections) {
      map[section.id] = getSectionProgress(section.id)
    }
    return map
  }, [sections])

  // Count completed sections (those with spec and data)
  const completedSections = sections.filter(s => {
    const p = sectionProgressMap[s.id]
    return p?.hasSpec && p?.hasData
  }).length

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Sections
          </h1>
          <p className="text-muted-foreground">
            Define specifications and sample data for each section of your product.
          </p>
          {sections.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {completedSections} of {sections.length} sections completed
            </p>
          )}
        </div>

        {/* Warning banner for incomplete prerequisite phases */}
        <PhaseWarningBanner />

        {/* Sections list */}
        {sections.length === 0 ? (
          <EmptyState type="roadmap" />
        ) : (
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">
                All Sections
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {sections.map((section) => {
                  const progress = sectionProgressMap[section.id]
                  const isComplete = progress?.hasSpec && progress?.hasData

                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => navigate(`/sections/${section.id}`)}
                        className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-accent transition-colors"
                      >
                        <div className="flex items-start gap-4 min-w-0">
                          {/* Status indicator */}
                          <div className="shrink-0 mt-0.5">
                            {isComplete ? (
                              <div className="w-6 h-6 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" strokeWidth={2.5} />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs font-medium text-muted-foreground">
                                  {section.order}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-foreground truncate">
                              {section.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                              {section.description}
                            </p>

                            {/* Progress indicators */}
                            <div className="flex items-center gap-3 mt-2">
                              <ProgressDot label="Spec" done={progress?.hasSpec} />
                              <ProgressDot label="Data" done={progress?.hasData} />
                              <ProgressDot
                                label={`Designs (${progress?.designsDone ?? 0}/${progress?.designsTotal ?? 0})`}
                                done={
                                  (progress?.designsTotal ?? 0) > 0 &&
                                  (progress?.designsDone ?? 0) === (progress?.designsTotal ?? 0)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Next Phase Button - shown when all sections are complete */}
        {sections.length > 0 && completedSections === sections.length && (
          <NextPhaseButton nextPhase="export" />
        )}
      </div>
    </AppLayout>
  )
}

interface ProgressDotProps {
  label: string
  done?: boolean
}

function ProgressDot({ label, done }: ProgressDotProps) {
  return (
    <span className={`flex items-center gap-1 text-xs ${
      done
        ? 'text-foreground'
        : 'text-muted-foreground'
    }`}>
      <Check
        className={`w-3 h-3 ${done ? 'text-lime-600 dark:text-lime-400' : 'text-muted-foreground'}`}
        strokeWidth={2.5}
      />
      {label}
    </span>
  )
}
