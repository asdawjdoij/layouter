import {useEffect, useState} from "preact/hooks";

interface Rect {
    top: number;
    left: number;
    width: number;
    height: number;
}

export function Spotlight({targetId}: { targetId: string }) {
    const [rect, setRect] = useState<Rect | null>(null);

    useEffect(() => {
        const el = document.getElementById(targetId);
        if (!el) return;

        const update = () => {
            const r = el.getBoundingClientRect();
            setRect({top: r.top, left: r.left, width: r.width, height: r.height});
        };

        update();

        const ro = new ResizeObserver(update);
        ro.observe(el);

        // Also observe the document body so sibling resizes (e.g. toolbar) are caught
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
        <div className="fixed inset-0" style={{
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
            pointerEvents: "all",
        }}>
            <div
                style={{
                    position: "absolute",
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                    borderRadius: "12px",
                    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.65)",
                    transition: "all 0.3s ease",
                }}
            />
        </div>
    );
}