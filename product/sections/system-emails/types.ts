// =============================================================================
// Data Types
// =============================================================================

export interface EmailTemplateData {
  title: string;
  body: string;
  ctaLabel: string;
  showChecklist?: boolean;
  showDisclaimer?: boolean;
}

export interface SystemEmailsData {
  templates: {
    welcome: EmailTemplateData;
    passwordReset: EmailTemplateData;
    pinReset: EmailTemplateData;
    promotion: EmailTemplateData;
  };
}

// =============================================================================
// Component Props
// =============================================================================

export interface SystemEmailsProps {
  /** The full set of template data for previews */
  data: SystemEmailsData;
  /** The currently selected template to preview */
  activeTemplate: keyof SystemEmailsData['templates'];
  /** Called when switching between email previews in the design tool */
  onSelectTemplate?: (template: keyof SystemEmailsData['templates']) => void;
  /** Mock callback for the primary CTA in the email */
  onActionClick?: () => void;
}
