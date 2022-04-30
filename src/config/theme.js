import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['Nunito', 'sans-serif'],
        fontWeight: 'normal',
    },
    palette: {
        primary: {
            main: '#106cc8', 
        },
    },
    breakpoints: {
        values: {
          md: 760,
          lg: 900,
        },
      },
    overrides: {
        MuiContainer: {
            maxWidthXs: {
                maxWidth: '960px !important'
            },
            maxWidthSm: {
                maxWidth: '960px !important'
            },
            maxWidthMd: {
                maxWidth: '960px !important'
            },
            maxWidthLg: {
                maxWidth: '960px !important'
            },
        }
    }
});

export default theme;