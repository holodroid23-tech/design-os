import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="system"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    error: "group-[.toaster]:border-destructive group-[.toaster]:text-destructive dark:group-[.toaster]:border-destructive dark:group-[.toaster]:text-destructive",
                    success: "group-[.toaster]:border-green-600 group-[.toaster]:text-green-600 dark:group-[.toaster]:border-green-500 dark:group-[.toaster]:text-green-400",
                    warning: "group-[.toaster]:border-amber-500 group-[.toaster]:text-amber-600 dark:group-[.toaster]:border-amber-500 dark:group-[.toaster]:text-amber-400",
                    info: "group-[.toaster]:border-blue-600 group-[.toaster]:text-blue-600 dark:group-[.toaster]:border-blue-500 dark:group-[.toaster]:text-blue-400",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
