import backvid from "../Images/Hero.mp4";
import {Link} from "react-router-dom";

function Hero() {
	return (
		<div className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
			{/* Video Background */}
			<video
				className="absolute top-0 left-0 w-full h-full object-cover"
				src={backvid}
				autoPlay
				loop
				muted
				playsInline
			></video>

			{/* Overlay on Left Side */}
			<div className="absolute top-0 left-0 h-full w-full md:w-1/2 bg-black bg-opacity-60 md:bg-opacity-50"></div>

			{/* Left-Aligned Content */}
			<div className="relative z-10 h-full flex flex-col justify-center text-left p-4 sm:p-6 md:p-8 lg:p-12 text-white w-full md:w-1/2">
				<h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 leading-tight">
					Track Cryptocurrency Transactions
				</h1>
				<p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 leading-relaxed opacity-95">
					Efficient and secure transaction tracking. Built with cutting-edge
					technology. Identify the end receiver easily. Ensure transparency in
					the blockchain.
				</p>
				<div className="flex flex-col gap-3 sm:gap-4 sm:flex-row mt-2">
					<Link to="/dashboard" className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition duration-300 inline-flex items-center justify-center text-sm sm:text-base">
						Get Started
					</Link>

					<a
						href="https://en.wikipedia.org/wiki/Cryptocurrency_scams"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block"
					>
						<button className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300 text-sm sm:text-base">
							Learn More
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}

export default Hero;
