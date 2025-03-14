import { Button } from "@/src/components/ui/button";
import { database } from "../db/database";
import { bids as bidsSchema } from "../db/schema";
import { Input } from "../components/ui/input";

export default async function HomePage() {
  const bids = await database.query.bids.findMany();

  return (
  <main className="container mx-auto py-12">
    <form
    action={async (formData: FormData) => {
      'use server';
      // sconst bid = formData.get('bid') as string;
      await database.insert(bidsSchema).values({});
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