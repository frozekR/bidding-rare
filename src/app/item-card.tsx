import Link from "next/link";
import { Button } from "../components/ui/button";
import { Item } from "../db/schema";
import { pageTitleStyles } from "../styles";
import { isBidOver } from "../lib/utils";
import { format } from "date-fns";

export function ItemCard({item}: {item: Item}) {
    const bidOver = isBidOver(item);

    return (    
        <div key={item.id} className="border p-8 rounded-xl">
          <h2 className={pageTitleStyles}> {item.name} </h2>
          <br></br>
          <p className="text-l"> Начальная стоимость: {item.startingPrice} рублей </p>
          {bidOver ? (
            <p className="text-l">Аукцион закончен</p>
            ) : (
                <p className="text-l">
                Заканчивается {format(item.endDate, "M/dd/yy")}
                </p>
            )}
          <Button asChild>
                <Link href={`/items/${item.id}`}>Сделать ставку</Link>
            </Button>
        </div>
    )
}