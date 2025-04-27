"use server";

import { Button } from "@/src/components/ui/button";
import { database } from "@/src/db/database";
import { items } from "@/src/db/schema";
import { pageTitleStyles } from "@/src/styles";
import { time } from "console";
import { eq } from "drizzle-orm";
import { timestamp } from "drizzle-orm/gel-core";
import Link from "next/link";

export default async function ItemPage(props: {
  params: Promise<{ itemId: string }>;
}) {
  // 1) await the promise
  const { itemId } = await props.params;

  // 2) coerce to number for your Drizzle query
  const id = Number(itemId);
  const item = await database.query.items.findFirst({
    where: eq(items.id, id),
  });

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

/*   const bids = [
    {
      id: 1,
      amount: 1000,
      userName: "Иван Иванов",
      timestamp: new Date(),
    },
    {
      id: 2,
      amount: 2000,
      userName: "Петр Петров",
      timestamp: new Date(),
    },
    {
      id: 3,
      amount: 3000,
      userName: "Сидор Сидоров",
      timestamp: new Date(),
    },
    {
      id: 4,
      amount: 4000,
      userName: "Алексей Алексеев",
      timestamp: new Date(),
    },
    {
      id: 5,
      amount: 5000,
      userName: "Дмитрий Дмитриев",
      timestamp: new Date(),  
    }
  ] */
  const bids: any[] = [];
  
  const hasBids = bids.length > 0;


  return (
  <main className="space-y-8">
    <h1 className={pageTitleStyles}>
      <span className="font-normal">Аукцион на </span>{item?.name}
    </h1>
    <div className="flex gap-8">
      <div className="flex flex-col gap-6">
        <div className="text-xl space-y-4">
          <div> 
            Начальная цена составляет
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
        <h2 className="text-2xl font-bold mb-4">
          Текущие ставки
        </h2>
      
      { hasBids ? (
        <ul className="space-y-1">
        {bids.map((bid) => {
          return (
            <div>
            <li key={bid.id} className="bg-gray-100 p-4 rounded-xl">
              <div>
                <span className="font-bold">{bid.amount} рублей</span> от{" "}
                <span className="font-bold">{bid.userName}</span>
                <span className="text-gray-500"> {bid.timestamp.toLocaleString()}</span>
              </div>
            </li>
            <Button> Сделать ставку </Button>
            </div>
          );
        })}
      </ul>
      ) : (
        <div className="bg-gray-100 space-y-4 flex flex-col items-center justify-center h-full">
          <p className="text-gray-500">Ставок пока нет</p>
          <div>
            <Button> Сделать ставку </Button>
          </div>
        </div>
      )
      }
      </div>
    </div>

  </main>
  )
}


