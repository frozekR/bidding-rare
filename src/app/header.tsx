import Image from "next/image"
import { auth } from "../auth"
import { SignOut } from "../components/sign-out";
import SignIn from "../components/sign-in";

export async function Header() {
    const session = await auth();

    return (
        <div className="bg-gray-200 py-4">
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-2">
                    { <Image src="/logo.png" width="50" height="50" alt="Logo" /> }
                    Ono.com
                </div>
                <div>
                    <div>{ session ? <SignOut /> : <SignIn /> }</div>
                    <div>{ session?.user?.name }</div>
                </div>
            </div>
        </div>
    )
}