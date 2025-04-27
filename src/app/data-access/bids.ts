import { eq, desc } from "drizzle-orm";
import { bids } from "@/src/db/schema";
import { database } from "@/src/db/database";


export async function getBidsforItem(itemId: number) {
  const allBids = await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    orderBy: desc(bids.id),
    with: {
      user: {
        columns: {
          name: true,
        },
      },
    },
  });

  return allBids;
}