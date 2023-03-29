import * as React from "react";

export interface ScreenProps {
    expr: string;
    result: string;
}

const Screen: React.FC<ScreenProps> = ({expr, result}) => {
    return (
    <div className="screen">
        <div className="expression">
            {expr}
        </div>
        {result}
    </div>
    );
}

export default Screen;