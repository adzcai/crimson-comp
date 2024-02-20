## Abstract

This project is going to more difficult than `project-vite`, but I assume you already are already experienced with React. This project is going to dive deeper into the skills you will need.

I know many of you are not familiar with Next.js. But in lieu of the workshops, I trust that all of you feel more comfortable with this material and **can debug** and **read documentation**.

**I recommend that everyone read the [reference](#reference), even if you have Next.js experience.** This is a requirement if you have only used React with Vite or create-react-app. (I promise it will be helpful!).

## Requirements

- Do not install any other packages.
- Treat this like a codebase with many collaborators, i.e. use Prettier
- Complete all TODOs: you can check where all of them are with `grep -R --exclude-dir=node_modules --exclude-dir=.next TODO`

Email me at [dseum@college.harvard.edu](mailto:dseum@college.harvard.edu) if you have any questions or concerns!

## Usage

### Setup

Install packages with `npm install`.

### Development

1. Run the dev server with `npm run dev`.
2. Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Reference

### IDE

Your IDE is your friend! VS Code has many LSP (Language Server Protocol) extensions that will provide completion and other conveniences.

ESLint is also helpful. It is a linter, which is a program to look out for common mistakes in JS and to provide style recommendations. It will catch many React lifecycle bugs automatically.

### Server Side Rendering

To explain this, you have to understand a brief timeline of the web.

1. You could only serve statically on the web, e.g. having an `index.html` hosted on a server. There was no dynamic content, in that once you uploaded the asset, it couldn't query another API to change its content. To update what the content, you had to reupload the asset.
2. Skip many many years. There was the invention of JS frameworks that made components. Components solve the issue of updating, for instance, a navigation bar across all your pages. Before, you had to manually go into every page's HTML file then copy paste the navigation bar.[^1]
3. This was the advent of SPA (Single Page Applications), where instead of having multiple HTML pages that URLs would directly navigate to, you would ship a single HTML page with JS to dynamically change the content on this single page to simulate different pages.
4. The problem with that was search engines like Google now had no way of indexing different pages of a site because an SPA was, technically, a single page. SSR was the solution.

What does SSR do? Essentially, there is a server that handles all requests. When a search engine requests a page, the server renders the content directly into HTML. I.e., SSR renders a page into HTML on request on the server before the page is sent to your browser.

This is in contrast to SPAs that do CSR (Client Side Rendering), where HTML rendering of all pages is done locally (and not before).

[^1]: Some of you might know that PHP was already a solution to this issue, but there are reasons why we need this in JS. If you want to know further, let me know.

### Next.js

The reference on [SSR](#ssr) went into the basics of SSR, but its grown into an even bigger monster. One of the problems was that SSR was expensive; on every request, the server had to render HTML content. One of the immediate solutions is to cache that rendered content so that all further requests would receive that cache data until the JS source was updated, at which point the cache would need to update.

Next.js is an abstraction that does exactly that and so much more.

I'm not going to go into the basics as Next.js documentation is pretty extensive. Instead, I'm going to point out common pitfalls.

- The default paradigm is the server. If you need to change state with `useState`, `useEffect`, etc., you need add a `'use client'` label to the top of your JSX file. This is because state is a result of the user's browser and interaction, so the server cannot actually know what is the right state to render.[^2]

[^2]: Actually, starting with React 18, every React application has native access to RSC (React Server Components). Except in React, the default paradigm is not assumed; you need to suffix your filename with `client` or `server`.
