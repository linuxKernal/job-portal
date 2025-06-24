import AmazonIcon from "../assets/amazon.png";
import ExperienceIcon from "../assets/exp.png";
import SalaryIcon from "../assets/salary.png";
import JobSiteIcon from "../assets/site.png";

export default function JobCard({
    jobTitle = "Full Stack Developer",
    jobType = "fulltime",
    maxSalary = 12,
    createdAt,
    description = "",
}) {
    return (
        <div className="w-[316px] rounded-card card px-8 py-4 flex flex-col justify-between  relative">
            <div className="space-y-3">
                <div className="w-[83px] height-[82px]">
                    <img
                        src={AmazonIcon}
                        className="w-[65px] h-[65px]"
                        alt=""
                    />
                </div>
                <h2 className="text-[20px] font-bold capitalize">{jobTitle}</h2>
                <div className="flex items-center gap-4 text-[14px]">
                    <span className="flex items-center gap-2">
                        <img
                            src={ExperienceIcon}
                            className="w-[18px] h-[15px]"
                            alt=""
                        />
                        <span className="flex gap-1">
                            <p className="text-nowrap">1-3</p>{" "}
                            <p className="text-nowrap">yr Exp</p>
                        </span>
                    </span>
                    <span className="flex items-center gap-2">
                        <img
                            src={JobSiteIcon}
                            className="w-[18px] h-[15px]"
                            alt=""
                        />
                        <p>{jobType}</p>
                    </span>
                    <span className="flex items-center gap-2">
                        <img
                            src={SalaryIcon}
                            className="w-[18px] h-[15px]"
                            alt=""
                        />
                        <span className="flex">
                            <p>{maxSalary}</p>LPA
                        </span>
                    </span>
                </div>
                <div>
                    <ul className="list-disc text-[14px] text-justify space-y-2">
                        {description.split(/\n/).map((text) => {
                            return (
                                <li key={text} className="leading-5">
                                    {text}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <p className="absolute top-2 px-2.5 py-1.5 text-[14px] font-medium right-2 text-black bg-time rounded-time">
                    {timeDifference(createdAt)}
                </p>
            </div>

            <button className="w-full bg-apply-btn hover:bg-white hover:text-apply-btn active:scale-105 duration-200 border-2 hover:border-apply-btn rounded-apply-btn py-2 px-2.5 text-white">
                Apply Now
            </button>
        </div>
    );
}

function timeDifference(pastTimestamp) {
    const pastDate = new Date(pastTimestamp);
    const currentDate = new Date();
    const differenceInSeconds = Math.floor((currentDate - pastDate) / 1000);

    const minutes = Math.floor(differenceInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return years === 1 ? "a year ago" : `${years}Y Ago`;
    } else if (months > 0) {
        return months === 1 ? "a month ago" : `${months}M Ago`;
    } else if (days > 0) {
        return days === 1 ? "a day ago" : `${days}D Ago`;
    } else if (hours > 0) {
        return hours === 1 ? "an hour ago" : `${hours}h Ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? "a minute ago" : `${minutes}m Ago`;
    } else {
        return "just now";
    }
}
