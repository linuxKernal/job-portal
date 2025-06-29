import { useAppContext } from "../AppContext";
import { Loader } from "@mantine/core";
import JobCard from "./JobCard";

export default function JobList() {
    const {
        state: {
            searchJobTitle,
            searchLocation,
            searchJobType,
            isLoading,
            searchMinSalary,
            searchMaxSalary,
            jobs,
        },
    } = useAppContext();

    const searchedList = jobs.filter((item) => {
        const matchesTitle = searchJobTitle
            ? item.jobTitle.toLowerCase().includes(searchJobTitle.toLowerCase())
            : true;

        const matchesLocation = searchLocation
            ? item.location.toLowerCase().includes(searchLocation.toLowerCase())
            : true;

        const matchesJobType = searchJobType
            ? item.jobType.toLowerCase() === searchJobType.toLowerCase()
            : true;

        const filterMinSalary = searchMinSalary ? searchMinSalary * 1000 : 0;

        const filterMaxSalary = searchMaxSalary
            ? searchMaxSalary * 1000
            : Infinity;

        const matchesSalary =
            item.maxSalary >= filterMinSalary &&
            item.minSalary <= filterMaxSalary;

        return (
            matchesTitle && matchesLocation && matchesJobType && matchesSalary
        );
    });

    return (
        <div
            className={`flex mt-16 gap-4 flex-wrap mx-16 ${
                isLoading ? "justify-center items-center" : ""
            }`}
        >
            {isLoading ? (
                <Loader color="blue" size="lg" />
            ) : (
                searchedList.map(function (item) {
                    return (
                        <JobCard
                            key={item._id}
                            jobTitle={item.jobTitle}
                            jobType={item.jobType}
                            description={item.description}
                            maxSalary={item.maxSalary}
                            createdAt={item.createdAt}
                        />
                    );
                })
            )}
        </div>
    );
}
