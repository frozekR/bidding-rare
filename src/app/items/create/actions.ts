'use server'

import { database } from "@/src/db/database";
import { items } from "@/src/db/schema";
import { auth } from "@/src/auth";
import { redirect } from "next/navigation";

export async function createItemAction({
    name,
    startingPrice,
    bidInterval,
    description,
    endDate,
  }: {
    name: string;
    startingPrice: number;
    bidInterval: number;
    description: string;
    endDate: Date;
  }) {
    const session = await auth();
  
    if (!session) {
      throw new Error("Unauthorized");
    }
  
    const user = session.user;
  
    if (!user || !user.id) {
      throw new Error("Unauthorized");
    }
  
    await database.insert(items).values({
      name,
      startingPrice,
      currentBid: startingPrice,
      description,
      bidInterval,
      userId: user.id,
      endDate,
    });
  
    redirect("/");
  }