# Oh, Baby!

A soft pink and blue baby shower invitation built with React, Vite, CSS Modules and Motion. Break the
pearl, and a blue flame and a pink flame meet in the middle to open the invitation.

## Run it

```sh
npm install
cp .env.example .env.local   # add your Formspree form ID
npm run dev
```

## RSVP emails

RSVPs are sent through [Formspree](https://formspree.io).

1. Sign in to Formspree as cyprusakanni@gmail.com and create a form.
2. Copy its ID (the part after `/f/`) into `VITE_FORMSPREE_FORM_ID`.

Each reply is then emailed to that address.

## Deploy

Import the repository into Vercel and add `VITE_FORMSPREE_FORM_ID` as an environment variable. You can
also run `npx vercel --prod`.

Content lives in `src/lib/event.ts`. See `CLAUDE.md` for the architecture and conventions.
