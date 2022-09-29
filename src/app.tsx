import React from 'react'
import {Box} from '@mui/material'
import {
  createTheme,
  ThemeOptions,
  PaletteColorOptions,
  ThemeProvider,
  CustomPalette,
} from '@mui/material/styles'

import AppRoutes from './routes/Routes'
import UserContext from './context/userContext/userContext'

declare module '@mui/material/styles' {
  interface CustomPalette {
    blue: PaletteColorOptions
    apple: PaletteColorOptions
    transparent: PaletteColorOptions
    steelBlue: PaletteColorOptions
    violet: PaletteColorOptions
  }
  type Palette = CustomPalette
  type PaletteOptions = CustomPalette
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blue: true
    transparent: true
    apple: true
    steelBlue: true
    violet: true
  }
}

const {palette} = createTheme()
const {augmentColor} = palette
const createColor = (mainColor: string) => augmentColor({color: {main: mainColor}})
const theme = createTheme({
  palette: {
    white: createColor('#fff'),
    transparent: {main: '#00000000', contrastText: '#fff'},
    blue: {main: '#00A3FF', contrastText: '#fff'},
    apple: createColor('#5DBA40'),
    steelBlue: createColor('#5C76B7'),
    violet: createColor('#BC00A3'),
  } as CustomPalette,
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
} as ThemeOptions)

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <Box component="div" className="app-container">
        <UserContext>
          <AppRoutes />
        </UserContext>
      </Box>
    </ThemeProvider>
  </div>
)

export default App
