angular.module('relentio.mwBarcodeScanner', [])

.provider('mwBarcodeScanner', function() {
    return({
        license: {
            'Android': {
                'MWB_CODE_MASK_25': {'username' : '', 'key' : ''},
                'MWB_CODE_MASK_39': {'username':'','key':''},
                'MWB_CODE_MASK_93': {'username':'','key':''},
                'MWB_CODE_MASK_128': {'username':'','key':''},
                'MWB_CODE_MASK_AZTEC': {'username':'','key':''},
                'MWB_CODE_MASK_DM': {'username':'','key':''},
                'MWB_CODE_MASK_PDF': {'username':'','key':''},
                'MWB_CODE_MASK_QR': {'username':'','key':''},
                'MWB_CODE_MASK_RSS': {'username':'','key':''},
                'MWB_CODE_MASK_CODABAR': {'username':'','key':''},
                'MWB_CODE_MASK_11': {'username':'','key':''},
                'MWB_CODE_MASK_MSI': {'username':'','key':''},
                'MWB_CODE_MASK_DOTCODE': {'username':'','key':''}
            },
            'iOS': {
                'MWB_CODE_MASK_25': {'username' : '', 'key' : ''},
                'MWB_CODE_MASK_39': {'username':'','key':''},
                'MWB_CODE_MASK_93': {'username':'','key':''},
                'MWB_CODE_MASK_128': {'username':'','key':''},
                'MWB_CODE_MASK_AZTEC': {'username':'','key':''},
                'MWB_CODE_MASK_DM': {'username':'','key':''},
                'MWB_CODE_MASK_PDF': {'username':'','key':''},
                'MWB_CODE_MASK_QR': {'username':'','key':''},
                'MWB_CODE_MASK_RSS': {'username':'','key':''},
                'MWB_CODE_MASK_CODABAR': {'username':'','key':''},
                'MWB_CODE_MASK_11': {'username':'','key':''},
                'MWB_CODE_MASK_MSI': {'username':'','key':''},
                'MWB_CODE_MASK_DOTCODE': {'username':'','key':''}
            },
            'Win32NT': {
                'MWB_CODE_MASK_25': {'username' : '', 'key' : ''},
                'MWB_CODE_MASK_39': {'username':'','key':''},
                'MWB_CODE_MASK_93': {'username':'','key':''},
                'MWB_CODE_MASK_128': {'username':'','key':''},
                'MWB_CODE_MASK_AZTEC': {'username':'','key':''},
                'MWB_CODE_MASK_DM': {'username':'','key':''},
                'MWB_CODE_MASK_PDF': {'username':'','key':''},
                'MWB_CODE_MASK_QR': {'username':'','key':''},
                'MWB_CODE_MASK_RSS': {'username':'','key':''},
                'MWB_CODE_MASK_CODABAR': {'username':'','key':''},
                'MWB_CODE_MASK_11': {'username':'','key':''},
                'MWB_CODE_MASK_MSI': {'username':'','key':''},
                'MWB_CODE_MASK_DOTCODE': {'username':'','key':''}
            }
        },
        
        setEntireLicense: function(entireLicense) {
            this.license = entireLicense;
        },
        
        setLicensePiece: function(platform, barcodeType, username, key) {
            this.license[platform][barcodeType]['username'] = username;
            this.license[platform][barcodeType]['key'] = key;
        },
        
        customInitLogic: function() {
            // Blank, will be set by setCustomInitLogic and called in the factory after necessary MWBS Init...
        },
        
        setCustomInitLogic: function(customInitLogicFn) {
            // TODO: Ensure customInitLogicFn is type function
            this.customInitLogic = customInitLogicFn;
        },
        
        // The provider must include a $get() method that will be our
        // factory function for creating the service. This $get() method
        // will be invoked using $injector.invoke() and can therefore use
        // dependency-injection.
        $get: function instantiatemwBarcodeScanner() {
            return new mwBarcodeScannerService(this.license, this.customInitLogic);
        }
                
    });
})

.factory('mwBarcodeScannerService', function (mwBarcodeScanner) {
    
    if (!window.cordova) {
      console.warn("This plugin only works with cordova on a native device and requires the MWBS Cordova plugin.");
    }
    
    return new mwBarcodeScannerService(mwBarcodeScanner.license, mwBarcodeScanner.customInitLogic);
    
});

function mwBarcodeScannerService(license, customInitLogic) {
    var self = this;
    
    if (!window.cordova) {
      console.warn("This plugin only works with cordova on a native device and requires the MWBS Cordova plugin.");
    }
    
    this.license = license;
    this.customInitLogic = customInitLogic;
    
    // Private function
    var initMWBS = function(mwbs, constants, device) {
        
        // Get the license info for the specific device platform (iOS, Android or WP8)
        var platformLicense = self.license[device.platform];
        
        // Loop through each registration code of this platform and call the 
        // MWBregisterCode function on the passed into this init function.
        // constants[regCodes] fetches the bit masked code of the registration code 
        Object.keys(platformLicense).forEach(function(regCodes){
            // Bit mask identifiers for supported decoder types
            var bitmaskRegCode = constants[regCodes];
            var username = platformLicense[regCodes]['username'];
            var key = platformLicense[regCodes]['key'];
            mwbs['MWBregisterCode'](bitmaskRegCode, username, key);
        });
        
        // Custom properties
        // TODO: Allow for configuration of this in the provider
        try{
            //  mwbs['MWBsetInterfaceOrientation'] (constants.OrientationPortrait);
            //  mwbs['MWBsetOverlayMode'](constants.OverlayModeImage);
            //  mwbs['MWBenableHiRes'](true);
            //  mwbs['MWBenableFlash'](true);
            //  mwbs['MWBsetActiveCodes'](constants.MWB_CODE_MASK_128 | constants.MWB_CODE_MASK_39);
            //  mwbs['MWBsetLevel'](2);
            //  mwbs['MWBsetFlags'](constants.MWB_CODE_MASK_39, constants.MWB_CFG_CODE39_EXTENDED_MODE);
            //  mwbs['MWBsetDirection'](constants.MWB_SCANDIRECTION_VERTICAL | constants.MWB_SCANDIRECTION_HORIZONTAL);
            //  mwbs['MWBsetScanningRect'](constants.MWB_CODE_MASK_39, 20,20,60,60);
            //  mwbs['MWBenableZoom'](true);
            //  mwbs['MWBsetZoomLevels'](200, 400, 0);
            //  mwbs['MWBsetMinLength'](constants.MWB_CODE_MASK_39, 4);
            //  mwbs['MWBsetMaxThreads'](1);
            //  mwbs['MWBcloseScannerOnDecode'](false);
            //  mwbs['MWBuse60fps'](true);      
            //  mwbs['MWBsetParam'](constants.MWB_CODE_MASK_DM, constants.MWB_PAR_ID_RESULT_PREFIX, constants.MWB_PAR_VALUE_RESULT_PREFIX_ALWAYS);
            //  mwbs['MWBduplicateCodeDelay'](1000);      
            //  mwbs['MWBuseAutoRect'](false);      
            //  mwbs['MWBuseFrontCamera'](true);
        }
        catch(e){
            console.log(e);
        }
        
        // Call custom initialization logic configured in the provider during config time
        self.customInitLogic();
    };
    
    this.startScanning = function (callback) {
        if (!window.cordova) {
            return console.warn("Unable to start scanning in a browser. Cordova and MWBS plugin required.");
        }
        
        scanner.startScanning(initMWBS, callback);
    },
    
    this.scanImage = function(callback, imageUri) {
        if (!window.cordova) {
            return console.warn("Unable to start scanning in a browser. Cordova and MWBS plugin required.");
        }
        
        scanner.scanImage(initMWBS, callback, imageUri);
    }
};