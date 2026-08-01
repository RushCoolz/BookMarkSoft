"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib/dist/pdf-lib.esm.js";
import { FileUp, Combine, Download, Trash2, File as FileIcon } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function MergePdfBody() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
      setMergedPdfUrl(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Failed to merge PDFs. Ensure they are valid and not password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-4xl mx-auto w-full space-y-8">
          
          <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-12 text-center relative hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
            <input 
              type="file" 
              accept=".pdf" 
              multiple 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Upload PDF Files</h3>
            <p className="text-slate-500">Drag and drop or click to select multiple PDF files.</p>
          </div>

          {files.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <FileIcon className="w-5 h-5 text-slate-400" /> Selected Files ({files.length})
              </h3>
              
              <div className="space-y-3 mb-6">
                {files.map((f, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-3 rounded-xl">
                    <span className="font-medium text-sm text-slate-700 dark:text-slate-300 truncate pr-4">{f.name}</span>
                    <button onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {files.length > 1 ? (
                <div className="flex justify-center">
                  <ToolAction 
                    onClick={mergePdfs} 
                    icon={isProcessing ? <Combine className="w-5 h-5 animate-pulse" /> : <Combine className="w-5 h-5" />}
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-8"
                  >
                    {isProcessing ? "Merging..." : "Merge PDFs"}
                  </ToolAction>
                </div>
              ) : (
                <p className="text-center text-sm text-slate-500 italic">Please select at least 2 files to merge.</p>
              )}
            </div>
          )}

          {mergedPdfUrl && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Merge Complete!</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Your files have been successfully merged into a single PDF.</p>
              
              <a 
                href={mergedPdfUrl} 
                download="merged.pdf"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
              >
                <Download className="w-5 h-5" /> Download Merged PDF
              </a>
            </div>
          )}

        </div>
      </ToolMain>
    </ToolContainer>
  );
}

// Check icon component for success state
function Check(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
