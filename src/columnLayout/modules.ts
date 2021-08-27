import { ResizeCallbackData } from "react-resizable";

export interface IDragConfigProps {
    className?: string;
    handleClassName?: string;
    contentClassName?: string;
}

export interface ILayoutRefProps {
    /** 改左侧宽度比例 0 <= width <= 1 */
    changeLeftRatioWidth: (width: number) => void;
}

export interface IRefObject {
    readonly current: ILayoutRefProps | null;
}

export interface ILayoutInComponentProps extends IColumnLayoutProps {
    leftConfig: IDragConfigProps;

    rightConfig: IDragConfigProps;

    hiddenDrag: boolean;
}

export default interface IColumnLayoutProps {

    /** 左侧 默认 宽度 的比例 0 <= defaultRatioWidth <= 1 默认 0.33 */
    defaultRatioWidth?: number;

    /** 隐藏拖拽  hiddenArea 有值时该值无效 默认false */
    hiddenDrag?: boolean;

    /** className */
    className?: string;

    /** 左侧配置 */
    leftConfig?: IDragConfigProps;

    /** 右侧配置 */
    rightConfig?: IDragConfigProps;

    /** 左侧的视图 */
    leftChildren?: React.ReactNode;

    /** 右侧的视图 */
    rightChildren?: React.ReactNode;

    /** 隐藏某个部分 */
    hiddenArea?: "left" | "right" | undefined;

    /** 
     * 切换动画 默认false 
     * 
     * @default false
     * 
     */
    animation?: boolean;

    /** ref */
    ref?: IRefObject | ((ref: ILayoutRefProps) => void);

    /** onResize */
    onResize?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;

    /** 拖拽结束 */
    onResizeStop?: ((e: React.SyntheticEvent, data: ResizeCallbackData) => any);

    /** 拖拽开始 */
    onResizeStart?: ((e: React.SyntheticEvent, data: ResizeCallbackData) => any);
}


export interface IDragWidthComponetProps {
    className?: string;

    handleClassName?: string;

    contentClassName?: string;

    width?: number;

    onResize?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;

    onResizeStop?: ((e: React.SyntheticEvent, data: ResizeCallbackData) => any) | undefined;

    onResizeStart?: ((e: React.SyntheticEvent, data: ResizeCallbackData) => any) | undefined;

    reverse?: boolean;

    canDrag?: boolean;

    children?: React.ReactNode;

    percentageWith?: number;

    show?: boolean;

    isFull?: boolean;
}