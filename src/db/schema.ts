import { pgTable, serial } from "drizzle-orm/pg-core"

export const bids = pgTable("br_bids", {
    id: serial("id").primaryKey(),
})