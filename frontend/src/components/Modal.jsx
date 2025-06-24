import { useEffect } from "react";

import { Loader } from "@mantine/core";
import UpAndDownArrowIcon from "../assets/up_down_arrow.png";
import TwoDownArrowIcon from "../assets/down_arrow.png";
import TwoSideArrowIcon from "../assets/side_arrow.png";
import { useAppContext } from "../AppContext";
import { BASE_URL } from "../config";

export default function Modal({ setIsModelOpen }) {
    const { state, dispatch } = useAppContext();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            dispatch({
                type: "updateFormLoading",
                payload: true,
            });
            const {
                jobTitle,
                companyName,
                location,
                jobType,
                minSalary,
                maxSalary,
                applicationDeadline,
                description,
            } = state;

            const res = await fetch(`${BASE_URL}/jobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jobTitle,
                    companyName,
                    location,
                    jobType,
                    minSalary,
                    maxSalary,
                    applicationDeadline,
                    description,
                }),
            });

            const data = await res.json();
            dispatch({
                type: "addNewJob",
                payload: data.data.jobPost,
            });
            setIsModelOpen(false);
            dispatch({ type: "clear" });
        } catch (error) {
            console.error(error);
        } finally {
            dispatch({
                type: "updateFormLoading",
                payload: false,
            });
        }
    }

    useEffect(
        function () {
            function handleEsc(event) {
                if (event.key === "Escape") {
                    setIsModelOpen(false);
                }
            }
            document.addEventListener("keydown", handleEsc);
            return () => document.removeEventListener("keydown", handleEsc);
        },
        [setIsModelOpen]
    );

    return (
        <div className="flex justify-center items-center absolute top-0 z-40 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]">
            <div className="max-w-[848px] bg-white p-6 rounded-form">
                <h2 className="text-[24px] text-center pb-4">
                    Create Job Opening
                </h2>
                <form className="flex flex-wrap gap-2" onSubmit={handleSubmit}>
                    <div className="flex gap-2 w-full">
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="job_title">Job Title</label>
                            <input
                                className="outline-0 border-1 border-[rgba(188,188,188,1)] rounded-time p-2 py-3"
                                type="text"
                                value={state.jobTitle}
                                onChange={(e) =>
                                    dispatch({
                                        type: "updateJobTitle",
                                        payload: e.target.value,
                                    })
                                }
                                required
                                minLength={3}
                                placeholder="Full stack developer"
                                id="job_title"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="company_name">Company Name</label>
                            <input
                                className="outline-0 border-1 border-[rgba(188,188,188,1)] rounded-time p-2 py-3"
                                type="text"
                                required
                                value={state.companyName}
                                onChange={(e) =>
                                    dispatch({
                                        type: "updateCompanyName",
                                        payload: e.target.value,
                                    })
                                }
                                minLength={3}
                                placeholder="Amazon, Microsoft, Swiggy"
                                id="company_name"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 w-full">
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="location">Location</label>
                            <input
                                className="outline-0 border-1 border-[rgba(188,188,188,1)] rounded-time p-2 py-3"
                                type="text"
                                required
                                value={state.location}
                                onChange={(e) =>
                                    dispatch({
                                        type: "updateLocation",
                                        payload: e.target.value,
                                    })
                                }
                                minLength={3}
                                placeholder="Choose Preferred Location"
                                id="location"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="job_type">Job Type</label>
                            <select
                                required
                                value={state.jobType}
                                onChange={(e) =>
                                    dispatch({
                                        type: "updateJobType",
                                        payload: e.target.value,
                                    })
                                }
                                className="outline-0 border-1 select-tag appearance-none border-[rgba(188,188,188,1)] rounded-time p-2 py-3"
                                id="job_type"
                            >
                                <option value="fulltime">FullTime</option>
                                <option value="parttime">PartTime</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex w-full gap-2">
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="company_name">Salary Range</label>
                            <div className="flex gap-2 items-center">
                                <div className="border-1 p-2 gap-2 border-[rgba(188,188,188,1)] items-center flex rounded-time w-full">
                                    <img
                                        className="w-[14px] h-[14px]"
                                        src={UpAndDownArrowIcon}
                                        alt=""
                                    />
                                    <input
                                        className="outline-0 w-full p-1"
                                        type="number"
                                        placeholder="₹0"
                                        required
                                        min={1000}
                                        value={state.minSalary}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "updateMinSalary",
                                                payload: e.target.value,
                                            })
                                        }
                                        id="company_name"
                                    />
                                </div>
                                <div className="border-1 p-2 gap-2 border-[rgba(188,188,188,1)] items-center flex rounded-time w-full">
                                    <img
                                        src={UpAndDownArrowIcon}
                                        className="w-[14px] h-[14px]"
                                        alt=""
                                    />
                                    <input
                                        className="outline-0 w-full p-1"
                                        type="number"
                                        min={1000}
                                        value={state.maxSalary}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "updateMaxSalary",
                                                payload: e.target.value,
                                            })
                                        }
                                        required
                                        placeholder="₹12,00,000"
                                        id="company_name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label htmlFor="application_deadline">
                                Application Deadline
                            </label>
                            <input
                                className="outline-0 border-1 py-3 border-[rgba(188,188,188,1)] rounded-time p-2"
                                type="date"
                                required
                                value={state.applicationDeadline}
                                onChange={(e) =>
                                    dispatch({
                                        type: "updateApplicationDeadline",
                                        payload: e.target.value,
                                    })
                                }
                                id="application_deadline"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="description">Job Description</label>
                        <textarea
                            className="block mt-1 h-30 w-full outline-0 border-1 p-2 border-[rgba(188,188,188,1)] rounded-time"
                            id="description"
                            required
                            value={state.description}
                            onChange={(e) =>
                                dispatch({
                                    type: "updateDescription",
                                    payload: e.target.value,
                                })
                            }
                            placeholder="Please share a description to let the candidate know more about the job role"
                        ></textarea>
                    </div>
                    <div className="w-full flex justify-between py-4">
                        <button
                            type="button"
                            onClick={() => setIsModelOpen(false)}
                            className="flex gap-2 text-[20px] items-center px-[60px] rounded-time py-[16px] border-[1.5px] border-[rgba(34,34,34,1)]"
                        >
                            <p>Save Draft</p>
                            <img
                                src={TwoDownArrowIcon}
                                className="w-2 h-2.5"
                                alt=""
                            />
                        </button>
                        <button
                            type="submit"
                            className="flex gap-2 text-[20px] active:text-publish border active:bg-transparent items-center text-white bg-publish rounded-time px-[60px] py-[16px]"
                        >
                            <p>Publish</p>

                            {state.formLoading ? (
                                <Loader color="white" size="sm" />
                            ) : (
                                <img
                                    src={TwoSideArrowIcon}
                                    className="h-2 w-2.5"
                                    alt=""
                                />
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
