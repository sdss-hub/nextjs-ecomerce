import { AppBar, Toolbar, Typography, Switch, Badge } from '@material-ui/core'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStyles } from '../utils/styles'
import NextLink from 'next/link'
import { useContext } from 'react';
import { Store } from '../context/Store';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic'
/* import CustomizedSwitch from '../elements/CustomizedSwitch'
 */function Header() {
    const classes = useStyles();
    const { state, dispatch } = useContext(Store)
    const { darkMode, cart } = state; // For toggle dark mode button
    const handlerdarkModeChange = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF')
    }
    console.log('cart length', cart.cartItems)
    return (
        <AppBar position="static" className={classes.navbar} >
            <Toolbar style={{display: 'flex', justifyContent:'space-between'}}>
                <div>

                <Typography className={classes.brand} style={{fontSize:'1.5rem', fontWeight:'bold'}}> 
                    <NextLink href="/">
                        <a>Shop App</a>
                    </NextLink>
                </Typography>
                </div>
                
                <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>

                <Switch checked={darkMode} onChange={handlerdarkModeChange}></Switch>
                {/* <CustomizedSwitch darkMode={darkMode} handlerdarkModeChange={handlerdarkModeChange}></CustomizedSwitch> */}
                <NextLink href="/cart">
                    <a> 
                         <Badge style={{bottom: '20px'}} color="secondary" badgeContent={cart.cartItems.length > 0 ? cart.cartItems.length : 0}></Badge>
                        <ShoppingCartIcon /> </a>
                </NextLink>
                <Typography>
                    <NextLink href="/login">
                        <a>Login</a>
                    </NextLink>
                </Typography>
                </div>
            </Toolbar>
        </AppBar>
    )
}


export default dynamic(() => Promise.resolve(Header), {ssr: false})