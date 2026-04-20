import { useEffect, useState } from "preact/hooks";

export function Spotlight({ targetId }: { targetId: string }) {
    const [rect, setRect] = useState<Rect | null>(null);

    useEffect(() => {
        const el = document.getElementById(targetId);
        if (!el) return;

        const update = () => {
            const r = el.getBoundingClientRect();
            setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [targetId]);

    if (!rect) return null;

    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 40 }}>
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
    )
}