"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FileUp, Scissors, Download, File as FileIcon } from "lucide-react";
import { ToolContainer, ToolMain } from "../ui/tool/ToolContainer";
import { ToolAction } from "../ui/tool/ToolAction";

export function SplitPdfBody() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("1-3");
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitPdfUrl, setSplitPdfUrl] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setSplitPdfUrl(null);
      
      // Load to get page count
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdf.getPageCount());
        setPageRange(`1-${pdf.getPageCount()}`);
      } catch (e) {
        console.error(e);
        setTotalPages(0);
      }
    }
  };

  const splitPdf = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      // Parse range e.g. "1-3, 5, 7-9"
      const ranges = pageRange.split(',').map(s => s.trim());
      const indicesToExtract: number[] = [];
      
      for (const range of ranges) {
        if (range.includes('-')) {
          const [startStr, endStr] = range.split('-');
          const start = parseInt(startStr) - 1; // 0-indexed
          const end = parseInt(endStr) - 1;
          for (let i = start; i <= end; i++) {
            if (i >= 0 && i < pdf.getPageCount() && !indicesToExtract.includes(i)) {
              indicesToExtract.push(i);
            }
          }
        } else {
          const idx = parseInt(range) - 1;
          if (idx >= 0 && idx < pdf.getPageCount() && !indicesToExtract.includes(idx)) {
            indicesToExtract.push(idx);
          }
        }
      }

      if (indicesToExtract.length === 0) {
        alert("Invalid page range.");
        setIsProcessing(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, indicesToExtract);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setSplitPdfUrl(url);
    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("Failed to split PDF. Ensure it is valid and not password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolContainer split="none">
      <ToolMain>
        <div className="max-w-3xl mx-auto w-full space-y-8">
          
          <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-12 text-center relative hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Upload PDF File</h3>
            <p className="text-slate-500">Select a PDF to extract pages from.</p>
          </div>

          {file && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <FileIcon className="w-6 h-6 text-slate-400" />
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 block">{file.name}</span>
                    <span className="text-xs text-slate-500 font-medium">{totalPages} pages total</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Pages to Extract</label>
                <input 
                  type="text" 
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="e.g. 1-3, 5, 8-10"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-red-500/50 outline-none"
                />
                <p className="text-xs text-slate-500">Enter page numbers and/or ranges separated by commas (e.g. 1-3, 5, 7-10).</p>
              </div>

              <div className="flex justify-center pt-2">
                <ToolAction 
                  onClick={splitPdf} 
                  icon={<Scissors className="w-5 h-5" />}
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-8 !bg-red-500 hover:!bg-red-600"
                >
                  {isProcessing ? "Processing..." : "Extract Pages"}
                </ToolAction>
              </div>
            </div>
          )}

          {splitPdfUrl && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-8 text-center space-y-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Extraction Complete!</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Your selected pages have been extracted to a new PDF.</p>
              
              <a 
                href={splitPdfUrl} 
                download="extracted.pdf"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
              >
                <Download className="w-5 h-5" /> Download PDF
              </a>
            </div>
          )}

        </div>
      </ToolMain>
    </ToolContainer>
  );
}
