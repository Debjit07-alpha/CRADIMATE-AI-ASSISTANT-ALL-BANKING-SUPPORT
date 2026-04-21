import { jsPDF } from 'jspdf';

export function generateSanctionLetter(name: string, amount: number) {
  const doc = new jsPDF();
  
  // Brand Header
  doc.setFillColor(151, 20, 77); // CrediMate Burgundy
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text('CrediMate', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL LOAN SANCTION DOCUMENT', 20, 32);
  
  // Sanction Details Header
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('LOAN SANCTION LETTER', 105, 55, { align: 'center' });
  
  // Divider
  doc.setLineWidth(0.5);
  doc.setDrawColor(151, 20, 77);
  doc.line(20, 60, 190, 60);
  
  // Meta Info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const ref = `REF NO: CM/LN/${Math.floor(Math.random() * 1000000).toString().padStart(7, '0')}`;
  doc.text(`Date of Issue: ${date}`, 20, 70);
  doc.text(ref, 150, 70);
  
  // Salutation
  doc.setFontSize(11);
  doc.text(`To,`, 20, 85);
  doc.setFont('helvetica', 'bold');
  doc.text(`${name.toUpperCase()}`, 20, 90);
  
  // Main Body
  doc.setFont('helvetica', 'normal');
  const bodyText = `Subject: Approval of Personal Loan Application\n\nDear ${name},\n\nWe are pleased to inform you that your personal loan application has been successfully processed through our AI-driven underwriting system. Based on your financial profile and credit assessment, we have approved your loan request.`;
  
  const splitText = doc.splitTextToSize(bodyText, 170);
  doc.text(splitText, 20, 105);
  
  // Details Table Background
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, 135, 170, 60, 4, 4, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(20, 135, 170, 60, 4, 4, 'D');
  
  doc.setFont('helvetica', 'bold');
  doc.text('LOAN SUMMARY', 30, 145);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Sanctioned Amount:', 30, 155);
  doc.setFont('helvetica', 'bold');
  doc.text(`INR ${amount.toLocaleString('en-IN')}`, 90, 155);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Interest Rate:', 30, 165);
  doc.text('10.49% p.a. (Fixed Rate)', 90, 165);
  
  doc.text('Processing Fee:', 30, 175);
  doc.text('NIL (Promotional Offer)', 90, 175);
  
  doc.text('Repayment Type:', 30, 185);
  doc.text('Equated Monthly Installments (EMI)', 90, 185);
  
  // Conditions
  doc.setFont('helvetica', 'bold');
  doc.text('Important Terms & Conditions:', 20, 210);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const terms = [
    '• This sanction is valid for 15 days from the date of issue.',
    '• Final disbursement is subject to successful e-KYC and document verification.',
    '• CrediMate reserves the right to withdraw this offer if any discrepancies are found.',
    '• Prepayment charges are applicable as per the standard bank policy.'
  ];
  doc.text(terms, 20, 220);
  
  // Signature Area
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Digitally Authorized By', 20, 255);
  doc.text('CrediMate AI Underwriting System', 20, 262);
  
  // QR Code Placeholder or Seal
  doc.setDrawColor(151, 20, 77);
  doc.setLineWidth(1);
  doc.circle(170, 255, 15, 'D');
  doc.setFontSize(8);
  doc.text('CM SEAL', 162, 256);
  
  // Footer
  doc.setFillColor(241, 245, 249);
  doc.rect(0, 280, 210, 17, 'F');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('CrediMate Bank Ltd. | Corporate Office: Financial District, BKC, Mumbai - 400051', 105, 288, { align: 'center' });
  doc.text('This is a computer-generated document and does not require a physical signature.', 105, 293, { align: 'center' });
  
  // Save PDF
  const safeName = (name || 'Applicant').replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`CrediMate_Sanction_${safeName}.pdf`);
}
