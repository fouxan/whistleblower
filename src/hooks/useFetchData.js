import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export const useFetchData = (formData, shouldFetch) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(null);

	const fetchData = useCallback(async () => {
		if (!shouldFetch) return;
		setIsLoading(true);
		try {
			const response = await axios.post(backend_url, {
				question: formData.question,
				num_docs: formData.numDocs,
			});
			setData(response.data);
			setIsError(false);
		} catch (error) {
			console.log("Error in fetching response: \n", error);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, [formData, shouldFetch]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, isLoading, isError, reload: fetchData };
};
