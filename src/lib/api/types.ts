export type CanvasElement = {
    id: string;
    type: ElementType;
    label: string;
    x: number;
    y: number;
    props: {
        text?: string;
        src?: string;
        alt?: string;
        width?: number;
        height?: number;
        bgColor?: string;
        textColor?: string;
        fontSize?: number;
        borderRadius?: number;
        gap?: number;
        cols?: number;
        padding?: number;
    };
    children?: CanvasElement[];
};
export type ElementType = "div" | "text" | "image" | "button" | "flex-row" | "flex-col" | "grid";