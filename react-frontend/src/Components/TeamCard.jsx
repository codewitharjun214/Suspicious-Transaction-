import { Email, GitHub, LinkedIn } from "@mui/icons-material";

const TeamCard = ({
	photo,
	cname,
	role,
	description,
	github,
	linkedin,
	email,
}) => {
	return (
		<>
			<div className="flex flex-col justify-center items-center gap-4 p-8 w-full max-w-sm bg-gray-500 bg-opacity-50 hover:bg-acidgreen-light rounded-xl">
				<div>
					<img src={photo} alt={cname} className="w-52 h-52 sm:w-60 sm:h-60 rounded-full" />
				</div>

				<h2 className="text-2xl font-bold">{cname}</h2>
				<p className="text-lg">{role}</p>
				<p className="text-md text-center">{description}</p>
				<div className="flex flex-row justify-center items-center gap-4">
					{github ? (
						<a href={github} target="_blank" rel="noopener noreferrer">
							<GitHub className="text-4xl text-gray-600 hover:text-gray-900" />
						</a>
					) : null}
					{linkedin ? (
						<a href={linkedin} target="_blank" rel="noopener noreferrer">
							<LinkedIn className="text-4xl text-gray-600 hover:text-gray-900" />
						</a>
					) : null}
					{email ? (
						<a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
							<Email className="text-4xl text-gray-600 hover:text-gray-900" />
						</a>
					) : null}
				</div>
			</div>
		</>
	);
};

export default TeamCard;
