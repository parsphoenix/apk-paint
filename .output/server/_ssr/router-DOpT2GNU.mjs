import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { l as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast, T as Toaster$1 } from "../_libs/sonner.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { D as Dialog$1, a as DialogTrigger$1, b as DialogPortal$1, c as DialogContent$1, d as DialogClose, e as DialogTitle$1, f as DialogOverlay$1, g as DialogDescription$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { s as supabase } from "./client-BgKquhd9.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CABP3xOo.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-J10uQpL-.mjs";
import "../_libs/seroval.mjs";
import { V as VolumeX, a as Volume2, L as Languages, S as Sparkles, P as Palette, b as LoaderCircle, c as Plus, d as LogIn, U as Users, C as ChevronRight, e as ChevronLeft, f as Copy, g as Share2, h as Crown, i as LogOut, j as Settings, k as Play, l as Clock, m as Pencil, E as Eraser, n as PaintBucket, o as Undo2, T as Trash2, p as Send, X } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, a as arrayType, b as booleanType, e as enumType, n as numberType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const appCss = "/assets/styles-B1FZlguo.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$2 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
      { title: "نقاشک — بازی حدس نقاشی آنلاین" },
      { name: "description", content: "بازی آنلاین حدس نقاشی چندنفره به سبک gartic. اتاق بساز، با دوستات بازی کن." },
      { property: "og:title", content: "نقاشک — بازی حدس نقاشی آنلاین" },
      { property: "og:description", content: "بازی آنلاین حدس نقاشی چندنفره به سبک gartic." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "fa", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const Dialog = Dialog$1;
const DialogTrigger = DialogTrigger$1;
const DialogPortal = DialogPortal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay$1,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogOverlay$1.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogContent$1.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle$1,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogTitle$1.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription$1,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogDescription$1.displayName;
const STORAGE_KEY = "draw_guest_profile";
const AVATAR_COLORS = [
  "#EF4444",
  "#F59E0B",
  "#EAB308",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F97316",
  "#10B981",
  "#0EA5E9",
  "#A855F7"
];
function loadProfile() {
  if (typeof window === "undefined") return { nickname: "", avatarColor: AVATAR_COLORS[0] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { nickname: "", avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)] };
}
function saveProfile(p) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}
function useGuestSession() {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let alive = true;
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!alive) return;
      if (data.session) {
        setSession(data.session);
        setLoading(false);
        return;
      }
      const { data: anon, error } = await supabase.auth.signInAnonymously();
      if (!alive) return;
      if (error) console.error("anon signIn error", error);
      setSession(anon.session ?? null);
      setLoading(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return { session, loading, userId: session?.user.id ?? null };
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const createRoom = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  nickname: stringType().min(1).max(20),
  avatarColor: stringType().min(4).max(20),
  isPublic: booleanType().default(false),
  maxPlayers: numberType().int().min(2).max(12).default(8),
  totalRounds: numberType().int().min(1).max(25).default(3),
  roundSeconds: numberType().int().min(30).max(200).default(80),
  chooseSeconds: numberType().int().min(5).max(30).default(15),
  language: enumType(["fa", "en", "both"]).default("fa"),
  useCustomOnly: booleanType().default(false),
  customWords: arrayType(stringType().min(1).max(40)).max(400).default([])
}).parse(input)).handler(createSsrRpc("72ff94374307e72a03cde4028917799b829a2f6eed34e12870a966188fe9f057"));
const joinRoom = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  code: stringType().min(3).max(8),
  nickname: stringType().min(1).max(20),
  avatarColor: stringType().min(4).max(20)
}).parse(input)).handler(createSsrRpc("d8b9bc6ce64c74312bb0556b62400dc94581d9ce471af4daa1b67d7df916946c"));
const leaveRoom = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("73323c0c70d5bc3d3dbbade43bfee15ad3ac64d8e1308ffab9ade34971c75436"));
const kickPlayer = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid(),
  targetUserId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("e54962c1c28cba0ec44aca118430d62ad5b044758a7d83a3cb59f4f0900eec68"));
const updateRoomSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid(),
  isPublic: booleanType().optional(),
  maxPlayers: numberType().int().min(2).max(12).optional(),
  totalRounds: numberType().int().min(1).max(25).optional(),
  roundSeconds: numberType().int().min(30).max(200).optional(),
  chooseSeconds: numberType().int().min(5).max(30).optional(),
  language: enumType(["fa", "en", "both"]).optional(),
  useCustomOnly: booleanType().optional(),
  customWords: arrayType(stringType().min(1).max(40)).max(400).optional()
}).parse(input)).handler(createSsrRpc("1633ae07f1af5b5428d73a21080e55bd7a717aa2438c36c590bdbed096c70354"));
const startGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("7b6f56b1689db5ebcbcd991a3cbc9d3702d92d7fb35dbff4e359e27f1f3a5a9f"));
const chooseWord = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid(),
  word: stringType().min(1).max(60)
}).parse(input)).handler(createSsrRpc("72b0c82d5d00ffe5429d99e5e0d8b8f65301ff57d761bd4b80924342359a0e12"));
const submitGuess = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid(),
  guess: stringType().min(1).max(150)
}).parse(input)).handler(createSsrRpc("4f094df9e74a711c11d2262e7ce0362d372198697adf2e49f17b95d770d62f2b"));
const endRound = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("cca29c9610d72d2bdb8ea45d1db21d450ab13bfe8a9f314c2ed446e640e68159"));
const autoChooseWord = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("7320d41316c850aff257b2390af8f08c7deb896e0c7d4ef2730b55ed6562ac25"));
const nextTurn = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("9e71869b63bc0d0ac1ea40b2e5096f6ef3c7481169d7d692c3f99543b35b1216"));
const revealLetter = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("b42eb7bf4c698ca3c69ebf4d50154908d6abd91ae828afc627e358bdd16eebbc"));
const resetGame = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  roomId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("970bdd3f08722f38c214425e409c5fb38598c4c0711e75df7a9dd9e746ff7743"));
const listPublicRooms = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  page: numberType().int().min(1).max(50).default(1),
  pageSize: numberType().int().min(1).max(20).default(12)
}).optional().default({
  page: 1,
  pageSize: 12
}).parse(input ?? {})).handler(createSsrRpc("c8a29b6780a974f63fb4e68fce38ee3cb8b0b336078d3173b8f13b64132bd127"));
const KEY = "draw_lang";
function getLang() {
  if (typeof window === "undefined") return "fa";
  const v = localStorage.getItem(KEY);
  return v === "en" ? "en" : "fa";
}
function setLang(l) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, l);
  window.dispatchEvent(new Event("lang-change"));
}
function useLang() {
  const [lang, setL] = reactExports.useState(() => getLang());
  reactExports.useEffect(() => {
    const h = () => setL(getLang());
    window.addEventListener("lang-change", h);
    return () => window.removeEventListener("lang-change", h);
  }, []);
  return [lang, (l) => {
    setLang(l);
    setL(l);
  }];
}
const DICT = {
  tagline: { fa: "آنلاین، چندنفره، فارسی و انگلیسی", en: "Online, multiplayer, Persian & English" },
  title: { fa: "نقاشک", en: "Sketchy" },
  subtitle: {
    fa: "بکش، حدس بزن، بخند. بازی نقاشی چندنفره به سبک gartic — همین حالا با دوستات بازی کن.",
    en: "Draw, guess, laugh. A multiplayer drawing game like gartic — play with friends right now."
  },
  nickname: { fa: "اسم نمایشی", en: "Display name" },
  nicknamePh: { fa: "مثلاً علی", en: "e.g. Ali" },
  color: { fa: "رنگ", en: "Color" },
  quickPlay: { fa: "بازی سریع (عمومی)", en: "Quick play (public)" },
  customRoom: { fa: "اتاق سفارشی", en: "Custom room" },
  roomCode: { fa: "کد اتاق", en: "Room code" },
  publicRooms: { fa: "اتاق‌های عمومی", en: "Public rooms" },
  noPublic: { fa: "اتاق عمومی فعالی نیست — اولین نفر باش!", en: "No active public rooms — be the first!" },
  loading: { fa: "در حال بارگذاری...", en: "Loading..." },
  enter: { fa: "ورود", en: "Join" },
  waiting: { fa: "در انتظار شروع", en: "Waiting to start" },
  playing: { fa: "در حال بازی", en: "Playing" },
  players: { fa: "بازیکن", en: "players" },
  rounds: { fa: "دور", en: "rounds" },
  prev: { fa: "قبلی", en: "Prev" },
  next: { fa: "بعدی", en: "Next" },
  captcha: { fa: "تأیید (پاسخ بده):", en: "Captcha (answer):" },
  captchaWrong: { fa: "پاسخ کپچا اشتباه است", en: "Wrong captcha answer" },
  needName: { fa: "اسم خودت رو وارد کن", en: "Enter your name" },
  needCode: { fa: "کد اتاق رو وارد کن", en: "Enter a room code" },
  enterName: { fa: "اول اسم خودت رو وارد کن", en: "Please enter your name first" },
  langWords: { fa: "زبان کلمات", en: "Words language" },
  fa: { fa: "فارسی", en: "Persian" },
  en: { fa: "انگلیسی", en: "English" },
  both: { fa: "هر دو", en: "Both" },
  maker: { fa: "ساخته شده با ❤ — مهمان وارد شو، بدون نیاز به ثبت‌نام", en: "Made with ❤ — Play as guest, no signup needed" },
  create: { fa: "ساخت اتاق", en: "Create room" },
  numPlayers: { fa: "تعداد بازیکن", en: "Max players" },
  numRounds: { fa: "تعداد دور (تا ۲۵)", en: "Rounds (up to 25)" },
  roundTime: { fa: "زمان هر دور (ثانیه، تا ۲۰۰)", en: "Round time (seconds, up to 200)" },
  chooseTime: { fa: "زمان انتخاب کلمه (ثانیه)", en: "Word selection time (seconds)" },
  customWords: { fa: "کلمات سفارشی (تا ۴۰۰، با خط جدید یا کاما)", en: "Custom words (up to 400, comma or newline)" },
  useCustomOnly: { fa: "فقط کلمات من", en: "Only my custom words" },
  publicRoom: { fa: "اتاق عمومی (در لابی نمایش بده)", en: "Public room (show in lobby)" }
};
function t(key, lang) {
  return DICT[key][lang];
}
let ctx = null;
let muted = false;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
    } catch {
      return null;
    }
  }
  return ctx;
}
function setMuted(v) {
  muted = v;
  if (typeof window !== "undefined") localStorage.setItem("draw_muted", v ? "1" : "0");
}
function isMuted() {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("draw_muted") === "1") muted = true;
  return muted;
}
function tone(freq, dur = 0.12, type = "sine", gain = 0.15) {
  if (isMuted()) return;
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume().catch(() => {
  });
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(gain, c.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + dur);
  osc.connect(g);
  g.connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + dur + 0.02);
}
function sequence(notes, type = "sine", gain = 0.15) {
  let t2 = 0;
  notes.forEach(([f, d]) => {
    setTimeout(() => tone(f, d, type, gain), t2 * 1e3);
    t2 += d;
  });
}
const sfx = {
  click: () => tone(620, 0.05, "square", 0.08),
  join: () => sequence([[523, 0.08], [784, 0.12]], "triangle", 0.12),
  leave: () => sequence([[523, 0.08], [392, 0.12]], "triangle", 0.1),
  correct: () => sequence([[523, 0.08], [659, 0.08], [784, 0.15]], "triangle", 0.14),
  close: () => tone(440, 0.08, "sine", 0.1),
  yourTurn: () => sequence([[698, 0.1], [880, 0.18]], "sine", 0.16),
  tick: () => tone(900, 0.05, "square", 0.05),
  roundEnd: () => sequence([[523, 0.12], [392, 0.18]], "sine", 0.14),
  gameEnd: () => sequence([[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.25]], "triangle", 0.16),
  message: () => tone(560, 0.04, "sine", 0.06)
};
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "نقاشک — بازی حدس نقاشی آنلاین" },
      { name: "description", content: "بازی نقاشی حدس بزن چندنفره با دوستان به صورت آنلاین." }
    ]
  }),
  component: Lobby
});
function AdSlot({ orientation, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "aside",
    {
      "data-ad-slot": true,
      className: `flex items-center justify-center text-xs text-muted-foreground bg-muted/30 border border-dashed border-border rounded-lg ${orientation === "v" ? "min-h-[500px] w-full" : "min-h-[90px] w-full"}`,
      children: label ?? "تبلیغات"
    }
  );
}
function langLabel(code, lang) {
  if (code === "fa") return t("fa", lang);
  if (code === "en") return t("en", lang);
  return t("both", lang);
}
function Lobby() {
  const [lang, setUiLang] = useLang();
  const { loading: authLoading, userId } = useGuestSession();
  const navigate = useNavigate();
  const [profile, setProfile] = reactExports.useState(() => loadProfile());
  const [joinCode, setJoinCode] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(1);
  const [muted2, setMutedState] = reactExports.useState(() => isMuted());
  const createRoomFn = useServerFn(createRoom);
  const joinRoomFn = useServerFn(joinRoom);
  const listPublicFn = useServerFn(listPublicRooms);
  const publicRooms = useQuery({
    queryKey: ["public-rooms", page],
    queryFn: () => listPublicFn({ data: { page, pageSize: 12 } }),
    refetchInterval: 5e3,
    enabled: !!userId
  });
  const totalPages = Math.max(1, Math.ceil((publicRooms.data?.total ?? 0) / 12));
  reactExports.useEffect(() => {
    saveProfile(profile);
  }, [profile]);
  const ready = !authLoading && !!userId;
  const handleQuickPlay = async () => {
    if (!profile.nickname.trim()) {
      toast.error(t("needName", lang));
      return;
    }
    setBusy("create");
    sfx.click();
    try {
      const r = await createRoomFn({
        data: {
          nickname: profile.nickname,
          avatarColor: profile.avatarColor,
          isPublic: true,
          maxPlayers: 8,
          totalRounds: 3,
          roundSeconds: 80,
          chooseSeconds: 15,
          language: "fa",
          useCustomOnly: false,
          customWords: []
        }
      });
      navigate({ to: "/room/$code", params: { code: r.code } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خطا");
    } finally {
      setBusy(null);
    }
  };
  const handleJoin = async (code) => {
    if (!profile.nickname.trim()) {
      toast.error(t("needName", lang));
      return;
    }
    if (!code.trim()) {
      toast.error(t("needCode", lang));
      return;
    }
    setBusy("join");
    sfx.click();
    try {
      const r = await joinRoomFn({
        data: { code: code.toUpperCase(), nickname: profile.nickname, avatarColor: profile.avatarColor }
      });
      navigate({ to: "/room/$code", params: { code: r.code } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خطا در ورود");
    } finally {
      setBusy(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen px-3 py-6 md:py-10", dir: lang === "fa" ? "rtl" : "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center", dir: lang === "fa" ? "rtl" : "ltr" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl flex items-center justify-end gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => {
        const nm = !muted2;
        setMuted(nm);
        setMutedState(nm);
      }, children: muted2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
        setUiLang(lang === "fa" ? "en" : "fa");
        sfx.click();
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "size-4" }),
        " ",
        lang === "fa" ? "EN" : "فا"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl grid gap-4 lg:grid-cols-[160px_1fr_160px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdSlot, { orientation: "v" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-accent/40 px-4 py-1.5 text-sm font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }),
            " ",
            t("tagline", lang)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl md:text-7xl font-black tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "scribble-underline", children: t("title", lang) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-xl mx-auto", children: t("subtitle", lang) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdSlot, { orientation: "h" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-6 md:p-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-[1fr_auto] md:items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nickname", className: "text-base", children: t("nickname", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "nickname",
                  placeholder: t("nicknamePh", lang),
                  maxLength: 20,
                  value: profile.nickname,
                  onChange: (e) => setProfile({ ...profile, nickname: e.target.value }),
                  className: "text-lg h-12"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-base flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "size-4" }),
                " ",
                t("color", lang)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: AVATAR_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  "aria-label": `color ${c}`,
                  onClick: () => setProfile({ ...profile, avatarColor: c }),
                  className: `size-9 rounded-full border-2 transition-transform ${profile.avatarColor === c ? "border-foreground scale-110" : "border-transparent hover:scale-105"}`,
                  style: { backgroundColor: c }
                },
                c
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", onClick: handleQuickPlay, disabled: !ready || busy !== null, className: "h-14 text-base", children: busy === "create" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-5" }),
              " ",
              t("quickPlay", lang)
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CreateCustomDialog,
              {
                profile,
                disabled: !ready || busy !== null,
                lang,
                onCreated: (code) => navigate({ to: "/room/$code", params: { code } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: t("roomCode", lang),
                  value: joinCode,
                  onChange: (e) => setJoinCode(e.target.value.toUpperCase()),
                  maxLength: 6,
                  className: "h-14 text-lg tracking-widest uppercase text-center font-bold"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "secondary", onClick: () => handleJoin(joinCode), disabled: !ready || busy !== null, className: "h-14 px-5", children: busy === "join" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "size-5" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-5" }),
              " ",
              t("publicRooms", lang)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", disabled: page <= 1, onClick: () => setPage((p) => Math.max(1, p - 1)), children: [
                lang === "fa" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4" }),
                " ",
                t("prev", lang)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                page,
                "/",
                totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", disabled: page >= totalPages, onClick: () => setPage((p) => p + 1), children: [
                t("next", lang),
                " ",
                lang === "fa" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4" })
              ] })
            ] })
          ] }),
          publicRooms.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t("loading", lang) }) : (publicRooms.data?.rooms.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "paper-card p-8 text-center text-muted-foreground", children: t("noPublic", lang) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: publicRooms.data.rooms.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg tracking-widest", children: r.code }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                r.playerCount,
                "/",
                r.max_players,
                " ",
                t("players", lang),
                " · ",
                r.total_rounds,
                " ",
                t("rounds", lang),
                " · ",
                r.round_seconds,
                lang === "fa" ? "ث" : "s"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.status === "waiting" ? t("waiting", lang) : t("playing", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-1.5 py-0.5 rounded bg-accent/40 text-[10px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "size-3 inline" }),
                  " ",
                  langLabel(r.language, lang)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => handleJoin(r.code), disabled: !ready || busy !== null, children: t("enter", lang) })
          ] }, r.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "text-center text-xs text-muted-foreground pt-4", children: t("maker", lang) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdSlot, { orientation: "v" }) })
    ] })
  ] });
}
function CreateCustomDialog({
  profile,
  disabled,
  onCreated,
  lang
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [isPublic, setIsPublic] = reactExports.useState(false);
  const [maxPlayers, setMaxPlayers] = reactExports.useState("8");
  const [totalRounds, setTotalRounds] = reactExports.useState("3");
  const [roundSeconds, setRoundSeconds] = reactExports.useState("80");
  const [chooseSeconds, setChooseSeconds] = reactExports.useState("15");
  const [language, setLanguage] = reactExports.useState("fa");
  const [useCustomOnly, setUseCustomOnly] = reactExports.useState(false);
  const [wordsText, setWordsText] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const createRoomFn = useServerFn(createRoom);
  const captcha = reactExports.useMemo(() => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    return { a, b, answer: a + b };
  }, [open]);
  const [captchaInput, setCaptchaInput] = reactExports.useState("");
  const submit = async () => {
    if (!profile.nickname.trim()) {
      toast.error(t("needName", lang));
      return;
    }
    if (Number(captchaInput) !== captcha.answer) {
      toast.error(t("captchaWrong", lang));
      return;
    }
    const customWords = wordsText.split(/[\n,،]/).map((s) => s.trim()).filter(Boolean).slice(0, 400);
    if (useCustomOnly && customWords.length < 3) {
      toast.error(lang === "fa" ? "حداقل ۳ کلمه سفارشی وارد کن" : "At least 3 custom words");
      return;
    }
    setSubmitting(true);
    try {
      const r = await createRoomFn({
        data: {
          nickname: profile.nickname,
          avatarColor: profile.avatarColor,
          isPublic,
          maxPlayers: Math.max(2, Math.min(12, Number(maxPlayers) || 8)),
          totalRounds: Math.max(1, Math.min(25, Number(totalRounds) || 3)),
          roundSeconds: Math.max(30, Math.min(200, Number(roundSeconds) || 80)),
          chooseSeconds: Math.max(5, Math.min(30, Number(chooseSeconds) || 15)),
          language,
          useCustomOnly,
          customWords
        }
      });
      setOpen(false);
      onCreated(r.code);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خطا");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "outline", disabled, className: "h-14 text-base border-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-5" }),
      " ",
      t("customRoom", lang)
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg max-h-[90vh] overflow-y-auto", dir: lang === "fa" ? "rtl" : "ltr", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl", children: t("create", lang) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("numPlayers", lang), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 2,
              max: 12,
              value: maxPlayers,
              onChange: (e) => setMaxPlayers(e.target.value),
              onBlur: () => setMaxPlayers(String(Math.max(2, Math.min(12, Number(maxPlayers) || 8)))),
              className: "select-base"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("numRounds", lang), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 1,
              max: 25,
              value: totalRounds,
              onChange: (e) => setTotalRounds(e.target.value),
              onBlur: () => setTotalRounds(String(Math.max(1, Math.min(25, Number(totalRounds) || 3)))),
              className: "select-base"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("roundTime", lang), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 30,
              max: 200,
              step: 5,
              value: roundSeconds,
              onChange: (e) => setRoundSeconds(e.target.value),
              onBlur: () => setRoundSeconds(String(Math.max(30, Math.min(200, Number(roundSeconds) || 80)))),
              className: "select-base"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("chooseTime", lang), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 5,
              max: 30,
              value: chooseSeconds,
              onChange: (e) => setChooseSeconds(e.target.value),
              onBlur: () => setChooseSeconds(String(Math.max(5, Math.min(30, Number(chooseSeconds) || 15)))),
              className: "select-base"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: t("langWords", lang), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: language, onChange: (e) => setLanguage(e.target.value), className: "select-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fa", children: t("fa", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "en", children: t("en", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "both", children: t("both", lang) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: isPublic, onChange: (e) => setIsPublic(e.target.checked), className: "size-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("publicRoom", lang) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("customWords", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://chat.deepseek.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-xs text-primary hover:underline flex items-center gap-1 font-medium animate-pulse",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lang === "fa" ? "ایده گرفتن با هوش مصنوعی DeepSeek" : "Get ideas with DeepSeek AI" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: wordsText,
              onChange: (e) => setWordsText(e.target.value),
              rows: 4,
              placeholder: lang === "fa" ? "مثال: گربه، خانه، آفتاب" : "e.g. cat, house, sun",
              className: "w-full rounded-md border bg-input/30 p-3 text-base"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: useCustomOnly, onChange: (e) => setUseCustomOnly(e.target.checked), className: "size-4" }),
            t("useCustomOnly", lang)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-3 rounded-md bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            t("captcha", lang),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold", children: [
              captcha.a,
              " + ",
              captcha.b,
              " = ?"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: captchaInput, onChange: (e) => setCaptchaInput(e.target.value), placeholder: "?", className: "h-10" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: submitting, className: "w-full h-12 text-base", children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin" }) : t("create", lang) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .select-base {
          width: 100%; height: 2.5rem; border-radius: 0.5rem;
          border: 1px solid var(--color-border); background: var(--color-input);
          padding: 0 0.75rem; font-size: 1rem;
        }
      ` })
  ] });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: label }),
    children
  ] });
}
function useRoom(code, userId) {
  const [room, setRoom] = reactExports.useState(null);
  const [players, setPlayers] = reactExports.useState([]);
  const [messages, setMessages] = reactExports.useState([]);
  const [myWord, setMyWord] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [notFound, setNotFound] = reactExports.useState(false);
  const roomIdRef = reactExports.useRef(null);
  const refetchAll = reactExports.useCallback(async (rid) => {
    const [r, p, m] = await Promise.all([
      supabase.from("rooms").select("*").eq("id", rid).maybeSingle(),
      supabase.from("room_players").select("*").eq("room_id", rid).order("joined_at"),
      supabase.from("room_messages").select("*").eq("room_id", rid).order("created_at", { ascending: false }).limit(50)
    ]);
    if (r.data) setRoom(r.data);
    setPlayers(p.data ?? []);
    setMessages((m.data ?? []).reverse());
  }, []);
  const refetchRoom = reactExports.useCallback(async () => {
    if (!roomIdRef.current) return;
    const { data } = await supabase.from("rooms").select("*").eq("id", roomIdRef.current).maybeSingle();
    if (data) setRoom(data);
  }, []);
  const refetchSecret = reactExports.useCallback(async (rid) => {
    const { data } = await supabase.from("room_secrets").select("current_word").eq("room_id", rid).maybeSingle();
    setMyWord(data?.current_word ?? null);
  }, []);
  reactExports.useEffect(() => {
    if (!userId || !code) return;
    let alive = true;
    let channel = null;
    const init = async () => {
      const { data: r } = await supabase.from("rooms").select("*").eq("code", code.toUpperCase()).maybeSingle();
      if (!alive) return;
      if (!r) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      roomIdRef.current = r.id;
      setRoom(r);
      await refetchAll(r.id);
      await refetchSecret(r.id);
      setLoading(false);
      channel = supabase.channel(`room:${r.id}`).on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms", filter: `id=eq.${r.id}` },
        (payload) => {
          if (payload.eventType === "DELETE") {
            setNotFound(true);
            return;
          }
          const newRoom = payload.new;
          setRoom(newRoom);
          refetchSecret(r.id);
        }
      ).on(
        "postgres_changes",
        { event: "*", schema: "public", table: "room_players", filter: `room_id=eq.${r.id}` },
        () => {
          void refetchPlayers(r.id);
        }
      ).on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "room_messages", filter: `room_id=eq.${r.id}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new].slice(-50));
        }
      ).on(
        "postgres_changes",
        { event: "*", schema: "public", table: "room_secrets", filter: `room_id=eq.${r.id}` },
        () => {
          refetchSecret(r.id);
        }
      ).subscribe();
    };
    const refetchPlayers = async (rid) => {
      const { data } = await supabase.from("room_players").select("*").eq("room_id", rid).order("joined_at");
      if (alive) setPlayers(data ?? []);
    };
    init();
    return () => {
      alive = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, [code, userId, refetchAll, refetchSecret]);
  return { room, players, messages, myWord, loading, notFound, roomId: roomIdRef.current, refetchRoom };
}
const PALETTE = [
  "#000000",
  "#7F7F7F",
  "#C1C1C1",
  "#FFFFFF",
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#EAB308",
  "#22C55E",
  "#10B981",
  "#06B6D4",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#A0522D"
];
const SIZES = [4, 8, 14, 22, 32];
const CANVAS_W = 900;
const CANVAS_H = 600;
function useDrawingCanvas(opts) {
  const canvasRef = reactExports.useRef(null);
  const ctxRef = reactExports.useRef(null);
  const historyRef = reactExports.useRef([]);
  const channelRef = reactExports.useRef(null);
  const drawingRef = reactExports.useRef(false);
  const currentStrokeRef = reactExports.useRef([]);
  const [color, setColor] = reactExports.useState("#000000");
  const [size, setSize] = reactExports.useState(8);
  const [tool, setTool] = reactExports.useState("brush");
  const setupCtx = reactExports.useCallback(() => {
    const c = canvasRef.current;
    if (!c) return null;
    const ctx2 = c.getContext("2d", { willReadFrequently: true });
    if (!ctx2) return null;
    ctxRef.current = ctx2;
    return ctx2;
  }, []);
  const pushHistory = reactExports.useCallback(() => {
    const ctx2 = ctxRef.current;
    if (!ctx2) return;
    historyRef.current.push(ctx2.getImageData(0, 0, CANVAS_W, CANVAS_H));
    if (historyRef.current.length > 30) historyRef.current.shift();
  }, []);
  const clearCanvas = reactExports.useCallback(() => {
    const ctx2 = ctxRef.current;
    if (!ctx2) return;
    ctx2.fillStyle = "#FFFFFF";
    ctx2.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }, []);
  const drawStroke = reactExports.useCallback((ev) => {
    const ctx2 = ctxRef.current;
    if (!ctx2 || ev.points.length === 0) return;
    ctx2.strokeStyle = ev.tool === "eraser" ? "#FFFFFF" : ev.color;
    ctx2.fillStyle = ctx2.strokeStyle;
    ctx2.lineWidth = ev.size;
    ctx2.lineCap = "round";
    ctx2.lineJoin = "round";
    if (ev.points.length === 1) {
      const p = ev.points[0];
      ctx2.beginPath();
      ctx2.arc(p.x, p.y, ev.size / 2, 0, Math.PI * 2);
      ctx2.fill();
      return;
    }
    ctx2.beginPath();
    ctx2.moveTo(ev.points[0].x, ev.points[0].y);
    for (let i = 1; i < ev.points.length; i++) {
      ctx2.lineTo(ev.points[i].x, ev.points[i].y);
    }
    ctx2.stroke();
  }, []);
  const floodFill = reactExports.useCallback((sx, sy, hex) => {
    const ctx2 = ctxRef.current;
    if (!ctx2) return;
    const ix = Math.floor(sx);
    const iy = Math.floor(sy);
    if (ix < 0 || iy < 0 || ix >= CANVAS_W || iy >= CANVAS_H) return;
    const img = ctx2.getImageData(0, 0, CANVAS_W, CANVAS_H);
    const data = img.data;
    const target = getPixel(data, ix, iy);
    const replace = hexToRgba(hex);
    if (colorsEqual(target, replace)) return;
    const stack = [[ix, iy]];
    while (stack.length) {
      const [x0, y] = stack.pop();
      let xL = x0;
      while (xL >= 0 && colorsEqual(getPixel(data, xL, y), target)) xL--;
      let xR = x0;
      while (xR < CANVAS_W && colorsEqual(getPixel(data, xR, y), target)) xR++;
      for (let x = xL + 1; x < xR; x++) {
        setPixel(data, x, y, replace);
        if (y > 0 && colorsEqual(getPixel(data, x, y - 1), target)) stack.push([x, y - 1]);
        if (y < CANVAS_H - 1 && colorsEqual(getPixel(data, x, y + 1), target)) stack.push([x, y + 1]);
      }
    }
    ctx2.putImageData(img, 0, 0);
  }, []);
  const applyEvent = reactExports.useCallback((ev) => {
    if (ev.type === "stroke") drawStroke(ev);
    else if (ev.type === "clear") clearCanvas();
    else if (ev.type === "fill") floodFill(ev.x, ev.y, ev.color);
    else if (ev.type === "undo") {
      const prev = historyRef.current.pop();
      const ctx2 = ctxRef.current;
      if (prev && ctx2) ctx2.putImageData(prev, 0, 0);
    }
  }, [drawStroke, clearCanvas, floodFill]);
  reactExports.useEffect(() => {
    const ctx2 = setupCtx();
    if (!ctx2) return;
    clearCanvas();
  }, [setupCtx, clearCanvas]);
  reactExports.useEffect(() => {
    if (!opts.roomId) return;
    const ch = supabase.channel(`draw:${opts.roomId}`, { config: { broadcast: { self: false } } }).on("broadcast", { event: "draw" }, (msg) => {
      const ev = msg.payload;
      applyEvent(ev);
    }).on("broadcast", { event: "request_snapshot" }, () => {
      if (!opts.canDraw) return;
      const c = canvasRef.current;
      if (!c) return;
      const dataUrl = c.toDataURL("image/png", 0.6);
      ch.send({ type: "broadcast", event: "snapshot", payload: { dataUrl } });
    }).on("broadcast", { event: "snapshot" }, (msg) => {
      if (opts.canDraw) return;
      const { dataUrl } = msg.payload;
      const img = new Image();
      img.onload = () => {
        const ctx2 = ctxRef.current;
        if (ctx2) ctx2.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);
      };
      img.src = dataUrl;
    }).subscribe((status) => {
      if (status === "SUBSCRIBED" && !opts.canDraw) {
        ch.send({ type: "broadcast", event: "request_snapshot", payload: {} });
      }
    });
    channelRef.current = ch;
    return () => {
      supabase.removeChannel(ch);
      channelRef.current = null;
    };
  }, [opts.roomId, opts.canDraw, applyEvent]);
  const sendEvent = reactExports.useCallback((ev) => {
    const ch = channelRef.current;
    if (!ch) return;
    ch.send({ type: "broadcast", event: "draw", payload: ev });
  }, []);
  const onPointerDown = reactExports.useCallback((e) => {
    if (!opts.canDraw) return;
    const c = canvasRef.current;
    if (!c) return;
    c.setPointerCapture(e.pointerId);
    const rect = c.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * CANVAS_W;
    const y = (e.clientY - rect.top) / rect.height * CANVAS_H;
    if (tool === "fill") {
      pushHistory();
      const ev2 = { type: "fill", x, y, color };
      applyEvent(ev2);
      sendEvent(ev2);
      return;
    }
    pushHistory();
    drawingRef.current = true;
    currentStrokeRef.current = [{ x, y }];
    const ev = { type: "stroke", color, size, tool: tool === "eraser" ? "eraser" : "brush", points: [{ x, y }] };
    applyEvent(ev);
    sendEvent(ev);
  }, [opts.canDraw, tool, color, size, applyEvent, sendEvent, pushHistory]);
  const onPointerMove = reactExports.useCallback((e) => {
    if (!opts.canDraw || !drawingRef.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * CANVAS_W;
    const y = (e.clientY - rect.top) / rect.height * CANVAS_H;
    const last = currentStrokeRef.current[currentStrokeRef.current.length - 1];
    if (Math.hypot(last.x - x, last.y - y) < 1.5) return;
    currentStrokeRef.current.push({ x, y });
    const seg = {
      type: "stroke",
      color,
      size,
      tool: tool === "eraser" ? "eraser" : "brush",
      points: [last, { x, y }]
    };
    applyEvent(seg);
    sendEvent(seg);
  }, [opts.canDraw, color, size, tool, applyEvent, sendEvent]);
  const onPointerUp = reactExports.useCallback(() => {
    drawingRef.current = false;
    currentStrokeRef.current = [];
  }, []);
  const undo = reactExports.useCallback(() => {
    if (!opts.canDraw) return;
    const prev = historyRef.current.pop();
    const ctx2 = ctxRef.current;
    if (prev && ctx2) ctx2.putImageData(prev, 0, 0);
    sendEvent({ type: "undo" });
  }, [opts.canDraw, sendEvent]);
  const clearAll = reactExports.useCallback(() => {
    if (!opts.canDraw) return;
    pushHistory();
    clearCanvas();
    sendEvent({ type: "clear" });
  }, [opts.canDraw, clearCanvas, sendEvent, pushHistory]);
  return {
    canvasRef,
    color,
    setColor,
    size,
    setSize,
    tool,
    setTool,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    undo,
    clearAll,
    canvasWidth: CANVAS_W,
    canvasHeight: CANVAS_H
  };
}
function getPixel(data, x, y) {
  const i = (y * CANVAS_W + x) * 4;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
}
function setPixel(data, x, y, c) {
  const i = (y * CANVAS_W + x) * 4;
  data[i] = c[0];
  data[i + 1] = c[1];
  data[i + 2] = c[2];
  data[i + 3] = c[3];
}
function colorsEqual(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function hexToRgba(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return [r, g, b, 255];
}
const Route = createFileRoute("/room/$code")({
  head: ({ params }) => ({
    meta: [
      { title: `اتاق ${params.code} — نقاشک` },
      { name: "description", content: "بازی نقاشی آنلاین" }
    ]
  }),
  component: RoomPage
});
function RoomPage() {
  const { code } = Route.useParams();
  const navigate = useNavigate();
  const { userId, loading: authLoading } = useGuestSession();
  const { room, players, messages, myWord, loading, notFound, roomId, refetchRoom } = useRoom(code, userId);
  const [profile, setProfile] = reactExports.useState(() => loadProfile());
  const joinRoomFn = useServerFn(joinRoom);
  const leaveRoomFn = useServerFn(leaveRoom);
  const startGameFn = useServerFn(startGame);
  const [joining, setJoining] = reactExports.useState(false);
  const [hasJoined, setHasJoined] = reactExports.useState(false);
  const cleanupRef = reactExports.useRef({ roomId, userId, players, leaveRoomFn });
  reactExports.useEffect(() => {
    cleanupRef.current = { roomId, userId, players, leaveRoomFn };
  });
  reactExports.useEffect(() => {
    const handleUnload = () => {
      const { roomId: roomId2, userId: userId2, players: players2, leaveRoomFn: leaveRoomFn2 } = cleanupRef.current;
      if (roomId2 && userId2 && players2.some((p) => p.user_id === userId2)) {
        leaveRoomFn2({ data: { roomId: roomId2 } }).catch(() => {
        });
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      handleUnload();
    };
  }, []);
  reactExports.useEffect(() => {
    if (!loading && players.length > 0 && userId) {
      const me2 = players.find((p) => p.user_id === userId);
      if (me2) {
        setHasJoined(true);
      } else if (hasJoined) {
        sessionStorage.setItem(`kicked_${code}`, "true");
        toast.error("شما از اتاق اخراج شدید");
        navigate({ to: "/" });
      }
    }
  }, [players, loading, userId, hasJoined, code, navigate]);
  reactExports.useEffect(() => {
    if (!userId || !room || loading) return;
    if (!profile.nickname) return;
    const me2 = players.find((p) => p.user_id === userId);
    if (me2) return;
    if (joining) return;
    if (hasJoined) return;
    if (sessionStorage.getItem(`kicked_${code}`)) {
      toast.error("شما از این اتاق اخراج شده‌اید");
      navigate({ to: "/" });
      return;
    }
    setJoining(true);
    joinRoomFn({ data: { code, nickname: profile.nickname, avatarColor: profile.avatarColor } }).catch((e) => {
      toast.error(e instanceof Error ? e.message : "خطا");
      navigate({ to: "/" });
    }).finally(() => setJoining(false));
  }, [userId, room, players, loading, joining, code, profile, navigate, joinRoomFn, hasJoined]);
  if (authLoading || loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CenterLoading, { text: "در حال آماده‌سازی..." });
  }
  if (!profile.nickname) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center p-4 bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center", dir: "rtl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        JoinFormOverlay,
        {
          code,
          onJoin: (name, color) => {
            const newProfile = { nickname: name, avatarColor: color };
            saveProfile(newProfile);
            setProfile(newProfile);
          }
        }
      )
    ] });
  }
  if (notFound) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-8 text-center space-y-4 max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "اتاق پیدا نشد" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "شاید کد اشتباه است یا اتاق بسته شده." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({ to: "/" }), children: "برگشت به خانه" })
    ] }) });
  }
  if (!room || !roomId || !userId) return /* @__PURE__ */ jsxRuntimeExports.jsx(CenterLoading, { text: "..." });
  const me = players.find((p) => p.user_id === userId);
  const isHost = room.host_id === userId;
  const isDrawer = room.current_drawer_id === userId;
  const drawer = players.find((p) => p.user_id === room.current_drawer_id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen p-3 md:p-5", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center", dir: "rtl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TopBar,
        {
          code,
          status: room.status,
          round: room.current_round,
          totalRounds: room.total_rounds,
          isHost,
          onLeave: async () => {
            await leaveRoomFn({ data: { roomId } }).catch(() => {
            });
            navigate({ to: "/" });
          }
        }
      ),
      room.status === "waiting" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        WaitingRoom,
        {
          room,
          players,
          userId,
          isHost,
          roomId,
          refetchRoom,
          onStart: async () => {
            try {
              await startGameFn({ data: { roomId } });
              await refetchRoom();
            } catch (e) {
              toast.error(e instanceof Error ? e.message : "خطا");
            }
          }
        }
      ),
      room.status !== "waiting" && me && /* @__PURE__ */ jsxRuntimeExports.jsx(
        GameView,
        {
          room,
          players,
          messages,
          userId,
          isDrawer,
          isHost,
          roomId,
          myWord,
          drawerName: drawer?.nickname ?? "—",
          drawerColor: drawer?.avatar_color ?? "#888",
          refetchRoom
        }
      )
    ] })
  ] });
}
function CenterLoading({ text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-8 animate-spin text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: text })
  ] });
}
function TopBar({
  code,
  status,
  round,
  totalRounds,
  isHost,
  onLeave
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const share = () => {
    const url = `${window.location.origin}/room/${code}`;
    if (navigator.share) navigator.share({ title: "نقاشک", text: `بیا بازی کنیم! کد: ${code}`, url }).catch(() => {
    });
    else {
      navigator.clipboard.writeText(url);
      toast.success("لینک کپی شد");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card flex flex-wrap items-center justify-between gap-3 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black text-xl", children: "نقاشک" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copy, className: "flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-sm font-mono font-bold tracking-widest hover:bg-muted/70", children: [
        code,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3.5" })
      ] }),
      copied && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-success", children: "کپی شد" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: share, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "size-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      status !== "waiting" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold", children: [
        "دور ",
        round,
        "/",
        totalRounds
      ] }),
      isHost && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-accent/40 px-2 py-1 rounded-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "size-3 inline" }),
        " میزبان"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: onLeave, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
        " خروج"
      ] })
    ] })
  ] });
}
function WaitingRoom({
  room,
  players,
  userId,
  isHost,
  roomId,
  onStart,
  refetchRoom
}) {
  const updateFn = useServerFn(updateRoomSettings);
  const [saving, setSaving] = reactExports.useState(false);
  const [wordsText, setWordsText] = reactExports.useState((room?.custom_words ?? []).join("\n"));
  const update = async (patch) => {
    setSaving(true);
    try {
      await updateFn({ data: { roomId, ...patch } });
      await refetchRoom();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خطا");
    } finally {
      setSaving(false);
    }
  };
  if (!room) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_320px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "size-5" }),
          " تنظیمات اتاق"
        ] }),
        !isHost && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "فقط میزبان می‌تواند تنظیمات را تغییر دهد." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingNumber,
          {
            label: "تعداد بازیکن (2–12)",
            value: room.max_players,
            min: 2,
            max: 12,
            disabled: !isHost || saving,
            onChange: (v) => update({ maxPlayers: v })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingNumber,
          {
            label: "تعداد دور (1–25)",
            value: room.total_rounds,
            min: 1,
            max: 25,
            disabled: !isHost || saving,
            onChange: (v) => update({ totalRounds: v })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingNumber,
          {
            label: "زمان هر دور — ثانیه (30–200)",
            value: room.round_seconds,
            min: 30,
            max: 200,
            step: 5,
            disabled: !isHost || saving,
            onChange: (v) => update({ roundSeconds: v })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingNumber,
          {
            label: "زمان انتخاب کلمه — ثانیه (5–30)",
            value: room.choose_seconds ?? 15,
            min: 5,
            max: 30,
            disabled: !isHost || saving,
            onChange: (v) => update({ chooseSeconds: v })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingSelect,
          {
            label: "زبان",
            value: room.language,
            options: [["fa", "فارسی"], ["en", "انگلیسی"], ["both", "هر دو"]],
            disabled: !isHost || saving,
            onChange: (v) => update({ language: v })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: room.is_public,
              disabled: !isHost || saving,
              onChange: (e) => update({ isPublic: e.target.checked }),
              className: "size-4"
            }
          ),
          "اتاق عمومی (در لابی نمایش داده شود)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: room.use_custom_only,
              disabled: !isHost || saving,
              onChange: (e) => update({ useCustomOnly: e.target.checked }),
              className: "size-4"
            }
          ),
          "فقط از کلمات سفارشی من استفاده کن"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold", children: "کلمات سفارشی (با خط جدید یا کاما)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "https://chat.deepseek.com",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-xs text-primary hover:underline flex items-center gap-1 font-medium animate-pulse",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ایده گرفتن با هوش مصنوعی DeepSeek" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: wordsText,
            disabled: !isHost || saving,
            onChange: (e) => setWordsText(e.target.value),
            onBlur: () => {
              if (!isHost) return;
              const arr = wordsText.split(/[\n,،]/).map((s) => s.trim()).filter(Boolean).slice(0, 200);
              update({ customWords: arr });
            },
            rows: 5,
            placeholder: "مثال: گربه، خانه، آفتاب",
            className: "w-full rounded-md border bg-input/30 p-3 text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          (room.custom_words ?? []).length,
          " کلمه سفارشی ذخیره شده"
        ] })
      ] }),
      isHost ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onStart, disabled: players.length < 2 || saving, size: "lg", className: "w-full h-14 text-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-5" }),
        players.length < 2 ? "حداقل ۲ بازیکن لازم است" : saving ? "در حال ذخیره..." : "شروع بازی"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-4 rounded-md bg-muted text-muted-foreground", children: "منتظر شروع بازی توسط میزبان..." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" }),
        " بازیکنان (",
        players.length,
        "/",
        room.max_players,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: players.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-2 rounded-md bg-muted/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-full flex items-center justify-center text-white font-bold", style: { backgroundColor: p.avatar_color }, children: p.nickname.slice(0, 1).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium flex-1", children: p.nickname }),
        p.user_id === room.host_id && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "size-4 text-warning" }),
        p.user_id === userId && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "(تو)" })
      ] }, p.id)) })
    ] })
  ] });
}
function SettingSelect({
  label,
  value,
  options,
  disabled,
  onChange
}) {
  const opts = options.map(
    (o) => Array.isArray(o) ? o : [o, String(o)]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "select",
      {
        value: String(value),
        disabled,
        onChange: (e) => {
          const v = typeof opts[0][0] === "number" ? Number(e.target.value) : e.target.value;
          onChange(v);
        },
        className: "w-full h-10 rounded-md border bg-input/30 px-3 text-sm disabled:opacity-50",
        children: opts.map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(v), children: l }, String(v)))
      }
    )
  ] });
}
function SettingNumber({
  label,
  value,
  min,
  max,
  step = 1,
  disabled,
  onChange
}) {
  const [tempVal, setTempVal] = reactExports.useState(String(value));
  reactExports.useEffect(() => {
    setTempVal(String(value));
  }, [value]);
  const commit = () => {
    const parsed = Number(tempVal);
    const n = Math.max(min, Math.min(max, Number.isFinite(parsed) ? parsed : min));
    setTempVal(String(n));
    onChange(n);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "number",
        min,
        max,
        step,
        value: tempVal,
        disabled,
        onChange: (e) => setTempVal(e.target.value),
        onBlur: commit,
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit();
            e.target.blur();
          }
        },
        className: "w-full h-10 rounded-md border bg-input/30 px-3 text-sm disabled:opacity-50"
      }
    )
  ] });
}
function GameView({
  room,
  players,
  messages,
  userId,
  isDrawer,
  isHost,
  roomId,
  myWord,
  drawerName,
  drawerColor,
  refetchRoom
}) {
  const chooseWordFn = useServerFn(chooseWord);
  const endRoundFn = useServerFn(endRound);
  const nextTurnFn = useServerFn(nextTurn);
  const revealFn = useServerFn(revealLetter);
  const resetFn = useServerFn(resetGame);
  const [now, setNow] = reactExports.useState(() => Date.now());
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);
  const remaining = room.round_ends_at ? Math.max(0, Math.ceil((new Date(room.round_ends_at).getTime() - now) / 1e3)) : null;
  const endTriggeredRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isDrawer || room.status !== "drawing" || !room.round_ends_at) return;
    if (remaining !== 0) return;
    const key = room.round_ends_at;
    if (endTriggeredRef.current === key) return;
    endTriggeredRef.current = key;
    endRoundFn({ data: { roomId } }).then(() => refetchRoom()).catch(() => {
    });
  }, [remaining, isDrawer, room.status, room.round_ends_at, roomId, endRoundFn, refetchRoom]);
  const autoChooseRef = reactExports.useRef(null);
  const autoChooseFn = useServerFn(autoChooseWord);
  reactExports.useEffect(() => {
    if (!isHost || room.status !== "choosing" || !room.round_ends_at) return;
    if (remaining !== 0) return;
    const key = `c-${room.round_ends_at}`;
    if (autoChooseRef.current === key) return;
    autoChooseRef.current = key;
    autoChooseFn({ data: { roomId } }).then(() => refetchRoom()).catch(() => {
    });
  }, [remaining, isHost, room.status, room.round_ends_at, roomId, autoChooseFn, refetchRoom]);
  const prevStatusRef = reactExports.useRef(room.status);
  const prevDrawerRef = reactExports.useRef(room.current_drawer_id);
  reactExports.useEffect(() => {
    const prev = prevStatusRef.current;
    if (prev !== room.status) {
      if (room.status === "drawing") sfx.yourTurn();
      else if (room.status === "round_end") sfx.roundEnd();
      else if (room.status === "game_end") sfx.gameEnd();
      prevStatusRef.current = room.status;
    }
    if (prevDrawerRef.current !== room.current_drawer_id) {
      if (room.current_drawer_id === userId) sfx.yourTurn();
      prevDrawerRef.current = room.current_drawer_id;
    }
  }, [room.status, room.current_drawer_id, userId]);
  reactExports.useEffect(() => {
    if (room.status === "drawing" && remaining !== null && remaining > 0 && remaining <= 5) sfx.tick();
  }, [remaining, room.status]);
  const revealTriggeredRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isDrawer || room.status !== "drawing" || !room.round_ends_at || !room.round_started_at) return;
    const started = new Date(room.round_started_at).getTime();
    const ends = new Date(room.round_ends_at).getTime();
    const total = (ends - started) / 1e3;
    const elapsed = (now - started) / 1e3;
    if (elapsed < total / 2) return;
    const key = `${room.current_round}-${room.current_turn}-${room.current_drawer_id}`;
    if (revealTriggeredRef.current === key) return;
    revealTriggeredRef.current = key;
    revealFn({ data: { roomId } }).catch(() => {
    });
  }, [
    isDrawer,
    room.status,
    room.round_ends_at,
    room.round_started_at,
    room.current_round,
    room.current_turn,
    room.current_drawer_id,
    now,
    roomId,
    revealFn
  ]);
  reactExports.useEffect(() => {
    if (!isHost || room.status !== "round_end") return;
    const id = setTimeout(() => {
      nextTurnFn({ data: { roomId } }).then(() => refetchRoom()).catch(() => {
      });
    }, 4500);
    return () => clearTimeout(id);
  }, [isHost, room.status, room.current_round, room.current_turn, roomId, nextTurnFn, refetchRoom]);
  const canvas = useDrawingCanvas({ roomId, canDraw: isDrawer && room.status === "drawing" });
  const drawerKey = `${room.current_drawer_id}-${room.current_round}-${room.current_turn}`;
  const lastKeyRef = reactExports.useRef(drawerKey);
  reactExports.useEffect(() => {
    if (lastKeyRef.current !== drawerKey) {
      lastKeyRef.current = drawerKey;
      const c = canvas.canvasRef.current;
      if (c) {
        const ctx2 = c.getContext("2d");
        if (ctx2) {
          ctx2.fillStyle = "#FFFFFF";
          ctx2.fillRect(0, 0, canvas.canvasWidth, canvas.canvasHeight);
        }
      }
    }
  }, [drawerKey, canvas]);
  const meScore = players.find((p) => p.user_id === userId)?.score ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[220px_1fr_300px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Scoreboard,
      {
        players,
        userId,
        drawerId: room.current_drawer_id,
        hostId: room.host_id,
        roomId
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { "data-ad-slot": true, className: "min-h-[70px] w-full flex items-center justify-center text-xs text-muted-foreground bg-muted/30 border border-dashed border-border rounded-lg", children: "تبلیغات" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-3 flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-full flex items-center justify-center text-white font-bold", style: { backgroundColor: drawerColor }, children: drawerName.slice(0, 1).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "نقاش" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold", children: [
              drawerName,
              " ",
              isDrawer && "(تو)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WordDisplay,
          {
            status: room.status,
            isDrawer,
            myWord,
            mask: room.word_mask
          }
        ),
        remaining !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1.5 font-bold text-lg ${remaining <= 10 ? "text-destructive" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-5" }),
          " ",
          remaining
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CanvasArea, { canvas, canDraw: isDrawer && room.status === "drawing" }),
        room.status === "choosing" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChoosingOverlay,
          {
            isDrawer,
            choices: room.word_choices ?? [],
            drawerName,
            remaining,
            onChoose: async (w) => {
              try {
                await chooseWordFn({ data: { roomId, word: w } });
                await refetchRoom();
              } catch (e) {
                toast.error(e instanceof Error ? e.message : "خطا");
              }
            }
          }
        ),
        room.status === "round_end" && /* @__PURE__ */ jsxRuntimeExports.jsx(RoundEndOverlay, { players, word: room.word_mask ?? "" }),
        room.status === "game_end" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          GameEndOverlay,
          {
            players,
            isHost,
            onPlayAgain: async () => {
              await resetFn({ data: { roomId } }).catch(() => {
              });
            }
          }
        )
      ] }),
      isDrawer && room.status === "drawing" && /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { canvas })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChatBox,
      {
        roomId,
        messages,
        userId,
        myScore: meScore
      }
    )
  ] });
}
function WordDisplay({
  status,
  isDrawer,
  myWord,
  mask
}) {
  if (status === "choosing") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "انتخاب کلمه..." });
  if (status === "round_end") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "پایان دور" });
  if (status === "game_end") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "پایان بازی" });
  if (isDrawer && myWord) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "کلمه شما" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold tracking-wider", children: myWord })
    ] });
  }
  if (mask) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "حدس بزن" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-mono font-bold tracking-widest", children: mask })
    ] });
  }
  return null;
}
function CanvasArea({
  canvas,
  canDraw
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "paper-card overflow-hidden p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white relative", style: { aspectRatio: `${canvas.canvasWidth}/${canvas.canvasHeight}` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvas.canvasRef,
      width: canvas.canvasWidth,
      height: canvas.canvasHeight,
      onPointerDown: canvas.onPointerDown,
      onPointerMove: canvas.onPointerMove,
      onPointerUp: canvas.onPointerUp,
      onPointerCancel: canvas.onPointerUp,
      onPointerLeave: canvas.onPointerUp,
      className: "w-full h-full touch-none",
      style: { cursor: canDraw ? "crosshair" : "default" }
    }
  ) }) });
}
function Toolbar({ canvas }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-3 flex items-center gap-3 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: PALETTE.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        "aria-label": c,
        onClick: () => canvas.setColor(c),
        className: `size-7 rounded-md border-2 ${canvas.color === c ? "border-foreground scale-110" : "border-transparent"}`,
        style: { backgroundColor: c }
      },
      c
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 items-center", children: SIZES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => canvas.setSize(s),
        className: `size-9 rounded-md border-2 flex items-center justify-center ${canvas.size === s ? "border-foreground bg-muted" : "border-border"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-foreground block", style: { width: s / 2 + 4, height: s / 2 + 4 } })
      },
      s
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { active: canvas.tool === "brush", onClick: () => canvas.setTool("brush"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { active: canvas.tool === "eraser", onClick: () => canvas.setTool("eraser"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { active: canvas.tool === "fill", onClick: () => canvas.setTool("fill"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaintBucket, { className: "size-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: canvas.undo, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { className: "size-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: canvas.clearAll, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
  ] });
}
function ToolBtn({ active, onClick, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick,
      className: `size-9 rounded-md border-2 flex items-center justify-center ${active ? "border-foreground bg-muted" : "border-border"}`,
      children
    }
  );
}
function Scoreboard({
  players,
  userId,
  drawerId,
  hostId,
  roomId
}) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const kickFn = useServerFn(kickPlayer);
  const iAmHost = hostId === userId;
  const doKick = async (targetUserId, nickname) => {
    if (!confirm(`اخراج ${nickname}؟`)) return;
    try {
      await kickFn({ data: { roomId, targetUserId } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خطا");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" }),
      " بازیکنان"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: sorted.map((p, i) => {
      const isDrawer = p.user_id === drawerId;
      const isMe = p.user_id === userId;
      const isHostP = p.user_id === hostId;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 p-2 rounded-md ${isDrawer ? "bg-accent/40" : "bg-muted/40"} ${p.has_guessed ? "ring-2 ring-success/40" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold w-5 text-muted-foreground", children: i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-7 rounded-full flex items-center justify-center text-white text-xs font-bold", style: { backgroundColor: p.avatar_color }, children: p.nickname.slice(0, 1).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium truncate", children: [
            p.nickname,
            isMe && " (تو)",
            isHostP && " 👑"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            p.score,
            " امتیاز"
          ] })
        ] }),
        isDrawer && /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3.5 text-primary" }),
        iAmHost && !isMe && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => doKick(p.user_id, p.nickname),
            className: "text-destructive hover:bg-destructive/10 rounded p-1",
            title: "اخراج",
            children: "✕"
          }
        )
      ] }, p.id);
    }) })
  ] });
}
function ChatBox({
  roomId,
  messages,
  userId,
  myScore
}) {
  const guessFn = useServerFn(submitGuess);
  const [text, setText] = reactExports.useState("");
  const [cooldown, setCooldown] = reactExports.useState(false);
  const scrollRef = reactExports.useRef(null);
  const lastSentRef = reactExports.useRef(0);
  const prevCountRef = reactExports.useRef(messages.length);
  reactExports.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    if (messages.length > prevCountRef.current) {
      const m = messages[messages.length - 1];
      if (m && m.user_id !== userId) {
        if (m.kind === "correct") sfx.correct();
        else if (m.kind === "close") sfx.close();
        else if (m.kind === "system") {
          if (m.content.includes("وارد شد")) sfx.join();
          else if (m.content.includes("اخراج")) sfx.leave();
        } else sfx.message();
      }
    }
    prevCountRef.current = messages.length;
  }, [messages, userId]);
  const send = async () => {
    const v = text.trim().slice(0, 150);
    if (!v) return;
    const since = Date.now() - lastSentRef.current;
    if (since < 1e3) {
      toast.error("یک ثانیه صبر کن");
      return;
    }
    lastSentRef.current = Date.now();
    setText("");
    setCooldown(true);
    setTimeout(() => setCooldown(false), 1e3);
    try {
      await guessFn({ data: { roomId, guess: v } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "خطا");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-3 flex flex-col h-[500px] lg:h-auto lg:max-h-[calc(100vh-200px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-1 pb-2 text-sm font-bold", children: [
      "چت و حدس · امتیاز شما: ",
      myScore
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "flex-1 overflow-y-auto space-y-1.5 px-1", children: messages.map((m) => {
      const mine = m.user_id === userId;
      const cls = m.kind === "system" ? "bg-muted text-center text-xs text-muted-foreground italic" : m.kind === "correct" ? "bg-success/20 text-success-foreground font-semibold" : m.kind === "close" ? "bg-warning/30" : mine ? "bg-secondary/10" : "bg-muted/40";
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-md px-2 py-1.5 text-sm break-words ${cls}`, children: m.kind === "system" || m.kind === "correct" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.content }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", style: { color: m.avatar_color }, children: [
          m.nickname,
          ": "
        ] }),
        m.kind === "close" ? "نزدیک بود!" : m.content
      ] }) }, m.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: text,
          onChange: (e) => setText(e.target.value.slice(0, 150)),
          onKeyDown: (e) => {
            if (e.key === "Enter") send();
          },
          placeholder: cooldown ? "صبر کن..." : "پیام / حدس (تا ۱۵۰ کاراکتر)",
          maxLength: 150,
          disabled: cooldown
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", onClick: send, disabled: cooldown, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground text-left mt-1 pr-1", children: [
      text.length,
      "/150"
    ] })
  ] });
}
function ChoosingOverlay({
  isDrawer,
  choices,
  drawerName,
  remaining,
  onChoose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/85 backdrop-blur-sm flex items-center justify-center rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center space-y-5 p-6", children: isDrawer ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold", children: [
      "یک کلمه انتخاب کن ",
      remaining !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base text-muted-foreground", children: [
        "(",
        remaining,
        "s)"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 justify-center", children: choices.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", onClick: () => onChoose(w), className: "h-14 px-6 text-lg", children: w }, w)) })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-10 animate-spin mx-auto text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold", children: [
      drawerName,
      " در حال انتخاب کلمه..."
    ] }),
    remaining !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
      remaining,
      "s"
    ] })
  ] }) }) });
}
function RoundEndOverlay({ players, word }) {
  const scored = [...players].filter((p) => p.round_score > 0).sort((a, b) => b.round_score - a.round_score);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-6 max-w-md w-full mx-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-center", children: "پایان دور!" }),
    word && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-lg", children: [
      "کلمه: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: word })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      scored.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground", children: "کسی حدس نزد" }),
      scored.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-muted/50 rounded-md p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 rounded-full text-white text-sm font-bold flex items-center justify-center", style: { backgroundColor: p.avatar_color }, children: p.nickname.slice(0, 1).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-medium", children: p.nickname }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-success", children: [
          "+",
          p.round_score
        ] })
      ] }, p.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "دور بعد به‌زودی..." })
  ] }) });
}
function GameEndOverlay({
  players,
  isHost,
  onPlayAgain
}) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const medals = ["🥇", "🥈", "🥉"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-6 max-w-md w-full space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-center", children: "پایان بازی!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sorted.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 rounded-md p-3 ${i === 0 ? "bg-accent/40" : "bg-muted/50"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl w-6 text-center", children: medals[i] ?? `${i + 1}.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-full text-white font-bold flex items-center justify-center", style: { backgroundColor: p.avatar_color }, children: p.nickname.slice(0, 1).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-bold", children: p.nickname }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-lg", children: p.score })
    ] }, p.id)) }),
    isHost && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onPlayAgain, size: "lg", className: "w-full h-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-5" }),
      " یه بازی دیگه"
    ] })
  ] }) });
}
function JoinFormOverlay({ code, onJoin }) {
  const [name, setName] = reactExports.useState("");
  const [color, setColor] = reactExports.useState(AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      toast.error("اسم خودت رو وارد کن");
      return;
    }
    onJoin(cleanName, color);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "paper-card p-6 md:p-8 space-y-6 max-w-md w-full", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-black", children: [
        "ورود به اتاق ",
        code
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "برای بازی کردن، یک اسم نمایشی و رنگ انتخاب کن." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "nickname", className: "text-sm font-semibold", children: "اسم نمایشی" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "nickname",
            placeholder: "مثلاً علی",
            maxLength: 20,
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "text-lg h-12 text-center font-bold"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "size-4" }),
          " رنگ آواتار"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: AVATAR_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": `color ${c}`,
            onClick: () => setColor(c),
            className: `size-9 rounded-full border-2 transition-transform ${color === c ? "border-foreground scale-110" : "border-transparent hover:scale-105"}`,
            style: { backgroundColor: c }
          },
          c
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "w-full h-12 text-base", children: "ورود به بازی" })
    ] })
  ] });
}
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const RoomCodeRoute = Route.update({
  id: "/room/$code",
  path: "/room/$code",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  RoomCodeRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
