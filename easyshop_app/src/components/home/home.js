import { Box, Typography } from '@mui/material';
import Logo from '../../res/logo.png'
import Background from '../../res/background.jpg'

export function Home(props) {
    return (
        <Box
            sx={{
                height: 'auto',
                width: '100%',
                display: 'flex',
                flexDirection: 'row'
            }}>
            <Box
                sx={{
                    width: '55vw',
                    height: 'calc(100vh - 60px)',
                    backgroundColor: '#6B8E23',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                <Box
                    sx={{
                        paddingLeft: '200px'
                    }}>
                    <Box
                        component="img"
                        sx={{
                            height: '100px',
                            width: 'auto',
                            mixBlendMode: 'multiply'
                        }}
                        alt="Company Logo"
                        src={Logo}/>
                    <Typography
                        sx={{
                            fontFamily:  '"League Spartan", sans-serif',
                            fontWeight: '600',
                            fontSize: '60px',
                            lineHeight: '1',
                            paddingTop: '20px',
                            paddingBottom: '20px'
                        }}>
                        The Best Thing Since Sliced Bread
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: '"League Spartan", sans-serif',
                            fontWeight: '400',
                            fontSize: '30px'
                        }}>
                        Create, Share and Explore Recipes Easily
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '45vw',
                    height: 'calc(100vh - 60px)',
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}>
            </Box>
        </Box>
    )
}