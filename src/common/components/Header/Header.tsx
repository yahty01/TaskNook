import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {ButtonSwitchTheme} from "../ButtonSwitchTheme/ButtonSwitchTheme";
import React from "react";
import styled from "styled-components";

export const Header = () => {
	return (
		<StyledAppBar >
			<AppBar position="static">
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
					<IconButton color="inherit">
						<MenuIcon/>
					</IconButton>
					<div>
						<Button color="inherit">Login</Button>
						<Button color="inherit">Logout</Button>
						<Button color="inherit">Faq</Button>
						<ButtonSwitchTheme/>
					</div>
				</Toolbar>
			</AppBar>
		</StyledAppBar>
	);
};

const StyledAppBar = styled(AppBar)`
	max-height: 200px;
	width: 100%;
`