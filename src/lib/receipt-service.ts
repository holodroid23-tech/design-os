import type { ReceiptConfig } from '@/sections/settings-and-configuration/types'

// ESC/POS command constants
const ESC = '\x1B'
const GS = '\x1D'

export interface ReceiptItem {
    name: string
    quantity: number
    price: number
}

export interface ReceiptData {
    storeName?: string
    storeAddress?: string
    storePhone?: string
    orderId?: string
    date?: string
    time?: string
    cashierName?: string
    items: ReceiptItem[]
    subtotal: number
    tax: number
    taxRate: number
    total: number
    paymentMethod?: string
}

/**
 * Service for generating ESC/POS commands for thermal receipt printers
 */
export class ReceiptService {
    /**
     * Initialize printer - sends reset and character set commands
     */
    static initializePrinter(): Uint8Array {
        const commands = [
            ESC + '@', // Initialize printer
            ESC + 't' + '\x00', // Character code table (PC437 - USA, Standard Europe)
        ]
        return this.stringToBytes(commands.join(''))
    }

    /**
     * Generate complete receipt with all configured elements
     */
    static async generateReceipt(data: ReceiptData, config: ReceiptConfig, logoData?: string, paperSize: '58mm' | '80mm' = '58mm'): Promise<Uint8Array> {
        const commands: string[] = []
        const is58mm = paperSize === '58mm'
        const maxChars = is58mm ? 32 : 48

        // Initialize
        commands.push(ESC + '@')

        // Set character set
        commands.push(ESC + 't' + '\x00')

        // Logo (if provided)
        if (logoData) {
            // Center align
            commands.push(ESC + 'a' + '\x01')

            // Dither and print image
            const imageWidth = is58mm ? 384 : 576
            const dithered = await this.ditherImage(logoData, imageWidth)
            if (dithered) {
                const imageCommands = this.getImageCommands(dithered)
                commands.push(...imageCommands)
            }

            // Store name (if not in logo, or always? specific to user pref, but here we print text below logo if desired or fallback)
            // For now, let's print store name text too if it's not empty, even if logo exists
            if (data.storeName) {
                commands.push(ESC + 'E' + '\x01') // Bold on
                commands.push(data.storeName + '\n')
                commands.push(ESC + 'E' + '\x00') // Bold off
            }
        } else if (data.storeName) {
            // Store name centered
            commands.push(ESC + 'a' + '\x01') // Center align
            commands.push(ESC + 'E' + '\x01') // Bold on
            commands.push(data.storeName + '\n')
            commands.push(ESC + 'E' + '\x00') // Bold off
        }

        // Store details centered
        if (data.storeAddress || data.storePhone) {
            commands.push(ESC + 'a' + '\x01') // Center align
            if (data.storeAddress) {
                commands.push(data.storeAddress + '\n')
            }
            if (data.storePhone) {
                commands.push('Tel: ' + data.storePhone + '\n')
            }
        }

        commands.push('\n')

        // Left align for receipt details
        commands.push(ESC + 'a' + '\x00')

        // Receipt header info
        if (config.showOrderId && data.orderId) {
            this.addSeparator(commands, config.separatorStyle, maxChars)
            commands.push(`Receipt #: ${data.orderId}\n`)
        }

        if ((config.showDate && data.date) || (config.showTime && data.time)) {
            let dateTimeLine = 'Date: '
            if (config.showDate && data.date) {
                dateTimeLine += data.date
            }
            if (config.showDate && config.showTime && data.date && data.time) {
                dateTimeLine += ' '
            }
            if (config.showTime && data.time) {
                dateTimeLine += data.time
            }
            commands.push(dateTimeLine + '\n')
        }

        if (config.showCashier && data.cashierName) {
            commands.push(`Cashier: ${data.cashierName}\n`)
        }

        // Main separator
        this.addSeparator(commands, config.separatorStyle, maxChars)

        // Items
        for (const item of data.items) {
            const itemLine = this.formatItemLine(item, config, maxChars)
            commands.push(itemLine + '\n')
        }

        // Separator before totals
        this.addSeparator(commands, config.separatorStyle, maxChars)

        // Totals
        commands.push(this.formatTotalLine('Subtotal', data.subtotal, maxChars) + '\n')
        commands.push(this.formatTotalLine(`Tax (${(data.taxRate * 100).toFixed(1)}%)`, data.tax, maxChars) + '\n')
        commands.push('\n')
        commands.push(ESC + 'E' + '\x01') // Bold on
        commands.push(this.formatTotalLine('TOTAL', data.total, maxChars) + '\n')
        commands.push(ESC + 'E' + '\x00') // Bold off

        // Footer separator
        this.addSeparator(commands, config.separatorStyle, maxChars)

        // Footer message and website
        if (config.footerMessage) {
            commands.push(ESC + 'a' + '\x01') // Center align
            commands.push('\n' + config.footerMessage + '\n')
        }

        // QR Code (if enabled and data provided)
        if (config.showQrCode && config.footerMessage) { // Using footer message or store website URL as QR data
            // TODO: We need a specific URL field for QR code, but using footer message or a default if empty
            const qrData = 'https://compost.app' // Default or from config in future

            commands.push(ESC + 'a' + '\x01') // Center align
            commands.push('\n')

            // Check if we have an image for QR (uploaded) or if we should generate one from text
            // The prompt implies we have `qrCodeImage` (base64) from store. 
            // If we have a custom QR image uploaded, print that.
            // Otherwise, generate one from text commands?
            // The user instructions say "QR code is also not visible in the app after upload". 
            // This implies printing the UPLOADED image.

            // Wait, receive `logoData` is passed, but what about QR? 
            // We need to pass qrCodeImage as well to generateReceipt. 
            // I will assume the caller passes it or we add it to arguments.
            // For now, let's fix the interface to accept qrDataString or qrImage
        }

        // Handling QR Code properly requires arguments update. 
        // Let's defer strict QR implementation inside this block and rely on the updated signature I'm about to write.
        commands.push(ESC + 'a' + '\x01') // Center align
        commands.push('\n')

        // Cut paper
        commands.push('\n\n\n')
        commands.push(GS + 'V' + '\x41' + '\x03') // Partial cut

        return this.stringToBytes(commands.join(''))
    }

    // REDEFINING generateReceipt with correct signature for the step below to replace cleanly.
    // I will include the QR Logic inside the replacement content fully.

    /**
     * Generate test receipt with sample data
     */
    static async generateTestReceipt(config: ReceiptConfig, logoData?: string, qrCodeData?: string, paperSize: '58mm' | '80mm' = '58mm'): Promise<Uint8Array> {
        const testData: ReceiptData = {
            storeName: 'ComPOSt Demo Store',
            storeAddress: '123 Espresso Lane, Seattle, WA 98101',
            storePhone: '(206) 555-0123',
            orderId: 'ORD-2024-001',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            cashierName: 'Test User',
            items: [
                { name: 'Latte (Large)', quantity: 1, price: 6.5 },
                { name: 'Croissant', quantity: 2, price: 4.0 },
                { name: 'Avocado Toast', quantity: 1, price: 12.0 },
            ],
            subtotal: 22.5,
            taxRate: 0.08,
            tax: 1.8,
            total: 24.3,
            paymentMethod: 'Cash',
        }

        return this.generateReceipt(testData, config, logoData, qrCodeData, paperSize)
    }

    /**
     * Add separator line based on style and width
     */
    private static addSeparator(commands: string[], style: string, width: number): void {
        commands.push('\n')
        let line = ''
        switch (style) {
            case 'Dashed':
                // "- - - " takes 2 chars per dash. width / 2 dashes.
                line = '- '.repeat(Math.floor(width / 2))
                if (line.length > width) line = line.substring(0, width)
                break
            case 'Dotted':
                line = '. '.repeat(Math.floor(width / 2))
                if (line.length > width) line = line.substring(0, width)
                break
            case 'Solid':
                line = '-'.repeat(width)
                break
            default:
                line = '-'.repeat(width)
        }
        commands.push(line + '\n')
        commands.push('\n')
    }

    /**
     * Format item line with quantity and price
     */
    private static formatItemLine(item: ReceiptItem, config: ReceiptConfig, width: number): string {
        const name = item.quantity > 1 ? `${item.name} x${item.quantity}` : item.name
        const price = (item.price * item.quantity).toFixed(2)

        if (config.fontFamily === 'Monospace') {
            const priceStr = `$${price}`
            const nameMaxLen = width - priceStr.length - 1
            const truncatedName = name.length > nameMaxLen ? name.substring(0, nameMaxLen - 3) + '...' : name
            const padding = ' '.repeat(Math.max(1, width - truncatedName.length - priceStr.length))
            return truncatedName + padding + priceStr
        } else {
            return `${name} - $${price}`
        }
    }

    /**
     * Format total line with label and amount
     */
    private static formatTotalLine(label: string, amount: number, width: number): string {
        const amountStr = `$${amount.toFixed(2)}`
        const padding = ' '.repeat(Math.max(1, width - label.length - amountStr.length))
        return label + padding + amountStr
    }

    /**
     * Get ESC/POS commands for printing a dithered image
     */
    private static getImageCommands(imageData: ImageData): string[] {
        const commands: string[] = []
        const { width, height, data } = imageData

        // GS v 0 m xL xH yL yH d1...dk
        const xL = (width / 8) % 256
        const xH = Math.floor((width / 8) / 256)
        const yL = height % 256
        const yH = Math.floor(height / 256)

        commands.push(GS + 'v' + '0' + '\x00')
        commands.push(String.fromCharCode(xL) + String.fromCharCode(xH))
        commands.push(String.fromCharCode(yL) + String.fromCharCode(yH))

        // Process pixels to bytes
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width / 8; j++) {
                let byte = 0
                for (let k = 0; k < 8; k++) {
                    const x = j * 8 + k
                    const idx = (i * width + x) * 4
                    // If pixel is black (0), set bit to 1. White (255) is 0.
                    // Dithered image is already 0 or 255
                    if (data[idx] === 0) {
                        byte |= (1 << (7 - k))
                    }
                }
                commands.push(String.fromCharCode(byte))
            }
        }

        return commands
    }

    /**
     * Convert string to byte array for sending to printer
     */
    private static stringToBytes(str: string): Uint8Array {
        const bytes = new Uint8Array(str.length)
        for (let i = 0; i < str.length; i++) {
            bytes[i] = str.charCodeAt(i)
        }
        return bytes
    }

    /**
     * Dither image to 1-bit black and white for thermal printing
     * Uses Floyd-Steinberg dithering algorithm
     */
    static async ditherImage(imageUrl: string, maxWidth: number = 384): Promise<ImageData | null> {
        try {
            // Create canvas and load image
            const img = new Image()
            img.src = imageUrl
            await new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
            })

            // Calculate dimensions
            let width = img.width
            let height = img.height
            // Resize if too big
            if (width > maxWidth) {
                height = Math.floor((height * maxWidth) / width)
                width = maxWidth
            }

            // Align width to 8 bytes for printing
            width = Math.floor(width / 8) * 8

            // Create canvas
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            if (!ctx) return null

            // Fill white background (for transparency)
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, width, height)

            // Draw image to canvas
            ctx.drawImage(img, 0, 0, width, height)

            // Get image data
            const imageData = ctx.getImageData(0, 0, width, height)
            const data = imageData.data

            // Convert to grayscale and apply Floyd-Steinberg dithering
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = (y * width + x) * 4

                    // Convert to grayscale
                    const gray = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114

                    // Threshold
                    const newGray = gray < 128 ? 0 : 255
                    const error = gray - newGray

                    // Set pixel
                    data[idx] = data[idx + 1] = data[idx + 2] = newGray

                    // Distribute error to neighbors (Floyd-Steinberg)
                    if (x + 1 < width) {
                        const nextIdx = idx + 4
                        data[nextIdx] += (error * 7) / 16
                        // data[nextIdx + 1] and +2 not needed for Mono logic but good for vis
                        data[nextIdx + 1] += (error * 7) / 16
                        data[nextIdx + 2] += (error * 7) / 16
                    }
                    if (y + 1 < height) {
                        if (x > 0) {
                            const blIdx = ((y + 1) * width + (x - 1)) * 4
                            data[blIdx] += (error * 3) / 16
                            data[blIdx + 1] += (error * 3) / 16
                            data[blIdx + 2] += (error * 3) / 16
                        }
                        const bIdx = ((y + 1) * width + x) * 4
                        data[bIdx] += (error * 5) / 16
                        data[bIdx + 1] += (error * 5) / 16
                        data[bIdx + 2] += (error * 5) / 16

                        if (x + 1 < width) {
                            const brIdx = ((y + 1) * width + (x + 1)) * 4
                            data[brIdx] += (error * 1) / 16
                            data[brIdx + 1] += (error * 1) / 16
                            data[brIdx + 2] += (error * 1) / 16
                        }
                    }
                }
            }

            return imageData
        } catch (error) {
            console.error('Failed to dither image:', error)
            return null
        }
    }

    // Actual implementation of generateReceipt with updated signature
    static async generateReceipt(data: ReceiptData, config: ReceiptConfig, logoData?: string, qrCodeData?: string, paperSize: '58mm' | '80mm' = '58mm'): Promise<Uint8Array> {
        const commands: string[] = []
        const is58mm = paperSize === '58mm'
        const maxChars = is58mm ? 32 : 48

        // Initialize
        commands.push(ESC + '@')

        // Set character set
        commands.push(ESC + 't' + '\x00')

        // Logo (if provided)
        if (logoData) {
            // Center align
            commands.push(ESC + 'a' + '\x01')

            // Dither and print image
            const imageWidth = is58mm ? 384 : 576
            const dithered = await this.ditherImage(logoData, imageWidth)
            if (dithered) {
                const imageCommands = this.getImageCommands(dithered)
                commands.push(...imageCommands)
            }

            if (data.storeName) {
                commands.push(ESC + 'E' + '\x01') // Bold on
                commands.push(data.storeName + '\n')
                commands.push(ESC + 'E' + '\x00') // Bold off
            }
        } else if (data.storeName) {
            // Store name centered
            commands.push(ESC + 'a' + '\x01') // Center align
            commands.push(ESC + 'E' + '\x01') // Bold on
            commands.push(data.storeName + '\n')
            commands.push(ESC + 'E' + '\x00') // Bold off
        }

        // Store details centered
        if (data.storeAddress || data.storePhone) {
            commands.push(ESC + 'a' + '\x01') // Center align
            if (data.storeAddress) {
                commands.push(data.storeAddress + '\n')
            }
            if (data.storePhone) {
                commands.push('Tel: ' + data.storePhone + '\n')
            }
        }

        commands.push('\n')

        // Left align for receipt details
        commands.push(ESC + 'a' + '\x00')

        // Receipt header info
        if (config.showOrderId && data.orderId) {
            this.addSeparator(commands, config.separatorStyle, maxChars)
            commands.push(`Receipt #: ${data.orderId}\n`)
        }

        if ((config.showDate && data.date) || (config.showTime && data.time)) {
            let dateTimeLine = 'Date: '
            if (config.showDate && data.date) {
                dateTimeLine += data.date
            }
            if (config.showDate && config.showTime && data.date && data.time) {
                dateTimeLine += ' '
            }
            if (config.showTime && data.time) {
                dateTimeLine += data.time
            }
            commands.push(dateTimeLine + '\n')
        }

        if (config.showCashier && data.cashierName) {
            commands.push(`Cashier: ${data.cashierName}\n`)
        }

        // Main separator
        this.addSeparator(commands, config.separatorStyle, maxChars)

        // Items
        for (const item of data.items) {
            const itemLine = this.formatItemLine(item, config, maxChars)
            commands.push(itemLine + '\n')
        }

        // Separator before totals
        this.addSeparator(commands, config.separatorStyle, maxChars)

        // Totals
        commands.push(this.formatTotalLine('Subtotal', data.subtotal, maxChars) + '\n')
        commands.push(this.formatTotalLine(`Tax (${(data.taxRate * 100).toFixed(1)}%)`, data.tax, maxChars) + '\n')
        commands.push('\n')
        commands.push(ESC + 'E' + '\x01') // Bold on
        commands.push(this.formatTotalLine('TOTAL', data.total, maxChars) + '\n')
        commands.push(ESC + 'E' + '\x00') // Bold off

        // Footer separator
        this.addSeparator(commands, config.separatorStyle, maxChars)

        // Footer message and website
        if (config.footerMessage) {
            commands.push(ESC + 'a' + '\x01') // Center align
            commands.push('\n' + config.footerMessage + '\n')
        }

        // QR Code (if enabled)
        if (config.showQrCode && qrCodeData) {
            commands.push(ESC + 'a' + '\x01') // Center align
            commands.push('\n')

            // Print user uploaded QR code image
            // We assume qrCodeData is base64 image here since that's what we have in store
            // We can also support text-to-QR later if needed but user specifically asked for uploaded QR to work
            const qrWidth = is58mm ? 200 : 300 // Smaller than full width
            const ditheredQr = await this.ditherImage(qrCodeData, qrWidth)
            if (ditheredQr) {
                const qrCommands = this.getImageCommands(ditheredQr)
                commands.push(...qrCommands)
            }
        }

        commands.push(ESC + 'a' + '\x01') // Center align
        commands.push('\n')

        // Cut paper
        commands.push('\n\n\n')
        commands.push(GS + 'V' + '\x41' + '\x03') // Partial cut

        return this.stringToBytes(commands.join(''))
    }
}

export const receiptService = ReceiptService
