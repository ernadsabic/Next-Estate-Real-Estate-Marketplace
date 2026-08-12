import { viewPaths } from "@better-auth-ui/core";
import { notFound, redirect } from "next/navigation";

import { Auth } from "@/components/auth/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AuthPage({
  params,
}: {
  params: Promise<{
    path: string;
  }>;
}) {
  const { path } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  if (!Object.values(viewPaths.auth).includes(path)) {
    notFound();
  }

  return (
    <div className="flex justify-center items-center p-4 md:p-6 bg-muted/40 min-h-[81dvh] w-full">
      <Auth path={path} />
    </div>
  );
}
