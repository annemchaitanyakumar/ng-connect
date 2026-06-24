import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useState, useEffect } from "react";
import { Preloader } from "../components/Preloader";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center surface-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-[var(--gold)]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-cream">Page not found</h2>
        <p className="mt-2 text-sm text-cream/70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center surface-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-cream">This page didn't load</h1>
        <p className="mt-2 text-sm text-cream/70">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Networq Global — Digital Marketing Agency" },
      {
        name: "description",
        content:
          "Networq Global crafts outstanding digital solutions across branding, performance marketing, SEO, web design and more, for businesses across the globe.",
      },
      { name: "author", content: "Networq Global" },
      { property: "og:title", content: "Networq Global — Digital Marketing Agency" },
      { property: "og:description", content: "Because every click should lead somewhere." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("loader") === "true") {
      sessionStorage.removeItem("networq-preloader-viewed");
      setShowPreloader(true);
      return;
    }

    const hasPlayed = sessionStorage.getItem("networq-preloader-viewed");
    if (hasPlayed) {
      setShowPreloader(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("networq-preloader-viewed", "true");
    setShowPreloader(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      <div style={{ opacity: showPreloader ? 0 : 1, transition: "opacity 0.8s ease-out" }}>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
