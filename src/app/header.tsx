'use client'

import { NotificationCell, NotificationFeedPopover, NotificationIconButton } from "@knocklabs/react";
import { useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../components/ui/button";
import App from "next/app";
import { AppKnockProviders } from "./knock-provider";
import Link from "next/link";

export function Header() {

    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef<HTMLButtonElement>(null);

    const session = useSession();
    const userId = session?.data?.user?.id;

    return (
        <AppKnockProviders>
        <div className="bg-gray-200 py-4">
            <div className="container flex justify-around items-center">
                <a className="flex items-center gap-4 py-2" href="/">
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
                <div>
                    { session?.data?.user?.id } <br></br> 
                </div>
                <div className="flex items-center gap-2">
                    <NotificationIconButton
                        ref={notifButtonRef}
                        onClick={(e) => setIsVisible(!isVisible)}
                    />
                    <NotificationFeedPopover
                        buttonRef={notifButtonRef as React.RefObject<HTMLElement>}
                        isVisible={isVisible}
                        onClose={() => setIsVisible(false)}
                        renderItem={({ item, ...props }) => (
                            <NotificationCell {...props} item={item}>
                              <div className="rounded-xl">
                                <Link
                                  className="text-blue-400 hover:text=blue-500"
                                  onClick={() => {
                                    setIsVisible(false);
                                  }}
                                  href={item.data ? `/items/${item.data.itemId}` : "#"}
                                >
                                  Кто-то перебил вашу ставку на {" "}
                                  <span className="font-bold">{item.data?.itemName ?? "Unknown Item"}</span>
                                </Link>
                              </div>
                            </NotificationCell>
                          )}
                    />
                    <div>{ session?.data?.user?.name }</div>
                    <div>
                    {userId ? (
                    <Button
                        onClick={() =>
                        signOut({
                            callbackUrl: "/",
                        })
                        }
                    >
                        Sign Out
                    </Button>
                    ) : (
                    <Button type="submit" onClick={() => signIn()}>
                        Sign In
                    </Button>
                    )}</div>
                        </div>
                    </div>
                </div>
        </AppKnockProviders>
    )
}