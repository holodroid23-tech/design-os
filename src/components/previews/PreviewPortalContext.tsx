"use client"

/* eslint-disable react-refresh/only-export-components */

import * as React from "react"

type PreviewPortalContainer = HTMLElement | null

const PreviewPortalContainerContext = React.createContext<
  PreviewPortalContainer | undefined
>(undefined)

export function PreviewPortalContainerProvider({
  container,
  children,
}: {
  container: PreviewPortalContainer
  children: React.ReactNode
}) {
  return (
    <PreviewPortalContainerContext.Provider value={container}>
      {children}
    </PreviewPortalContainerContext.Provider>
  )
}

/**
 * Returns the Radix portal container when the preview surface provides one.
 *
 * Outside of preview, this returns `undefined` so Radix falls back to `document.body`.
 */
export function usePreviewPortalContainer(): HTMLElement | undefined {
  const container = React.useContext(PreviewPortalContainerContext)
  return container ?? undefined
}

