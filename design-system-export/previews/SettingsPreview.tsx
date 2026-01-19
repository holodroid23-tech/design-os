import {
    Package,
    Wallet,
    Store,
    Users,
    Banknote,
    Printer,
    Receipt,
    Smartphone,
    LogOut,
    ChevronRight,
    CheckSquare,
    Sparkles,
} from "lucide-react"
import { SettingsGroup } from "@/components/settings/settings-group"
import {
    SettingsItem,
    SettingsItemIcon,
    SettingsItemContent,
    SettingsItemTitle,
    SettingsItemAction,
    SettingsItemDescription,
} from "../components/ui/settings-item"
import { UserProfileRow } from "@/components/settings/user-profile-row"
import { SettingsFooter } from "@/components/settings/settings-footer"
import { Badge } from "../components/ui/badge"

export function SettingsPreview() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground pb-12">
            {/* 1. Header Area */}
            <h2 className="text-[28px] font-bold p-6 pt-12 pb-4 tracking-tight">Settings</h2>

            {/* 2. Main Content (List) */}
            <div className="flex flex-col gap-6 px-4">
                {/* Group 1: User Profile */}
                <SettingsGroup>
                    <UserProfileRow
                        name="Ghhh"
                        email="holodroid23@gmail.com"
                        initials="G"
                        showBadge={true}
                        badgeText="Admin"
                        status="online"
                    />
                </SettingsGroup>

                {/* Group: Screen Coding Workflow V1 Checklist */}
                <SettingsGroup>
                    <div className="p-5 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckSquare className="h-5 w-5 text-primary" />
                            <h3 className="text-base font-semibold">Screen Coding Workflow</h3>
                            <Badge variant="default" className="ml-auto">V1</Badge>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Pre-Implementation Validation</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>Read design system files (colors, typography, radius)</li>
                                    <li>Study ComponentExamples.tsx for patterns</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Component Mapping</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>Map each UI element to existing components</li>
                                    <li>Verify components exist in src/components/ui/</li>
                                    <li>No custom components allowed</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Forbidden Patterns</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>No inline styles</li>
                                    <li>No hardcoded Tailwind colors</li>
                                    <li>Only semantic tokens from design system</li>
                                    <li>No ALL CAPS text</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Design System Compliance</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>All colors from semantic tokens only</li>
                                    <li>Border-radius: 3px|6px|12px|18px|9999px</li>
                                    <li>Typography uses design system fonts</li>
                                </ul>
                            </div>
                            <div className="space-y-2 pt-2 border-t border-border">
                                <p className="font-medium text-foreground">Post-Implementation</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>Run parity check</li>
                                    <li>Verify no linter errors</li>
                                    <li>Manual visual review</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </SettingsGroup>

                {/* Group: Screen Coding Workflow V2 Examples */}
                <SettingsGroup>
                    <div className="p-5 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <h3 className="text-base font-semibold">Screen Coding Workflow</h3>
                            <Badge variant="default" className="ml-auto">V2</Badge>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div className="space-y-3">
                                <p className="font-medium text-foreground">Example-driven learning pattern</p>
                                <p className="text-muted-foreground">
                                    V2 teaches through concrete examples showing correct design system implementation versus common mistakes.
                                </p>
                            </div>
                        </div>
                    </div>
                </SettingsGroup>

                {/* Group: Screen Coding Workflow V3 Constraints */}
                <SettingsGroup>
                    <div className="p-5 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckSquare className="h-5 w-5 text-primary" />
                            <h3 className="text-base font-semibold">Screen Coding Workflow: Constraint-First</h3>
                            <Badge variant="default" className="ml-auto">V3</Badge>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Role: Design System Guardian</p>
                                <p className="text-muted-foreground">Prevents violations before they happen by establishing clear boundaries and guardrails.</p>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Forbidden patterns (read first)</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>No hardcoded Tailwind colors (bg-blue-500, text-red-600)</li>
                                    <li>No hex/RGB colors or CSS custom properties</li>
                                    <li>No arbitrary radius (rounded-lg, rounded-xl)</li>
                                    <li>No ALL CAPS or title case text</li>
                                    <li>No custom components or inline styles</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Allowed patterns</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>Semantic tokens only (bg-layer-primary, text-onLayer-primary)</li>
                                    <li>Exact radius: 3px|6px|12px|18px|9999px</li>
                                    <li>Sentence case text (Save changes, Cancel)</li>
                                    <li>Existing components from src/components/ui/</li>
                                    <li>Tailwind utilities only</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Implementation guardrails</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>Before: List colors, radius, text, components, spacing</li>
                                    <li>During: Stop and verify before writing forbidden patterns</li>
                                    <li>After: Scan for violations in final code</li>
                                </ul>
                            </div>
                            <div className="space-y-2 pt-2 border-t border-border">
                                <p className="font-medium text-foreground">Success criteria</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>Zero forbidden color patterns</li>
                                    <li>Zero forbidden radius patterns</li>
                                    <li>Zero ALL CAPS text</li>
                                    <li>Zero custom components</li>
                                    <li>100% semantic tokens and allowed patterns</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </SettingsGroup>

                {/* Group: Screen Coding Workflow V4 Reference-Driven */}
                <SettingsGroup>
                    <div className="p-5 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckSquare className="h-5 w-5 text-primary" />
                            <h3 className="text-base font-semibold">Screen Coding Workflow: Reference-Driven</h3>
                            <Badge variant="default" className="ml-auto">V4</Badge>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Role: Design System Archaeologist</p>
                                <p className="text-muted-foreground">Excavate and preserve design system knowledge before building anything.</p>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Mandatory Reference Phase (complete all before coding)</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>STEP 1: Read and memorize colors.json (layer, onLayer, border, button, semantic tokens)</li>
                                    <li>STEP 1: Read and memorize radius.json (xs:3px, sm:6px, md:12px, lg:18px, full:9999px)</li>
                                    <li>STEP 1: Read and memorize typography.json (heading, body, mono families)</li>
                                    <li>STEP 2: Catalog ComponentExamples.tsx - memorize all components and prop patterns</li>
                                    <li>STEP 3: Create working memory index mapping mockup elements to components</li>
                                    <li>STEP 4: Extract required tokens from mockup (colors, radius, typography)</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Implementation Phase (after reference complete)</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>STEP 5: Component mapping - reference memorized inventory for each element</li>
                                    <li>STEP 6: Token application - use extracted tokens from design system files</li>
                                    <li>STEP 7: Validation - cross-reference against memorized knowledge</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-foreground">Memory aids</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>Radius: "3-6-12-18-9999" (extra small to full)</li>
                                    <li>Colors: layer/onLayer (surfaces), border (dividers), button/onButton (actions), semantic (states)</li>
                                    <li>Text: "Sentence case always, no shouting"</li>
                                </ul>
                            </div>
                            <div className="space-y-2 pt-2 border-t border-border">
                                <p className="font-medium text-foreground">Success criteria</p>
                                <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
                                    <li>Deep knowledge of all design system files</li>
                                    <li>Perfect mapping between mockup and component inventory</li>
                                    <li>Zero usage of non-existent tokens or components</li>
                                    <li>Reference-validated prop patterns</li>
                                    <li>Memory-based implementation (not guessing)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </SettingsGroup>

                {/* Group: Screen Coding Workflow V5 Hybrid Structured with Validation Loops */}
                <SettingsGroup>
                    <div className="p-5 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckSquare className="h-5 w-5 text-primary" />
                            <h3 className="text-base font-semibold">Screen Coding Workflow: Hybrid Structured</h3>
                            <Badge variant="default" className="ml-auto">V5</Badge>
                        </div>
                        <div className="space-y-4">
                            <p className="text-muted-foreground">Workflow documentation and examples.</p>
                        </div>
                    </div>
                </SettingsGroup>

                {/* Group 2: Business Core */}
                <SettingsGroup>
                    <SettingsItem>
                        <SettingsItemIcon>
                            <div className="h-10 w-10 rounded-xl bg-layer-3 flex items-center justify-center">
                                <Package className="h-5 w-5" />
                            </div>
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-base font-semibold">Inventory</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                        </SettingsItemAction>
                    </SettingsItem>

                    <SettingsItem>
                        <SettingsItemIcon>
                            <div className="h-10 w-10 rounded-xl bg-layer-3 flex items-center justify-center">
                                <Wallet className="h-5 w-5" />
                            </div>
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-base font-semibold">Expenses</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                        </SettingsItemAction>
                    </SettingsItem>
                </SettingsGroup>

                {/* Group 3: Configuration */}
                <SettingsGroup>
                    <SettingsItem>
                        <SettingsItemIcon>
                            <div className="h-10 w-10 rounded-xl bg-layer-3 flex items-center justify-center">
                                <Store className="h-5 w-5" />
                            </div>
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-base font-semibold">General</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                        </SettingsItemAction>
                    </SettingsItem>

                    <SettingsItem>
                        <SettingsItemIcon>
                            <div className="h-10 w-10 rounded-xl bg-layer-3 flex items-center justify-center">
                                <Users className="h-5 w-5" />
                            </div>
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-base font-semibold">Users</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                        </SettingsItemAction>
                    </SettingsItem>

                    <SettingsItem>
                        <SettingsItemIcon>
                            <div className="h-10 w-10 rounded-xl bg-layer-3 flex items-center justify-center">
                                <Banknote className="h-5 w-5" />
                            </div>
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-base font-semibold">Payment</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                        </SettingsItemAction>
                    </SettingsItem>

                    <SettingsItem>
                        <SettingsItemIcon>
                            <div className="h-10 w-10 rounded-xl bg-layer-3 flex items-center justify-center">
                                <Printer className="h-5 w-5" />
                            </div>
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-base font-semibold">Printer</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                        </SettingsItemAction>
                    </SettingsItem>

                    <SettingsItem>
                        <SettingsItemIcon>
                            <div className="h-10 w-10 rounded-xl bg-layer-3 flex items-center justify-center">
                                <Receipt className="h-5 w-5" />
                            </div>
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-base font-semibold">Receipt</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                        </SettingsItemAction>
                    </SettingsItem>

                    <SettingsItem>
                        <SettingsItemIcon>
                            <div className="h-10 w-10 rounded-xl bg-layer-3 flex items-center justify-center">
                                <Smartphone className="h-5 w-5" />
                            </div>
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-base font-semibold">Device Mode</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                        </SettingsItemAction>
                    </SettingsItem>
                </SettingsGroup>

                {/* Group 4: Account Actions */}
                <SettingsGroup>
                    <SettingsItem>
                        <SettingsItemIcon>
                            <div className="h-10 w-10 rounded-xl bg-layer-3 flex items-center justify-center">
                                <LogOut className="h-5 w-5 text-red-500" />
                            </div>
                        </SettingsItemIcon>
                        <SettingsItemContent>
                            <SettingsItemTitle className="text-base font-semibold text-red-500">Log out</SettingsItemTitle>
                        </SettingsItemContent>
                        <SettingsItemAction>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                        </SettingsItemAction>
                    </SettingsItem>
                </SettingsGroup>
            </div>

            {/* 3. Footer Area */}
            <SettingsFooter version="2.4.1" build="89" className="mt-8" />
        </div>
    )
}
