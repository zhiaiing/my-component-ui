import React from "react";
import { Resizable, ResizeHandle } from "react-resizable";
import { IDragConfigProps, IDragWidthComponetProps } from "../modules";

const Handle = React.memo(React.forwardRef((props: any, ref: any) => {
    const { handleAxis, ...otherProps } = props;
    return (
        <div {...otherProps} ref={ref} >
            <div />
        </div>
    )
}))

const DragWidthComponet = React.memo((props: IDragWidthComponetProps & { width: number }) => {
    const { className = '', contentClassName = '', percentageWith = 0, handleClassName = "", width, onResize, children, reverse, canDrag, ...otherProps } = props;

    const resizeHandles: ResizeHandle[] = React.useMemo(() => {
        return reverse ? ['w'] : ['se'];
    }, [reverse]);

    const style: React.CSSProperties = React.useMemo(() => {
        return {
            width: (percentageWith * 100) + "%"
        }
    }, [percentageWith]);

    const handleClassName1 = React.useMemo(() => {
        return canDrag ? ("layout-drag-handle-content " + handleClassName) : ("layout-drag-handle-hidden-content " + handleClassName)
    }, [canDrag, handleClassName]);

    return (
        <Resizable
            height={0}
            className={reverse ? ("layout-row-resizable-wrap react-reverse-resizable " + className) : ("layout-row-resizable-wrap " + className)}
            axis="x"
            width={width}
            onResize={onResize}
            handle={<Handle className={handleClassName1} />}
            resizeHandles={resizeHandles}
            {...otherProps}
        >
            <div style={style}>
                <div className={"layout-row-content " + contentClassName} >{children}</div>
            </div>
        </Resizable>
    )
})


const DragWidthComponetWrap = (props: IDragWidthComponetProps & { totalWidth: number, config: IDragConfigProps }) => {
    const { canDrag = false, children, reverse = false, show = false, onResize, totalWidth, percentageWith = 0, config = {}, isFull = false, onResizeStart, onResizeStop } = props;

    const statePercentageWith = React.useMemo(() => {
        if (isFull) {
            return 1;
        }
        return percentageWith;
    }, [percentageWith, isFull]);

    const stateCanDrag = React.useMemo(() => {
        if (isFull) {
            return false;
        }
        return show ? canDrag : false;
    }, [show, canDrag, isFull]);

    return (
        <DragWidthComponet
            percentageWith={show ? statePercentageWith : 0}
            width={show ? totalWidth * statePercentageWith : 0}
            canDrag={stateCanDrag}
            reverse={reverse}
            onResize={onResize}
            onResizeStart={onResizeStart}
            onResizeStop={onResizeStop}
            {...config}
        >
            {
                show ? children : null
            }
        </DragWidthComponet>
    )
}

export default DragWidthComponetWrap;