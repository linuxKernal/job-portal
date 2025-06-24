import "@mantine/core/styles.css";

import { RangeSlider } from "@mantine/core";

import SearchIcon from "../assets/search.png";
import LocationIcon from "../assets/location.png";
import JobTypeIcon from "../assets/job_type.png";
import DropDownIcon from "../assets/dropdown.png";
import { useAppContext } from "../AppContext";

export default function JobFilters() {
    const { state, dispatch } = useAppContext();

    const {
        searchJobTitle,
        searchLocation,
        searchJobType,
        searchMinSalary,
        searchMaxSalary,
    } = state;
    return (
        <div className="flex mt-4 w-11/12 p-4 mx-auto justify-evenly items-center gap-4 flex-wrap">
            <span className="flex grow gap-4 py-2 items-center border-r-2 border-r-line">
                <span>
                    <img
                        src={SearchIcon}
                        className="w-[18px] h-[18px]"
                        alt="search icon image"
                    />
                </span>
                <input
                    value={searchJobTitle}
                    onChange={(e) =>
                        dispatch({
                            type: "searchJobTitle",
                            payload: e.target.value,
                        })
                    }
                    className="outline-0 w-full"
                    type="text"
                    placeholder="Search By Job Title, Role"
                />
            </span>
            <span className="flex grow items-center py-2 gap-4 border-r-2 border-r-line">
                <span className="flex gap-4 items-center w-full">
                    <img
                        src={LocationIcon}
                        className="w-[18px] h-[18px]"
                        alt="location icon image"
                    />
                    <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) =>
                            dispatch({
                                type: "searchLocation",
                                payload: e.target.value,
                            })
                        }
                        className="outline-0 w-full"
                        placeholder="Preferred Location"
                    />
                </span>

                <span className="shrink-0 px-2 pr-6">
                    <img src={DropDownIcon} alt="dropdown icon image" />
                </span>
            </span>
            <span className="grow border-r-2 border-r-line shrink-0 basis-56">
                <span className="flex gap-4 items-center w-full">
                    <img
                        src={JobTypeIcon}
                        className="w-[18px] h-[18px]"
                        alt="job type icon image"
                    />
                    <select
                        value={searchJobType}
                        onChange={(e) =>
                            dispatch({
                                type: "searchJobType",
                                payload: e.target.value,
                            })
                        }
                        className="outline-0 select-tag appearance-none py-2 w-full"
                    >
                        <option value="fulltime">FullTime</option>
                        <option value="parttime">PartTime</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                    </select>
                </span>
            </span>
            <span className="space-y-3 shrink-0 w-96">
                <span className="flex justify-between font-semibold text-[rgba(34,34,34,1)]">
                    <p className="text-nowrap grow">Salary Per Month</p>
                    <span className="flex gap-2">
                        <span className="flex">
                            <p>&#8377;</p>
                            <p>{searchMinSalary}K</p>
                        </span>
                        -
                        <span className="flex">
                            <p>&#8377;</p>
                            <p>{searchMaxSalary}K</p>
                        </span>
                    </span>
                </span>
                <span className="mb-4">
                    <RangeSlider
                        color="rgba(34, 34, 34, 1)"
                        size="xs"
                        min={0}
                        max={200}
                        styles={{
                            thumb: { borderWidth: 6, padding: 3 },
                        }}
                        label={null}
                        thumbSize={16}
                        showLabelOnHover={false}
                        value={[searchMinSalary, searchMaxSalary]}
                        onChange={(val) =>
                            dispatch({
                                type: "searchSalary",
                                payload: val,
                            })
                        }
                    />
                </span>
            </span>
        </div>
    );
}
