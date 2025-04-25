import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { createItemAction } from "./actions";

export default async function CreatePage() { 
  return (
  <main className="container mx-auto py-12 space-y-4">
    <h1 className="text-4xl font-bold">Выложите ваш предмет на аукцион</h1>

    <form
    className="flex flex-col border p-8 rounded-xl space-y space-y-4 max-w-lg"
    action={createItemAction}>
      
      <Input className="max-w-md" name="name" placeholder="Name your item" />
      <Input className="max-w-md" name="startingPrice" type="number" placeholder="Какова минимальная стоимость?"/>
      <Button className="self-end" type="submit">Post item</Button>
    </form>
  </main>
  )
}


