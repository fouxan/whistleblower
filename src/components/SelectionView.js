import React from "react";
import { useForm } from "react-hook-form";
import { useFetchData } from "../hooks/useFetchData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../App.css";

const SelectionView = () => {
	// Using react-hook-form for form handling and validation
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [shouldFetch, setShouldFetch] = React.useState(false);
	const [formData, setFormData] = React.useState({
		question: "",
		folder: "",
		numDocs: "",
	});

	console.log("BACKEND_URL: ", process.env.BACKEND_URL);

	const { data, isLoading, isError, reload } = useFetchData(
		formData,
		shouldFetch
	);

	// handleSubmit is provided by react-hook-form
	const onSubmit = (data) => {
		setFormData(data); // Update formData with the submitted values
		setShouldFetch(true); // Trigger data fetching
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="input-section">
					<div className="input-field">
						<label htmlFor="question">Question</label>
						<input
							id="question"
							type="text"
							placeholder="Enter your question"
							{...register("question", {
								required: "Question is required",
								minLength: {
									value: 5,
									message: "Question should be at least 5 characters",
								},
							})}
							className="custom-input"
						/>
						{errors.question && (
							<span className="error-message">{errors.question.message}</span>
						)}
					</div>

					<div className="input-field">
						<label htmlFor="folder">Select Client Folder</label>
						<select
							id="folder"
							{...register("folder", {
								required: "Please select a folder",
							})}
							className="custom-select"
						>
							<option value="default-folder">Default folder</option>
						</select>
						{errors.folder && (
							<span className="error-message">{errors.folder.message}</span>
						)}
					</div>

					<div className="input-field">
						<label htmlFor="numDocs">Select Number of Documents</label>
						<select
							id="numDocs"
							{...register("numDocs", {
								required: "Please select the number of documents",
							})}
							className="custom-select"
						>
							{[...Array(10)].map((_, i) => (
								<option key={i + 1} value={i + 1}>
									{i + 1}
								</option>
							))}
						</select>
						{errors.numDocs && (
							<span className="error-message">{errors.numDocs.message}</span>
						)}
					</div>
				</div>
				<div className="submit-section">
					<button className="submit-button" type="submit">
						Submit
					</button>
				</div>
			</form>
			{isError ? (
				<div className="error-message">
					<p>Oops! Something went wrong. Please try again later.</p>
					<button className="retry-button" onClick={reload}>
						Retry
					</button>
				</div>
			) : isLoading ? (
				<div className="response-section">
					<div className="doc-response">
						<h3>
							<u>Retrieving docs...</u>
						</h3>
						{[...Array(3)].map((_, i) => (
							<div className="doc" key={i}>
								<Skeleton width={200} height={30} />
								<div className="doc-info">
									<Skeleton width={100} height={20} />
									<Skeleton width={100} height={20} />
									<Skeleton width={100} height={20} />
								</div>
							</div>
						))}
					</div>
					<div className="answer-response">
						<h3>
							<u>GPT Answer:</u>
						</h3>
						<Skeleton count={5} />
					</div>
				</div>
			) : data?.docs?.length || data?.gptAnswer ? (
				<div className="response-section">
					<div className="doc-response">
						<h3>
							<u>Docs retrieved:</u>
						</h3>
						{data.docs.length === 0 ? (
							<p>No documents found for the selected folder.</p>
						) : (
							data.docs.map((doc) => (
								<div className="doc" key={doc.id}>
									<h2>{doc.snippet}</h2>
									<div className="doc-info">
										{doc.filePath && <h4>File path: {doc.filePath}</h4>}
										{doc.batesNumber && (
											<h4>Bates number: {doc.batesNumber}</h4>
										)}
										{doc.pageNumber && <h4>Page number: {doc.pageNumber}</h4>}
									</div>
								</div>
							))
						)}
					</div>
					<div className="answer-response">
						<h3>
							<u>GPT Answer:</u>
						</h3>
						<p>{data.gptAnswer}</p>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default SelectionView;
