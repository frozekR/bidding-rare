import { eq } from "drizzle-orm";
import { items } from "@/src/db/schema";
import { database } from "@/src/db/database";


export async function getItem(itemId: number) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
  return item;
}