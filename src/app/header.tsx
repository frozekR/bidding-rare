'use client'

import { NotificationFeedPopover, NotificationIconButton } from "@knocklabs/react";
import { useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../components/ui/button";
import App from "next/app";
import { AppKnockProviders } from "./knock-provider";

export function Header() {

    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef<HTMLButtonElement>(null);

    const session = useSession();

    return (
        <AppKnockProviders>
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
                    <NotificationIconButton
                        ref={notifButtonRef}
                        onClick={(e) => setIsVisible(!isVisible)}
                    />
                    <NotificationFeedPopover
                        buttonRef={notifButtonRef as React.RefObject<HTMLElement>}
                        isVisible={isVisible}
                        onClose={() => setIsVisible(false)}
                    />
                    <div>{ session?.data?.user?.name }</div>
                    <div>{ session ?
                    <Button
                        type="submit"
                        onClick={() => {
                            signOut({
                                callbackUrl: "/",
                            });
                        }}> Выйти из аккаунт
                    </Button> :
                    <Button type="submit"
                    onClick={() => {
                        signIn();
                    }}>Войти в аккаунт</Button>
                    }</div>
                </div>
            </div>
        </div>
        </AppKnockProviders>
    )
}