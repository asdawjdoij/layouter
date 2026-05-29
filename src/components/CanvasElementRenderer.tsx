import type {CanvasElement, ElementType, Tool} from "@/lib/api/types.ts";
import {CONTAINER_TYPES} from "@/lib/utils.ts";

interface RendererProps {
    el: CanvasElement;
    activeTool: Tool;
    onDrop: (parentId: string, type: ElementType, label: string) => void;
    onContextMenu: (e: MouseEvent, id: string) => void;
    onMouseDown: (e: MouseEvent, id: string) => void;
    isRoot?: boolean;
}

export function CanvasElementRenderer({el, activeTool, onDrop, onContextMenu, onMouseDown, isRoot}: RendererProps) {
    const p = el.props;
    const isContainer = CONTAINER_TYPES.has(el.type);

    function handleDragOver(e: DragEvent) {
        if (!isContainer) return;
        e.preventDefault();
        e.stopPropagation();
        (e.currentTarget as HTMLElement).setAttribute("data-drag-over", "true");
    }

    function handleDragLeave(e: DragEvent) {
        (e.currentTarget as HTMLElement).removeAttribute("data-drag-over");
    }

    function handleDrop(e: DragEvent) {
        if (!isContainer) return;
        e.preventDefault();
        e.stopPropagation();
        (e.currentTarget as HTMLElement).removeAttribute("data-drag-over");
        const type = e.dataTransfer?.getData("elementType") as ElementType;
        const label = e.dataTransfer?.getData("elementLabel");
        if (type && label) onDrop(el.id, type, label);
    }

    function handleContextMenu(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        onContextMenu(e, el.id);
    }

    function handleMouseDown(e: MouseEvent) {
        if (activeTool !== "move") return;

        if (!isRoot) return;
        onMouseDown(e, el.id);
    }

    const children = (el.children ?? []).map(child => (
        <CanvasElementRenderer
            key={child.id}
            el={child}
            activeTool={activeTool}
            onDrop={onDrop}
            onContextMenu={onContextMenu}
            onMouseDown={onMouseDown}
            isRoot={false}
        />
    ));

    const dropProps = isContainer ? {
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
    } : {};

    const sharedInteraction = {
        onContextMenu: handleContextMenu,
        onMouseDown: handleMouseDown,
    };

    switch (el.type) {
        case "text":
            return (
                <p
                    {...sharedInteraction}
                    style={{
                        color: p.textColor ?? "#111",
                        fontSize: p.fontSize ? `${p.fontSize}px` : "14px",
                        margin: 0,
                        whiteSpace: "pre-wrap",
                        minWidth: 40,
                        cursor: "default",
                        userSelect: "none",
                    }}
                >
                    {p.text ?? "Text"}
                </p>
            );

        case "image":
            return p.src ? (
                <img
                    {...sharedInteraction}
                    src={p.src}
                    alt={p.alt ?? ""}
                    style={{
                        width: p.width ?? 160,
                        height: p.height ?? 120,
                        objectFit: "cover",
                        borderRadius: p.borderRadius ?? 4,
                        display: "block",
                        pointerEvents: "all",
                        userSelect: "none",
                        cursor: "default",
                    }}
                />
            ) : (
                <div
                    {...sharedInteraction}
                    style={{
                        width: p.width ?? 160,
                        height: p.height ?? 120,
                        borderRadius: p.borderRadius ?? 4,
                        background: "#e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#9ca3af",
                        fontSize: 12,
                        cursor: "default",
                        userSelect: "none",
                        gap: 4,
                    }}
                >
                    <i className="fa-regular fa-image"/> No image
                </div>
            );

        case "button":
            return (
                <button
                    {...sharedInteraction}
                    style={{
                        background: p.bgColor ?? "#3b82f6",
                        color: p.textColor ?? "#ffffff",
                        fontSize: p.fontSize ? `${p.fontSize}px` : "14px",
                        borderRadius: p.borderRadius ?? 6,
                        border: "none",
                        padding: "8px 16px",
                        cursor: "default",
                        userSelect: "none",
                        pointerEvents: "all",
                    }}
                >
                    {p.text ?? "Button"}
                </button>
            );

        case "div":
            return (
                <div
                    {...sharedInteraction}
                    {...dropProps}
                    style={{
                        width: p.width ?? 160,
                        height: p.height ?? 120,
                        background: p.bgColor ?? "#f3f4f6",
                        borderRadius: p.borderRadius ?? 4,
                        border: "1px dashed #d1d5db",
                        padding: p.padding ?? 8,
                        position: "relative",
                        cursor: "default",
                        boxSizing: "border-box",
                    }}
                    // @ts-ignore
                    style-data-drag-over-outline="2px dashed #3b82f6"
                >
                    {children.length ? children : (
                        <span style={{fontSize: 11, color: "#9ca3af", userSelect: "none"}}>Drop here</span>
                    )}
                </div>
            );

        case "flex-row":
            return (
                <div
                    {...sharedInteraction}
                    {...dropProps}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: p.gap ?? 8,
                        minWidth: p.width ?? 200,
                        minHeight: p.height ?? 60,
                        background: p.bgColor ?? "#f9fafb",
                        border: "1px dashed #d1d5db",
                        borderRadius: p.borderRadius ?? 4,
                        padding: p.padding ?? 8,
                        alignItems: "center",
                        boxSizing: "border-box",
                        cursor: "default",
                        flexWrap: "wrap",
                    }}
                >
                    {children.length ? children : (
                        <span style={{fontSize: 11, color: "#9ca3af", userSelect: "none"}}>Drop here</span>
                    )}
                </div>
            );

        case "flex-col":
            return (
                <div
                    {...sharedInteraction}
                    {...dropProps}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: p.gap ?? 8,
                        minWidth: p.width ?? 120,
                        minHeight: p.height ?? 160,
                        background: p.bgColor ?? "#f9fafb",
                        border: "1px dashed #d1d5db",
                        borderRadius: p.borderRadius ?? 4,
                        padding: p.padding ?? 8,
                        boxSizing: "border-box",
                        cursor: "default",
                    }}
                >
                    {children.length ? children : (
                        <span style={{fontSize: 11, color: "#9ca3af", userSelect: "none"}}>Drop here</span>
                    )}
                </div>
            );

        case "grid":
            return (
                <div
                    {...sharedInteraction}
                    {...dropProps}
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${p.cols ?? 2}, 1fr)`,
                        gap: p.gap ?? 8,
                        minWidth: p.width ?? 200,
                        minHeight: p.height ?? 200,
                        background: p.bgColor ?? "#f9fafb",
                        border: "1px dashed #d1d5db",
                        borderRadius: p.borderRadius ?? 4,
                        padding: p.padding ?? 8,
                        boxSizing: "border-box",
                        cursor: "default",
                    }}
                >
                    {children.length ? children : (
                        <span style={{
                            fontSize: 11,
                            color: "#9ca3af",
                            userSelect: "none",
                            gridColumn: "1/-1"
                        }}>Drop here</span>
                    )}
                </div>
            );

        default:
            return <div style={{fontSize: 12, color: "#6b7280"}}>{el.label}</div>;
    }
}