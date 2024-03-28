import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@/icon/Menu";
import Image from "next/image";
import Link from "next/link";
import {
	Avatar,
	Dropdown,
	DropdownMenu,
	DropdownTrigger,
	DropdownItem,
} from "@nextui-org/react";
import { UserIcon } from "@/app/administration/components/Header/UserIcon";
import Exchange from "@/icon/Exchange";
import Logout from "@/icon/Logout";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import { logout } from "@/redux/state/authSlice";
import { toast } from "react-toastify";

const drawerWidth = 240;
const navItems = [
	{ text: "Home", link: "/dashboard" },
	{ text: "System Admin", link: "/dashboard/admin" },
	{ text: "STS Manager", link: "/dashboard/sts" },
	{ text: "Landfill Manager", link: "/dashboard/landfill" },
];

function NavBar(props) {
	const { window, children } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const submitLogout = async () => {
		try {
			const result = await axios({
				method: "GET",
				url: process.env.backendUrl + "/auth/logout",
				headers: {
					authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
			});

			if (!result.data.success) {
				throw new Error(result.data.message);
			}

			dispatch(logout());
			router.push("/");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<div className="font-bold text-2xl py-4 w-full text-center">
				EcoSync
			</div>
			<Divider />
			<List>
				{navItems.map((item, idx) => (
					<ListItem key={idx} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<Link href={item.link}>{item.text}</Link>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<Menu />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: "none", sm: "block" },
						}}
					>
						<Image
							className="rounded-full"
							src="/assets/logo.png"
							width={50}
							height={50}
						/>
					</Typography>
					<Box
						sx={{
							display: { xs: "none", sm: "block", sm: "flex" },
						}}
					>
						{navItems.map((item, idx) => (
							<Button key={idx} sx={{ color: "#fff" }}>
								<Link href={item.link}>{item.text}</Link>
							</Button>
						))}
					</Box>
					<Dropdown className="bg-sky-500 font-extrabold">
						<DropdownTrigger>
							<Avatar
								name="Masud"
								src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Static Actions">
							<DropdownItem key="new">
								<div className="flex items-center space-x-2 flex-row">
									<UserIcon />
									<Link href="/dashboard/profile">Profile</Link>
								</div>
							</DropdownItem>
							<DropdownItem key="copy">
								<div className="flex items-center space-x-2 flex-row">
									<Exchange />
									<Link href="/auth/change-password">
										Change Password
									</Link>
								</div>
							</DropdownItem>
							<DropdownItem key="edit">
								<div
									className="flex items-center space-x-2 flex-row"
									onClick={submitLogout}
								>
									<Logout />
									<span>Log Out</span>
								</div>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</nav>
			<div className="w-full flex flex-col h-screen pt-[55px] sm:pt-[64px] pb-1 items-center">
				{children}
			</div>
		</Box>
	);
}

export default NavBar;
