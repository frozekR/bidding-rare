import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
// zod — валидация схем для TypeScript

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        NODE_ENV: z.string().min(1),
        KNOCK_SECRET_API_KEY: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY: z.string().min(1),
        NEXT_PUBLIC_KNOCK_FEED_ID: z.string().min(1),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY,
        NEXT_PUBLIC_KNOCK_FEED_ID: process.env.NEXT_PUBLIC_KNOCK_FEED_ID,
        KNOCK_SECRET_API_KEY: process.env.KNOCK_SECRET_API_KEY,
    }
})