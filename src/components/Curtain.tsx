import { useEffect, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

interface CurtainProps {
    reveal: boolean;
    duration?: number;
    color?: string;
    origin?: "top" | "bottom" | "left" | "right";
    children: ComponentChildren;
}

const ORIGIN_MAP = {
    top:    { transformOrigin: "bottom", animation: "curtain-y" },
    bottom: { transformOrigin: "top",    animation: "curtain-y" },
    left:   { transformOrigin: "right",  animation: "curtain-x" },
    right:  { transformOrigin: "left",   animation: "curtain-x" },
};

export function Curtain({ reveal, duration = 900, origin = "top", children }: CurtainProps) {
    const [gone, setGone] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (reveal && !gone) {
            timer.current = setTimeout(() => setGone(true), duration);
        }
        return () => { if (timer.current) clearTimeout(timer.current); };
    }, [reveal]);

    const { transformOrigin, animation } = ORIGIN_MAP[origin];

    if (gone) return null;

    return (
        <div
            className="absolute inset-0 z-[9999]"
            style={{
                transformOrigin,
                pointerEvents: reveal ? "none" : "auto",
                animation: reveal
                    ? `${animation} ${duration}ms cubic-bezier(0.7, 0, 0.3, 1) forwards`
                    : undefined,
            }}
        >
            {children}
        </div>
    );
}