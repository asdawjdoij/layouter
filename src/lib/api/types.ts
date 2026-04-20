export interface CanvasElement {
    id: string;
    type: ElementType;
    label: string;
}

export interface Rect {
    top: number;
    left: number;
    width: number;
    height: number;
}

export type Tool = "select" | "move" | "rect" | "text" | "flex" | "grid";
export type ElementType = "div" | "text" | "image" | "button" | "flex-row" | "flex-col" | "grid";