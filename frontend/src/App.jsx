import { createPortal } from "react-dom";
import { MantineProvider } from "@mantine/core";
import swal from "sweetalert";
import JobFilters from "./components/JobFilters";
import JobList from "./components/JobList";
import NavHeader from "./components/NavHeader";
import Modal from "./components/Modal";
import { useState, useEffect } from "react";
import { useAppContext } from "./AppContext";
import { BASE_URL } from "./config";

function App() {
    const [isModeOpen, setIsModelOpen] = useState(false);

    const {
        state: { showSuccess },
        dispatch,
    } = useAppContext();

    useEffect(
        function () {
            fetch(`${BASE_URL}/jobs`)
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: "updateJobList",
                        payload: data.data.jobPosts,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: "updateLoading",
                        payload: false,
                    });
                });
        },
        [dispatch]
    );

    if (showSuccess) {
        swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
        });
    }

    return (
        <MantineProvider>
            <div className="font-Satoshi">
                <div className="job-filter">
                    <NavHeader setIsModelOpen={setIsModelOpen} />
                    <JobFilters />
                </div>
                <JobList />
                {isModeOpen &&
                    createPortal(
                        <Modal setIsModelOpen={setIsModelOpen} />,
                        document.body
                    )}
            </div>
        </MantineProvider>
    );
}

export default App;
