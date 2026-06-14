import ProductUsingGif from "../Images/Product demo Gif.gif";
import CategoryIcon from "@mui/icons-material/Category";
import {Link} from "react-router-dom";

const Demo = () => {
	return (
		<div className="w-11/12 sm:w-10/12 md:w-10/12 lg:w-9/12 xl:w-11/12 mx-auto h-fit gap-4 sm:gap-6 lg:gap-8 rounded-lg overflow-hidden flex flex-col md:flex-row p-3 sm:p-4 md:p-6 mb-8 sm:mb-12 bg-white shadow-lg">
			{/* Left Side: Icon, Heading, and Image */}
			<div className="w-full md:w-1/2 flex flex-col items-start space-y-3 sm:space-y-4 md:space-y-6">
				{/* Icon and Heading */}
				<div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
					<CategoryIcon sx={{ fontSize: { xs: 32, sm: 40, md: 50 } }} />
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-500 leading-tight">
						Start Tracking Now
					</h2>
				</div>

				{/* Feature Image */}
				<img
					src={ProductUsingGif}
					alt="Feature"
					className="w-full h-auto rounded-md object-cover"
				/>
			</div>

			{/* Right Side: Feature Title and Description */}
			<div className="w-full md:w-1/2 flex flex-col justify-center space-y-3 sm:space-y-4">
				<h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 pb-2 sm:pb-4 leading-tight">
					Track Cryptocurrency Transactions.
				</h3>
				<p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
					Efficient and secure transaction tracking. Built with cutting-edge technology. Identify the end receiver easily. Ensure transparency in the blockchain.
				</p>
				<div className="flex flex-col gap-2 sm:gap-3 md:gap-4 pt-2">
					<Link to="/dashboard" className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300 inline-flex items-center justify-center text-sm sm:text-base w-full sm:w-auto">
						Get Started
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Demo;
