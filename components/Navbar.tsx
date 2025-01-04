"use client"
import { cn } from "@/lib/utils"
import { MenuIcon } from 'lucide-react'
import Link from "next/link"
import * as React from "react"
import { Dialog, DialogClose } from "./ui/dialog"
import { Button } from "./ui/button"
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"



export function NavBar() {
    const user = useUser()
    return (
        <div className="flex items-center min-w-full w-full fixed justify-center p-2 z-[50] mt-[2rem]">
            <div className="flex justify-between md:w-[720px] w-[95%] border dark:border-zinc-900 dark:bg-black bg-opacity-10 relative backdrop-filter backdrop-blur-lg bg-white border-white border-opacity-20 rounded-xl p-2 shadow-lg">
                <Dialog>
                    <SheetTrigger className="min-[825px]:hidden p-2 transition ">
                        
                        <MenuIcon />
                       
                       
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <UserButton/>
                            <SheetTitle>socialcraft.</SheetTitle>
                            <SheetDescription>
                                Generate social media content effortlessly.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col space-y-3 mt-[1rem] z-[99]">
                            <DialogClose asChild>
                                <Link href="/">
                                    <Button variant="outline" className="w-full">Home</Button>
                                </Link>
                            </DialogClose>
                            
                            <DialogClose>
                            <SignedOut>
                            <DialogClose asChild>
                                <SignInButton >
                        
                                    <Button variant="outline" className="w-full mb-2">Sign In</Button>
                                </SignInButton>
                               
                            </DialogClose>
                            <DialogClose asChild>
                                <SignUpButton >
                    
                                    <Button variant="outline" className="w-full">Sign Up</Button>
                                </SignUpButton>
                            </DialogClose>
                                </SignedOut>
                                </DialogClose>
                            <SignedIn>
                            <DialogClose asChild>
                                {user ? "" : <Link href="/generate">
                                    <Button variant="outline" className="w-full">Dashboard</Button>
                                </Link>}
                           
                               
                            </DialogClose>
                            <DialogClose asChild>
                            
                            <SignOutButton   redirectUrl="/"/> 
                            </DialogClose>
                                </SignedIn>
                           
                        </div>
                    </SheetContent>
                </Dialog>
                <NavigationMenu>
                    <NavigationMenuList className="max-[825px]:hidden ">
                        <Link href="/" className="pl-2">
                            <h1 className="font-bold">socialcraft.</h1>
                        </Link>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex items-center gap-2 max-[825px]:hidden">
                    <SignedOut>
                    <SignInButton >
                        
                        <Button variant="ghost">Sign In</Button>
                    </SignInButton>
                    <SignUpButton >
                    
                        <Button variant="ghost">Sign Up</Button>
                    </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                            <Link href="/generate">
                                <Button variant="ghost">Dashboard</Button>
                            </Link>
                            <UserButton appearance={{
                                elements : {
                                    avatarBox : 'w-10 h-10'
                                }
                            }}>
                            
                            </UserButton>
                        </SignedIn>
                
                </div>
            </div>
        </div>

    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"