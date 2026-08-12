"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Building2, LogInIcon, Plus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user/user-button";
import { useAddPropertyModal } from "./store/use-add-property-modal";
import AddPropertyForm from "./AddPropertyForm";

type Session = typeof authClient.$Infer.Session;

const Navbar = ({ session }: { session: Session | null }) => {
  const { onOpen } = useAddPropertyModal();
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  return (
    <>
      <header
        className={`z-50 transition-all duration-300 ${
          isHomepage
            ? "container mx-auto absolute top-5 left-0 right-0 backdrop-blur-md bg-slate-900/40 rounded-3xl border border-white/10 text-white"
            : "sticky top-0 left-0 w-full py-2 bg-white/90 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-xs"
        }`}
      >
        <div className="container mx-auto p-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl  font-medium flex gap-2 items-center"
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
                <Button
                  onClick={onOpen}
                  variant={"default"}
                  className="py-6 px-8 cursor-pointer bg-indigo-600 hover:bg-indigo-500 font-medium transition-all shadow-lg shadow-indigo-500/20 rounded-xl"
                >
                  Add Property
                  <Plus />
                </Button>
                <UserButton className="cursor-pointer hidden md:flex" />
              </>
            )}
          </div>
        </div>
      </header>
      <AddPropertyForm />
    </>
  );
};

export default Navbar;
