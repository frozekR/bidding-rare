import { database } from "@/src/db/database";
import { auth } from "@/src/auth"
import { ItemCard } from "../item-card";
import { items } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { EmptyState } from "./empty-state";

export default async function MyAuctionPage() { 
  const session = await auth();

  if (!session) return null;

  const user = session.user;

  if (!user) return null;


  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user?.id)
  });
  
  const hasItems = allItems.length > 0

  return (
  <main className="container mx-auto py-12 space-y-4">

    <h2 className="text-2xl font-bold">Выставленные предметы</h2>
    <div className="grid grid-cols-4 gap-4">
        {hasItems ? (
            <>
            {allItems.map((item) => (<ItemCard key={item.id} item={item}></ItemCard>))}
            </>
        ) : (
            <EmptyState />
        )}
    </div>
  </main>
  )
}


