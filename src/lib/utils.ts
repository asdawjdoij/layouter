import type { CanvasElement } from "@/lib/api/types.ts";

export function addChildToElement(
    elements: CanvasElement[],
    parentId: string,
    child: CanvasElement
): CanvasElement[] {
    return elements.map(el => {
        if (el.id === parentId) {
            return { ...el, children: [...(el.children ?? []), child] };
        }
        if (el.children?.length) {
            return { ...el, children: addChildToElement(el.children, parentId, child) };
        }
        return el;
    });
}

export function updateElementProps(
    elements: CanvasElement[],
    id: string,
    props: Partial<CanvasElement["props"]>
): CanvasElement[] {
    return elements.map(el => {
        if (el.id === id) return { ...el, props: { ...el.props, ...props } };
        if (el.children?.length) {
            return { ...el, children: updateElementProps(el.children, id, props) };
        }
        return el;
    });
}

export function deleteElement(
    elements: CanvasElement[],
    id: string
): CanvasElement[] {
    return elements
        .filter(el => el.id !== id)
        .map(el => el.children?.length
            ? { ...el, children: deleteElement(el.children, id) }
            : el
        );
}

export function findElement(
    elements: CanvasElement[],
    id: string
): CanvasElement | null {
    for (const el of elements) {
        if (el.id === id) return el;
        if (el.children?.length) {
            const found = findElement(el.children, id);
            if (found) return found;
        }
    }
    return null;
}

export const CONTAINER_TYPES = new Set(["div", "flex-row", "flex-col", "grid"]);