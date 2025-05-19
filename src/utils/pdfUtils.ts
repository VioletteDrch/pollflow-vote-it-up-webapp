
/**
 * Utility functions for generating PDF documents
 */
import { jsPDF } from 'jspdf';

/**
 * Generates a PDF document with the poll analysis
 * @param pollQuestion The question of the poll
 * @param analysisText The AI analysis to include in the PDF
 * @returns The generated PDF document as a Blob
 */
export const generateAnalysisPDF = (pollQuestion: string, analysisText: string): Blob => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text("Poll Analysis", 20, 20);
  
  // Add question
  doc.setFontSize(16);
  doc.text("Question:", 20, 35);
  
  // Add question text with wrapping
  doc.setFontSize(12);
  const wrappedQuestion = doc.splitTextToSize(pollQuestion, 170);
  doc.text(wrappedQuestion, 20, 45);
  
  // Add analysis section title
  doc.setFontSize(16);
  doc.text("AI Analysis:", 20, 65);
  
  // Add analysis content with wrapping
  doc.setFontSize(12);
  const wrappedAnalysis = doc.splitTextToSize(analysisText, 170);
  doc.text(wrappedAnalysis, 20, 75);
  
  // Add footer with date
  const currentDate = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Generated on ${currentDate}`, 20, doc.internal.pageSize.height - 10);
  
  // Return the PDF as a blob
  return doc.output('blob');
};

/**
 * Downloads a blob as a file
 * @param blob The blob to download
 * @param filename The name of the file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append to the document, trigger click and remove
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
