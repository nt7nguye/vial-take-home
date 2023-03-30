import * as React from "react";
import {ButtonProps} from "./Button";
import Evaluator from "../evaluator/evaluator";
import { Box } from "@mui/system";
import { Grid, Paper, Typography, Popover, Button } from "@mui/material";
import CalcButton from "./Button";

const Calculator: React.FC<{}> = () => {
    const evaluator = new Evaluator();
    // Core state of the calculator
    const [expr, setExpr] = React.useState("");
    const [prevExpr, setPrevExpr] = React.useState("");

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
        type: "valueButton",
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
        type: "signButton",
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
            setPrevExpr(expr);
            setExpr(res.toString());
        } catch (err: any) {
            setPrevExpr(err.message);
        }
    };

    const equalButtonProps: ButtonProps = {
        type: "equalButton",
        value: "=",
        onClick: () => equalClickHandler(),
    };

    const clearClickHandler = () => {
        setExpr("");
        setPrevExpr("");
        setDotExistInExpr(false);
        setExpectValue(true);
    };

    const clearButtonProps: ButtonProps = {
        type: "clearButton",
        value: "C",
        onClick: () => clearClickHandler(),
    }; 

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const popoverClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event?.currentTarget);
        setOpen(!open);
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Grid container maxWidth={550}>
                <Grid item xs={12}>
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 2,
                        }}
                    >
                        <Typography component="h1" variant="h3" align="left">Calculator</Typography>
                        <Button variant="contained" onClick={popoverClickHandler}> History</Button>
                        <Popover
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={open}
                            anchorEl={anchorEl}
                        >
                            "Test"
                        </Popover>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            width: "100%",
                            alignItems: 'right',
                            backgroundColor: "#191f2f",
                            height: 100,
                            borderRadius: 5,
                        }}
                    >
                        <Typography component="h1" variant="h6" align="right">{prevExpr}</Typography>
                        <Typography component="h1" variant="h4" align="right">{expr}</Typography>
                    </Paper>
                </Grid>
                <Grid container xs={12} sx={{ backgroundColor: "#242d44", marginTop: 3, padding: 3, borderRadius: 5}}>
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />

                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />

                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />

                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />

                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />

                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                        
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                    <CalcButton {...equalButtonProps} />
                </Grid>
            </Grid>
        </Box> 
    )
}

export default Calculator;