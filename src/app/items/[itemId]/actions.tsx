"use server";

import { database } from "@/src/db/database";
import { eq } from "drizzle-orm";
import { bids, items } from "@/src/db/schema";
import { auth } from "@/src/auth";
import { revalidatePath } from "next/cache";

export async function createBidAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) { 
    throw new Error("Unauthorized");
  }

  const itemIdRaw = formData.get("itemId");
  if (!itemIdRaw) {
    throw new Error("Item ID is required");
  }

  const itemId = Number(itemIdRaw);
  if (isNaN(itemId)) {
    throw new Error("Invalid Item ID");
  }

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) {
    throw new Error("Item not found");
  }

  const latestBidValue = (item.currentBid ?? 0) + (item.bidInterval ?? 0);

  await database.insert(bids).values({
    amount: latestBidValue,
    userId: session.user.id,
    itemId: itemId,
    timestamp: new Date(),
  });

  await database.update(items)
    .set({
      currentBid: latestBidValue,
    })
    .where(eq(items.id, itemId));

  revalidatePath(`/items/${itemId}`);
}
