import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { loadProductData } from '@/lib/product-loader'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { ProductOverviewCard } from '@/components/ProductOverviewCard'
import { SectionsCard } from '@/components/SectionsCard'
import { StepIndicator, type StepStatus } from '@/components/StepIndicator'
import { NextPhaseButton } from '@/components/NextPhaseButton'

/**
 * Determine the status of each step on the Product page
 * Steps: 1. Product Vision, 2. Roadmap
 */
function getProductPageStepStatuses(
  hasOverview: boolean,
  hasRoadmap: boolean
): StepStatus[] {
  const statuses: StepStatus[] = []

  // Step 1: Product Vision
  if (hasOverview) {
    statuses.push('completed')
  } else {
    statuses.push('current')
  }

  // Step 2: Roadmap
  if (hasRoadmap) {
    statuses.push('completed')
  } else if (hasOverview) {
    statuses.push('current')
  } else {
    statuses.push('upcoming')
  }

  return statuses
}

export function ProductPage() {
  const navigate = useNavigate()
  const productData = loadProductData()

  const hasOverview = !!productData.overview
  const hasRoadmap = !!productData.roadmap
  const allStepsComplete = hasOverview && hasRoadmap

  const stepStatuses = getProductPageStepStatuses(hasOverview, hasRoadmap)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Product Definition
          </h1>
          <p className="text-muted-foreground">
            Define your product vision and break it into development sections.
          </p>
        </div>

        {/* Step 1: Product Vision */}
        <div id="step-overview">
          <StepIndicator step={1} status={stepStatuses[0]}>
            {productData.overview ? (
              <ProductOverviewCard overview={productData.overview} />
            ) : (
              <EmptyState type="overview" />
            )}
          </StepIndicator>
        </div>

        {/* Step 2: Roadmap / Sections Definition */}
        <div id="step-roadmap">
          <StepIndicator step={2} status={stepStatuses[1]} isLast={!allStepsComplete}>
            {productData.roadmap ? (
              <SectionsCard
                roadmap={productData.roadmap}
                onSectionClick={(sectionId) => navigate(`/sections/${sectionId}`)}
              />
            ) : (
              <EmptyState type="roadmap" />
            )}
          </StepIndicator>
        </div>

        {/* Next Phase Button - shown when all steps complete */}
        {allStepsComplete && (
          <div className="space-y-4">
            <StepIndicator step={3} status="current">
              <NextPhaseButton nextPhase="data-model" />
            </StepIndicator>

            <div className="pt-4 border-t">
              <button
                onClick={() => navigate('/app')}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-stone-900 text-stone-50 rounded-lg hover:bg-stone-800 transition-colors group dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">Launch Pseudo-Mobile App</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-60">Case Study Mode</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
