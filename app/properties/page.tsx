import PropertyCard from "@/components/PropertyCard";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

const MyProperties = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session?.user) {
    throw new Error("Not authenticated!");
  }

  const myProps = await prisma.propertySale.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId: session.user.id },
  });

  const hasProps = myProps.length !== 0;

  return (
    <section
      className={`min-h-[81vh] pt-16 md:pt-20 w-full bg-[#F8FAFC] ${
        !hasProps && "flex items-center justify-center"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {myProps.length === 0 ? (
          <div className="w-full py-12 flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#EFF0FA]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-10 text-indigo-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-center gap-2">
                <h1 className="text-2xl md:text-3xl font-semibold">
                  No Properties Found
                </h1>
                <p className="text-gray-600 max-w-md">
                  You currently have no properties available. Check back later
                  after creating new listings.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-10">
              <h1 className="text-2xl md:text-3xl font-semibold">
                My Properties
              </h1>
              <p className="text-gray-600">
                View, manage, and track all your active real estate listings in
                one place.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProps.map((prop, key) => {
                return <PropertyCard key={key} property={prop} />;
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MyProperties;
