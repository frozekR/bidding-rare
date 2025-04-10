import { Button } from "@/src/components/ui/button";
import { database } from "../db/database";
import { bids as bidsSchema } from "../db/schema";
import { Input } from "../components/ui/input";
import { revalidatePath } from "next/cache";
import SignIn from "../components/sign-in";
import { SignOut } from "../components/sign-out";
import { auth } from "@/src/auth";

export default async function HomePage() { 
  const session = await auth();

  const bids = await database.query.bids.findMany();
  return (
  <main className="container mx-auto py-12">
    { session ? <SignOut /> : <SignIn/> }   
    <form
    action={async (formData: FormData) => {
      'use server';
      // sconst bid = formData.get('bid') as string;
      await database.insert(bidsSchema).values({});
      revalidatePath("/");
    }}>
      
      <Input name="bid" placeholder="Bid" />
      <Button type="submit">Place Bid</Button>
    </form>

    {bids.map(bid => (
      <div key={bid.id}>{bid.id}</div>
    ))}
  </main>
  )
}

function auth() {
  throw new Error("Function not implemented.");
}
