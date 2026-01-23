# Stripe Terminal SDK Migration Notes

## Issue Summary
The Android build was failing because `maven.stripe.com` no longer exists. Stripe deprecated this repository and migrated their SDK distribution.

## Solution Applied
✅ **Upgraded from Stripe Terminal SDK 3.6.1 → 5.1.1**

### Changes Made:

#### 1. Dependency Update (`android/app/build.gradle`)
**Before:**
```gradle
implementation "com.stripe:stripeterminal-localmobile:3.6.1"
implementation "com.stripe:stripeterminal-core:3.6.1"
```

**After:**
```gradle
implementation "com.stripe:stripeterminal:5.1.1"
```

The v5.x SDK consolidated the separate `localmobile` and `core` packages into a single unified package, which is published on Maven Central.

#### 2. Repository Configuration (`android/build.gradle`)
Removed the defunct Stripe Maven repository since v5.x is on Maven Central:
```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        // Stripe Terminal SDK 5.x is available on Maven Central
    }
}
```

## Code Changes Required

### ✅ Changes Applied to StripeTerminalPlugin.java

#### 1. **Imports Updated**
**Removed:**
- `import com.stripe.stripeterminal.external.callable.TerminalListener;` - No longer used in v5
- `import com.stripe.stripeterminal.external.models.DiscoveryMethod;` - Integrated into specific config classes
- `import com.stripe.stripeterminal.external.models.ConnectionConfiguration;` - Not needed for current implementation

**Note:** `TapToPayDiscoveryConfiguration` is a **nested class** within `DiscoveryConfiguration`, so no additional import is needed.

#### 2. **Terminal Initialization (FIXED)**
**Before (v3 API):**
```java
TerminalListener listener = new TerminalListener() {
    @Override
    public void onUnexpectedReaderDisconnect(Reader reader) { ... }
    @Override
    public void onConnectionStatusChange(ConnectionStatus status) { ... }
    @Override
    public void onPaymentStatusChange(PaymentStatus status) { ... }
};

Terminal.initTerminal(getContext().getApplicationContext(), LogLevel.VERBOSE, provider, listener);
```

**After (v5 API):**
```java
// SDK v5: Method name changed to Terminal.init() with 5 parameters
// TerminalEventListener and TerminalOfflineListener are required parameters
// Pass null for optional listeners
Terminal.init(
    getContext().getApplicationContext(), 
    LogLevel.VERBOSE, 
    provider,
    null,  // TerminalEventListener - optional, pass null for basic usage
    null   // TerminalOfflineListener - optional, pass null if not using offline mode
);
```

#### 3. **Reader Discovery Configuration (FIXED)**
**Before (v3 API):**
```java
DiscoveryConfiguration config = new DiscoveryConfiguration(
    0,
    DiscoveryMethod.LOCAL_MOBILE,
    false,
    "com.compostos.app"
);
```

**After (v5 API):**
```java
// Use nested class for Tap to Pay
// TapToPayDiscoveryConfiguration is a nested class within DiscoveryConfiguration
DiscoveryConfiguration config = new DiscoveryConfiguration.TapToPayDiscoveryConfiguration(
    false  // isSimulated - set to true for testing with simulated readers
);
```

#### 4. **DiscoveryListener Interface**
The `DiscoveryListener` interface remains the same - no changes needed to the `onUpdateDiscoveredReaders()` callback.

#### 5. **Connection Method (TODO - Not Yet Implemented)**
The `connectReader()` method (line 115-119) is currently a stub. When you implement it, use the v5 API:

```java
@PluginMethod
public void connectReader(PluginCall call) {
    // Get reader from discoveredReaders list by serial number or index
    if (discoveredReaders.isEmpty()) {
        call.reject("No readers discovered");
        return;
    }
    
    Reader reader = discoveredReaders.get(0); // Or find by serial number from call params
    
    // Create connection configuration for Tap to Pay
    LocalMobileConnectionConfiguration config = new LocalMobileConnectionConfiguration();
    
    // Connect using unified connectReader method
    Terminal.getInstance().connectReader(reader, config, new ReaderCallback() {
        @Override
        public void onSuccess(Reader connectedReader) {
            call.resolve();
        }
        
        @Override
        public void onFailure(TerminalException e) {
            call.reject("Connection failed", e);
        }
    });
}
```

### Testing Checklist

- [x] Build succeeds in Android Studio
- [x] Gradle sync completes without errors
- [x] Terminal initializes correctly
- [x] Reader discovery works (Tap to Pay)
- [x] Reader connection works (connectReader → TapToPayConnectionConfiguration)
- [x] Payment flow works end-to-end (createPaymentIntent → collectPaymentMethod → confirmPaymentIntent)

## Implementation Status (Updated Jan 2026)

### ✅ Completed

| Component | File | Status |
|-----------|------|--------|
| SDK Initialization | `StripeTerminalPlugin.java` | ✅ Using `Terminal.init()` with required listeners |
| Reader Discovery | `StripeTerminalPlugin.java` | ✅ `TapToPayDiscoveryConfiguration` with `isSimulated: true` |
| Reader Connection | `StripeTerminalPlugin.java` | ✅ `TapToPayConnectionConfiguration` with simulated location |
| Payment Collection | `StripeTerminalPlugin.java` | ✅ Full SDK flow: `createPaymentIntent` → `collectPaymentMethod` → `confirmPaymentIntent` |
| TypeScript Bridge | `hardware-service.ts` | ✅ Calls native plugin on Android, web simulation fallback |
| UI Integration | `StripePaymentModal.tsx` | ✅ Real-time status updates from SDK events |

### How Simulated Mode Works

The implementation uses Stripe SDK's **built-in simulated mode**:

1. `TapToPayDiscoveryConfiguration(true)` enables simulated reader discovery
2. The SDK creates a simulated reader (your phone's NFC)
3. `createPaymentIntent()` creates a simulated PaymentIntent
4. `collectPaymentMethod()` triggers the "tap card" flow - in simulated mode, the SDK auto-simulates a test card tap
5. `confirmPaymentIntent()` completes the payment

**No backend required for testing!** The SDK handles everything internally.

## Resources

- [Stripe Terminal Android Migration Guide (v5)](https://stripe.com/docs/terminal/references/sdk-migration-guide?terminal-sdk-platform=android)
- [Stripe Terminal Android CHANGELOG](https://github.com/stripe/stripe-terminal-android/blob/master/CHANGELOG.md)
- [Stripe Terminal Android SDK v5 Documentation](https://stripe.dev/stripe-terminal-android/v5/)

## Next Steps (Optional - For Production)

When ready for **real payments**:

1. **Create a backend endpoint** to fetch connection tokens
2. Update `ConnectionTokenProvider.fetchConnectionToken()` to call your backend
3. Set `isSimulated: false` in `TapToPayDiscoveryConfiguration`
4. Use real Stripe test cards for testing

## Notes

- Version 3.6.1 was hosted on the now-defunct `maven.stripe.com`
- Version 5.1.1 (latest as of Jan 2026) is on Maven Central
- The API changes between v3 and v5 are minimal for basic usage but significant for advanced features
- Auto-reconnection is now enabled by default for mobile readers

