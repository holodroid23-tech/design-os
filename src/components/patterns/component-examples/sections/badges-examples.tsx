import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function BadgesTokensCard() {
  return (
    <Card id="badges" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Badges</CardTitle>
        <CardDescription>Status indicators and labels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="success">Success</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
