import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { createItemAction } from "./actions";
import { pageTitleStyles } from "@/src/styles";

export default async function CreatePage() { 
  return (
  <main className="space-y-8">
    <h1 className={pageTitleStyles}>Выложите ваш предмет на аукцион</h1>

    <form
    className="flex flex-col border p-8 rounded-xl space-y space-y-4 max-w-lg"
    action={createItemAction}>
      
      <Input className="max-w-md" name="name" placeholder="Name your item" />
      <Input className="max-w-md" name="startingPrice" type="number" placeholder="Какова минимальная стоимость?"/>
      <Input className="max-w-md" name="description" placeholder="Описание" />
      <Input className="max-w-md" name="bidInterval" type="number" placeholder="Шаг ставки" />
      <Button className="self-end" type="submit">Post item</Button>
    </form>
  </main>
  )
}


