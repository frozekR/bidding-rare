"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { createItemAction } from "./actions";
import { pageTitleStyles } from "@/src/styles";
import { DatePickerDemo } from "@/src/components/date-picker";
import { useState } from "react";

export default function CreatePage() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Post an Item</h1>

      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault();

          if (!date) {
            return;
          }

          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);

          const name = formData.get("name") as string;
          const startingPrice = parseInt(
            formData.get("startingPrice") as string
          );;
          const description = formData.get("description") as string;
          const bidInterval = parseInt(
            formData.get("bidInterval") as string
          );;
            await createItemAction({
              name,
              startingPrice,
              endDate: date,
              description,
              bidInterval,
            });
        }}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Name your item"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
        />
        <Input
          required
          className="max-w-lg"
          name="description"
          placeholder="Describe your item" 
        ></Input>
        <Input
          required
          className="max-w-lg"
          name="bidInterval"
          type="number"
          step="0.01"
          placeholder="What is the minimum bid interval?"
        ></Input>
        <DatePickerDemo date={date} setDate={setDate} />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}


