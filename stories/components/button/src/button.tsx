import { Button } from "antd";
import { FC } from "react";
import IButton from "./module";


const MyButton: FC<IButton> = (props: IButton) => {
    return <Button {...props} />
}

export default Button;
