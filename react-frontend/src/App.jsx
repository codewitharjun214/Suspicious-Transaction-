import Loading from "./Components/Loading";

import React, { useState, useEffect } from "react";
import MainPage from "./Components/Mainpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import BtcVisual from "./BtcVisual";
import EthVisual from "./EthVisual";
import HackerThemeBiodata from "./UserDetails";
import InvestigativeInterface from "./demoDetails";
import BackToTop from "./Components/BackToTop";
import NeoGraphDemo from "./Components/NeoGraphDemo";
import Login from "./Components/Login";
import WelcomeAnimation from "./Components/WelcomeAnimation";
import RequireAuth from "./RequireAuth";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";
import { UserProvider } from "./UserContext";

const App = () => {
	const [isLoading, setIsLoading] = useState(true); // Loading state
	const [isLoadingBTC, setIsLoadingBTC] = useState(true); // Loading state

	useEffect(() => {
		// Set a timer for 3 seconds to transition to the main page
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer); // Cleanup the timer
	}, []);

	

	return (
		<UserProvider>
			<UserPreferencesProvider>
				<>
				<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/welcome" element={<WelcomeAnimation />} />
					<Route path="/home" element={<RequireAuth><div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
		  {isLoading ? <Loading /> : <MainPage />}
	</div></RequireAuth>} />
					<Route path="/dashboard" element={<UserDashboard />} />
					<Route path="/btc" element={<BtcVisual/>}/>
			      <Route path="/eth" element={<EthVisual/>}/>
					<Route path="/biodata1" element={<HackerThemeBiodata/>}/>
					<Route path="/neograph" element={<NeoGraphDemo/>} />
					{/* <Route path="/biodata1" element={<InvestigativeInterface/>}/> */}
				</Routes>
				</BrowserRouter>
				<BackToTop />
				</>
			</UserPreferencesProvider>
		</UserProvider>
	);
};

export default App;
