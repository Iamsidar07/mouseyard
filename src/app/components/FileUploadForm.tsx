"use client"
import { ChangeEvent, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function FileUploadForm() {
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFileUpload = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isLoading) return
    setIsLoading(true)
    setError("")
    const file = e.target.fileInput.files[0];

    if (!file) {
      setError("Please select a file!")
      return;
    }
    setFile(file)

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/pattern-recognition", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.result)
      if(data.message) {
        setError(data.message)
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Something went wrong!")
    }finally{
      setIsLoading(false)
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file)
    if(file?.type !== "text/plain") {
      setError("Please select a .txt file!")
    }

  };

  return (
    <form onSubmit={handleFileUpload} className="prose lg:prose-xl prose-a:text-blue-600">
      <h1>Upload <span className="italice">.text</span> File</h1>
      <input type="file" onChange={handleFileChange} name="fileInput" accept=".txt" className="px-4 py-2 rounded bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
      <button type="submit" disabled={isLoading || !file} className="ml-4 disabled:opacity-80 disabled:cursor-not-allowed">{isLoading ? "Loading..." : "Analyze"}</button>
      {error && <p className="text-red-500">{error}</p>}
      {result && <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>}
    </form>
  );
}

export default FileUploadForm;
