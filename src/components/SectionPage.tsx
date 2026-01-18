import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { PhaseWarningBanner } from '@/components/PhaseWarningBanner'
import { SpecCard } from '@/components/SpecCard'
import { DataCard } from '@/components/DataCard'
import { ReplicatedDesignsCard } from '@/components/ReplicatedDesignsCard'
import { StepIndicator, type StepStatus } from '@/components/StepIndicator'
import { loadProductData } from '@/lib/product-loader'
import { loadSectionData } from '@/lib/section-loader'
import { ChevronRight, ArrowRight, LayoutList } from 'lucide-react'

/**
 * Determine the status of each step based on what data exists
 * Steps: 1. Section Overview (Spec), 2. Sample Data, 3. Replicated Designs (optional)
 */
function getStepStatuses(sectionData: ReturnType<typeof loadSectionData> | null): StepStatus[] {
  const hasSpec = !!sectionData?.specParsed
  const hasData = !!sectionData?.data
  const hasMocks = (sectionData?.mocks?.length ?? 0) > 0
  const hasReplications = sectionData?.mocks?.some(m => m.isReplicated) ?? false

  // Step 3 only exists if there are mocks
  if (!hasMocks) {
    const steps: boolean[] = [hasSpec, hasData]
    const firstIncomplete = steps.findIndex((done) => !done)

    return steps.map((done, index) => {
      if (done) return 'completed'
      if (index === firstIncomplete) return 'current'
      return 'upcoming'
    })
  }

  // With mocks, include Step 3
  const steps: boolean[] = [hasSpec, hasData, hasReplications]
  const firstIncomplete = steps.findIndex((done) => !done)

  return steps.map((done, index) => {
    if (done) return 'completed'
    if (index === firstIncomplete) return 'current'
    return 'upcoming'
  })
}

/**
 * Check if the required steps for a section are complete (Spec and Data)
 * Replicated designs are optional
 */
function areRequiredStepsComplete(sectionData: ReturnType<typeof loadSectionData> | null): boolean {
  const hasSpec = !!sectionData?.specParsed
  const hasData = !!sectionData?.data
  return hasSpec && hasData
}

export function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const navigate = useNavigate()

  // Load product data to get section info
  const productData = loadProductData()
  const sections = productData.roadmap?.sections || []
  const section = sections.find((s) => s.id === sectionId)
  const currentIndex = sections.findIndex((s) => s.id === sectionId)

  // Load section-specific data (spec and data.json)
  const sectionData = useMemo(
    () => (sectionId ? loadSectionData(sectionId) : null),
    [sectionId]
  )

  // Handle missing section
  if (!section) {
    return (
      <AppLayout backTo="/sections" backLabel="Sections">
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Section not found: {sectionId}
          </p>
        </div>
      </AppLayout>
    )
  }

  const stepStatuses = getStepStatuses(sectionData)
  const requiredStepsComplete = areRequiredStepsComplete(sectionData)
  const hasMocks = (sectionData?.mocks?.length ?? 0) > 0

  // Next section navigation logic
  const isLastSection = currentIndex === sections.length - 1 || currentIndex === -1
  const nextSection = !isLastSection ? sections[currentIndex + 1] : null

  return (
    <AppLayout backTo="/sections" backLabel="Sections" title={section.title}>
      <div className="space-y-6">
        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {section.title}
          </h1>
          <p className="text-muted-foreground">
            {section.description}
          </p>
        </div>

        {/* Warning banner for incomplete prerequisite phases */}
        <PhaseWarningBanner />

        {/* Step 1: Section Overview (Spec) */}
        <StepIndicator step={1} status={stepStatuses[0]}>
          <SpecCard 
            spec={sectionData?.specParsed || null} 
            rawContent={sectionData?.spec || null}
            sectionTitle="Section Overview" 
          />
        </StepIndicator>

        {/* Step 2: Sample Data */}
        <StepIndicator step={2} status={stepStatuses[1]} isLast={!hasMocks && !requiredStepsComplete}>
          <DataCard data={sectionData?.data || null} />
        </StepIndicator>

        {/* Step 3: Replicated Designs (only if mocks exist) */}
        {hasMocks && (
          <StepIndicator step={3} status={stepStatuses[2]} isLast={!requiredStepsComplete}>
            <ReplicatedDesignsCard 
              mocks={sectionData?.mocks || []} 
              sectionId={sectionId!}
            />
          </StepIndicator>
        )}

        {/* Next Step - shown when required steps (Spec and Data) are complete */}
        {requiredStepsComplete && (
          <StepIndicator step={hasMocks ? 4 : 3} status="current" isLast>
            <div className="space-y-3">
              {/* If there's a next section, show two options */}
              {nextSection ? (
                <>
                  <button
                    onClick={() => navigate(`/sections/${nextSection.id}`)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                      <span className="font-medium">Continue to {nextSection.title}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => navigate('/sections')}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-muted text-foreground rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <LayoutList className="w-5 h-5" strokeWidth={1.5} />
                      <span className="font-medium">View All Sections</span>
                    </div>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </button>
                </>
              ) : (
                /* If this is the last or only section, show single link back to sections */
                <button
                  onClick={() => navigate('/sections')}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <LayoutList className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-medium">Back to All Sections</span>
                  </div>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </StepIndicator>
        )}
      </div>
    </AppLayout>
  )
}
