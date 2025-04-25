import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export function EmptyState() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl py-8 font-bold">Вы ничего не выставили на аукцион</h2>
            <Button asChild>
                <Link href="/bids/create">Выставить на аукцион</Link>
            </Button>
        </div>
    )
}