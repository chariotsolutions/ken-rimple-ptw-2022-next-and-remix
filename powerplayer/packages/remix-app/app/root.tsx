import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";

import type { MetaFunction } from "remix";

// import a CSS reset library
import normalStyles from 'normalize.css';

// app-level settings, such as fonts etc.
import globalStyles from '~/styles/global.css';

// install tailwind css
import tailwindStyles from "./tailwind.css";

export const meta: MetaFunction = () => {
  return { title: "Remix.run PowerPlayer" };
};

export function links () {
  return [
    { rel: 'stylesheet', href: normalStyles },
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: globalStyles },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="container mx-auto">
          <h1>Power Player</h1>
          <hr/>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
