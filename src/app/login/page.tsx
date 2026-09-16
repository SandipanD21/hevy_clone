"use client";

import { useActionState, useState } from "react";
import { login, signup, type AuthState } from "./actions";

const initialState: AuthState = null;

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Two separate hooks (rather than swapping which action we pass to one
  // hook) so each mode keeps its own pending/error state independently.
  const [loginState, loginAction, loginPending] = useActionState(
    login,
    initialState
  );
  const [signupState, signupAction, signupPending] = useActionState(
    signup,
    initialState
  );

  const isLogin = mode === "login";
  const state = isLogin ? loginState : signupState;
  const formAction = isLogin ? loginAction : signupAction;
  const pending = isLogin ? loginPending : signupPending;

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-xl font-semibold">
        {isLogin ? "Log in" : "Create an account"}
      </h1>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={isLogin ? "current-password" : "new-password"}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>

        {state && "error" in state && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}
        {state && "message" in state && (
          <p className="text-sm text-green-700">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
        >
          {pending ? "Please wait…" : isLogin ? "Log in" : "Sign up"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode(isLogin ? "signup" : "login")}
        className="mt-4 text-sm text-zinc-600 underline underline-offset-2 hover:text-zinc-900"
      >
        {isLogin
          ? "Need an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </div>
  );
}
