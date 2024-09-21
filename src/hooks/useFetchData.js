import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const dummyData = {
    docs: [
        {
            id: 1,
            title: "Document 1",
            url: "https://example.com/docs/doc1",
            filePath: "path/to/file",
            pageNumber: 25,
            batesNumber: "12345",
            snippet: "This is the snippet for document 1.",
        },
        {
            id: 2,
            title: "Document 2",
            url: "https://example.com/docs/doc2",

            filePath: "path/to/file",
            pageNumber: 26,
            batesNumber: "12342",
            snippet: "This is the snippet for document 2.",
        },
        {
            id: 3,
            title: "Document 3",
            url: "https://example.com/docs/doc3",

            filePath: "path/to/file",
            pageNumber: 27,
            batesNumber: "123",
            snippet: "This is the snippet for document 3.",
        },
    ],
    gptAnswer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

export const useFetchData = (formData, shouldFetch) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    console.log("useFetchData", shouldFetch);

    const fetchData = useCallback(async () => {
        if (!shouldFetch) return;
        setIsLoading(true);
        try {
            // const backend_url = process.env.BACKEND_URL;
            console.log("backend_url", backend_url);
            // const response = await fetch("https://api.example.com/data");
            // const data = await response.json();
            await new Promise((r) => setTimeout(r, 5000)); // Simulate delay
            setData(dummyData);
            // setData(data);
        } catch (error) {
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    }, [shouldFetch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, isError, reload: fetchData };
};
