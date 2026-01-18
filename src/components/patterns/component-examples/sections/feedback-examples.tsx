import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { EmptyState } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CheckCircle2, Search, ShoppingCart, XCircle } from 'lucide-react'
import { toast } from 'sonner'

export function SnackbarsExamplesCard() {
  return (
    <Card id="snackbars" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Snackbars</CardTitle>
        <CardDescription>
          Brief notifications for feedback and confirmation. Error states require manual dismissal.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="ghost"
            className="min-h-[48px] sm:min-h-0"
            onClick={() =>
              toast.success('Event created successfully', {
                description: 'This notification will auto-hide in 4 seconds.',
              })
            }
          >
            Success (Auto-hide)
          </Button>

          <Button
            variant="ghost"
            className="min-h-[48px] sm:min-h-0"
            onClick={() =>
              toast.success('File uploaded', {
                description: 'You can view it in your dashboard.',
                action: {
                  label: 'View',
                  onClick: () => console.log('View'),
                },
              })
            }
          >
            Success + Action
          </Button>

          <Button
            variant="ghost"
            className="min-h-[48px] sm:min-h-0"
            onClick={() =>
              toast.warning('Low disk space', {
                description: 'You are running low on storage space.',
                action: {
                  label: 'Upgrade',
                  onClick: () => console.log('Upgrade'),
                },
              })
            }
          >
            Warning
          </Button>

          <Button
            variant="ghost"
            className="min-h-[48px] sm:min-h-0"
            onClick={() =>
              toast.error('Network Error', {
                description: 'Failed to connect. Please try again.',
                duration: Infinity,
                closeButton: true,
                action: {
                  label: 'Retry',
                  onClick: () => console.log('Retry'),
                },
              })
            }
          >
            Error (Manual Close)
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function DialogsExamplesCard() {
  return (
    <Card id="dialogs" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Modals</CardTitle>
        <CardDescription>Centered small modal and fullscreen modal with close icon</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium mb-2 block">Centered small modal</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                  Open centered modal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Centered modal</DialogTitle>
                  <DialogDescription>
                    This is a small modal centered on the screen. Perfect for confirmations, forms, or quick actions.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter your email" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Fullscreen modal</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                  Open fullscreen modal
                </Button>
              </DialogTrigger>
              <DialogContent className="inset-0 top-0 left-0 translate-x-0 translate-y-0 max-w-none h-[100dvh] w-[100dvw] rounded-none">
                <DialogHeader>
                  <DialogTitle>Fullscreen modal</DialogTitle>
                  <DialogDescription>
                    This modal takes up the entire screen. Great for detailed views, forms, or immersive experiences.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full name</Label>
                      <Input placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email address</Label>
                      <Input type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone number</Label>
                      <Input type="tel" placeholder="Enter your phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label>Message</Label>
                      <textarea
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your message"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Select an option</Label>
                      <RadioGroup defaultValue="option1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option1" id="dialog-option1" />
                          <Label htmlFor="dialog-option1">Option 1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option2" id="dialog-option2" />
                          <Label htmlFor="dialog-option2">Option 2</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border">
                    <Button variant="ghost" className="flex-1 min-h-[48px] sm:min-h-0">
                      Cancel
                    </Button>
                    <Button variant="ghost" className="flex-1 min-h-[48px] sm:min-h-0">
                      Save draft
                    </Button>
                    <Button className="flex-1 min-h-[48px] sm:min-h-0">Submit</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SheetsExamplesCard() {
  return (
    <Card id="sheets" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sheet (side panels)</CardTitle>
        <CardDescription>Sliding panels from different sides - enhanced for bottom menu use</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium mb-2 block">Bottom sheet (enhanced)</Label>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="min-h-[48px] sm:min-h-0">
                  Open bottom sheet
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Bottom sheet</SheetTitle>
                  <SheetDescription>
                    This bottom sheet has rounded top corners and is optimized for mobile menus.
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">
                    Content slides up from the bottom with smooth animation.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PermissionItem({ allowed, children }: { allowed: boolean; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      {allowed ? (
        <CheckCircle2 className="h-[18px] w-[18px] text-on-layer-success shrink-0" />
      ) : (
        <XCircle className="h-[18px] w-[18px] text-on-layer-danger shrink-0" />
      )}
      <span className="text-sm text-foreground leading-5">{children}</span>
    </div>
  )
}

export function CheckListsExamplesCard() {
  return (
    <Card id="check-lists" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Check lists</CardTitle>
        <CardDescription>Permission lists and status checks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="bg-background border border-border rounded-2xl p-5 space-y-3">
          <PermissionItem allowed>Update inventory levels &amp; stock alerts</PermissionItem>
          <PermissionItem allowed>View operational performance dashboards</PermissionItem>
          <PermissionItem allowed>Full access to back office</PermissionItem>
          <PermissionItem allowed>Refund yesterday and older orders</PermissionItem>
          <PermissionItem allowed>Edit and delete yesterday and older expenses</PermissionItem>
          <PermissionItem allowed>Access settings</PermissionItem>
          <PermissionItem allowed={false}>Restricted from payment, user settings, and account deletion</PermissionItem>
        </div>

        <div className="bg-background border border-border rounded-2xl p-5 space-y-3">
          <PermissionItem allowed>Refund and edit today's expenses</PermissionItem>
          <PermissionItem allowed={false}>No access to back office</PermissionItem>
          <PermissionItem allowed={false}>Cannot edit or delete yesterday and older expenses</PermissionItem>
          <PermissionItem allowed={false}>Cannot refund yesterday and older orders</PermissionItem>
        </div>
      </CardContent>
    </Card>
  )
}

export function EmptyStatesExamplesCard() {
  return (
    <Card id="empty-states" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Empty states</CardTitle>
        <CardDescription>Placeholders for when no data is available</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <EmptyState
            icon={Search}
            title="No results found"
            description="We couldn't find any items matching your search terms. Please try again with different keywords."
            action={<Button variant="secondary">Clear search</Button>}
          />

          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Looks like you haven't added any items to the cart yet."
            action={
              <div className="flex flex-col gap-3 w-full">
                <Button variant="ghost" className="w-full">
                  View menu
                </Button>
                <Button className="w-full">Start order</Button>
              </div>
            }
          />

          <EmptyState
            className="border-solid border-layer-3 bg-layer-1"
            title="Connection lost"
            description="Please check your internet connection and try again."
            action={
              <a href="#" className="text-primary hover:underline text-sm font-medium">
                Troubleshoot connection
              </a>
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}

