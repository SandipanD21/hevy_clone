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
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            {isLogin
              ? "Log in to track your workouts."
              : "Start tracking your workouts in a minute."}
          </p>
        </div>

        <div className="card p-5">
          <form action={formAction} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="field-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete={isLogin ? "current-password" : "new-password"}
                placeholder={isLogin ? "••••••••" : "At least 6 characters"}
                className="field-input"
              />
            </div>

            {state && "error" in state && (
              <p className="rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 text-sm text-danger">
                {state.error}
              </p>
            )}
            {state && "message" in state && (
              <p className="rounded-lg border border-success/20 bg-success/5 px-3 py-2 text-sm text-success">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="btn btn-primary w-full"
            >
              {pending ? "Please wait…" : isLogin ? "Log in" : "Sign up"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-ink-muted">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(isLogin ? "signup" : "login")}
            className="font-medium text-ink underline underline-offset-4 hover:no-underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
