import { database } from "@/src/db/database";
import { auth } from "@/src/auth";
import { ItemCard } from "../item-card";
import { items } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { EmptyState } from "./empty-state";
import { pageTitleStyles } from "@/src/styles";

export default async function MyAuctionPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id; // <---- оставляем строкой, без Number()

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, userId),
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="space-y-8">
      <h2 className={pageTitleStyles}>Выставленные предметы</h2>
      <div className="grid grid-cols-4 gap-4">
        {hasItems ? (
          allItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  );
}
