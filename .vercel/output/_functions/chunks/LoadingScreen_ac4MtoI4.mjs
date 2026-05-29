import { useState, useRef, useEffect } from 'preact/hooks';
import { jsx, jsxs } from 'preact/jsx-runtime';

const ORIGIN_MAP = {
  top: {
    transformOrigin: "bottom",
    animation: "curtain-y"
  },
  bottom: {
    transformOrigin: "top",
    animation: "curtain-y"
  },
  left: {
    transformOrigin: "right",
    animation: "curtain-x"
  },
  right: {
    transformOrigin: "left",
    animation: "curtain-x"
  }
};
function Curtain({
  reveal,
  duration = 900,
  origin = "top",
  children
}) {
  const [gone, setGone] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    if (reveal && !gone) {
      timer.current = setTimeout(() => setGone(true), duration);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [reveal]);
  const {
    transformOrigin,
    animation
  } = ORIGIN_MAP[origin];
  if (gone) return null;
  return jsx("div", {
    className: "absolute inset-0 z-[9999]",
    style: {
      transformOrigin,
      pointerEvents: reveal ? "none" : "auto",
      animation: reveal ? `${animation} ${duration}ms cubic-bezier(0.7, 0, 0.3, 1) forwards` : void 0
    },
    children
  });
}

const STAGES = [{
  at: 0,
  label: "Launching engine..."
}, {
  at: 18,
  label: "Warming up the canvas..."
}, {
  at: 36,
  label: "Importing your imagination..."
}, {
  at: 54,
  label: "Aligning the pixels..."
}, {
  at: 72,
  label: "Polishing the edges..."
}, {
  at: 90,
  label: "Almost ready..."
}, {
  at: 100,
  label: "Let's go."
}];
function LoadingScreen({
  progress
}) {
  const stageIdx = [...STAGES].findLastIndex((s) => progress >= s.at);
  const stage = STAGES[stageIdx];
  return jsx("div", {
    style: {
      fontFamily: "var(--font-display)"
    },
    class: "flex flex-col items-center justify-center w-full h-screen bg-[var(--color-bg)]",
    children: jsxs("div", {
      class: "flex flex-col items-center gap-12 w-full max-w-sm px-8",
      children: [jsxs("div", {
        class: "flex flex-row items-center gap-2.5",
        style: {
          animation: "fade-up 0.5s ease both"
        },
        children: [jsx("img", {
          src: "/favicon.svg",
          alt: "Layouter Logo",
          class: "h-9 w-9"
        }), jsx("span", {
          class: "text-3xl font-normal tracking-tight text-[var(--color-text)]",
          children: "Layouter"
        })]
      }), jsxs("div", {
        class: "flex flex-col gap-4 w-full",
        style: {
          animation: "fade-up 0.5s ease 0.15s both"
        },
        children: [jsx("div", {
          class: "w-full h-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden",
          children: jsx("div", {
            class: "h-full rounded-full bg-[var(--color-text)] transition-[width] duration-[120ms] ease-linear",
            style: {
              width: `${progress}%`
            }
          })
        }), jsxs("div", {
          class: "flex flex-row justify-between items-center",
          children: [jsx("span", {
            class: "text-[13px] text-[var(--color-muted-text)]",
            style: {
              animation: "tick 0.4s ease both"
            },
            children: stage.label
          }, stageIdx), jsxs("span", {
            class: "text-[13px] text-[var(--color-muted-text)] tabular-nums font-medium",
            children: [Math.round(progress), "%"]
          })]
        })]
      })]
    })
  });
}

export { Curtain as C, LoadingScreen as L };
