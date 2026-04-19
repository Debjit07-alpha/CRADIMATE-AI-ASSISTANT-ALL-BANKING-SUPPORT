import { jsPDF } from 'jspdf';

export function generateSanctionLetter(name: string, amount: number) {
  const doc = new jsPDF();
  
  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(99, 102, 241); // Primary Color
  doc.text('CrediMate', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('Smart Loan Approvals', 105, 28, { align: 'center' });
  
  // Divider
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 35, 190, 35);
  
  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text('LOAN SANCTION LETTER', 105, 50, { align: 'center' });
  
  // Date and Reference
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const date = new Date().toLocaleDateString();
  const ref = `REF: CM-${Math.floor(Math.random() * 1000000)}`;
  doc.text(`Date: ${date}`, 20, 65);
  doc.text(ref, 150, 65);
  
  // Salutation
  doc.text(`Dear ${name},`, 20, 85);
  
  // Body text
  const bodyText = `We are pleased to inform you that your personal loan application has been carefully reviewed by our automated underwriting agents. We are delighted to officially communicate that your loan has been APPROVED.`;
  
  const splitText = doc.splitTextToSize(bodyText, 170);
  doc.text(splitText, 20, 95);
  
  // Loan Details Box
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, 115, 170, 50, 3, 3, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.text('Approved Loan Details:', 25, 125);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Applicant Name:`, 25, 135);
  doc.text(name, 80, 135);
  
  doc.text(`Sanctioned Amount:`, 25, 145);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${amount.toLocaleString()}`, 80, 145);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Interest Rate:`, 25, 155);
  doc.text(`8.5% p.a. (Fixed)`, 80, 155);
  
  // Terms
  doc.setFont('helvetica', 'bold');
  doc.text('Terms and Conditions:', 20, 185);
  doc.setFont('helvetica', 'normal');
  const terms = [
    '1. This sanction is valid for 30 days from the date of issue.',
    '2. The loan disbursement is subject to final KYC verification.',
    '3. Repayment will be via monthly EMIs calculated at the stated interest rate.'
  ];
  doc.text(terms, 20, 195);
  
  // Signatures
  doc.text('Authorized Signatory', 20, 250);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150, 150, 150);
  doc.text('Digitally signed by CrediMate AI Underwriting', 20, 260);
  
  // Footer
  doc.setFontSize(9);
  doc.text('CrediMate Financial Services | 123 Tech Lane, Innovation City, 94016', 105, 285, { align: 'center' });
  
  // Save PDF
  doc.save(`${name.replace(/\s+/g, '_')}_Sanction_Letter.pdf`);
}
