import { c as createComponent } from './astro-component_z8sE6YCk.mjs';
import 'piccolore';
import { h as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate } from './entrypoint_Dbo7TX6Z.mjs';
import 'clsx';

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Home · Layouter" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"><title></title>${renderHead()}</head> <body class="flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"> <main class="flex-1"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/Users/benlun/Desktop/layouter/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
