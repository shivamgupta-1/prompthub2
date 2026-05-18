import { LogLevel,type Configuration, type PopupRequest } from "@azure/msal-browser";

/**
 * MSAL configuration
 * - Uses Vite env variables VITE_AZURE_CLIENT_ID and VITE_AZURE_TENANT_ID when available.
 * - Exported values: `msalConfig` and `loginRequest`
 */

const msalConfig: Configuration = {
  auth: {
    clientId: (import.meta.env.VITE_AZURE_CLIENT_ID as string) || "7f9a7c8c-b414-4f0b-acc8-da3639619bbf",
    authority: `https://login.microsoftonline.com/${(import.meta.env.VITE_AZURE_TENANT_ID as string) || "guptashivam202000gmail.onmicrosoft.com"}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          default:
            break;
        }
      },
    },
  },
};

const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
};

export { msalConfig, loginRequest };
