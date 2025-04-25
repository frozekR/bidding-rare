import { Item } from "../db/schema";

export function ItemCard({item}: {item: Item}) {
    return (    
        <div key={item.id} className="border p-8 rounded-xl">
          <h2 className="text-xl font-bold"> {item.name} </h2>
          <br></br>
          <p className="text-l"> Начальная стоимость: {item.startingPrice} рублей </p>
        </div>
    )
}