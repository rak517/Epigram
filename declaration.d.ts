/* eslint-disable @typescript-eslint/no-explicit-any */

interface Window {
  gtag: (command: string, action: string, params?: Record<string, any>) => void;
}
