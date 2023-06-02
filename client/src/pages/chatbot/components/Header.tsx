import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react';

const Header: FC<any> = ({ setOpen, open }) => {
    return (
        <Box >
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', gap: '10px' }}>
                    <div className=" chatbot-circular chatbot-border" >
                        <span className="chatbot-image " >
                            <img src="https://cdn-bot.phenompeople.com/assets/icons/icon_5.svg" alt="chatbot-icon" />
                        </span>
                    </div>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                        FIS Meeting ChatBot
                    </Typography>
                    <Button onClick={() => setOpen(false)}
                        sx={{ color: 'white', marginRight: '-20px' }}>
                        <CloseIcon />
                    </Button>
                </Toolbar>
            </AppBar>
        </Box >)
}

export default Header

