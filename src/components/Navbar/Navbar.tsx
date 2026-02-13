import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";


import {User2Icon } from "lucide-react";
import Link from "next/link";
import Logout from "../Auth/Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import CartIcon from "../CartIcon/CartIcon";
import { getUserCartData } from "@/Actions/Cart/cart.action";
import NavMenu from "../NavMenu/NavMenu";
import { Session } from "inspector/promises";

export default async function Navbar() {
const session:Session|null = await getServerSession(authOptions);
const cartData = await getUserCartData();
  return (
    <>
      <nav className="py-4 bg-gray-50 shadow px-4 sm:px-6 lg:px-8 fixed w-full z-10">
        <div className="container mx-auto flex md:flex-row flex-wrap md:flex-nowrap justify-between items-center font-semibold">
          <h2 className="text-2xl font-bold">
            <Link href={"/"}>
              <span className="text-2xl bg-black text-white px-2 me-1 rounded-sm">
                S
              </span>
              ShopMart
            </Link>
          </h2>
          <NavMenu/>
          <div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <User2Icon className="size-6" />
                </MenubarTrigger>
                <MenubarContent>
                  {session ? (
                    <MenubarGroup>
                      <MenubarItem>
                        <Link href="/profile">Profile</Link>
                      </MenubarItem>
                      <MenubarItem>
                        <Link href="/orders">My Orders</Link>
                      </MenubarItem>
                      <Logout />
                    </MenubarGroup>
                  ) : (
                    <>
                      <MenubarSeparator />
                      <MenubarGroup>
                        <MenubarItem>
                          <Link href="/login" className="w-full">
                            Login
                          </Link>
                        </MenubarItem>
                        <MenubarItem>
                          <Link href="/register" className="w-full">
                            Register
                          </Link>
                        </MenubarItem>
                      </MenubarGroup>
                    </>
                  )}
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>
                  {cartData && (
                    <CartIcon countCartItems={cartData.numOfCartItems} />
                  )}
                </MenubarTrigger>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </nav>

      {/* <nav className="py-4 bg-gray-50 shadow px-4 sm:px-6 lg:px-8 fixed w-full z-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center font-semibold">
          <h2 className="text-2xl font-bold">
            <Link href={"/"}>
              <span className="text-2xl bg-black text-white px-2 me-1 rounded-sm">
                S
              </span>
              ShopMart
            </Link>
          </h2>
          <div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <User2Icon className="size-6" />
                </MenubarTrigger>
                <MenubarContent>
                  {session ? (
                    <MenubarGroup>
                      <MenubarItem>
                        <Link href="/profile">Profile</Link>
                      </MenubarItem>
                      <MenubarItem>
                        <Link href="/orders">My Orders</Link>
                      </MenubarItem>
                      <Logout />
                    </MenubarGroup>
                  ) : (
                    <>
                      <MenubarSeparator />
                      <MenubarGroup>
                        <MenubarItem>
                          <Link href="/login" className="w-full">
                            Login
                          </Link>
                        </MenubarItem>
                        <MenubarItem>
                          <Link href="/register" className="w-full">
                            Register
                          </Link>
                        </MenubarItem>
                      </MenubarGroup>
                    </>
                  )}
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>
                  {cartData && (
                    <CartIcon countCartItems={cartData.numOfCartItems} />
                  )}
                </MenubarTrigger>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </nav> */}
    </>
  );
}
