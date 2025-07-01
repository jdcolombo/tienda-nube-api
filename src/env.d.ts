/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly TIENDA_NUBE_STORE_ID: string;
  readonly TIENDA_NUBE_ACCESS_TOKEN: string;
  readonly TIENDA_NUBE_USER_AGENT: string;
  readonly TIENDA_NUBE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
