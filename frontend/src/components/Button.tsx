import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
export interface ButtonProps {
    type: string;
    value: string;
    onClick: () => void; 
}

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#e0e0e0',
    color: theme.palette.common.black,
    '&:hover': {
        backgroundColor: '#d5d5d5',
    },
    width: 100,
    height: 50,
    borderRadius: 5,
    boxShadow: 'inset 0px -4px 0px #3a4663',
    fontSize: 30,
    fontWeight: 600,
}
));

const CalcButton: React.FC<ButtonProps> = ({type, value, onClick}) => {
    return (
        <Grid item xs={3} sx={{marginTop: 1.5}} alignContent="center">
            <StyledButton 
                type={type} 
                value={value} 
                onClick={onClick}
            >
                {value}
            </StyledButton>
        </Grid>
    );
}

export default CalcButton;
