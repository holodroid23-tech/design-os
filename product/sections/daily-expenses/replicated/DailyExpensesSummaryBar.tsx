"use client"

import * as React from "react"
import { ChevronDown, Plus } from "lucide-react"
import { SystemIcon } from "@/components/atoms/icon"
import { Button } from "@/components/ui/button"
import {
    BottomSlidingModal,
    BottomSlidingModalClose,
    BottomSlidingModalContent,
    BottomSlidingModalTrigger,
} from "@/components/ui/bottom-sliding-modal"
import { SectionTitle } from "@/components/ui/section-title"
import { SettingsGroup } from "@/components/settings/settings-group"
import { ExpenseLineItemRow } from "@/components/ui/expense-line-item-row"
import { InfoBanner } from "@/components/ui/info-banner"
import { cn } from "@/lib/utils"

import { type ExpenseItem } from "@/stores/useExpenseStore"

export interface DailyExpensesSummaryBarProps {
    title: string
    items: ExpenseItem[]
    tax: number
    currency: string
    onEditItem?: (itemId: string) => void
    onAddExpense?: () => void
    isSummaryOpen?: boolean
    onSummaryOpenChange?: (open: boolean) => void
}

function formatMoney(value: number, currency: string) {
    return `${currency}${value.toFixed(2)}`
}

function buildSummaryText(items: ExpenseItem[], maxChars: number) {
    const base = items.map((item) => item.name).join(", ")
    return base.length > maxChars ? `${base.slice(0, Math.max(0, maxChars - 3))}...` : base
}

export function DailyExpensesSummaryBar({
    title,
    items,
    tax,
    currency,
    onEditItem,
    onAddExpense,
    isSummaryOpen,
    onSummaryOpenChange,
}: DailyExpensesSummaryBarProps) {
    const subtotal = React.useMemo(() => items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0), [items])
    const total = subtotal + tax

    const collapsedSummary = React.useMemo(() => buildSummaryText(items, 30), [items])

    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const isControlled = isSummaryOpen !== undefined
    const isOpen = isControlled ? isSummaryOpen : uncontrolledOpen

    const handleOpenChange = React.useCallback(
        (next: boolean) => {
            if (!isControlled) setUncontrolledOpen(next)
            onSummaryOpenChange?.(next)
        },
        [isControlled, onSummaryOpenChange]
    )

    return (
        <div className="w-full">
            <BottomSlidingModal open={isOpen} onOpenChange={handleOpenChange}>
                <BottomSlidingModalTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            "w-full h-[72px] p-0 cursor-pointer active:scale-[0.99] transition-all relative group flex flex-col items-stretch justify-center text-left px-5",
                            isOpen ? "opacity-0 pointer-events-none" : "opacity-100",
                            "glass-floating-bar"
                        )}
                        aria-label="Expand expenses summary"
                    >
                        <div className="flex items-center justify-between w-full">
                            {/* Left Side: Summary Text */}
                            <div className="flex flex-col min-w-0 pr-4">
                                <div className="text-[14px] leading-tight font-medium text-onLayer-secondary truncate">
                                    {items.length === 0 ? "No expenses" : collapsedSummary}
                                </div>
                                <div className="text-[12px] font-semibold text-onLayer-tertiary">
                                    {items.length} {items.length === 1 ? 'item' : 'items'}
                                </div>
                            </div>

                            {/* Right Side: Total Price & Chevron */}
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="text-[24px] leading-none font-bold tracking-tight font-mono whitespace-nowrap">
                                    {formatMoney(total, currency)}
                                </div>

                                <Button
                                    asChild
                                    variant="invisible"
                                    size="icon"
                                    className="text-onLayer-secondary group-hover:text-onLayer-primary hover:bg-transparent dark:hover:bg-transparent -mr-2"
                                >
                                    <span aria-hidden="true">
                                        <SystemIcon icon={ChevronDown} size="huge" className="rotate-180" aria-hidden="true" />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </button>
                </BottomSlidingModalTrigger>

                <BottomSlidingModalContent
                    fullHeight
                    className="glass-modal-full flex flex-col"
                    header={
                        <SectionTitle
                            titleAs="h2"
                            className="[&_*]:text-onLayer-primary"
                            trailing={
                                <BottomSlidingModalClose asChild>
                                    <Button
                                        variant="invisible"
                                        size="icon"
                                        aria-label="Collapse expenses"
                                        className="text-onLayer-secondary hover:text-onLayer-primary hover:bg-layer-2"
                                    >
                                        <SystemIcon icon={ChevronDown} size="big" aria-hidden="true" />
                                    </Button>
                                </BottomSlidingModalClose>
                            }
                        >
                            {title}
                        </SectionTitle>
                    }
                    footer={
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-12 text-regular-semibold text-onLayer-secondary">
                                <span>Subtotal</span>
                                <span className="font-mono">{formatMoney(subtotal, currency)}</span>
                            </div>

                            <div className="flex items-center justify-between gap-12 text-regular-semibold text-onLayer-secondary">
                                <span>Tax</span>
                                <span className="font-mono">{formatMoney(tax, currency)}</span>
                            </div>

                            <div className="flex justify-between items-end pt-4 mt-2">
                                <span className="text-regular-semibold text-onLayer-secondary mb-1.5">Total</span>
                                <div className="text-[22px] leading-[30px] font-semibold tracking-tight font-mono text-onLayer-primary">
                                    {formatMoney(total, currency)}
                                </div>
                            </div>
                        </div>
                    }
                    scaffoldProps={{
                        className: "flex-1 bg-transparent",
                        headerClassName: "px-6 pt-7 pb-4 bg-transparent",
                        bodyClassName: "min-h-0 bg-transparent",
                        footerClassName: "bg-transparent border-t border-border-inverse p-6 pb-10",
                    }}
                >
                    <div className="px-6 pb-6">
                        <Button
                            type="button"
                            variant="secondary"
                            className="h-12 w-full rounded-[12px]"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                onAddExpense?.()
                            }}
                        >
                            <Plus className="size-4" />
                            Add expense
                        </Button>
                    </div>

                    <div className="px-6 pb-6">
                        <SettingsGroup className="border-border-inverse">
                            {items.length === 0 ? (
                                <div className="px-4 py-6 text-sm text-onLayer-secondary">Start logging today’s expenses.</div>
                            ) : (
                                items.map((item) => (
                                    <ExpenseLineItemRow
                                        key={item.id}
                                        name={item.name}
                                        price={formatMoney(Number(item.amount) || 0, currency)}
                                        imageSrc={item.imageSrc}
                                        imageAlt={item.imageAlt}
                                        color={item.color}
                                        strokeStyle={item.strokeStyle}
                                        onEdit={onEditItem ? () => onEditItem(item.id) : undefined}
                                    />
                                ))
                            )}
                        </SettingsGroup>
                    </div>

                    <div className="px-6 pb-6">
                        <InfoBanner
                            message="Daily expenses are automatically synchronized and cleared after the end of the shift."
                            storageKey="daily-expenses-info-banner-dismissed"
                        />
                    </div>
                </BottomSlidingModalContent>
            </BottomSlidingModal>
        </div>
    )
}
