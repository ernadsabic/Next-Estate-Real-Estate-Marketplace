"use client";

import { authMutationKeys } from "@better-auth-ui/core";
import {
  AuthPrompts,
  useAuth,
  useFetchOptions,
  useSignInEmail,
} from "@better-auth-ui/react";
import { useIsMutating } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { type SyntheticEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useSignInContinuation } from "@/lib/auth/use-sign-in-continuation";
import { cn } from "@/lib/utils";
import { LastUsedBadge } from "./last-login-method/last-used-badge";
import { ProviderButtons, type SocialLayout } from "./provider-buttons";
import { useRouter } from "next/navigation";

export type SignInProps = {
  className?: string;
  socialLayout?: SocialLayout;
  socialPosition?: "top" | "bottom";
};

/**
 * Render the sign-in form UI with email/password, magic link, and social provider options.
 *
 * @param className - Optional additional container class names
 * @param socialLayout - Layout style for social provider buttons
 * @param socialPosition - Position of social provider buttons; `"top"` or `"bottom"`. Defaults to `"bottom"`.
 * @returns The rendered sign-in UI as a JSX element
 */
export function SignIn({
  className,
  socialLayout,
  socialPosition = "bottom",
}: SignInProps) {
  const {
    authClient,
    basePaths,
    emailAndPassword,
    localization,
    plugins,
    socialProviders,
    viewPaths,
    navigate,
    Link,
  } = useAuth();

  const { fetchOptions, resetFetchOptions } = useFetchOptions();
  const continueSignIn = useSignInContinuation();

  const [password, setPassword] = useState("");

  const router = useRouter();

  const { mutate: signInEmail, isPending: signInEmailPending } = useSignInEmail(
    authClient,
    {
      onError: (error, { email }) => {
        setPassword("");

        if (error.error?.code === "EMAIL_NOT_VERIFIED") {
          sessionStorage.setItem("better-auth-ui.verify-email", email);
          navigate({
            to: `${basePaths.auth}/${viewPaths.auth.verifyEmail}`,
          });
        }

        resetFetchOptions();
      },
      onSuccess: (data) => {
        continueSignIn(data), router.refresh();
      },
    }
  );

  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all,
  });
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all,
  });
  const isPending = signInMutating + signUpMutating > 0;

  // const Captcha = plugins.find(
  //   (plugin) => plugin.captchaComponent
  // )?.captchaComponent;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const rememberMe = formData.get("rememberMe") === "on";

    signInEmail({
      email,
      password,
      ...(emailAndPassword?.rememberMe ? { rememberMe } : {}),
      fetchOptions,
    });
  };

  const showSeparator =
    emailAndPassword?.enabled && socialProviders && socialProviders.length > 0;

  return (
    <Card
      className={cn(
        "w-full max-w-md border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 backdrop-blur-md rounded-2xl p-2 md:p-4",
        className
      )}
    >
      <AuthPrompts view="signIn" />

      <CardHeader className="space-y-1 pb-4 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
          {localization.auth.signIn}
        </CardTitle>
        <p className="text-xs text-slate-500">
          Welcome back! Please enter your details to sign in.
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-5">
          {socialPosition === "top" && (
            <>
              {socialProviders && socialProviders.length > 0 && (
                <ProviderButtons socialLayout={socialLayout} view="signIn" />
              )}

              {showSeparator && (
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-white text-slate-400 text-xs flex items-center">
                  {localization.auth.or}
                </FieldSeparator>
              )}
            </>
          )}

          {emailAndPassword?.enabled && (
            <form onSubmit={handleSubmit}>
              <FieldGroup className="space-y-4">
                <Field data-invalid={!!fieldErrors.email} className="space-y-1">
                  <FieldLabel
                    htmlFor="email"
                    className="text-xs font-semibold text-slate-700"
                  >
                    {localization.auth.email}
                  </FieldLabel>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={localization.auth.emailPlaceholder}
                    required
                    disabled={isPending}
                    className="h-10 rounded-xl bg-slate-50/50 border-slate-200 text-sm focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-600 transition-all"
                    onChange={() => {
                      setFieldErrors((prev) => ({
                        ...prev,
                        email: undefined,
                      }));
                    }}
                    onInvalid={(e) => {
                      e.preventDefault();
                      const el = e.target as HTMLInputElement;
                      const msg = el.validity.valueMissing
                        ? localization.auth.fieldRequired
                        : localization.auth.invalidEmail;

                      setFieldErrors((prev) => ({
                        ...prev,
                        email: msg,
                      }));
                    }}
                    aria-invalid={!!fieldErrors.email}
                  />

                  <FieldError className="text-xs text-red-500">
                    {fieldErrors.email}
                  </FieldError>
                </Field>

                <Field
                  data-invalid={!!fieldErrors.password}
                  className="space-y-1"
                >
                  <FieldLabel
                    htmlFor="password"
                    className="text-xs font-semibold text-slate-700"
                  >
                    {localization.auth.password}
                  </FieldLabel>

                  <InputGroup className="rounded-xl border border-slate-200 bg-slate-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-600 transition-all">
                    <InputGroupInput
                      id="password"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      className="h-10 text-sm bg-transparent border-0 focus-visible:ring-0"
                      onChange={(e) => {
                        setPassword(e.target.value);

                        setFieldErrors((prev) => ({
                          ...prev,
                          password: undefined,
                        }));
                      }}
                      placeholder={localization.auth.passwordPlaceholder}
                      required
                      minLength={emailAndPassword?.minPasswordLength}
                      maxLength={emailAndPassword?.maxPasswordLength}
                      disabled={isPending}
                      onInvalid={(e) => {
                        e.preventDefault();
                        const el = e.target as HTMLInputElement;
                        const min = emailAndPassword?.minPasswordLength;
                        const max = emailAndPassword?.maxPasswordLength;
                        const msg = el.validity.valueMissing
                          ? localization.auth.fieldRequired
                          : el.validity.tooShort
                          ? localization.auth.tooShort.replace(
                              "{{min}}",
                              String(min)
                            )
                          : localization.auth.tooLong.replace(
                              "{{max}}",
                              String(max)
                            );

                        setFieldErrors((prev) => ({
                          ...prev,
                          password: msg,
                        }));
                      }}
                      aria-invalid={!!fieldErrors.password}
                    />

                    <InputGroupAddon align="inline-end" className="pr-3">
                      <InputGroupButton
                        size="icon-xs"
                        type="button"
                        className="text-slate-400 hover:text-slate-600"
                        aria-label={
                          isPasswordVisible
                            ? localization.auth.hidePassword
                            : localization.auth.showPassword
                        }
                        title={
                          isPasswordVisible
                            ? localization.auth.hidePassword
                            : localization.auth.showPassword
                        }
                        onClick={() => {
                          setIsPasswordVisible((visible) => !visible);
                        }}
                      >
                        {isPasswordVisible ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>

                  <FieldError className="text-xs text-red-500">
                    {fieldErrors.password}
                  </FieldError>
                </Field>

                {emailAndPassword.rememberMe && (
                  <Field className="my-1">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        disabled={isPending}
                        className="rounded border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />

                      <FieldLabel
                        htmlFor="rememberMe"
                        className="cursor-pointer text-xs font-medium text-slate-600 select-none"
                      >
                        {localization.auth.rememberMe}
                      </FieldLabel>
                    </div>
                  </Field>
                )}

                {/* {Captcha && (
                  <div className="flex justify-center">{Captcha}</div>
                )} */}

                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="relative overflow-visible h-10 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-100"
                  >
                    {signInEmailPending && <Spinner className="mr-2 h-4 w-4" />}

                    {localization.auth.signIn}

                    <LastUsedBadge method="email" floating />
                  </Button>

                  {/* {plugins.flatMap((plugin) =>
                    (plugin.authButtons ?? []).map((AuthButton, index) => (
                      <AuthButton
                        key={`${plugin.id}-${index.toString()}`}
                        view="signIn"
                      />
                    ))
                  )} */}
                </div>
              </FieldGroup>
            </form>
          )}

          {socialPosition === "bottom" && (
            <>
              {showSeparator && (
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-white text-slate-400 text-xs flex items-center">
                  {localization.auth.or}
                </FieldSeparator>
              )}

              {socialProviders && socialProviders.length > 0 && (
                <ProviderButtons socialLayout={socialLayout} view="signIn" />
              )}
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 items-center w-full mt-6">
          {emailAndPassword?.enabled && emailAndPassword?.forgotPassword && (
            <Link
              href={`${basePaths.auth}/${viewPaths.auth.forgotPassword}`}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium underline-offset-4 hover:underline transition-colors"
            >
              {localization.auth.forgotPasswordLink}
            </Link>
          )}

          {emailAndPassword?.enabled && (
            <FieldDescription className="text-center text-xs text-slate-500">
              {localization.auth.needToCreateAnAccount}{" "}
              <Link
                href={`${basePaths.auth}/${viewPaths.auth.signUp}`}
                className="text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-4 transition-colors"
              >
                {localization.auth.signUp}
              </Link>
            </FieldDescription>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
