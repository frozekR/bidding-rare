import Image from "next/image"
import { auth } from "../auth"
import { SignOut } from "../components/sign-out";
import SignIn from "../components/sign-in";

export async function Header() {
    const session = await auth();

    return (
        <div className="bg-gray-200 py-4">
            <div className="container flex justify-around items-center">
                <a className="flex items-center gap-2 py-2" href="/">
                    OldAuction.ru
                </a>
                <div className="flex items-center gap-8">
                    <a href="/items/create">
                        Create Auction
                    </a>

                    <a href="/">
                        All Auctions
                    </a>

                    <a href="/auctions">
                        My Auctions
                    </a>
                </div>
                <div className="flex items-center gap-2">
                    <div>{ session?.user?.name }</div>
                    <div>{ session ? <SignOut /> : <SignIn /> }</div>
                </div>
            </div>
        </div>
    )
}