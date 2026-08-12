"use client"

import {
  authMutationKeys,
  parseAdditionalFieldValue
} from "@better-auth-ui/core"
import {
  AuthPrompts,
  useAuth,
  useFetchOptions,
  useSignUpEmail
} from "@better-auth-ui/react"
import { useIsMutating } from "@tanstack/react-query"
import { Eye, EyeOff } from "lucide-react"
import { type SyntheticEvent, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { AdditionalField } from "./additional-field"
import { ProviderButtons, type SocialLayout } from "./provider-buttons"
import { useRouter } from "next/navigation"
export type SignUpProps = {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: "top" | "bottom"
  onSignUpSuccess?: () => void
}

export function SignUp({
  className,
  socialLayout,
  socialPosition = "bottom",
  onSignUpSuccess
}: SignUpProps) {
  const {
    additionalFields,
    authClient,
    basePaths,
    emailAndPassword,
    localization,
    plugins,
    redirectTo,
    socialProviders,
    viewPaths,
    navigate,
    Link
  } = useAuth()

  const { fetchOptions, resetFetchOptions } = useFetchOptions()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const router = useRouter();

  const { mutate: signUpEmail, isPending: signUpEmailPending } = useSignUpEmail(
    authClient,
    {
      onError: () => {
        setPassword("")
        setConfirmPassword("")
        resetFetchOptions()
      },
      onSuccess: (_data, { email }) => {
        if (emailAndPassword?.requireEmailVerification) {
          sessionStorage.setItem("better-auth-ui.verify-email", email)
          navigate({
            to: `${basePaths.auth}/${viewPaths.auth.verifyEmail}`
          })
        } else if (onSignUpSuccess) {
          onSignUpSuccess()
        } else {
          navigate({ to: redirectTo })
          router.refresh();
        }
      }
    }
  )

  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all
  })
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all
  })
  const isPending = signInMutating + signUpMutating > 0

  // const Captcha = plugins.find(
  //   (plugin) => plugin.captchaComponent
  // )?.captchaComponent

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = (formData.get("name") as string | null) ?? ""
    const email = formData.get("email") as string

    if (emailAndPassword?.confirmPassword && password !== confirmPassword) {
      toast.error(localization.auth.passwordsDoNotMatch)
      setPassword("")
      setConfirmPassword("")
      return
    }

    const additionalFieldValues: Record<string, unknown> = {}

    for (const field of additionalFields ?? []) {
      if (!field.signUp || field.readOnly) continue
      const value = parseAdditionalFieldValue(
        field,
        formData.get(field.name) as string | null
      )

      if (field.validate) {
        try {
          await field.validate(value)
        } catch (error) {
          toast.error(error instanceof Error ? error.message : String(error))
          return
        }
      }

      if (value !== undefined) {
        additionalFieldValues[field.name] = value
      }
    }

    signUpEmail({
      name,
      email,
      password,
      ...additionalFieldValues,
      fetchOptions
    })
  }

  const showSeparator =
    emailAndPassword?.enabled && socialProviders && socialProviders.length > 0

  return (
    <Card className={cn("w-full max-w-md border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 backdrop-blur-md rounded-2xl p-2 md:p-4", className)}>
      <AuthPrompts view="signUp" />
      
      <CardHeader className="space-y-1 pb-4 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
          {localization.auth.signUp}
        </CardTitle>
        <p className="text-xs text-slate-500">
          Create an account to start exploring and managing properties.
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-5">
          {socialPosition === "top" && (
            <>
              {socialProviders && socialProviders.length > 0 && (
                <ProviderButtons socialLayout={socialLayout} view="signUp" />
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
                {emailAndPassword.name !== false && (
                  <Field data-invalid={!!fieldErrors.name} className="space-y-1">
                    <FieldLabel htmlFor="name" className="text-xs font-semibold text-slate-700">
                      {localization.auth.name}
                    </FieldLabel>

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={localization.auth.namePlaceholder}
                      required
                      disabled={isPending}
                      className="h-10 rounded-xl bg-slate-50/50 border-slate-200 text-sm focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-600 transition-all"
                      onChange={() => {
                        setFieldErrors((prev) => ({
                          ...prev,
                          name: undefined
                        }))
                      }}
                      onInvalid={(e) => {
                        e.preventDefault()
                        setFieldErrors((prev) => ({
                          ...prev,
                          name: localization.auth.fieldRequired
                        }))
                      }}
                      aria-invalid={!!fieldErrors.name}
                    />

                    <FieldError className="text-xs text-red-500">{fieldErrors.name}</FieldError>
                  </Field>
                )}

                <Field data-invalid={!!fieldErrors.email} className="space-y-1">
                  <FieldLabel htmlFor="email" className="text-xs font-semibold text-slate-700">
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
                        email: undefined
                      }))
                    }}
                    onInvalid={(e) => {
                      e.preventDefault()
                      const el = e.target as HTMLInputElement
                      const msg = el.validity.valueMissing
                        ? localization.auth.fieldRequired
                        : localization.auth.invalidEmail

                      setFieldErrors((prev) => ({
                        ...prev,
                        email: msg
                      }))
                    }}
                    aria-invalid={!!fieldErrors.email}
                  />

                  <FieldError className="text-xs text-red-500">{fieldErrors.email}</FieldError>
                </Field>

                {additionalFields?.map(
                  (field) =>
                    field.signUp === "above" && (
                      <AdditionalField
                        key={field.name}
                        name={field.name}
                        field={field}
                        isPending={isPending}
                        optionalLabel={localization.auth.optional}
                      />
                    )
                )}

                <Field data-invalid={!!fieldErrors.password} className="space-y-1">
                  <FieldLabel htmlFor="password" className="text-xs font-semibold text-slate-700">
                    {localization.auth.password}
                  </FieldLabel>

                  <InputGroup className="rounded-xl border border-slate-200 bg-slate-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-600 transition-all">
                    <InputGroupInput
                      id="password"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      className="h-10 text-sm bg-transparent border-0 focus-visible:ring-0"
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setFieldErrors((prev) => ({
                          ...prev,
                          password: undefined
                        }))
                      }}
                      placeholder={localization.auth.passwordPlaceholder}
                      required
                      minLength={emailAndPassword?.minPasswordLength}
                      maxLength={emailAndPassword?.maxPasswordLength}
                      disabled={isPending}
                      onInvalid={(e) => {
                        e.preventDefault()
                        const el = e.target as HTMLInputElement
                        const min = emailAndPassword?.minPasswordLength
                        const max = emailAndPassword?.maxPasswordLength
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
                              )

                        setFieldErrors((prev) => ({
                          ...prev,
                          password: msg
                        }))
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
                          setIsPasswordVisible((visible) => !visible)
                        }}
                      >
                        {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>

                  <FieldError className="text-xs text-red-500">{fieldErrors.password}</FieldError>
                </Field>

                {emailAndPassword?.confirmPassword && (
                  <Field data-invalid={!!fieldErrors.confirmPassword} className="space-y-1">
                    <FieldLabel htmlFor="confirmPassword" className="text-xs font-semibold text-slate-700">
                      {localization.auth.confirmPassword}
                    </FieldLabel>

                    <InputGroup className="rounded-xl border border-slate-200 bg-slate-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-600 transition-all">
                      <InputGroupInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        autoComplete="new-password"
                        value={confirmPassword}
                        className="h-10 text-sm bg-transparent border-0 focus-visible:ring-0"
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)

                          setFieldErrors((prev) => ({
                            ...prev,
                            confirmPassword: undefined
                          }))
                        }}
                        placeholder={
                          localization.auth.confirmPasswordPlaceholder
                        }
                        required
                        minLength={emailAndPassword?.minPasswordLength}
                        maxLength={emailAndPassword?.maxPasswordLength}
                        disabled={isPending}
                        onInvalid={(e) => {
                          e.preventDefault()
                          const el = e.target as HTMLInputElement
                          const min = emailAndPassword?.minPasswordLength
                          const max = emailAndPassword?.maxPasswordLength
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
                                )

                          setFieldErrors((prev) => ({
                            ...prev,
                            confirmPassword: msg
                          }))
                        }}
                        aria-invalid={!!fieldErrors.confirmPassword}
                      />

                      <InputGroupAddon align="inline-end" className="pr-3">
                        <InputGroupButton
                          size="icon-xs"
                          type="button"
                          className="text-slate-400 hover:text-slate-600"
                          aria-label={
                            isConfirmPasswordVisible
                              ? localization.auth.hidePassword
                              : localization.auth.showPassword
                          }
                          title={
                            isConfirmPasswordVisible
                              ? localization.auth.hidePassword
                              : localization.auth.showPassword
                          }
                          onClick={() =>
                            setIsConfirmPasswordVisible((visible) => !visible)
                          }
                        >
                          {isConfirmPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>

                    <FieldError className="text-xs text-red-500">{fieldErrors.confirmPassword}</FieldError>
                  </Field>
                )}

                {additionalFields?.map(
                  (field) =>
                    field.signUp &&
                    field.signUp !== "above" && (
                      <AdditionalField
                        key={field.name}
                        name={field.name}
                        field={field}
                        isPending={isPending}
                        optionalLabel={localization.auth.optional}
                      />
                    )
                )}

                {/* {Captcha && (
                  <div className="flex justify-center">{Captcha}</div>
                )} */}

                <div className="flex flex-col gap-3 pt-2">
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="h-10 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-100"
                  >
                    {signUpEmailPending && <Spinner className="mr-2 h-4 w-4" />}
                    {localization.auth.signUp}
                  </Button>

                  {/* {plugins.flatMap((plugin) =>
                    (plugin.authButtons ?? []).map((AuthButton, index) => (
                      <AuthButton
                        key={`${plugin.id}-${index.toString()}`}
                        view="signUp"
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
                <ProviderButtons socialLayout={socialLayout} view="signUp" />
              )}
            </>
          )}
        </div>

        {emailAndPassword?.enabled && (
          <div className="flex flex-col gap-3 items-center w-full mt-6">
            <FieldDescription className="text-center text-xs text-slate-500">
              {localization.auth.alreadyHaveAnAccount}{" "}
              <Link
                href={`${basePaths.auth}/${viewPaths.auth.signIn}`}
                className="text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-4 transition-colors"
              >
                {localization.auth.signIn}
              </Link>
            </FieldDescription>
          </div>
        )}
      </CardContent>
    </Card>
  )
}