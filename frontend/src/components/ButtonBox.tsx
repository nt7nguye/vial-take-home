import * as React from "react";
import CalcButton, {ButtonProps} from "./Button";

export interface ButtonBoxProps {
    buttons: ButtonProps[];
};

const ButtonBox: React.FC<ButtonBoxProps> = ({buttons}) => {
    return (
        <div className="buttonBox">
            {buttons.map((button, index) => (<CalcButton key={index} {...button} />))}
        </div>
    )
};

export default ButtonBox;
