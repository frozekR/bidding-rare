import { Button } from "@/src/components/ui/button";
import { database } from "../db/database";
import { bids as bidsSchema, items } from "../db/schema";
import { Input } from "../components/ui/input";
import { revalidatePath } from "next/cache";
import SignIn from "../components/sign-in";
import { SignOut } from "../components/sign-out";
import { auth } from "@/src/auth"
import { ItemCard } from "./item-card";

export default async function HomePage() { 
  const session = await auth();

  const allItems = await database.query.items.findMany();

  if (!session) return null;

  const user = session.user;

  if (!user) return null;

  return (
  <main className="container mx-auto py-12 space-y-4">

    <h2 className="text-2xl font-bold">Выставленные предметы</h2>
    <div className="grid grid-cols-4 gap-4">
      {allItems.map((item) => (<ItemCard key={item.id} item={item}></ItemCard>))}
    </div>
  </main>
  )
}
