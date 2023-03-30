import * as React from "react";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import {ButtonProps} from "./Button";
import Evaluator from "../evaluator/evaluator";


const Calculator: React.FC<{}> = () => {
    const evaluator = new Evaluator();
    // Core state of the calculator
    const [expr, setExpr] = React.useState("");
    const [result, setResult] = React.useState("");

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
        if (expectValue && sign !== "-" && sign !== "√") {
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
    
    const signs = ["+", "-", "*", "/", "^", "√"];
    const signButtonProps: ButtonProps[] = signs.map((sign) => ({
        className: "signButton",
        value: sign,
        onClick: () => signClickHandler(sign),
    }));

    const percentageClickHandler = () => {
        if (expectValue) {
            return;
        } else {
            setExpr(expr + "%");
        }
    };

    const percentageButtonProps: ButtonProps = {
        className: "signButton",
        value: "%",
        onClick: () => percentageClickHandler(),
    }

    const brackets = ["(", ")"];
    const bracketClickHandler = (bracket: string) => {
        if (bracket === "(") {
            setParenthesisBalance(parenthesisBalance + 1);
            setExpr(expr + bracket);
        } else if (bracket === ")") {
            if (parenthesisBalance > 0) {
                setParenthesisBalance(parenthesisBalance - 1);
                setExpr(expr + bracket);
            } else {
                return;
            }
            setExpr(expr + bracket);
        }
    };
    
    const bracketButtonProps: ButtonProps[] = brackets.map((bracket) => ({
        className: "signButton",
        value: bracket,
        onClick: () => bracketClickHandler(bracket),
    }));

    const equalClickHandler = () => {
        try {
            let res = evaluator.evaluate(expr);
            setResult(res.toString());
        } catch (err: any) {
            setResult(err.message);
        }
    };

    const equalButtonProps: ButtonProps = {
        className: "equalButton",
        value: "=",
        onClick: () => equalClickHandler(),
    };

    const clearClickHandler = () => {
        setExpr("");
        setResult("");
        setDotExistInExpr(false);
        setExpectValue(true);
        // TODO: Save history
    };

    const clearButtonProps: ButtonProps = {
        className: "clearButton",
        value: "C",
        onClick: () => clearClickHandler(),
    };

    const buttons: ButtonProps[] = [
        ...valueButtonProps,
        ...signButtonProps,
        dotButtonProps,
        equalButtonProps,
        percentageButtonProps,
        ...bracketButtonProps,
        clearButtonProps,
    ];


    return (
        <div className="calculator">
            <Screen expr={expr} result={result} />
            <ButtonBox buttons={buttons} />
        </div>
    )
}

export default Calculator;