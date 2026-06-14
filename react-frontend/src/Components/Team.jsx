import GroupsIcon from "@mui/icons-material/Groups";
import TeamCard from "./TeamCard";
import team2 from "../Images/team2.avif";
import team3 from "../Images/team3.avif";
import team4 from "../Images/team4.avif";
import team5 from "../Images/team5.avif";

function Team() {
return (
<>
<div className="bg-zinc-900 h-full">
<div className="flex flex-col justify-center items-center mt-20">
<GroupsIcon sx={{ fontSize: 150, color: "white" }} />
<h1 className="text-6xl font-bold text-center text-green-500">
Our Team
</h1>
<p className="text-l pt-5 text-center text-white">
Meet the talented individuals behind our projects.
</p>
</div>
{/* Responsive Grid for Team Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-10 max-w-7xl mx-auto justify-items-center">
<TeamCard
photo={team3}
cname="Sudhir Dongargave"
role="Student"
description="Vishwabharti Academy College Of Engineering Ahilyanagar"
linkedin=""
email=""
/>
<TeamCard
photo={team2}
cname="Arjun Kadam"
role="Student"
description="Vishwabharti Academy College Of Engineering Ahilyanagar"
linkedin="https://www.linkedin.com/in/kadamarjun214/"
github="https://github.com/codewitharjun214"
email="arjunofficial7507@gmail.com"
/>
<TeamCard
photo={team5}
cname="Akash Chindhe"
role="Student"
description="Vishwabharti Academy College Of Engineering Ahilyanagar"
linkedin=""
email=""
/>
</div>
</div>
<p></p>
</>
);
}

export default Team;
