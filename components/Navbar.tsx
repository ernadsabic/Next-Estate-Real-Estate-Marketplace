import Link from "next/link";
import { Button } from "./ui/button";
import { Building2, LogInIcon } from "lucide-react";
import { UserButton } from "@/components/auth/user/user-button";
import AddPropertyForm from "./AddPropertyForm";
import AddPropertyButton from "./AddPropertyButton";
import HeaderWrapper from "./HeaderWrapper";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <>
      <HeaderWrapper>
        <div className="container mx-auto p-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-medium flex gap-2 items-center"
          >
            <Building2 />
            <div>
              Next
              <span className="text-indigo-500 font-bold">Estate</span>
            </div>
          </Link>
          <nav className="hidden lg:flex flex-wrap gap-8 lg:gap-10 text-lg">
            <Link href="/" className="relative group py-2">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/marketplace" className="relative group py-2">
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              Marketplace
            </Link>
            <Link href="/properties" className="relative group py-2">
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              My Properties
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {!session ? (
              <Button
                variant={"default"}
                className="py-6 px-8 cursor-pointer inline-flex items-center border border-[#4F46E5]/50 rounded-xl"
                render={<Link href={"/auth/sign-in"}></Link>}
                nativeButton={false}
              >
                Sign in
                <LogInIcon />
              </Button>
            ) : (
              <>
                <AddPropertyButton />
                <UserButton className="cursor-pointer hidden md:flex" />
              </>
            )}
          </div>
        </div>
      </HeaderWrapper>
      <AddPropertyForm />
    </>
  );
};

export default Navbar;
