import { c as createComponent } from './astro-component_BaT95kLv.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_Bn0PdZ4j.mjs';
import { $ as $$Layout } from './Layout_CnNJmupc.mjs';
import { useState, useEffect } from 'preact/hooks';
import { C as Curtain, L as LoadingScreen } from './LoadingScreen_ac4MtoI4.mjs';
import { jsxs, jsx } from 'preact/jsx-runtime';

const makeBox = (i) => ({
  id: Math.random().toString().substring(2, 8),
  label: `Box ${i + 1}`,
  width: 120,
  height: 120,
  color: "white",
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: "auto",
  alignSelf: "auto"
});
const Field = ({
  label,
  children
}) => jsxs("div", {
  className: "mb-3",
  children: [jsx("div", {
    className: "text-[10px] uppercase tracking-widest text-[var(--color-muted-text)] mb-1 font-mono",
    children: label
  }), children]
});
const Slider = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix = ""
}) => jsxs("div", {
  className: "flex items-center gap-2",
  children: [jsx("input", {
    type: "range",
    min,
    max,
    step,
    value,
    onInput: (e) => onChange(+e.target?.value),
    className: "flex-1 accent-[var(--color-primary)] cursor-pointer"
  }), jsxs("span", {
    className: "text-[11px] text-[var(--color-muted-text)] w-10 text-right font-mono shrink-0",
    children: [value, suffix]
  })]
});
const Select = ({
  value,
  opts,
  onChange,
  id
}) => {
  const [open, setOpen] = useState(false);
  return jsxs("div", {
    className: "relative select-none",
    children: [open && jsx("div", {
      className: "fixed inset-0 z-40",
      onMouseDown: () => setOpen(false)
    }), jsxs("div", {
      onMouseDown: () => setOpen((o) => !o),
      className: `flex items-center justify-between gap-1.5 px-2 py-1.5 rounded-md cursor-pointer
          border-(--color-hover) hover:bg-(--color-hover) border text-xs font-mono text-[var(--color-text)] transition-colors
          ${open ? "bg-(--color-hover)" : ""}`,
      children: [jsx("span", {
        children: value
      }), jsx("svg", {
        className: `w-2.5 h-2.5 shrink-0 opacity-40 transition-transform duration-150 ${open ? "rotate-180" : ""}`,
        viewBox: "0 0 10 10",
        fill: "none",
        children: jsx("path", {
          d: "M2 3.5L5 6.5L8 3.5",
          stroke: "currentColor",
          strokeWidth: "1.2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })
      })]
    }), open && jsx("div", {
      className: "absolute top-[calc(100%+4px)] left-0 right-0 z-50 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-0.5",
      children: opts.map((o) => jsx("div", {
        onMouseDown: () => {
          onChange(o);
          setOpen(false);
        },
        className: `px-2 py-1.5 rounded-[5px] text-xs font-mono cursor-pointer transition-colors
                ${o === value ? "text-[var(--color-text)] bg-(--color-hover) font-medium" : "text-[var(--color-muted-text)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"}`,
        children: o
      }, o))
    })]
  });
};
const DIRECTION_MAP = {
  "row": "flex-row",
  "row-reverse": "flex-row-reverse",
  "column": "flex-col",
  "column-reverse": "flex-col-reverse"
};
const WRAP_MAP = {
  "nowrap": "flex-nowrap",
  "wrap": "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse"
};
const JUSTIFY_MAP = {
  "flex-start": "justify-start",
  "flex-end": "justify-end",
  "center": "justify-center",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly"
};
const ALIGN_ITEMS_MAP = {
  "stretch": "items-stretch",
  "flex-start": "items-start",
  "flex-end": "items-end",
  "center": "items-center",
  "baseline": "items-baseline"
};
const ALIGN_CONTENT_MAP = {
  "normal": null,
  "flex-start": "content-start",
  "flex-end": "content-end",
  "center": "content-center",
  "space-between": "content-between",
  "space-around": "content-around",
  "stretch": "content-stretch"
};
function buildCode(c, boxes) {
  const containerClasses = ["flex", DIRECTION_MAP[c.direction], WRAP_MAP[c.wrap], JUSTIFY_MAP[c.justifyContent], ALIGN_ITEMS_MAP[c.alignItems], ALIGN_CONTENT_MAP[c.alignContent], c.gap > 0 && `gap-[${c.gap}px]`].filter(Boolean).join(" ");
  const itemLines = boxes.map((b, i) => {
    const cls = [b.flexGrow === 0 ? `w-[${b.width}px]` : "w-full", `h-[${b.height}px]`, "bg-white/30", b.flexGrow !== 0 && (b.flexGrow === 1 ? "grow" : `grow-[${b.flexGrow}]`), b.flexShrink !== 1 && (b.flexShrink === 0 ? "shrink-0" : `shrink-[${b.flexShrink}]`)].filter(Boolean).join(" ");
    return `    <div class="${cls}"></div>`;
  });
  return `<div class="${containerClasses}">
${itemLines.join("\n")}
</div>`;
}
function ItemPanel({
  box,
  onChange,
  onDelete
}) {
  if (!box) return null;
  const up = (patch) => onChange(box.id, patch);
  return jsx("div", {
    className: "flex flex-col h-full overflow-hidden",
    children: jsxs("div", {
      className: "flex-1 overflow-y-auto p-3",
      children: [jsx(Field, {
        label: "width",
        children: jsx(Slider, {
          value: box.width,
          min: 20,
          max: 600,
          onChange: (v) => up({
            width: v
          }),
          suffix: "px"
        })
      }), jsx(Field, {
        label: "height",
        children: jsx(Slider, {
          value: box.height,
          min: 20,
          max: 400,
          onChange: (v) => up({
            height: v
          }),
          suffix: "px"
        })
      }), jsx("div", {
        className: "border-t border-[var(--color-border)] my-3"
      }), [{
        label: "flex-grow",
        key: "flexGrow",
        min: 0,
        max: 5
      }, {
        label: "flex-shrink",
        key: "flexShrink",
        min: 0,
        max: 5
      }].map(({
        label,
        key,
        min,
        max
      }) => jsx(Field, {
        label,
        children: jsx(Slider, {
          value: box[key],
          min,
          max,
          onChange: (v) => up({
            [key]: v
          })
        })
      }, key))]
    })
  });
}
function LegacyCanvas() {
  const [container, setContainer] = useState({
    direction: "row",
    wrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "normal",
    gap: 16
  });
  const [boxes, setBoxes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const selectedBox = boxes.find((b) => b.id === selectedId) ?? null;
  const updateContainer = (patch) => setContainer((c) => ({
    ...c,
    ...patch
  }));
  const updateBox = (id, patch) => setBoxes((bs) => bs.map((b) => b.id === id ? {
    ...b,
    ...patch
  } : b));
  const removeBox = (id) => {
    setBoxes((bs) => bs.filter((b) => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  };
  const addBox = () => {
    const b = makeBox(boxes.length);
    setBoxes((bs) => [...bs, b]);
    setSelectedId(b.id);
  };
  useEffect(() => {
    const id = setInterval(() => {
      setLoaded((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return Math.min(100, p + Math.random() * 3.5 + 0.5);
      });
    }, 5);
    return () => clearInterval(id);
  });
  const code = buildCode(container, boxes);
  return jsxs("div", {
    className: "flex h-screen text-[var(--color-text)] text-sm overflow-hidden bg-[var(--color-bg)]",
    children: [jsx(Curtain, {
      reveal: loaded >= 100,
      children: jsx(LoadingScreen, {
        progress: loaded
      })
    }), jsxs("div", {
      className: "w-52 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-y-auto",
      children: [jsxs("div", {
        className: "p-3",
        children: [jsxs("a", {
          href: "/",
          className: "flex flex-row items-center gap-2",
          style: {
            fontFamily: "var(--font-display)"
          },
          children: [jsx("img", {
            src: "/favicon.svg",
            alt: "Layouter Logo",
            className: "h-6 w-6"
          }), jsx("span", {
            className: "text-xl",
            children: "Layouter"
          })]
        }), jsx("div", {
          className: "w-full bg-(--color-border) h-[1px] my-3"
        }), [{
          label: "flex-direction",
          key: "direction",
          opts: ["row", "row-reverse", "column", "column-reverse"]
        }, {
          label: "flex-wrap",
          key: "wrap",
          opts: ["nowrap", "wrap", "wrap-reverse"]
        }, {
          label: "justify-content",
          key: "justifyContent",
          opts: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]
        }, {
          label: "align-items",
          key: "alignItems",
          opts: ["stretch", "flex-start", "flex-end", "center", "baseline"]
        }, {
          label: "align-content",
          key: "alignContent",
          opts: ["normal", "flex-start", "flex-end", "center", "space-between", "space-around", "stretch"]
        }].map(({
          label,
          key,
          opts
        }) => jsx(Field, {
          label,
          children: jsx(Select, {
            id: `container-${key}`,
            value: container[key],
            opts,
            onChange: (v) => updateContainer({
              [key]: v
            })
          })
        }, key)), jsx(Field, {
          label: "gap",
          children: jsx(Slider, {
            value: container.gap,
            min: 0,
            max: 80,
            onChange: (v) => updateContainer({
              gap: v
            }),
            suffix: "px"
          })
        })]
      }), jsx("div", {
        className: "border-t border-[var(--color-border)] my-3"
      }), jsxs("div", {
        className: "p-3 container",
        children: [jsx("div", {
          className: "flex flex-col gap-0.5 mb-2",
          children: boxes.map((b) => {
            const active = selectedId === b.id;
            return jsxs("div", {
              onClick: () => setSelectedId(b.id),
              className: `flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors
                ${active ? "bg-[var(--color-hover)]" : "border-transparent hover:bg-[var(--color-hover)]"}`,
              children: [jsx("div", {
                className: "w-2.5 h-2.5 rounded-[3px] shrink-0",
                style: {
                  background: b.color
                }
              }), jsx("span", {
                className: `text-xs flex-1 truncate ${active ? "text-[var(--color-text)]" : "text-[var(--color-muted-text)]"}`,
                children: boxes.indexOf(b) + 1
              }), jsx("button", {
                onClick: (e) => {
                  e.stopPropagation();
                  removeBox(b.id);
                },
                className: "text-[var(--color-muted-text)] hover:text-[var(--color-text)] text-base leading-none transition-colors cursor-pointer bg-transparent border-none p-0",
                children: "×"
              })]
            }, b.id);
          })
        }), jsx("button", {
          onClick: addBox,
          className: "w-full py-1.5 rounded-md border border-[var(--color-border)] text-[var(--color-muted-text)] hover:text-[var(--color-text)] hover:bg-(--color-hover) text-xs transition-colors cursor-pointer bg-transparent",
          children: "+ Add item"
        })]
      })]
    }), jsxs("div", {
      className: "flex flex-col flex-1 min-w-0 overflow-hidden",
      children: [jsx("div", {
        className: "flex-1 overflow-auto relative bg-[var(--color-bg)]",
        onClick: () => setSelectedId(null),
        children: jsx("div", {
          className: "p-6 min-h-full box-border",
          children: jsx("div", {
            className: "bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl min-h-48 h-full overflow-auto",
            children: jsxs("div", {
              className: `p-16 flex w-full min-h-full box-border`,
              style: {
                flexDirection: container.direction,
                flexWrap: container.wrap,
                justifyContent: container.justifyContent,
                alignItems: container.alignItems,
                ...container.alignContent !== "normal" ? {
                  alignContent: container.alignContent
                } : {},
                gap: container.gap
              },
              children: [boxes.length === 0 && jsx("div", {
                className: "m-auto text-center text-[var(--color-muted-text)]/40 text-sm p-10",
                children: "No items yet"
              }), boxes.map((b) => jsx("div", {
                onClick: (e) => {
                  e.stopPropagation();
                  setSelectedId(b.id);
                },
                style: {
                  width: b.flexGrow > 0 ? void 0 : b.width,
                  height: b.height,
                  background: b.color,
                  flexGrow: b.flexGrow,
                  flexShrink: b.flexShrink,
                  ...b.alignSelf !== "auto" ? {
                    alignSelf: b.alignSelf
                  } : {}
                },
                className: `rounded-lg flex items-center justify-center outline-2 outline-offset-2 text-black/90 text-xs font-medium cursor-pointer select-none box-border transition-[outline-color]
                      ${selectedId === b.id ? "outline-(--color-primary)" : "outline-transparent"}`,
                children: boxes.indexOf(b) + 1
              }, b.id))]
            })
          })
        })
      }), jsx("div", {
        className: "border-t border-[var(--color-border)] bg-[var(--color-surface)] shrink-0",
        children: jsx("pre", {
          onClick: () => {
            void navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 300);
          },
          className: `
      m-0 p-3 cursor-copy text-[12px] leading-relaxed font-mono
      whitespace-pre-wrap break-all max-h-52 overflow-y-auto
      transition-colors duration-300
      ${copied ? "bg-(--color-success)/20 text-(--color-success) cursor-default" : "bg-transparent text-[var(--color-muted-text)]"}
    `,
          children: code
        })
      })]
    }), jsx("div", {
      className: `shrink-0 border-l border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden transition-all duration-200 ${selectedBox ? "w-52" : "w-0"}`,
      children: jsx(ItemPanel, {
        box: selectedBox,
        onChange: updateBox,
        onDelete: () => removeBox(selectedBox?.id)
      })
    })]
  });
}

const $$Legacy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col w-full h-screen justify-center items-center md:hidden"> <a href="/" class="flex flex-row items-center gap-2 fade-up"${addAttribute({
    fontFamily: "var(--font-display)",
    animation: "fade-up 0.4s ease"
  }, "style")}> <img src="/favicon.svg" alt="Layouter Logo"${addAttribute("w-8 h-8 md:h-16 md:w-16", "class")}> <span${addAttribute("text-3xl md:text-7xl", "class")}>Layouter</span> </a> <p class="flex flex-row text-center gap-4 mt-12 text-lg px-8"${addAttribute({
    animation: "fade-up 0.6s ease"
  }, "style")}>
The legacy editor is not optimized for smaller devices
</p> </div> <div class="hidden md:block"> ${renderComponent($$result2, "LegacyCanvas", LegacyCanvas, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/legacy/LegacyCanvas.tsx", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/benlun/Desktop/layouter/src/pages/legacy.astro", void 0);

const $$file = "C:/Users/benlun/Desktop/layouter/src/pages/legacy.astro";
const $$url = "/legacy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Legacy,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
