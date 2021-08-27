/*
 * @Author: Kang 
 * @Date: 2021-08-10 16:26:04 
 * @Last Modified by: Kang
 * @Last Modified time: 2021-08-27 18:20:17
 * 
 * 两列布局
 * 
 */

import React, { FC } from "react";
import { ResizeCallbackData } from "react-resizable";
import IColumnLayoutProps, { IDragConfigProps, ILayoutInComponentProps } from "./modules";
import DragWidthComponetWrap from "./item/item";
import classnames from "classnames";
import memoized from 'memoize-one';
import { ComponentResizeManager } from "../tools/resizeManager";
import "./style.less";



class LayoutComponent extends React.PureComponent<ILayoutInComponentProps, any> {
    startDrag: boolean = false;
    isUnmount: boolean = false;

    constructor(props: ILayoutInComponentProps) {
        super(props);
        this.state = {
            startDrag: false,
            totalWidth: 300,
            percentageWith: typeof (this.props.defaultRatioWidth) === 'number' && 0 <= this.props.defaultRatioWidth && this.props.defaultRatioWidth <= 1 ? this.props.defaultRatioWidth : 0.33
        };
    }

    changeLeftWidth = (width: number) => {
        if (typeof (width) !== 'number') {
            return;
        }
        if (width >= 0 && width <= 1) {
            this.setState({
                percentageWith: width
            })
        }
    }

    onResize = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
        if (isNaN(data.size.width)) {
            return;
        }
        this.setState({
            percentageWith: (data.size.width / this.state.totalWidth)
        })
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    wrapRef = (ref: any) => {
        new ComponentResizeManager().onComponentResize(ref, (type: string, size: any) => {
            if (!this.isUnmount) {
                this.setState({
                    totalWidth: size.width
                })
            }
        });
    }

    onResizeStart = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
        this.setState({
            startDrag: true
        })
        this.props?.onResizeStart?.(e, data);
    }

    onResizeStop = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
        this.setState({
            startDrag: false
        })
        this.props?.onResizeStop?.(e, data);
    }

    // tslint:disable-next-line
    getConfig = memoized((config: IDragConfigProps, animation: boolean = false, startDrag: boolean = false) => {
        if (!config) {
            return {
                className: animation && !startDrag ? "layout-row-resizable-animation-wrap" : ""
            }
        } else {
            return {
                ...config,
                className: classnames({
                    [`${config.className}`]: !!config?.className,
                    "layout-row-resizable-animation-wrap": animation && !startDrag
                })
            }
        }
    })

    render() {
        const { className, leftChildren, rightChildren, leftConfig, rightConfig, hiddenArea, animation, hiddenDrag } = this.props;
        const isFull = hiddenArea === 'left' || hiddenArea === 'right';
        return (
            <div className={"layout-row-wrap " + (className || "")} ref={this.wrapRef}>
                <DragWidthComponetWrap
                    key="left"
                    canDrag={!hiddenDrag}
                    config={this.getConfig(leftConfig, animation, this.state.startDrag)}
                    show={!(hiddenArea === 'left')}
                    isFull={isFull}
                    onResize={this.onResize}
                    onResizeStart={this.onResizeStart}
                    onResizeStop={this.onResizeStop}
                    totalWidth={this.state.totalWidth}
                    percentageWith={this.state.percentageWith}
                >
                    {
                        leftChildren
                    }
                </DragWidthComponetWrap>

                <DragWidthComponetWrap
                    key="right"
                    canDrag={false}
                    config={this.getConfig(rightConfig, animation, this.state.startDrag)}
                    show={!(hiddenArea === 'right')}
                    isFull={isFull}
                    totalWidth={this.state.totalWidth}
                    percentageWith={1 - this.state.percentageWith}
                    reverse={true}
                >
                    {
                        rightChildren
                    }
                </DragWidthComponetWrap>
            </div >
        )
    }
}

export const ColumnLayout: FC<IColumnLayoutProps> = React.memo(React.forwardRef((props: IColumnLayoutProps, ref: any) => {

    const { animation = false, leftConfig = {}, rightConfig = {}, hiddenDrag = false, ...otherProps } = props;
    const myRef: any = React.useRef(null);

    React.useImperativeHandle(ref, () => {
        return {
            changeLeftRatioWidth: (left: number) => {
                myRef.current?.changeLeftWidth(left);
            }
        }
    }, [myRef]);

    return (
        <LayoutComponent
            {...otherProps}
            animation={animation}
            hiddenDrag={hiddenDrag}
            rightConfig={rightConfig}
            leftConfig={leftConfig}
            ref={myRef}
        />
    )
}))

// export default ColumnLayout;