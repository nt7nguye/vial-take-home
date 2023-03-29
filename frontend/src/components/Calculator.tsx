import * as React from "react";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import {ButtonProps} from "./Button";


const Calculator: React.FC<{}> = () => {
    // Core state of the calculator
    const [expr, setExpr] = React.useState("1+2");
    const [result, setResult] = React.useState("3");

    //TODO
    const [register, setRegister] = React.useState(0);
    // TODO
    const [history, setHistory] = React.useState();

    // Validity checks for the expression
    const [dotExistInExpr, setDotExistInExpr] = React.useState(false);
    const [parenthesisBalance, setParenthesisBalance] = React.useState(0);
    const [expectValue, setExpectValue] = React.useState(true);

    function valueClickHandler(value: string) {
        setExpr(expr + value);
        if (expectValue) {
            setExpectValue(false);
        };
    }

    const signClickHandler = (sign: string) => {
        if (expectValue) {
            return;
        }
        setExpr(expr + sign);
        setDotExistInExpr(false);
        setExpectValue(true);
    }
    
    const dotClickHandler = () => {
        if (!dotExistInExpr) {
            setExpr(expr + ".");
            setDotExistInExpr(true);
        }
    };

    const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const valueButtonProps: ButtonProps[] = values.map((value) => ({
        className: "valueButton",
        value: value,
        onClick: () => valueClickHandler(value),
    }));

    const dotButtonProps: ButtonProps = {
        className: "valueButton",
        value: ".",
        onClick: () => dotClickHandler(),
    };
    
    // TODO: Separate square root out (it's unary operator)
    const signs = ["+", "-", "*", "/", "%", "^", "√"];
    const signButtonProps: ButtonProps[] = signs.map((sign) => ({
        className: "signButton",
        value: sign,
        onClick: () => signClickHandler(sign),
    }));

    // const percentageButtonProps: ButtonProps = {
    //     className: "signButton",
    //     value: "%",
    //     onClick: () => percentageClickHandler(),
    // }

    const equalClickHandler = () => {
        let errMsg = "";
        let res = eval(expr);
        if (errMsg) {
            setExpr(errMsg);
        } else {
            setResult(result);
            setExpr(expr + "=");
        }
    };

    const equalButtonProps: ButtonProps = {
        className: "equalButton",
        value: "=",
        onClick: () => equalClickHandler(),
    };

    const buttons: ButtonProps[] = [
        ...valueButtonProps,
        ...signButtonProps,
        dotButtonProps,
        equalButtonProps
    ];


    return (
        <div className="calculator">
            <Screen expr={expr} result={result} />
            <ButtonBox buttons={buttons} />
        </div>
    )
}

export default Calculator;