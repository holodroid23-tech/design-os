import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EmailTemplatePreview } from '@/components/previews/EmailTemplatePreview'
import { ReceiptPreview } from '@/components/previews/ReceiptPreview'

export function EmailTemplatesExamplesCard() {
  return (
    <Card id="email-templates" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Email templates</CardTitle>
        <CardDescription>Transactional email designs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-layer-2 border border-border rounded-xl p-6 flex justify-center bg-muted">
          <div className="w-full max-w-xl">
            <EmailTemplatePreview />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ReceiptExamplesCard() {
  return (
    <Card id="receipt" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Receipt</CardTitle>
        <CardDescription>Print-ready receipt design with QR code</CardDescription>
      </CardHeader>
      <CardContent>
        <ReceiptPreview />
      </CardContent>
    </Card>
  )
}
