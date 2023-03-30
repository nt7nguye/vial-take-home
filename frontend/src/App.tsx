import { useState } from 'react'
import  Calculator  from './components/calculator/Calculator'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'
import { Container } from '@mui/material'
import NavBar from './components/calculator/NavBar';

const App: React.FC = () => {
  const theme = createTheme({ 
    palette: {
      background: {
        default: '#4f5769',
      },
      text: {
        primary: '#e0e0e0',
      },
    }
  });

  const [user, setUser] = useState<string | null>(null)
  const signOutHandler = () => {
    console.log("sign out")
  }

  return (
    <ThemeProvider theme={theme}>
      <NavBar username="Tan Nguyen" onSignOut={() => signOutHandler()}/>
      <Container component="main" maxWidth="lg"> 
        <CssBaseline/>
        <Calculator/>
      </Container>
    </ThemeProvider>
  )
}

export default App
