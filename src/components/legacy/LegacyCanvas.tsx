import {useEffect, useState} from "preact/hooks";
import {Curtain} from "@/components/ui/Curtain.tsx";
import {LoadingScreen} from "@/components/ui/LoadingScreen.tsx";

const makeBox = (i: number) => ({
    id: Math.random().toString().substring(2, 8), label: `Box ${i + 1}`,
    width: 120, height: 120, color: "white",
    flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto",
});

// @ts-ignore
const Field = ({label, children}) => (
    <div className="mb-3">
        <div
            className="text-[10px] uppercase tracking-widest text-[var(--color-muted-text)] mb-1 font-mono">{label}</div>
        {children}
    </div>
);

// @ts-ignore
const Slider = ({value, min, max, step = 1, onChange, suffix = ""}) => (
    <div className="flex items-center gap-2">
        <input type="range" min={min} max={max} step={step} value={value}
               onInput={e => onChange(+e.target?.value)}
               className="flex-1 accent-[var(--color-primary)] cursor-pointer"/>
        <span className="text-[11px] text-[var(--color-muted-text)] w-10 text-right font-mono shrink-0">
      {value}{suffix}
    </span>
    </div>
);

const Select = ({ value, opts, onChange, id }: {
    value: string; opts: string[]; onChange: (v: string) => void; id?: string;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative select-none">
            {open && (
                <div className="fixed inset-0 z-40" onMouseDown={() => setOpen(false)} />
            )}
            <div
                onMouseDown={() => setOpen(o => !o)}
                className={`flex items-center justify-between gap-1.5 px-2 py-1.5 rounded-md cursor-pointer
          border-(--color-hover) hover:bg-(--color-hover) border text-xs font-mono text-[var(--color-text)] transition-colors
          ${open
                    ? "bg-(--color-hover)"
                    : ""}`}
            >
                <span>{value}</span>
                <svg
                    className={`w-2.5 h-2.5 shrink-0 opacity-40 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 10 10" fill="none"
                >
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            {open && (
                <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-0.5">
                    {opts.map(o => (
                        <div
                            key={o}
                            onMouseDown={() => { onChange(o); setOpen(false); }}
                            className={`px-2 py-1.5 rounded-[5px] text-xs font-mono cursor-pointer transition-colors
                ${o === value
                                ? "text-[var(--color-text)] bg-(--color-hover) font-medium"
                                : "text-[var(--color-muted-text)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"}`}
                        >
                            {o}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const DIRECTION_MAP: Record<string, string> = {
    "row": "flex-row", "row-reverse": "flex-row-reverse",
    "column": "flex-col", "column-reverse": "flex-col-reverse",
};
const WRAP_MAP: Record<string, string> = {
    "nowrap": "flex-nowrap", "wrap": "flex-wrap", "wrap-reverse": "flex-wrap-reverse",
};
const JUSTIFY_MAP: Record<string, string> = {
    "flex-start": "justify-start", "flex-end": "justify-end",
    "center": "justify-center", "space-between": "justify-between",
    "space-around": "justify-around", "space-evenly": "justify-evenly",
};
const ALIGN_ITEMS_MAP: Record<string, string> = {
    "stretch": "items-stretch", "flex-start": "items-start",
    "flex-end": "items-end", "center": "items-center", "baseline": "items-baseline",
};
const ALIGN_CONTENT_MAP: Record<string, string | null> = {
    "normal": null, "flex-start": "content-start", "flex-end": "content-end",
    "center": "content-center", "space-between": "content-between",
    "space-around": "content-around", "stretch": "content-stretch",
};

// @ts-ignore
function buildCode(c, boxes) {
    const containerClasses = [
        "flex",
        DIRECTION_MAP[c.direction],
        WRAP_MAP[c.wrap],
        JUSTIFY_MAP[c.justifyContent],
        ALIGN_ITEMS_MAP[c.alignItems],
        ALIGN_CONTENT_MAP[c.alignContent],
        c.gap > 0 && `gap-[${c.gap}px]`,
    ].filter(Boolean).join(" ");

    // @ts-ignore
    const itemLines = boxes.map((b, i) => {
        const cls = [
            b.flexGrow === 0 ? `w-[${b.width}px]` : "w-full",
            `h-[${b.height}px]`,
            "bg-white/30",
            b.flexGrow  !== 0 && (b.flexGrow === 1 ? "grow" : `grow-[${b.flexGrow}]`),
            b.flexShrink !== 1 && (b.flexShrink === 0 ? "shrink-0" : `shrink-[${b.flexShrink}]`),
        ].filter(Boolean).join(" ");
        return `    <div class="${cls}"></div>`;
    });

    return `<div class="${containerClasses}">\n${itemLines.join("\n")}\n</div>`;
}

// @ts-ignore
function ItemPanel({box, onChange, onDelete}) {
    if (!box) return null;
    const up = patch => onChange(box.id, patch);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3">
                <Field label="width">
                    <Slider value={box.width} min={20} max={600} onChange={v => up({width: v})} suffix="px"/>
                </Field>
                <Field label="height">
                    <Slider value={box.height} min={20} max={400} onChange={v => up({height: v})} suffix="px"/>
                </Field>
                <div className="border-t border-[var(--color-border)] my-3"/>
                {[
                    {label: "flex-grow", key: "flexGrow", min: 0, max: 5},
                    {label: "flex-shrink", key: "flexShrink", min: 0, max: 5},
                ].map(({label, key, min, max}) => (
                    <Field key={key} label={label}>
                        <Slider value={box[key]} min={min} max={max} onChange={v => up({[key]: v})}/>
                    </Field>
                ))}
            </div>
        </div>
    );
}

export default function LegacyCanvas() {
    const [container, setContainer] = useState({
        direction: "row", wrap: "nowrap",
        justifyContent: "flex-start", alignItems: "stretch",
        alignContent: "normal", gap: 16
    });
    const [boxes, setBoxes] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [copied, setCopied] = useState(false);
    const [loaded, setLoaded] = useState<number>(0.0);

    const selectedBox = boxes.find(b => b.id === selectedId) ?? null;

    const updateContainer = patch => setContainer(c => ({...c, ...patch}));

    const updateBox = (id, patch) => setBoxes(bs => bs.map(b => b.id === id ? {...b, ...patch} : b));

    const removeBox = id => {
        setBoxes(bs => bs.filter(b => b.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    const addBox = () => {
        const b = makeBox(boxes.length);
        setBoxes(bs => [...bs, b]);
        setSelectedId(b.id);
    };

    useEffect(() => {
        const id = setInterval(() => {
            setLoaded(p => {
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

    return (
        <div className="flex h-screen text-[var(--color-text)] text-sm overflow-hidden bg-[var(--color-bg)]">
            <Curtain reveal={loaded >= 100}>
                <LoadingScreen progress={loaded}/>
            </Curtain>
            <div
                className="w-52 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-y-auto">
                <div className="p-3">
                    <a href="/" className="flex flex-row items-center gap-2" style={{
                        fontFamily: "var(--font-display)",
                    }}>
                        <img src="/favicon.svg" alt="Layouter Logo" className={"h-6 w-6"} />
                        <span className={"text-xl"}>Layouter</span>
                    </a>
                    <div className="w-full bg-(--color-border) h-[1px] my-3"/>
                    {[
                        {
                            label: "flex-direction",
                            key: "direction",
                            opts: ["row", "row-reverse", "column", "column-reverse"]
                        },
                        {label: "flex-wrap", key: "wrap", opts: ["nowrap", "wrap", "wrap-reverse"]},
                        {
                            label: "justify-content",
                            key: "justifyContent",
                            opts: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]
                        },
                        {
                            label: "align-items",
                            key: "alignItems",
                            opts: ["stretch", "flex-start", "flex-end", "center", "baseline"]
                        },
                        {
                            label: "align-content",
                            key: "alignContent",
                            opts: ["normal", "flex-start", "flex-end", "center", "space-between", "space-around", "stretch"]
                        },
                    ].map(({label, key, opts}) => (
                        <Field key={key} label={label}>
                            <Select
                                id={`container-${key}`}
                                value={container[key]}
                                opts={opts}
                                onChange={v => updateContainer({[key]: v})}
                            />
                        </Field>
                    ))}
                    <Field label="gap">
                        <Slider value={container.gap} min={0} max={80} onChange={v => updateContainer({gap: v})}
                                suffix="px"/>
                    </Field>
                </div>

                <div className="border-t border-[var(--color-border)] my-3"/>

                <div className="p-3 container">
                    <div className="flex flex-col gap-0.5 mb-2">
                        {boxes.map(b => {
                            const active = selectedId === b.id;
                            return (
                                <div key={b.id} onClick={() => setSelectedId(b.id)}
                                     className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors
                ${active ? "bg-[var(--color-hover)]" : "border-transparent hover:bg-[var(--color-hover)]"}`}>
                                    <div className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{background: b.color}}/>
                                    <span
                                        className={`text-xs flex-1 truncate ${active ? "text-[var(--color-text)]" : "text-[var(--color-muted-text)]"}`}>
                {boxes.indexOf(b) + 1}
              </span>
                                    <button onClick={e => {
                                        e.stopPropagation();
                                        removeBox(b.id);
                                    }}
                                            className="text-[var(--color-muted-text)] hover:text-[var(--color-text)] text-base leading-none transition-colors cursor-pointer bg-transparent border-none p-0">
                                        ×
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={addBox}
                            className="w-full py-1.5 rounded-md border border-[var(--color-border)] text-[var(--color-muted-text)] hover:text-[var(--color-text)] hover:bg-(--color-hover) text-xs transition-colors cursor-pointer bg-transparent">
                        + Add item
                    </button>
                </div>
            </div>

            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <div className="flex-1 overflow-auto relative bg-[var(--color-bg)]" onClick={() => setSelectedId(null)}>
                    <div className="p-6 min-h-full box-border">
                        <div
                            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl min-h-48 h-full overflow-auto">
                            <div className={`p-16 flex w-full min-h-full box-border`} style={{
                                flexDirection: container.direction,
                                flexWrap: container.wrap,
                                justifyContent: container.justifyContent,
                                alignItems: container.alignItems,
                                ...(container.alignContent !== "normal" ? {alignContent: container.alignContent} : {}),
                                gap: container.gap,
                            }}>
                                {boxes.length === 0 && (
                                    <div className="m-auto text-center text-[var(--color-muted-text)]/40 text-sm p-10">
                                        No items yet
                                    </div>
                                )}
                                {boxes.map(b => (
                                    <div key={b.id} onClick={e => {
                                        e.stopPropagation();
                                        setSelectedId(b.id);
                                    }}
                                         style={{
                                             width: b.flexGrow > 0 ? undefined : b.width,
                                             height: b.height,
                                             background: b.color,
                                             flexGrow: b.flexGrow,
                                             flexShrink: b.flexShrink,
                                             ...(b.alignSelf !== "auto" ? {alignSelf: b.alignSelf} : {}),
                                         }}
                                         className={`rounded-lg flex items-center justify-center outline-2 outline-offset-2 text-black/90 text-xs font-medium cursor-pointer select-none box-border transition-[outline-color]
                      ${selectedId === b.id ? "outline-(--color-primary)" : "outline-transparent"}`}>
                                        {boxes.indexOf(b) + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
                        <pre onClick={() => {
                                void navigator.clipboard.writeText(code);

                                setCopied(true);
                                setTimeout(() => setCopied(false), 300);
                            }}
                             className={`
      m-0 p-3 cursor-copy text-[12px] leading-relaxed font-mono
      whitespace-pre-wrap break-all max-h-52 overflow-y-auto
      transition-colors duration-300
      ${copied
                                 ? "bg-(--color-success)/20 text-(--color-success) cursor-default"
                                 : "bg-transparent text-[var(--color-muted-text)]"}
    `}
                        >
          {code}
        </pre>
                </div>
            </div>

            <div
                className={`shrink-0 border-l border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden transition-all duration-200 ${selectedBox ? "w-52" : "w-0"}`}>
                <ItemPanel box={selectedBox} onChange={updateBox} onDelete={() => removeBox(selectedBox?.id)}/>
            </div>
        </div>
    );
}