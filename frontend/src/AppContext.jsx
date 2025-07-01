import { useReducer, createContext, useContext } from "react";

const context = createContext();

const initalState = {
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "fulltime",
    minSalary: "",
    maxSalary: "",
    applicationDeadline: "",
    description: "",
    searchJobTitle: "",
    searchLocation: "",
    searchJobType: "",
    searchMinSalary: 40,
    searchMaxSalary: 200,
    showSuccess: false,
    isLoading: true,
    formLoading: false,
    jobs: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "updateJobTitle":
            return { ...state, jobTitle: action.payload };
        case "updateCompanyName":
            return { ...state, companyName: action.payload };
        case "updateLocation":
            return { ...state, location: action.payload };
        case "updateJobType":
            return { ...state, jobType: action.payload };
        case "updateMinSalary":
            return { ...state, minSalary: action.payload };
        case "updateMaxSalary":
            return { ...state, maxSalary: action.payload };
        case "updateApplicationDeadline":
            return { ...state, applicationDeadline: action.payload };
        case "updateDescription":
            return { ...state, description: action.payload };
        case "addNewJob":
            return { ...state, jobs: [...state.jobs, action.payload] };
        case "searchJobTitle":
            return { ...state, searchJobTitle: action.payload };
        case "searchLocation":
            return { ...state, searchLocation: action.payload };
        case "searchJobType":
            return { ...state, searchJobType: action.payload };
        case "searchSalary":
            return {
                ...state,
                searchMinSalary: action.payload[0],
                searchMaxSalary: action.payload[1],
            };
        case "updateJobList":
            return {
                ...state,
                isLoading: false,
                jobs: action.payload,
            };
        case "updateLoading":
            return { ...state, isLoading: action.payload };
        case "updateFormLoading":
            return { ...state, formLoading: action.payload };
        case "clear":
            return {
                ...initalState,
                isLoading: state.isLoading,
                jobs: state.jobs,
            };
    }
}

function AppContext({ children }) {
    const [state, dispatch] = useReducer(reducer, initalState);

    return (
        <context.Provider value={{ state, dispatch }}>
            {children}
        </context.Provider>
    );
}

function useAppContext() {
    const state = useContext(context);

    if (state === undefined) {
        throw new Error("using context outside of the scope");
    }

    return state;
}

export { AppContext, useAppContext };
