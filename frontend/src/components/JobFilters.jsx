import "@mantine/core/styles.css";

import { RangeSlider } from "@mantine/core";
import SearchIcon from "../assets/search.png";
import LocationIcon from "../assets/location.png";
import JobTypeIcon from "../assets/job_type.png";
import DropDownIcon from "../assets/dropdown.png";
import { useAppContext } from "../AppContext";
import { useState } from "react";

import cities from "../data";

export default function JobFilters() {
    const { state, dispatch } = useAppContext();
    const [isListOpen, setIdListOpen] = useState(false);
    const [isJobListOpen, setIdJobListOpen] = useState(false);

    const {
        searchJobTitle,
        searchLocation,
        searchJobType,
        searchMinSalary,
        searchMaxSalary,
    } = state;
    return (
        <div className="grid grid-cols-4 mt-4 p-4 mx-10 gap-4">
            <span className="flex gap-4 py-2 items-center border-r-2 border-r-line">
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
            <span className="flex justify-around items-center py-2 gap-4 border-r-2 border-r-line">
                <img
                    src={LocationIcon}
                    className="w-[18px] h-[18px]"
                    alt="location icon image"
                />
                <div className="cursor-default relative w-full">
                    <input
                        type="text"
                        value={searchLocation}
                        autoComplete="off"
                        id="location"
                        onFocus={() => {
                            setIdListOpen(true);
                        }}
                        onBlur={() => {
                            // setIdListOpen(false);
                        }}
                        onChange={(e) =>
                            dispatch({
                                type: "searchLocation",
                                payload: e.target.value,
                            })
                        }
                        className="outline-0 w-full bg-white"
                        placeholder="Preferred Location"
                    />
                    {isListOpen && (
                        <div className="absolute bg-white -bottom-44 w-full px-2 shadow-md z-20 rounded-b-lg">
                            <ul
                                className="**:hover:bg-light **:p-1 h-40 overflow-y-auto bar"
                                onClick={(e) => {
                                    if (e.target.localName !== "li") return;
                                    dispatch({
                                        type: "searchLocation",
                                        payload: e.target.textContent,
                                    });
                                    setIdListOpen(false);
                                }}
                            >
                                {cities.map((name) => {
                                    if (
                                        !searchLocation ||
                                        name
                                            .toLowerCase()
                                            .includes(
                                                searchLocation.toLowerCase()
                                            )
                                    )
                                        return <li>{name}</li>;
                                })}
                            </ul>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => {
                        setIdListOpen((prev) => !prev);
                    }}
                    className="h-full shrink-0 mr-4"
                >
                    <img
                        src={DropDownIcon}
                        className={`duration-300 ${isListOpen && "rotate-180"}`}
                        alt="dropdown icon image"
                    />
                </button>
            </span>
            <span className="border-r-2 border-r-line shrink-0 basis-56">
                <span className="flex gap-4 items-center w-full">
                    <img
                        src={JobTypeIcon}
                        className="w-[18px] h-[18px]"
                        alt="job type icon image"
                    />
                    <div className="relative w-full flex justify-around">
                        <button
                            className="text-[#686868] cursor-default select-none py-2 w-full text-left"
                            onClick={() => {
                                setIdJobListOpen((prev) => !prev);
                            }}
                        >
                            {searchJobType || "Job type"}
                        </button>

                        <ul
                            className={`${
                                !isJobListOpen && "invisible"
                            } absolute bg-white -bottom-40 **:select-none z-30 cursor-default **:p-1 w-full **:hover:bg-light p-3 shadow-md rounded-md`}
                            onClick={(e) => {
                                if (e.target.localName !== "li") return;
                                dispatch({
                                    type: "searchJobType",
                                    payload: e.target.textContent,
                                });
                                setIdJobListOpen(false);
                            }}
                        >
                            <li>FullTime</li>
                            <li>PartTime</li>
                            <li>Contract</li>
                            <li>Internship</li>
                        </ul>
                        <button
                            onClick={() => {
                                setIdJobListOpen((prev) => !prev);
                            }}
                            className="shrink-0 mr-4"
                        >
                            <img
                                src={DropDownIcon}
                                className={`duration-300 ${
                                    isJobListOpen && "rotate-180"
                                }`}
                                alt="dropdown icon image"
                            />
                        </button>
                    </div>
                </span>
            </span>
            <span className="space-y-3">
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
                        min={1}
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
