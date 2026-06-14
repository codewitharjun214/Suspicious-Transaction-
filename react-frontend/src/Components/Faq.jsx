import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import FaqCards from "./FaqCards";

function Faq() {
	return (
		<div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 p-6 lg:p-10">
			{/* FAQ Icon Section */}
			<div className="flex flex-row lg:flex-col items-center lg:items-start bg-gray-200 p-4 lg:p-6 rounded-lg">
				<LiveHelpIcon sx={{ fontSize: { xs: 80, md: 120, lg: 150 } }} />
				<div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 mt-2">
	<h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-green-600">F</h2>
	<h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-green-700">A</h2>
	<h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-green-800">Q</h2>
</div>

			</div>

			{/* FAQ Cards Section */}
			<div className="flex flex-col gap-4 lg:gap-6 w-full">
				<FaqCards
					question="How does your platform ensure the security of cryptocurrency transactions?"
					Answer="Our platform leverages cutting-edge encryption and blockchain technology to ensure that all transactions are secure and transparent. We use advanced cryptographic techniques to protect data and ensure that only authorized users can access transaction information."/>
				<FaqCards
					question="Can I track transactions in real-time?"
					Answer="Yes, our system provides real-time tracking of cryptocurrency transactions. You can monitor the status of any transaction, identify the involved parties, and ensure transparency throughout the entire process.!"
				/>
				<FaqCards
					question="How do I identify the end receiver of a transaction?"
					Answer="Our platform allows you to easily track the flow of funds, providing clear information about the end receiver of any transaction. By using blockchain analysis tools, we present detailed transaction records, making it simple to identify the recipient and ensure transparency.!"
				/>
			</div>
		</div>
	);
}

export default Faq;
