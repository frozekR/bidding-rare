'use server'

import { revalidatePath } from "next/cache";
import { database } from "@/src/db/database";
import { items } from "@/src/db/schema";
import { auth } from "@/src/auth";
import { redirect } from "next/dist/server/api-utils";

export async function createItemAction(formData: FormData) {
    const session = await auth();

    if (!session) {
        throw new Error("не авторизован");
    }

    const user = session.user;

    if (!user) {
        throw new Error("не авторизован");
    }
    
    // sconst bid = formData.get('bid') as string;
    await database.insert(items).values({
        name: formData.get("name") as string,
        startingPrice: Number(formData.get("startingPrice")),
        userId: user.id!,
        });
    revalidatePath("/");

}
