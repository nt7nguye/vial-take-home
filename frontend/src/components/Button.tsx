import * as React from 'react';
import Button from '@mui/material/Button';

export interface ButtonProps {
    className: string;
    value: string;
    onClick: () => void; 
}

const CalcButton: React.FC<ButtonProps> = ({className, value, onClick}) => {
    return (
        <Button 
            className={className} 
            value={value} 
            onClick={onClick}
            sx={{
                borderRadius: 5
            }}>
            {value}
        </Button>
    );
}

export default CalcButton;
