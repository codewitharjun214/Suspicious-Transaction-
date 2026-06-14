import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import websiteLogo from "../Images/websiteLogo.png";
import { UserContext } from "../UserContext";

function ResponsiveAppBar() {
	const { userData, logout } = React.useContext(UserContext);

	return (
		<AppBar position="relative" sx={{ backgroundColor: "#000000", color: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
			<Container maxWidth={false} disableGutters>
				<Toolbar 
					disableGutters 
					sx={{ 
						minHeight: { xs: 56, sm: 64 }, 
						px: 0,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					}}
				>
					{/* Logo Section */}
					<Box sx={{ display: "flex", alignItems: "center", mr: { xs: 1, sm: 2 } }}>
						<img 
							src={websiteLogo} 
							alt="App Logo" 
							style={{ 
								width: 40, 
								height: 40,
								objectFit: "contain"
							}} 
						/>
					</Box>

					<Box sx={{ flexGrow: 1 }} />

					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						{userData ? (
							<>
								<Button
									component={Link}
									to="/home"
									sx={{
										color: "white",
										textTransform: "none",
										px: 2,
										py: 1,
										"&:hover": { backgroundColor: "rgba(255,255,255,0.08)" }
								}}
								>
									Home
								</Button>
								<Button
									onClick={logout}
									sx={{
										color: "white",
										borderColor: "rgba(255,255,255,0.4)",
										border: "1px solid rgba(255,255,255,0.35)",
										borderRadius: "999px",
										textTransform: "none",
										px: 2,
										py: 1,
										"&:hover": { backgroundColor: "rgba(255,255,255,0.08)" }
								}}
								>
									Logout
								</Button>
							</>
						) : (
							<Button
								component={Link}
								to="/login"
								sx={{
									color: "white",
									borderColor: "rgba(255,255,255,0.4)",
									border: "1px solid rgba(255,255,255,0.35)",
									borderRadius: "999px",
									textTransform: "none",
									px: 2,
									py: 1,
									"&:hover": { backgroundColor: "rgba(255,255,255,0.08)" }
								}}
							>
								Login
							</Button>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default ResponsiveAppBar;

