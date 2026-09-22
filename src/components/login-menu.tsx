"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Github, LogOut, UserRound } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.38-.18-2.03H12v3.85h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.34 2.98-7.34Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.04.97-3.38.97-2.6 0-4.81-1.76-5.6-4.13H3.06v2.58A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.4 13.91a6 6 0 0 1 0-3.82V7.51H3.06a10 10 0 0 0 0 8.98l3.34-2.58Z" />
      <path fill="#EA4335" d="M12 5.96c1.43 0 2.72.5 3.73 1.46l2.8-2.8A9.58 9.58 0 0 0 12 2a10 10 0 0 0-8.94 5.51l3.34 2.58c.79-2.37 3-4.13 5.6-4.13Z" />
    </svg>
  );
}

export function LoginMenu({
  userName,
  authProviders,
}: {
  userName: string | null;
  authProviders: { github: boolean; google: boolean };
}) {
  const { t } = useLanguage();
  const [needsConfiguration, setNeedsConfiguration] = useState(false);

  function login(provider: "github" | "google") {
    if (!authProviders[provider]) {
      setNeedsConfiguration(true);
      return;
    }
    void signIn(provider);
  }

  const socialButtonClass =
    "inline-flex size-10 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-900 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700";

  return (
    <Dialog.Root onOpenChange={() => setNeedsConfiguration(false)}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-zinc-900 hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-100 dark:hover:bg-transparent"
          aria-label={userName ?? t("auth.login")}
          title={userName ?? t("auth.login")}
        >
          <UserRound aria-hidden="true" className="size-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-[2px]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-[100] w-[min(500px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 outline-none"
        >
          <div className="relative rounded-2xl border border-zinc-200 bg-white px-6 pb-6 pt-12 text-center text-zinc-900 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            <div className="absolute -top-8 left-1/2 size-16 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-blue-300 shadow-sm dark:border-zinc-900">
              <Image src="/icon.svg" alt="" width={64} height={64} className="size-full object-cover" />
            </div>
            <Dialog.Title className="text-sm font-semibold">
              {userName ? `${t("auth.signedInAs")} ${userName}` : t("auth.title")}
            </Dialog.Title>
            {userName ? (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  className={socialButtonClass}
                  aria-label={t("auth.logout")}
                  title={t("auth.logout")}
                  onClick={() => void signOut()}
                >
                  <LogOut aria-hidden="true" className="size-5" />
                </button>
              </div>
            ) : (
              <>
                <div className="mt-5 flex justify-center gap-3">
                  <button
                    type="button"
                    className={socialButtonClass}
                    aria-label={t("auth.github")}
                    title={t("auth.github")}
                    onClick={() => login("github")}
                  >
                    <Github aria-hidden="true" className="size-5" />
                  </button>
                  <button
                    type="button"
                    className={socialButtonClass}
                    aria-label={t("auth.google")}
                    title={t("auth.google")}
                    onClick={() => login("google")}
                  >
                    <GoogleIcon />
                  </button>
                </div>
                {needsConfiguration && (
                  <p role="status" className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                    {t("auth.setup")}
                  </p>
                )}
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
