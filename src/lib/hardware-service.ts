export type HardwareType = 'printer' | 'terminal' | 'scanner' | 'card_reader';

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

class HardwareService {
    private devices: BaseDevice[] = [];
    private listeners: Set<(devices: BaseDevice[]) => void> = new Set();

    constructor() {
        this.loadDevices();
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

    async discoverDevices(type: HardwareType): Promise<BaseDevice[]> {
        console.log(`Searching for ${type}s...`);

        // Real Web Bluetooth Discovery
        if (type === 'printer' || type === 'terminal') {
            if ('bluetooth' in navigator) {
                try {
                    // This would prompt the user to select a device
                    const device = await (navigator as any).bluetooth.requestDevice({
                        acceptAllDevices: true,
                        optionalServices: ['battery_service'] // Example service
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

        // Real Web USB Discovery
        if (type === 'scanner' || type === 'printer') {
            if ('usb' in navigator) {
                try {
                    const device = await (navigator as any).usb.requestDevice({ filters: [] });
                    console.log('Found USB device:', device.productName);
                    const newDevice: BaseDevice = {
                        id: device.serialNumber || Math.random().toString(),
                        name: device.productName || 'USB Device',
                        type,
                        isConnected: false,
                        status: 'idle',
                        connectionType: 'usb'
                    };
                    return [newDevice];
                } catch (e) {
                    console.log('USB discovery cancelled or failed', e);
                }
            }
        }

        return this.devices.filter(d => d.type === type);
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

    async connectDevice(device: BaseDevice): Promise<boolean> {
        const index = this.devices.findIndex(d => d.id === device.id);
        if (index !== -1) {
            this.devices[index].isConnected = true;
            this.devices[index].status = 'idle';
        } else {
            this.devices.push({ ...device, isConnected: true, status: 'idle' });
        }
        this.saveDevices();
        return true;
    }

    async disconnectDevice(deviceId: string): Promise<boolean> {
        const index = this.devices.findIndex(d => d.id === deviceId);
        if (index !== -1) {
            this.devices[index].isConnected = false;
            this.devices[index].status = 'offline';
            this.saveDevices();
            return true;
        }
        return false;
    }

    async printReceipt(printerId: string, content: any): Promise<boolean> {
        const printer = this.devices.find(d => d.id === printerId && d.type === 'printer');
        if (!printer || !printer.isConnected) return false;

        console.log(`Printing to ${printer.name}:`, content);
        // Real implementation would send commands to the printer
        return true;
    }
}

export const hardwareService = new HardwareService();
