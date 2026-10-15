// KwikPass Global Type Declarations

declare global {
  interface Window {
    merchantInfo: {
      mid: string;
      environment: string;
      type: string;
      storeId?: string | number;
      fbPixel?: string;
      integrationType?: string;
      cart?: {
        id: string;
      };
    };
    triggerGokwikCustomCheckout: () => void;
    gokwikSdk: any;

    // KwikPass SDK
    __KP_LOGIN_SDK_INSTANCE__?: {
      handleKpLogin: () => void;
    };
    handleDOMUpdate?: () => void;
    handleLogout?: (redirectTo?: string) => void;
  }
}

export {};
