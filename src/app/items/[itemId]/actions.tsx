'use server'

import { database } from "@/src/db/database";
import { eq } from "drizzle-orm";
import { bids, items } from "@/src/db/schema";
import { auth } from "@/src/auth";
import { revalidatePath } from "next/cache";
import { env } from "@/src/env";
import { Knock } from "@knocklabs/node";

const knock = new Knock(env.KNOCK_SECRET_API_KEY);

export async function createBidAction(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
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

    const currentBids = await database.query.bids.findMany({
      where: eq(bids.itemId, itemId),
      with: {
        user: true,
      },
    });
  
    const recipients: {
      id: string;
      name: string;
      email: string;
    }[] = [];
  
    for (const bid of currentBids) {
      if (
        bid.userId !== userId &&
        !recipients.find((recipient) => recipient.id === bid.userId)
      ) {
        recipients.push({
          id: bid.userId + "",
          name: bid.user.name ?? "Anonymous",
          email: bid.user.email ?? "Anonymous",
        });
      }
    }
  
    if (recipients.length > 0) {
      await knock.workflows.trigger("user-placed-bid", {
        actor: {
          id: userId,
          name: session.user.name ?? "Anonymous",
          email: session.user.email,
          collection: "users",
        },
        recipients,
        data: {
          itemId,
          bidAmount: latestBidValue,
          itemName: item.name,
        },
      });
    }

  revalidatePath(`/items/${itemId}`);
}
