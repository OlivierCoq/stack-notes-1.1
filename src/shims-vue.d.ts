/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  api: {
    send: (channel: string, data: any) => void;
    receive: (channel: string, callback: (data: any) => void) => void;
  };
}