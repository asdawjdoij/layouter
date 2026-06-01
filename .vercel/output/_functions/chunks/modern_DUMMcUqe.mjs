import { c as createComponent } from './astro-component_BaT95kLv.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_Bn0PdZ4j.mjs';
import { $ as $$Layout } from './Layout_CnNJmupc.mjs';
import { useRef, useEffect, useState } from 'preact/hooks';
import { C as Curtain, L as LoadingScreen } from './LoadingScreen_ac4MtoI4.mjs';
import { jsx, Fragment, jsxs } from 'preact/jsx-runtime';

function Divider() {
  return jsx("div", {
    className: "mx-3 my-1 border-t border-(--color-border)"
  });
}

const elements = [{
  label: "Layout",
  items: [{
    type: "div",
    icon: "fa-regular fa-square",
    label: "Div"
  }, {
    type: "flex-row",
    icon: "fa-solid fa-grip-lines",
    label: "Flex Row"
  }, {
    type: "flex-col",
    icon: "fa-solid fa-grip-lines-vertical",
    label: "Flex Col"
  }, {
    type: "grid",
    icon: "fa-solid fa-border-all",
    label: "Grid"
  }]
}, {
  label: "Content",
  items: [{
    type: "text",
    icon: "fa-solid fa-t",
    label: "Text"
  }, {
    type: "image",
    icon: "fa-regular fa-image",
    label: "Image"
  }, {
    type: "button",
    icon: "fa-regular fa-hand-pointer",
    label: "Button"
  }]
}];
function Toolbar({
  onAddElement,
  width,
  onWidthChange
}) {
  const dragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(width);
  const collapsed = width < 120;
  useEffect(() => {
    function onMouseMove(e) {
      if (!dragging.current) return;
      onWidthChange(Math.min(400, Math.max(72, startWidth.current + (e.clientX - startX.current))));
    }
    function onMouseUp() {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onWidthChange]);
  return jsxs("div", {
    className: "hidden md:flex relative h-full flex-shrink-0",
    style: {
      width
    },
    children: [jsx("aside", {
      id: "toolbar",
      className: "h-full w-full border-r border-(--color-border) flex flex-col overflow-y-auto overflow-x-hidden bg-(--color-surface)",
      children: jsx(ToolbarContents, {
        onAddElement,
        collapsed
      })
    }), jsx("div", {
      onMouseDown: (e) => {
        dragging.current = true;
        startX.current = e.clientX;
        startWidth.current = width;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
        e.preventDefault();
      },
      className: "absolute right-0 top-0 h-full w-3 cursor-col-resize z-10 group flex items-center justify-center",
      style: {
        transform: "translateX(50%)"
      },
      children: jsx("div", {
        className: "w-0.5 h-full bg-(--color-border) opacity-0 group-hover:opacity-100 transition-opacity duration-150"
      })
    })]
  });
}
function ToolbarContents({
  onAddElement,
  collapsed
}) {
  return jsx(Fragment, {
    children: jsx("div", {
      className: "pt-2 pb-4 flex flex-col gap-4",
      children: elements.map((group) => jsxs(Fragment, {
        children: [elements.indexOf(group) !== 0 ? jsx(Divider, {}) : null, jsxs("div", {
          className: "px-2",
          children: [!collapsed && jsx("p", {
            className: "text-[10px] uppercase tracking-widest font-semibold text-(--color-muted-text) px-1 mb-2",
            style: {
              fontFamily: "var(--font-display)"
            },
            children: group.label
          }), jsx("div", {
            className: "flex flex-col gap-1",
            children: group.items.map((el) => jsxs("button", {
              title: el.label,
              onClick: () => onAddElement(el.type, el.label),
              draggable: true,
              onDragStart: (e) => {
                e.dataTransfer?.setData("elementType", el.type);
                e.dataTransfer?.setData("elementLabel", el.label);
              },
              className: `
                                            flex items-center w-full rounded-lg text-sm
                                            hover:bg-(--color-hover) transition-colors duration-150 cursor-pointer
                                            text-(--color-text) text-left
                                            ${collapsed ? "justify-center px-2 py-2" : "gap-2.5 px-3 py-2"}
                                        `,
              style: {
                fontFamily: "var(--font-display)"
              },
              children: [jsx("i", {
                className: `${el.icon} w-4 text-center text-(--color-muted-text) text-xs flex-shrink-0`
              }), !collapsed && jsx("span", {
                className: "truncate",
                children: el.label
              })]
            }, el.type))
          })]
        }, group.label)]
      }))
    })
  });
}

function elToTailwind(el) {
  const base = {
    button: "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
    input: "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2",
    container: "flex flex-col gap-4 p-4",
    text: "text-base leading-relaxed",
    image: "block rounded-lg object-cover",
    card: "rounded-xl border bg-white p-6 shadow-sm",
    badge: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
    divider: "border-t border-gray-200 my-4",
    navbar: "flex items-center justify-between px-6 py-4 border-b",
    grid: "grid gap-4"
  };
  const propClasses = [];
  const p = el.props ?? {};
  if (p.color) propClasses.push(`text-${p.color}-600`);
  if (p.bg) propClasses.push(`bg-${p.bg}-100`);
  if (p.rounded) propClasses.push("rounded-full");
  if (p.shadow) propClasses.push("shadow-md");
  if (p.bold) propClasses.push("font-bold");
  if (p.hidden) propClasses.push("hidden");
  if (p.fullWidth) propClasses.push("w-full");
  if (p.cols) propClasses.push(`grid-cols-${p.cols}`);
  const base_ = base[el.type] ?? "block";
  return [base_, ...propClasses].join(" ");
}
function renderElToString(el, indent) {
  const pad = "  ".repeat(indent);
  const classes = elToTailwind(el);
  const hasChildren = el.children && el.children.length > 0;
  const labelAttr = el.label ? ` label="${el.label}"` : "";
  if (!hasChildren) {
    return `${pad}<${el.type}${labelAttr} className="${classes}" />`;
  }
  const childLines = el.children.map((c) => renderElToString(c, indent + 1)).join("\n");
  return `${pad}<${el.type}${labelAttr} className="${classes}">
${childLines}
${pad}</${el.type}>`;
}

const C = {
  tag: "text-[#7dd3fc]",
  attr: "text-[#86efac]",
  string: "text-[#fca5a5]",
  cls: "text-[#fde68a]",
  punct: "text-[#94a3b8]"};
function Code({
  el,
  indent
}) {
  const pad = "  ".repeat(indent);
  const classes = elToTailwind(el);
  const hasChildren = el.children && el.children.length > 0;
  const isSelfClosing = !hasChildren && el.type !== "container";
  return jsxs("div", {
    style: {
      fontFamily: "var(--font-mono, 'Fira Code', monospace)"
    },
    children: [jsxs("div", {
      className: "flex flex-wrap gap-x-1 whitespace-pre",
      children: [jsxs("span", {
        className: C.punct,
        children: [pad, "<"]
      }), jsx("span", {
        className: C.tag,
        children: el.type
      }), " ", jsx("span", {
        className: C.attr,
        children: "className"
      }), jsx("span", {
        className: C.punct,
        children: "="
      }), jsx("span", {
        className: C.string,
        children: '"'
      }), jsx("span", {
        className: `${C.cls} break-all`,
        children: classes
      }), jsx("span", {
        className: C.string,
        children: '"'
      }), el.label && jsxs(Fragment, {
        children: [" ", jsx("span", {
          className: C.attr,
          children: "label"
        }), jsx("span", {
          className: C.punct,
          children: "="
        }), jsxs("span", {
          className: C.string,
          children: ['"', el.label, '"']
        })]
      }), jsx("span", {
        className: C.punct,
        children: isSelfClosing ? " />" : ">"
      })]
    }), hasChildren && el.children.map((child) => jsx(Code, {
      el: child,
      indent: indent + 1
    }, child.id)), hasChildren && jsxs("div", {
      children: [jsxs("span", {
        className: C.punct,
        children: [pad, "</"]
      }), jsx("span", {
        className: C.tag,
        children: el.type
      }), jsx("span", {
        className: C.punct,
        children: ">"
      })]
    })]
  });
}

function MainCanvas() {
  const canvasRef = useRef(null);
  const [settings, setSettings] = useState(false);
  const [code, setCode] = useState(false);
  const [canvasElements, setCanvasElements] = useState([]);
  const [toolbarWidth, setToolbarWidth] = useState(208);
  const [mobileOpen, setMobileOpen] = useState(false);
  const draggingEl = useRef(null);
  function addElement(type, label, x = 80, y = 80) {
    setCanvasElements((prev) => [...prev, {
      id: crypto.randomUUID(),
      type,
      label,
      x,
      y,
      props: {}
    }]);
    setMobileOpen(false);
  }
  async function copyCode() {
    const lines = canvasElements.map((el) => renderElToString(el, 0)).join("\n");
    await navigator.clipboard.writeText(lines);
  }
  function onCanvasDrop(e) {
    e.preventDefault();
    const type = e.dataTransfer?.getData("elementType");
    const label = e.dataTransfer?.getData("elementLabel");
    if (!type || !label) return;
    const bounds = canvasRef.current.getBoundingClientRect();
    addElement(type, label, e.clientX - bounds.left, e.clientY - bounds.top);
  }
  function onElMouseDown(e, id) {
    if (e.button !== 0) return;
    e.stopPropagation();
    const el = canvasElements.find((c) => c.id === id);
    draggingEl.current = {
      id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startElX: el.x,
      startElY: el.y
    };
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  }
  function onCanvasMouseMove(e) {
    if (!draggingEl.current) return;
    const dx = e.clientX - draggingEl.current.startMouseX;
    const dy = e.clientY - draggingEl.current.startMouseY;
    const newX = draggingEl.current.startElX + dx;
    const newY = draggingEl.current.startElY + dy;
    setCanvasElements((prev) => prev.map((el) => el.id === draggingEl.current.id ? {
      ...el,
      x: newX,
      y: newY
    } : el));
  }
  function onCanvasMouseUp() {
    draggingEl.current = null;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }
  return jsxs("div", {
    className: "w-full h-screen flex flex-col",
    children: [jsx("div", {
      id: "none",
      className: "w-full h-full absolute z-0"
    }), settings && jsxs("div", {
      className: "z-100 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col w-[calc(100%-2rem)] max-w-120 h-full max-h-60 bg-(--color-surface) border border-(--color-border) rounded-xl",
      children: [jsxs("div", {
        className: "flex justify-between items-center py-2 px-4",
        children: [jsx("h1", {
          className: "px-4 py-2",
          style: {
            fontFamily: "var(--font-display)"
          },
          children: "Settings"
        }), jsx("button", {
          className: "px-4 py-2 hover:bg-(--color-hover) duration-300 transition-colors cursor-pointer rounded-xl",
          onClick: () => setSettings(!settings),
          children: jsx("i", {
            className: "fa-solid fa-circle-minus"
          })
        })]
      }), jsxs("p", {
        className: "flex-1 flex items-center gap-2 justify-center select-none text-(--color-muted-text)",
        style: {
          fontFamily: "var(--font-display)"
        },
        children: [jsx("i", {
          className: "fa-solid fa-circle-question"
        }), "Nothing here for now."]
      })]
    }), code && jsxs("div", {
      className: "z-100 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col w-[calc(100%-2rem)] max-w-120 h-full max-h-60 bg-(--color-surface) border border-(--color-border) rounded-xl",
      children: [jsxs("div", {
        className: "flex justify-between items-center py-2 px-4",
        children: [jsx("h1", {
          className: "px-4 py-2",
          style: {
            fontFamily: "var(--font-display)"
          },
          children: "Code"
        }), jsxs("div", {
          className: "flex gap-2",
          children: [canvasElements.length !== 0 && jsx("button", {
            className: "px-4 py-2 hover:bg-(--color-hover) duration-300 transition-colors cursor-pointer rounded-xl",
            onClick: () => copyCode(),
            children: jsx("i", {
              className: "fa-solid fa-copy"
            })
          }), jsx("button", {
            className: "px-4 py-2 hover:bg-(--color-hover) duration-300 transition-colors cursor-pointer rounded-xl",
            onClick: () => setCode(!code),
            children: jsx("i", {
              className: "fa-solid fa-circle-minus"
            })
          })]
        })]
      }), canvasElements.length === 0 && jsxs("p", {
        className: "flex-1 flex items-center gap-2 justify-center select-none text-(--color-muted-text)",
        style: {
          fontFamily: "var(--font-display)"
        },
        children: [jsx("i", {
          className: "fa-solid fa-circle-question"
        }), "You have no elements yet."]
      }), canvasElements.length > 0 && jsxs("div", {
        className: "flex-1 overflow-auto px-4 py-3 rounded-b-xl",
        style: {
          fontFamily: "'Fira Code', 'Cascadia Code', monospace",
          fontSize: "11px",
          lineHeight: "1.7"
        },
        children: [jsx("div", {
          className: "text-slate-500 italic mb-2 text-[10px]",
          children: "// resolved tailwind classes"
        }), canvasElements.map((el) => jsx("div", {
          className: "mb-1",
          children: jsx(Code, {
            el,
            indent: 0
          })
        }, el.id))]
      })]
    }), jsxs("nav", {
      id: "topbar",
      className: "flex z-1 px-2 py-2 justify-between bg-(--color-surface) border-b border-b-(--color-border)",
      children: [jsxs("a", {
        href: "/",
        className: "flex items-center gap-2",
        style: {
          fontFamily: "var(--font-display)"
        },
        children: [jsx("img", {
          src: "/favicon.svg",
          alt: "Layouter Logo",
          className: "h-8 w-8"
        }), jsx("span", {
          className: "text-2xl",
          children: "Layouter"
        })]
      }), jsxs("ul", {
        className: "flex flex-row gap-2 items-center",
        children: [jsx("li", {
          onClick: () => setSettings((s) => !s),
          className: "hidden md:flex my-auto px-4 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-xl",
          children: jsx("i", {
            className: "fa-solid fa-gear"
          })
        }), jsx("li", {
          onClick: () => setCode((s) => !s),
          className: "hidden md:flex my-auto px-4 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-xl",
          children: jsx("i", {
            className: "fa-solid fa-code"
          })
        }), jsx("li", {
          onClick: () => setMobileOpen((o) => !o),
          className: "md:hidden my-auto px-4 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-xl",
          children: jsx("i", {
            className: mobileOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"
          })
        })]
      })]
    }), mobileOpen && jsxs("div", {
      className: "md:hidden container z-50 bg-(--color-surface) border-b border-(--color-border) overflow-y-auto max-h-[55vh]",
      children: [jsxs("li", {
        onClick: () => setSettings((s) => !s),
        style: {
          fontFamily: "var(--font-display)"
        },
        className: "text-(--color-text) mt-2 list-none my-auto px-4 mx-2 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-lg text-sm",
        children: [jsx("i", {
          className: "text-(--color-muted-text) fa-solid fa-gear mr-2.5"
        }), "Settings"]
      }), jsxs("li", {
        onClick: () => setCode((s) => !s),
        style: {
          fontFamily: "var(--font-display)"
        },
        className: "text-(--color-text) mb-2 list-none my-auto px-4 mx-2 py-2 duration-200 cursor-pointer transition-colors hover:bg-(--color-hover) rounded-lg text-sm",
        children: [jsx("i", {
          className: "text-(--color-muted-text) fa-solid fa-code mr-2.5"
        }), "Code"]
      }), jsx(Divider, {}), jsx(ToolbarContents, {
        onAddElement: addElement,
        collapsed: false
      })]
    }), jsxs("div", {
      className: "flex flex-1 overflow-hidden",
      children: [jsx(Toolbar, {
        onAddElement: addElement,
        width: toolbarWidth,
        onWidthChange: setToolbarWidth
      }), jsxs("main", {
        id: "canvas",
        ref: canvasRef,
        onDragOver: (e) => e.preventDefault(),
        onDrop: onCanvasDrop,
        onMouseMove: onCanvasMouseMove,
        onMouseUp: onCanvasMouseUp,
        onMouseLeave: onCanvasMouseUp,
        className: "flex-1 relative bg-gray-50 overflow-hidden",
        children: [jsx("div", {
          className: "absolute inset-0",
          style: {
            backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }
        }), jsx("div", {
          className: "relative w-full h-full",
          children: canvasElements.map((el) => jsx("div", {
            onMouseDown: (e) => onElMouseDown(e, el.id),
            style: {
              position: "absolute",
              left: el.x,
              top: el.y,
              transform: "translate(-50%, -50%)",
              cursor: "grab"
            }
          }, el.id))
        })]
      })]
    })]
  });
}

const tutorialSteps = [{
  title: "Welcome",
  description: "This quick tour will show you how to build and arrange elements on your canvas.",
  targetId: "canvas"
}, {
  title: "Topbar",
  description: "Use the topbar to edit settings for your canvas.",
  targetId: "topbar"
}, {
  title: "Toolbar",
  description: "Use the toolbar to add elements like text, shapes, and images to your canvas.",
  targetId: "toolbar"
}, {
  title: "Canvas",
  description: "This is your workspace where you freely arrange and design your layout.",
  targetId: "canvas"
}, {
  title: "Finish",
  description: "You're ready to start building! Explore and experiment with your canvas.",
  targetId: "none"
}];
function TutorialOverlay({
  step,
  onNext,
  onBack,
  onClose
}) {
  const current = tutorialSteps[step];
  const isFirst = step === 0;
  const isLast = step === tutorialSteps.length - 1;
  const progress = (step + 1) / tutorialSteps.length * 100;
  return jsx("div", {
    className: "fixed z-100 px-4 sm:px-0 bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg",
    style: {
      fontFamily: "var(--font-display)"
    },
    children: jsxs("div", {
      className: "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-6 animate-[fade-up_0.25s_ease-out]",
      children: [jsxs("div", {
        className: "flex items-start justify-between gap-4",
        children: [jsxs("div", {
          children: [jsxs("p", {
            className: "text-xs uppercase tracking-wider text-[var(--color-muted-text)]",
            children: ["Step ", step + 1, " of ", tutorialSteps.length]
          }), jsx("h2", {
            className: "text-xl font-semibold mt-1",
            children: current.title
          })]
        }), jsx("button", {
          onClick: onClose,
          className: "text-sm text-[var(--color-muted-text)] hover:text-[var(--color-text)] transition cursor-pointer",
          children: "✕"
        })]
      }), jsx("div", {
        className: "mt-4 w-full h-1 bg-[var(--color-border)] rounded-full overflow-hidden",
        children: jsx("div", {
          className: "h-full bg-[var(--color-primary)] transition-all duration-300",
          style: {
            width: `${progress}%`
          }
        })
      }), jsx("p", {
        className: "mt-4 text-[var(--color-muted-text)] leading-relaxed",
        children: current.description
      }), jsxs("div", {
        className: "flex flex-col gap-2 sm:flex-row sm:gap-0 items-center justify-between mt-6",
        children: [jsx("button", {
          onClick: onClose,
          className: "px-3 py-1.5 rounded-md text-sm text-[var(--color-muted-text)] hover:bg-[var(--color-hover)] transition",
          children: "Skip Tutorial"
        }), jsxs("div", {
          className: "flex gap-2",
          children: [!isFirst && jsx("button", {
            onClick: onBack,
            className: "px-3 py-1.5 rounded-md text-sm border border-[var(--color-border)] hover:bg-[var(--color-hover)] transition",
            children: "Back"
          }), jsx("button", {
            onClick: isLast ? onClose : onNext,
            className: "px-4 py-1.5 rounded-md text-sm font-medium text-[#0F111A] bg-[var(--color-primary)] hover:bg-[var(--color-accent)] transition",
            children: isLast ? "Finish" : "Next"
          })]
        })]
      })]
    })
  });
}

function Spotlight({
  targetId
}) {
  const [rect, setRect] = useState(null);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [targetId]);
  if (!rect) return null;
  return (
    /* shoutout fucking claude */
    jsx("div", {
      className: "fixed inset-0",
      style: {
        zIndex: 40,
        clipPath: `polygon(
                    0% 0%, 100% 0%, 100% 100%, 0% 100%,
                    0% ${rect.top}px,
                    ${rect.left}px ${rect.top}px,
                    ${rect.left}px ${rect.top + rect.height}px,
                    ${rect.left + rect.width}px ${rect.top + rect.height}px,
                    ${rect.left + rect.width}px ${rect.top}px,
                    0% ${rect.top}px
                )`,
        transition: "clip-path 0.3s ease",
        pointerEvents: "all"
      },
      children: jsx("div", {
        style: {
          position: "absolute",
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: "12px",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.65)",
          transition: "all 0.3s ease"
        }
      })
    })
  );
}

function Canvas() {
  const [loaded, setLoaded] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setLoaded((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return Math.min(100, p + Math.random() * 3.5 + 0.5);
      });
    }, 20);
    return () => clearInterval(id);
  }, []);
  return jsxs(Fragment, {
    children: [jsx(MainCanvas, {}), showTutorial && jsxs(Fragment, {
      children: [jsx(Spotlight, {
        targetId: tutorialSteps[step].targetId
      }), jsx(TutorialOverlay, {
        step,
        onNext: () => setStep((s) => s + 1),
        onBack: () => setStep((s) => s - 1),
        onClose: () => setShowTutorial(false)
      })]
    }), jsx(Curtain, {
      reveal: loaded >= 100,
      children: jsx(LoadingScreen, {
        progress: loaded
      })
    })]
  });
}

const $$Modern = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="app-root"${addAttribute({
    transform: "scale(1)",
    transformOrigin: "center",
    transition: "transform 0.4s ease"
  }, "style")}> ${renderComponent($$result2, "Canvas", Canvas, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Canvas.tsx", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/benlun/Desktop/layouter/src/pages/modern.astro", void 0);

const $$file = "C:/Users/benlun/Desktop/layouter/src/pages/modern.astro";
const $$url = "/modern";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Modern,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
