"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface MobileNavProps { }

export const MobileNav: React.FC<MobileNavProps> = ({ }) => {
    const pathname = usePathname();
    return (
        <header className="header">
            <Link href="/" className="flex items-center gap-2 md:py-2">
                <Image
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={180}
                    height={28}
                />
            </Link>
            <nav className="flex gap-2">
                <SignedIn>
                    <UserButton afterSignOutUrl="/sign-in" />
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src="/assets/icons/menu.svg"
                                alt="menu"
                                height={32}
                                width={32}
                                className="cursor-pointer"
                            />
                        </SheetTrigger>
                        <SheetContent className="sheet-content sm:w-64">
                            <>
                                <Image
                                    src="/assets/images/logo-text.svg"
                                    alt="logo"
                                    width={152}
                                    height={23}
                                />
                                <ul className="header-nav_elements">
                                    {NAV_LINKS.map((link) => {
                                        const isActive = link.route === pathname;

                                        return (
                                            <li
                                                key={link.route}
                                                className={cn(
                                                    "p-18 flex whitespace-nowrap text-dark-700",
                                                    isActive && "gradient-text"
                                                )}>
                                                <Link
                                                    className="sidebar-link cursor-pointer"
                                                    href={link.route}>
                                                    <Image
                                                        src={link.icon}
                                                        alt="logo"
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>
                </SignedIn>
                <SignedOut>
                    <Button asChild className="button bg-purple-gradient bg-cover">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                </SignedOut>
            </nav>
        </header>
    );
};
