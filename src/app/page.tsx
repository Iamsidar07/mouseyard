import FileUploadForm from "./components/FileUploadForm";

export default function Home() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <FileUploadForm/>
    </div>
  );
}
