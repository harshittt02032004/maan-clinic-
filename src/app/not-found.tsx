import Link from "next/link";
import { LogoMark } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <LogoMark size={96} className="opacity-70" />
      <h1 className="mt-6 text-4xl font-extrabold text-ink sm:text-5xl">This page doesn&apos;t exist.</h1>
      <p className="mt-3 max-w-md text-body">The link may be old or mistyped. Everything on the site is one click away from the home page.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-ink">Go home</Link>
        <Link href="/conditions/" className="btn-line">See conditions</Link>
      </div>
    </section>
  );
}
