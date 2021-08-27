import { useEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

let componentResizeManager: ComponentResizeManager;

export class ComponentResizeManager {
    componentRefMap: Map<any, any> = new Map();
    constructor() {
        if (!componentResizeManager) {
            this.componentRefMap = new Map();
            componentResizeManager = this;
        }
        return componentResizeManager;
    }

    targetResize = (
        component: HTMLElement,
        size: { width: any; height: any }
    ) => {
        if (this.componentRefMap.has(component)) {
            const item = this.componentRefMap.get(component);
            let type = "init";
            const preSize = item.size;
            if (preSize) {
                if (preSize.width !== size.width && preSize.height !== size.height) {
                    type = "resize";
                } else if (preSize.width !== size.width) {
                    type = "resizeWidth";
                } else if (preSize.height !== size.height) {
                    type = "resizeHeight";
                } else {
                    type = "noChange";
                }
            }
            if (type === "noChange") {
                return;
            }
            item.callBackArray.forEach((item1: any) => {
                if (item1.callBack) {
                    item1.callBack(type, size);
                }
            });
            this.componentRefMap.set(component, {
                ...item,
                size,
            });
        }
    };

    resizeElement = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.target) {
                const obj = getComputedStyle(entry.target);
                this.targetResize(entry.target, {
                    width: parseInt(obj.width, 10),
                    height: parseInt(obj.height, 10)
                });
            }
        });
    };

    isHTMLElement = (obj: any) => {
        if (obj && (window).HTMLElement) {
            return obj instanceof (window).HTMLElement;
        }
        if (obj && obj.nodeType === 1) {
            return true;
        }
        return obj === window || obj === document;
    }

    /**
     * 监听元素size变化 padding && margin 会被计算在内
     *
     * @param component HTMLElement
     * @param callBack
     * @param otherParams 同个 component 不同回调请设置不同的 id 不然会被覆盖
     */
    onComponentResize = (
        component: HTMLElement,
        callBack: any,
        otherParams: any = { id: 0 }
    ) => {
        if (!component && !this.isHTMLElement(component)) {
            return;
        }
        const otherParams1 = { ...{ id: 0 }, ...(otherParams || {}) };
        this.destroyComponentResize(component, otherParams1.id);
        if (this.componentRefMap.has(component)) {
            const item = this.componentRefMap.get(component);
            this.componentRefMap.set(component, {
                ...item,
                callBackArray: [
                    ...item.callBackArray,
                    {
                        params: otherParams1,
                        id: otherParams1.id,
                        callBack,
                    },
                ],
            });
            //直接触发
            callBack("exist", item.size);
        } else {
            const myObserver = new ResizeObserver(this.resizeElement);
            myObserver.observe(component);
            this.componentRefMap.set(component, {
                size: null,
                myObserver,
                callBackArray: [
                    {
                        params: otherParams1,
                        id: otherParams1.id,
                        callBack,
                    },
                ],
            });
        }
    };

    /**
     * 取消监听
     *
     * @param component HTMLElement
     * @param id default 0
     */
    destroyComponentResize = (component: HTMLElement, id: number = 0) => {
        if (this.componentRefMap.has(component)) {
            const item = this.componentRefMap.get(component);
            item.callBackArray = item.callBackArray.filter(
                (item1: any) => item1.id !== id
            );
            if (!item.callBackArray.length) {
                item.myObserver.disconnect();
                this.componentRefMap.delete(component);
            } else {
                this.componentRefMap.set(component, {
                    ...item,
                });
            }
        }
    };
}

export function useMultipleComponentReSize(ref: HTMLElement) {
    const [componentSize, setComponentSize] = useState({
        width: ref ? ref.offsetWidth : 0,
        height: ref ? ref.offsetHeight : 0,
    });
    useEffect(() => {
        setComponentSize({
            width: ref ? ref.offsetWidth : 0,
            height: ref ? ref.offsetHeight : 0,
        });
        new ComponentResizeManager().onComponentResize(
            ref,
            (type: any, size: any) => {
                setComponentSize(size);
            }
        );
        return () =>
            new ComponentResizeManager().destroyComponentResize(ref);
    }, [ref]);
    return componentSize;
}
