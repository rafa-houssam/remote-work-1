"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const err = params.get("error");
    const suc = params.get("success");
    if (err) setError(err);
    if (suc) setSuccess(suc);
  }, [params]);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session?.status, router]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
  };

  if (session.status === "unauthenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            {success || "Welcome Back 👋"}
          </h1>
          <h2 className={styles.subtitle}>
            Please sign in to access your dashboard.
          </h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Email"
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Login
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </form>

          <div className={styles.divider}>or</div>

          <div className={styles.providers}>
            <button
              onClick={() => signIn("google")}
              className={`${styles.button} ${styles.google}`}
            >
              Login with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className={`${styles.button} ${styles.github}`}
            >
              Login with GitHub
            </button>
          </div>

          <p className={styles.register}>
            Don’t have an account?{" "}
            <Link href="/dashboard/register" className={styles.link}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    );
  }
};

export default Login;
