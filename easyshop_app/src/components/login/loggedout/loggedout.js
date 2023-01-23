import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import Background from '../../../res/background.jpg'

export function LoggedOut() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "calc(100vh - 48px)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "blue",
                backgroundImage: `url(${Background})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>
            <Box
                sx={{
                    padding: "10px",
                    width: "500px",
                    height: "300px",
                    borderRadius: "10px",
                    backgroundColor: "white"
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "center"
                    }}>
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{
                            fontWeight: "bold"
                        }}>
                        Goodbye.
                    </Typography>
                    <Box
                        sx={{
                            marginTop: "10px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}>
                        <Typography
                            variant="p"
                            align="center"
                            sx={{
                                marginTop: "10px",
                                fontWeight: "bold"
                            }}>
                            Not finished yet?
                        </Typography>
                        <Button
                            variant="contained"
                            href="login"
                            sx={{
                                marginLeft: "10px"
                            }}>
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}