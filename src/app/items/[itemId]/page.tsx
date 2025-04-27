"use server";

import { Button } from "@/src/components/ui/button";
import { pageTitleStyles } from "@/src/styles";
import Link from "next/link";
import { createBidAction } from "./actions";
import { getBidsforItem } from "../../data-access/bids";
import { getItem } from "../../data-access/items";

export default async function ItemPage(props: {
  params: Promise<{ itemId: string }>;
}) {
  // 1) await the promise
  const { itemId } = await props.params;

  const item = await getItem(parseInt(itemId));

  if (!item) {
    return (
        <div className="space-y-8 flex flex-col items-center">
            <h1 className={pageTitleStyles}>Предмет не был найден</h1>
            <p>
              Предмета, который вы ищете здесь нету...
            </p>

            <Button asChild>
                <Link href="/">Показать все предметы на аукцион</Link>
            </Button>
        </div>
    )
  }

  const allBids = await getBidsforItem(parseInt(item.id.toString()));
  
  const hasBids = allBids.length > 0;

  return (
  <main className="space-y-8">
    <h1 className={pageTitleStyles}>
      <span className="font-normal">Аукцион на </span>{item?.name}
    </h1>
    <div className="flex gap-8">
      <div className="flex flex-col gap-6">
        <div className="text-xl space-y-4">
          <div> 
            Начальная цена составляет <br></br>
            <span className="font-bold">{item.startingPrice} рублей</span>
          </div>
          <div>
            Интервал ставок <span className="font-bold">{item.bidInterval}</span>
          </div>
          <div>
          <span className="font-bold"> Описание предмета:</span> <br></br>
            <span className="font-normal">{item.description}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">
          Текущие ставки
        </h2>
        <form action={createBidAction}>
              <input type="hidden" name="itemId" value={item.id} />
              <Button type="submit">Сделать ставку</Button>
        </form>
        </div>
      
      { hasBids ? (
        <ul className="space-y-1">
        {allBids.map((bid) => {
          return (
            <div>
            <div>
            <li key={bid.id} className="bg-gray-100 p-4 rounded-xl">
              <div>
                <span className="font-bold">{bid.amount} рублей</span> от{" "}
                <span className="font-bold">{bid.user.name}</span>
                <span className="text-gray-500"> {bid.timestamp.toLocaleString()}</span>
              </div>
            </li>
            </div>
            </div>
          );
        })}
      </ul>
      ) : (
        <div className="bg-gray-100 space-y-4 flex flex-col items-center justify-center h-full">
          <p className="text-gray-500">Ставок пока нет</p>
          <form action={createBidAction}>
            <input type="hidden" name="itemId" value={item.id} />
            <Button type="submit">Сделать ставку</Button>
          </form>
        </div>
      )
      }
      </div>
    </div>

  </main>
  )
}


