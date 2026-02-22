// Deno type definitions for Supabase Edge Functions
// This provides type definitions for Deno globals when using VSCode's default TypeScript

declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export interface ServerRequest {
    readonly method: string;
    readonly url: string;
    readonly headers: Headers;
    readonly body: ReadableStream<Uint8Array> | null;
    
    json(): Promise<any>;
    text(): Promise<string>;
  }

  export interface Response {
    readonly status: number;
    readonly headers: Headers;
    readonly body: Uint8Array | ReadableStream<Uint8Array> | string | null;
  }

  export type Handler = (req: ServerRequest) => Response | Promise<Response>;

  export interface ServeInit {
    port?: number;
    hostname?: string;
    signal?: AbortSignal;
  }

  export function serve(handler: Handler, options?: ServeInit): void;
}

declare namespace Deno {
  interface Env {
    get(key: string): string | undefined;
  }
  
  interface NetAddr {
    transport: "tcp" | "udp";
    hostname: string;
    port: number;
  }
  
  interface Addr {
    transport: string;
    hostname: string;
    port: number;
  }
  
  const env: Env;
  const version: {
    deno: string;
  };
  
  function exit(code?: number): never;
  function readTextFile(path: string): Promise<string>;
  function writeTextFile(path: string, data: string): Promise<void>;
}

interface ResponseInit {
  status?: number;
  headers?: HeadersInit;
}

declare function serve(handler: (req: Request) => Response | Promise<Response>): void;

declare const RESEND_API_KEY: string | undefined;
