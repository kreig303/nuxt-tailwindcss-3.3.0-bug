# nuxt-tailwindcss-3.3.0-bug

## how were you created

```sh
% npx create-nuxt-app tailwind-test
```

## how do i use you

```sh
% git clone https://github.com/kreig303/nuxt-tailwindcss-3.3.0-bug.git
% cd nuxt-tailwindcss-3.3.0-bug
% npm i
% npm run dev
```

## what do you prove

on line 89 of `.lib/module.js` in `v3.3.0` of `@nuxtjs/tailwindcss`, there is an attempt to log out the url.

```js
      const url = nuxt.server.listeners ? nuxt.server.listeners[0].url : '/'
```

This uses `nuxt.server.listeners`, which does not exist if the listener was created with an external server framework.
This example uses `koa`.
