export type HardwareType = 'printer' | 'terminal' | 'scanner' | 'card_reader';
import { Capacitor, registerPlugin } from '@capacitor/core';

interface StripeTerminalPlugin {
    initialize(): Promise<void>;
    setBackendUrl(options: { url: string }): Promise<void>;
    discoverReaders(options?: any): Promise<void>;
    connectReader(options: { serialNumber: string }): Promise<{ connected: boolean; serialNumber: string }>;
    collectPayment(options: { amount: number; currency?: string }): Promise<{ success: boolean; amount: number; simulated: boolean; paymentIntentId?: string }>;
    addListener(eventName: 'readersDiscovered', listenerFunc: (data: { readers: any[] }) => void): Promise<{ remove: () => void }>;
    addListener(eventName: 'paymentStatus', listenerFunc: (data: { status: string; message: string }) => void): Promise<{ remove: () => void }>;
}

const StripeTerminal = registerPlugin<StripeTerminalPlugin>('StripeTerminal');

export type PrinterConnectionMethod = 'bluetooth' | 'usb';

export interface BaseDevice {
    id: string;
    name: string;
    type: HardwareType;
    isConnected: boolean;
    status: 'idle' | 'busy' | 'error' | 'offline';
    connectionType: 'bluetooth' | 'usb' | 'network' | 'embedded';
}

export interface Printer extends BaseDevice {
    type: 'printer';
    paperSize: '58mm' | '80mm';
}

export interface PaymentTerminal extends BaseDevice {
    type: 'terminal';
    provider: string;
}

// Known thermal printer BLE service UUIDs (for printers that support BLE printing)
const THERMAL_PRINTER_SERVICES = [
    // Common ESC/POS BLE Service
    '49535343-fe7d-4ae5-8fa9-9fafd205e455',
    // Generic Printer Service
    '000018f0-0000-1000-8000-00805f9b34fb',
    // Nordic UART Service (used by many Chinese printers)
    '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
    // Common Chinese Printer Service 1
    '0000ffe0-0000-1000-8000-00805f9b34fb',
    // Common Chinese Printer Service 2
    '0000ff00-0000-1000-8000-00805f9b34fb',
    // Cashino/similar
    '0000fee7-0000-1000-8000-00805f9b34fb',
    '0000ae00-0000-1000-8000-00805f9b34fb',
    '0000af00-0000-1000-8000-00805f9b34fb',
];

interface PrinterConnection {
    method: PrinterConnectionMethod;
    bluetoothDevice?: any;
    gattServer?: any;
    characteristic?: any;
    serialPort?: any;
    writer?: any;
}

class HardwareService {
    private devices: BaseDevice[] = [];
    private listeners: Set<(devices: BaseDevice[]) => void> = new Set();
    private connectedPrinters: Map<string, PrinterConnection> = new Map();

    // Stripe backend URL (ngrok URL for real device, localhost for emulator)
    private stripeBackendUrl: string = 'http://10.0.2.2:4242'; // Default for Android emulator

    constructor() {
        this.loadDevices();
    }

    /**
     * Set the Stripe backend URL (e.g., ngrok URL)
     * Call this before initializing terminal
     */
    async setStripeBackendUrl(url: string): Promise<void> {
        this.stripeBackendUrl = url;
        console.log('🔗 Stripe backend URL set to:', url);

        if (Capacitor.isNativePlatform()) {
            await StripeTerminal.setBackendUrl({ url });
        }
    }

    /**
     * Get the current Stripe backend URL
     */
    getStripeBackendUrl(): string {
        return this.stripeBackendUrl;
    }

    private loadDevices() {
        const saved = localStorage.getItem('compost_hardware_devices');
        if (saved) {
            try {
                this.devices = JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse saved hardware devices', e);
                this.devices = [];
            }
        }
    }

    private saveDevices() {
        localStorage.setItem('compost_hardware_devices', JSON.stringify(this.devices));
        this.notify();
    }

    private notify() {
        this.listeners.forEach(l => l([...this.devices]));
    }

    subscribe(listener: (devices: BaseDevice[]) => void) {
        this.listeners.add(listener);
        listener([...this.devices]);
        return () => this.listeners.delete(listener);
    }

    getDevices() {
        return [...this.devices];
    }

    /**
     * Check if Web Serial API is available
     */
    isSerialAvailable(): boolean {
        return 'serial' in navigator;
    }

    /**
     * Check if Web Bluetooth is available
     */
    isBluetoothAvailable(): boolean {
        return 'bluetooth' in navigator;
    }

    /**
     * Discover USB printers using Web Serial API
     */
    async discoverUsbPrinters(): Promise<Printer[]> {
        if (!this.isSerialAvailable()) {
            console.log('Web Serial API not available');
            return [];
        }

        try {
            console.log('Requesting USB/Serial device...');
            const port = await (navigator as any).serial.requestPort();

            const portInfo = port.getInfo();
            console.log('USB Port selected:', portInfo);

            const newDevice: Printer = {
                id: `usb-${Date.now()}`,
                name: `USB Printer (${portInfo.usbVendorId || 'Unknown'})`,
                type: 'printer',
                isConnected: false,
                status: 'idle',
                connectionType: 'usb',
                paperSize: '58mm'
            };

            // Store the port reference
            (newDevice as any)._serialPort = port;

            return [newDevice];
        } catch (e) {
            console.log('USB discovery cancelled or failed:', e);
            return [];
        }
    }

    /**
     * Discover Bluetooth printers
     * Note: This uses Web Bluetooth which only supports BLE, not Classic Bluetooth SPP
     */
    async discoverBlePrinters(): Promise<Printer[]> {
        if (!this.isBluetoothAvailable()) {
            console.log('Web Bluetooth not available');
            return [];
        }

        try {
            console.log('Requesting Bluetooth device...');
            console.log('⚠️ IMPORTANT: Select "Unnamed Device" entries, NOT the named "PTP-II"');
            console.log('The named device uses Classic Bluetooth which requires PIN and won\'t work with Web Bluetooth.');

            const device = await (navigator as any).bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [
                    ...THERMAL_PRINTER_SERVICES,
                    '00001800-0000-1000-8000-00805f9b34fb', // Generic Access
                    '00001801-0000-1000-8000-00805f9b34fb', // Generic Attribute
                    '0000180a-0000-1000-8000-00805f9b34fb', // Device Information
                ]
            });

            console.log('Device selected:', device.name || 'Unnamed Device', 'ID:', device.id);

            // Check if this is likely the Classic Bluetooth interface
            if (device.name && device.name.includes('PTP')) {
                console.warn('⚠️ You may have selected the Classic Bluetooth interface.');
                console.warn('If prompted for a PIN, this interface will NOT work with Web Bluetooth.');
                console.warn('Try selecting an "Unnamed Device" instead.');
            }

            const newDevice: Printer = {
                id: device.id,
                name: device.name || `BLE Printer ${Math.floor(Math.random() * 1000)}`,
                type: 'printer',
                isConnected: false,
                status: 'idle',
                connectionType: 'bluetooth',
                paperSize: '58mm'
            };

            (newDevice as any)._bluetoothDevice = device;

            return [newDevice];
        } catch (e: any) {
            if (e.name === 'NotFoundError') {
                console.log('Bluetooth discovery cancelled by user');
            } else {
                console.error('Bluetooth discovery failed:', e);
            }
            return [];
        }
    }

    /**
     * Main discovery method - prompts user to choose connection type
     */
    async discoverDevices(type: HardwareType): Promise<BaseDevice[]> {
        console.log(`Searching for ${type}s...`);

        if (type === 'printer') {
            // Try USB first since it's more reliable
            const hasSerial = this.isSerialAvailable();
            const hasBluetooth = this.isBluetoothAvailable();

            if (hasSerial && hasBluetooth) {
                // Let the specific discovery method be called from UI
                // For now, try Bluetooth since that's what user was using
                return this.discoverBlePrinters();
            } else if (hasSerial) {
                return this.discoverUsbPrinters();
            } else if (hasBluetooth) {
                return this.discoverBlePrinters();
            }

            console.error('No printer connection method available');
            return [];
        }

        if (type === 'terminal') {
            if (Capacitor.isNativePlatform()) {
                console.log('🚀 Using Native Stripe Terminal...');
                return new Promise(async (resolve, reject) => {
                    let hasResolved = false;
                    try {
                        console.log('📱 Initializing Stripe Terminal SDK...');
                        await StripeTerminal.initialize();
                        console.log('✅ Stripe Terminal SDK initialized');

                        const listener = await StripeTerminal.addListener('readersDiscovered', (data) => {
                            if (hasResolved) return;
                            hasResolved = true;

                            console.log('📡 Native readers discovered:', data.readers);
                            listener.remove();
                            const mapped = data.readers.map((r: any) => ({
                                id: r.serialNumber,
                                name: `Phone NFC Reader`,
                                type: 'terminal' as const,
                                isConnected: false,
                                status: 'idle' as const,
                                connectionType: 'embedded' as const
                            }));
                            resolve(mapped);
                        });

                        console.log('🔍 Starting reader discovery...');
                        await StripeTerminal.discoverReaders();
                        console.log('📋 Discovery request sent, waiting for response...');

                        // Timeout after 10 seconds
                        setTimeout(() => {
                            if (hasResolved) return;
                            hasResolved = true;

                            console.warn('⏱️ Discovery timed out after 10 seconds');
                            listener.remove();
                            reject(new Error('NFC initialization timed out. This device may not support Tap to Pay on Android.'));
                        }, 10000);
                    } catch (e: any) {
                        if (hasResolved) return;
                        hasResolved = true;

                        console.error('❌ Native terminal discovery failed:', e);
                        console.error('Error details:', JSON.stringify(e, null, 2));
                        const errorMessage = e && e.message ? e.message : JSON.stringify(e);
                        reject(new Error(errorMessage));
                    }
                });
            }

            if (this.isBluetoothAvailable()) {
                try {
                    const device = await (navigator as any).bluetooth.requestDevice({
                        acceptAllDevices: true,
                        optionalServices: ['battery_service']
                    });
                    console.log('Found bluetooth device:', device.name);
                    const newDevice: BaseDevice = {
                        id: device.id,
                        name: device.name || 'Unknown Device',
                        type,
                        isConnected: false,
                        status: 'idle',
                        connectionType: 'bluetooth'
                    };
                    return [newDevice];
                } catch (e) {
                    console.log('Bluetooth discovery cancelled or failed', e);
                }
            }
        }

        return this.devices.filter(d => d.type === type);
    }


    /**
     * Connect to a discovered Stripe Terminal reader
     * Uses native plugin on Android, simulated on browser
     */
    async connectToTerminal(serialNumber: string): Promise<{ connected: boolean; serialNumber: string }> {
        console.log('🔌 Connecting to terminal:', serialNumber);

        if (Capacitor.isNativePlatform()) {
            // Use actual native plugin
            console.log('📱 Using native Stripe Terminal plugin...');
            try {
                const result = await StripeTerminal.connectReader({ serialNumber });
                console.log('✅ Native terminal connected:', result);
                return result;
            } catch (error) {
                console.error('❌ Native connection failed:', error);
                throw error;
            }
        }

        // Web simulation fallback
        console.log('🌐 Using web simulation (no native platform detected)...');
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log('✅ Terminal connected (simulated)');
        return { connected: true, serialNumber };
    }

    /**
     * Collect payment using the connected terminal
     * Uses native plugin on Android, simulated on browser
     */
    async collectTerminalPayment(amount: number, onStatusChange?: (status: string, message: string) => void): Promise<{ success: boolean; amount: number; simulated: boolean; paymentIntentId?: string }> {
        console.log('💳 Collecting payment:', amount);

        if (Capacitor.isNativePlatform()) {
            // Use actual native plugin
            console.log('📱 Using native Stripe Terminal plugin for payment...');

            // Listen for payment status updates
            let statusListener: { remove: () => void } | null = null;
            if (onStatusChange) {
                statusListener = await StripeTerminal.addListener('paymentStatus', (data) => {
                    console.log('📊 Payment status:', data.status, data.message);
                    onStatusChange(data.status, data.message);
                });
            }

            try {
                const result = await StripeTerminal.collectPayment({ amount, currency: 'usd' });
                console.log('✅ Native payment collected:', result);
                return result;
            } catch (error) {
                console.error('❌ Native payment failed:', error);
                throw error;
            } finally {
                if (statusListener) {
                    statusListener.remove();
                }
            }
        }

        // Web simulation fallback
        console.log('🌐 Using web simulation (no native platform detected)...');
        console.log('⏱️ Simulating card tap (4 seconds)...');

        if (onStatusChange) {
            onStatusChange('waiting_for_card', 'Please tap your card');
        }

        await new Promise(resolve => setTimeout(resolve, 4000));
        console.log('✅ Card tapped! (simulated)');

        if (onStatusChange) {
            onStatusChange('processing', 'Processing payment...');
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('✅ Payment successful! (simulated)');

        return { success: true, amount, simulated: true };
    }

    // Scanner Keyboard Integration
    setupKeyboardScanner(onScan: (barcode: string) => void) {
        let buffer = '';
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                if (buffer.length > 2) {
                    onScan(buffer);
                }
                buffer = '';
            } else {
                if (e.key.length === 1) buffer += e.key;
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }

    /**
     * Connect to a USB printer via Web Serial
     */
    async connectUsbPrinter(device: BaseDevice): Promise<boolean> {
        const port = (device as any)._serialPort;
        if (!port) {
            console.error('No serial port reference found');
            return false;
        }

        try {
            console.log('Opening serial port...');
            await port.open({ baudRate: 9600 }); // Common for thermal printers

            const writer = port.writable.getWriter();

            this.connectedPrinters.set(device.id, {
                method: 'usb',
                serialPort: port,
                writer
            });

            console.log('✅ USB Printer connected successfully!');
            return true;
        } catch (e) {
            console.error('Failed to connect USB printer:', e);
            return false;
        }
    }

    /**
     * Connect to a BLE printer and discover print characteristic
     */
    async connectBlePrinter(device: BaseDevice): Promise<boolean> {
        const bluetoothDevice = (device as any)._bluetoothDevice;
        if (!bluetoothDevice) {
            console.error('No Bluetooth device reference found. Please run discovery again.');
            return false;
        }

        try {
            console.log('Connecting to GATT server...');
            const server = await bluetoothDevice.gatt.connect();
            console.log('✅ GATT server connected');

            // Discover all services
            console.log('Discovering services...');
            const services = await server.getPrimaryServices();
            console.log(`Found ${services.length} services`);

            // Log all services and their characteristics for debugging
            let printCharacteristic: any = null;
            let printService: any = null;

            for (const service of services) {
                console.log(`📦 Service: ${service.uuid}`);

                try {
                    const characteristics = await service.getCharacteristics();

                    for (const char of characteristics) {
                        const props = [];
                        if (char.properties.read) props.push('read');
                        if (char.properties.write) props.push('write');
                        if (char.properties.writeWithoutResponse) props.push('writeNoResp');
                        if (char.properties.notify) props.push('notify');

                        console.log(`  └─ Char: ${char.uuid} [${props.join(', ')}]`);

                        // Check if this is a writable characteristic we can use for printing
                        if (!printCharacteristic && (char.properties.write || char.properties.writeWithoutResponse)) {
                            // Skip generic services (1800, 1801)
                            if (!service.uuid.startsWith('00001800') && !service.uuid.startsWith('00001801')) {
                                printCharacteristic = char;
                                printService = service;
                                console.log(`  └─ ✅ Found potential print characteristic!`);
                            }
                        }
                    }
                } catch (e) {
                    console.log(`  └─ Could not get characteristics`);
                }
            }

            if (!printCharacteristic) {
                console.error('❌ No writable characteristic found for printing!');
                console.error('This printer may not support BLE printing.');
                console.error('The Cashio PTP-II primarily uses Classic Bluetooth SPP, not BLE.');
                console.error('');
                console.error('🔧 Workarounds:');
                console.error('1. Connect via USB cable and use USB printing');
                console.error('2. Use a native Android app with Bluetooth SPP support');

                await server.disconnect();
                return false;
            }

            // Store the connection
            this.connectedPrinters.set(device.id, {
                method: 'bluetooth',
                bluetoothDevice,
                gattServer: server,
                characteristic: printCharacteristic
            });

            console.log('✅ BLE Printer connected successfully!');
            console.log(`Using service: ${printService.uuid}`);
            console.log(`Using characteristic: ${printCharacteristic.uuid}`);

            return true;
        } catch (e: any) {
            console.error('Failed to connect BLE printer:', e);

            if (e.message?.includes('GATT')) {
                console.error('');
                console.error('💡 GATT connection failed. This often means:');
                console.error('1. You selected the Classic Bluetooth interface (requires PIN)');
                console.error('2. The printer is out of range');
                console.error('3. Another device is connected to the printer');
                console.error('');
                console.error('Try: Select an "Unnamed Device" in the Bluetooth picker');
            }

            return false;
        }
    }

    /**
     * Main connect method - routes to appropriate connection method
     */
    async connectDevice(device: BaseDevice): Promise<boolean> {
        try {
            if (device.type === 'printer') {
                let success = false;

                if (device.connectionType === 'usb') {
                    success = await this.connectUsbPrinter(device);
                } else if (device.connectionType === 'bluetooth') {
                    success = await this.connectBlePrinter(device);
                }

                if (success) {
                    const index = this.devices.findIndex(d => d.id === device.id);
                    if (index !== -1) {
                        this.devices[index].isConnected = true;
                        this.devices[index].status = 'idle';
                    } else {
                        this.devices.push({ ...device, isConnected: true, status: 'idle' });
                    }
                    this.saveDevices();
                }

                return success;
            }

            // Generic connection for other devices
            const index = this.devices.findIndex(d => d.id === device.id);
            if (index !== -1) {
                this.devices[index].isConnected = true;
                this.devices[index].status = 'idle';
            } else {
                this.devices.push({ ...device, isConnected: true, status: 'idle' });
            }
            this.saveDevices();
            return true;
        } catch (error) {
            console.error('Failed to connect device:', error);
            return false;
        }
    }

    async disconnectDevice(deviceId: string): Promise<boolean> {
        try {
            const connection = this.connectedPrinters.get(deviceId);
            if (connection) {
                if (connection.method === 'usb' && connection.writer) {
                    connection.writer.releaseLock();
                    await connection.serialPort?.close();
                } else if (connection.method === 'bluetooth' && connection.gattServer) {
                    connection.gattServer.disconnect();
                }
                this.connectedPrinters.delete(deviceId);
            }

            const index = this.devices.findIndex(d => d.id === deviceId);
            if (index !== -1) {
                this.devices[index].isConnected = false;
                this.devices[index].status = 'offline';
                this.saveDevices();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to disconnect device:', error);
            return false;
        }
    }

    /**
     * Print data to the connected printer
     */
    async printReceipt(printerId: string, data: Uint8Array): Promise<boolean> {
        try {
            const printer = this.devices.find(d => d.id === printerId && d.type === 'printer');
            if (!printer || !printer.isConnected) {
                console.error('Printer not found or not connected');
                return false;
            }

            const connection = this.connectedPrinters.get(printerId);
            if (!connection) {
                console.error('No connection found for printer');
                return false;
            }

            // Update status to busy
            const index = this.devices.findIndex(d => d.id === printerId);
            if (index !== -1) {
                this.devices[index].status = 'busy';
                this.notify();
            }

            try {
                if (connection.method === 'usb') {
                    return await this.printViaUsb(connection, data);
                } else if (connection.method === 'bluetooth') {
                    return await this.printViaBle(connection, data);
                }
                return false;
            } finally {
                if (index !== -1) {
                    this.devices[index].status = 'idle';
                    this.notify();
                }
            }
        } catch (error) {
            console.error('Failed to print receipt:', error);
            return false;
        }
    }

    /**
     * Print via USB Serial
     */
    private async printViaUsb(connection: PrinterConnection, data: Uint8Array): Promise<boolean> {
        try {
            console.log(`Sending ${data.length} bytes via USB...`);
            await connection.writer.write(data);
            console.log('✅ USB print complete!');
            return true;
        } catch (e) {
            console.error('USB print failed:', e);
            return false;
        }
    }

    /**
     * Print via BLE
     */
    private async printViaBle(connection: PrinterConnection, data: Uint8Array): Promise<boolean> {
        try {
            // Ensure GATT server is still connected
            if (!connection.gattServer?.connected) {
                console.log('Reconnecting to GATT server...');
                await connection.bluetoothDevice.gatt.connect();
            }

            const characteristic = connection.characteristic;
            if (!characteristic) {
                console.error('No print characteristic available');
                return false;
            }

            // Send data in chunks (BLE has MTU limits, typically 20-512 bytes)
            const chunkSize = 20; // Conservative for compatibility
            console.log(`Sending ${data.length} bytes via BLE in ${Math.ceil(data.length / chunkSize)} chunks...`);

            for (let i = 0; i < data.length; i += chunkSize) {
                const chunk = data.slice(i, Math.min(i + chunkSize, data.length));

                if (characteristic.properties.writeWithoutResponse) {
                    await characteristic.writeValueWithoutResponse(chunk);
                } else {
                    await characteristic.writeValue(chunk);
                }

                // Small delay between chunks
                await new Promise(resolve => setTimeout(resolve, 10));
            }

            console.log('✅ BLE print complete!');
            return true;
        } catch (e) {
            console.error('BLE print failed:', e);
            return false;
        }
    }

    async testPrint(printerId: string, config: any): Promise<boolean> {
        console.log('Test print requested for printer:', printerId, 'with config:', config);
        return true;
    }

    /**
     * Get available connection methods
     */
    getAvailableConnectionMethods(): PrinterConnectionMethod[] {
        const methods: PrinterConnectionMethod[] = [];
        if (this.isSerialAvailable()) methods.push('usb');
        if (this.isBluetoothAvailable()) methods.push('bluetooth');
        return methods;
    }

    /**
     * Print via RawBT intent (Android only)
     * This allows silent printing without the print dialog
     * RawBT must be installed and configured with the printer
     */
    /**
     * Print via RawBT intent (Android only)
     * This allows silent printing without the print dialog
     * RawBT must be installed and configured with the printer
     */
    printViaRawBT(data: Uint8Array): boolean {
        try {
            // Correctly convert Uint8Array to binary string for btoa
            let binary = '';
            const len = data.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(data[i]);
            }

            // Encode to Base64
            const base64 = btoa(binary);

            // RawBT intent URL scheme with AUTO PRINT parameters
            // This structure is more reliable for passing base64 binary data
            const url = `intent:base64,${base64}#Intent;scheme=rawbt;package=ru.a402d.rawbtprinter;S.editor=false;S.auto=true;S.dialog=false;launchFlags=0x10000;end;`;

            console.log(`Sending ${data.length} bytes to RawBT...`);

            // Use iframe method to avoid navigating away
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            iframe.src = url;

            setTimeout(() => {
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
            }, 2000);

            console.log('✅ Sent to RawBT');
            return true;
        } catch (e) {
            console.error('Failed to send to RawBT:', e);
            return false;
        }
    }

    /**
     * Print text directly via RawBT using plain text (simpler method)
     */
    printTextViaRawBT(text: string): boolean {
        try {
            // Encode to Base64 to avoid URL encoding issues with special chars
            // RawBT handles base64 content reliably
            const base64 = btoa(text);

            // RawBT intent URL scheme with AUTO PRINT parameters
            // S.editor=false -> Don't show editor
            // S.auto=true   -> Print automatically
            // S.dialog=false -> Suppress dialogs
            // launchFlags=0x10000 -> FLAG_ACTIVITY_NO_ANIMATION
            const url = `intent:base64,${base64}#Intent;scheme=rawbt;package=ru.a402d.rawbtprinter;S.editor=false;S.auto=true;S.dialog=false;launchFlags=0x10000;end;`;

            // Create a hidden iframe to trigger the intent "silently"
            // This prevents the main window from navigating/flashing as much
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            // Trigger the intent via the iframe
            iframe.src = url;

            // Cleanup after a short delay
            setTimeout(() => {
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
            }, 2000);

            return true;
        } catch (e) {
            console.error('Failed to send text to RawBT:', e);
            return false;
        }
    }




    /**
     * Print ESC/POS commands via RawBT 
     */
    printEscPosViaRawBT(text: string): boolean {
        try {
            // ESC/POS: Initialize + text + feed
            const ESC = '\x1B';

            const commands =
                ESC + '@' +              // Initialize
                ESC + 'a\x01' +          // Center align
                text +
                '\n\n\n\n';              // Line feeds for paper advance

            // URL encode the ESC/POS commands
            const encoded = encodeURIComponent(commands);
            window.location.href = `rawbt:${encoded}`;

            return true;
        } catch (e) {
            console.error('Failed to send ESC/POS to RawBT:', e);
            return false;
        }
    }

    /**
     * Check if this is likely running on Android
     */
    isAndroid(): boolean {
        return /android/i.test(navigator.userAgent);
    }

    /**
     * Check if RawBT printing is available (Android only)
     */
    isRawBTAvailable(): boolean {
        return this.isAndroid();
    }
}

export const hardwareService = new HardwareService();
