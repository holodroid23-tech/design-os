import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EmailTemplatePreview } from '@/components/previews/EmailTemplatePreview'

export function EmailTemplatesExamplesCard() {
  return (
    <Card id="email-templates" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Email templates</CardTitle>
        <CardDescription>Transactional email designs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-background border border-border rounded-xl p-6 flex justify-center">
          <div className="w-full max-w-xl">
            <EmailTemplatePreview />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ReceiptExamplesCard() {
  return null
}
