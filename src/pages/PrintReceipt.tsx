import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function PrintReceipt() {
    const [searchParams] = useSearchParams()
    const autoPrint = searchParams.get('auto') !== '0' // Default to auto-print

    // Auto-trigger print dialog when page loads
    useEffect(() => {
        if (autoPrint) {
            // Small delay to ensure page is fully rendered
            const timer = setTimeout(() => {
                window.print()
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [autoPrint])


    return (
        <div style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '11pt',
            lineHeight: 1.3,
            margin: 0,
            padding: '10px',
            maxWidth: '58mm',
            background: 'white',
            color: 'black',
            minHeight: '100vh'
        }}>
            <style>{`
                @page { size: 58mm auto; margin: 0; }
                @media print {
                    body { margin: 0; padding: 2mm; background: white; }
                    .no-print { display: none !important; }
                }
            `}</style>

            <button
                className="no-print"
                onClick={() => window.print()}
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '15px',
                    fontSize: '18px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    cursor: 'pointer'
                }}
            >
                🖨️ TAP HERE TO PRINT
            </button>

            <button
                className="no-print"
                onClick={() => window.history.back()}
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    background: '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    cursor: 'pointer'
                }}
            >
                ← Back to App
            </button>

            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                {`================================
      ComPOSt Demo Store
      123 Espresso Lane
      Seattle, WA 98101
================================
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
================================

Latte (Large)         $6.50
Croissant x2          $8.00
Avocado Toast        $12.00

================================
Subtotal             $22.50
Tax (8%)              $1.80
================================
TOTAL                $24.30
================================

  Thank you for your order!`}
            </pre>
        </div>
    )
}
