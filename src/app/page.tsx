import { database } from "../db/database";
import { auth } from "@/src/auth"
import { ItemCard } from "./item-card";
import { pageTitleStyles } from "../styles";

export default async function HomePage() { 
  const session = await auth();

  const allItems = await database.query.items.findMany();

  if (!session) return null;

  const user = session.user;

  if (!user) return null;

  return (
  <main className="space-y-8">

    <h2 className={pageTitleStyles}>Выставленные предметы</h2>
    <div className="grid grid-cols-4 gap-4">
      {allItems.map((item) => (<ItemCard key={item.id} item={item}></ItemCard>))}
    </div>
  </main>
  )
}
