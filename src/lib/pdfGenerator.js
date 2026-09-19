import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { formatPKR, formatDate } from "./utils";
import { siteConfig } from "../config/site";

export function generateInvoicePDF(booking) {
  const doc = new jsPDF();

  // Header Banner (Navy/Ink Background)
  doc.setFillColor(18, 23, 43); // #12172B
  doc.rect(0, 0, 210, 40, "F");

  // Gold Accent line
  doc.setFillColor(200, 162, 74); // #C8A24A
  doc.rect(0, 39, 210, 2, "F");

  // Header Text
  doc.setTextColor(230, 200, 119); // Light Gold
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("ZAK RESIDENCE", 15, 20);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(247, 242, 232);
  doc.text("LIVE · STAY · FEEL HOME", 15, 27);
  doc.text("Bahria Town & Johar Town, Lahore | +92 300 8472910", 15, 34);

  // Invoice Title Right
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(230, 200, 119);
  doc.text("OFFICIAL INVOICE", 195, 20, { align: "right" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(247, 242, 232);
  doc.text(`Invoice #: ${booking.id || "ZAK-INV-001"}`, 195, 27, { align: "right" });
  doc.text(`Date: ${formatDate(new Date())}`, 195, 34, { align: "right" });

  // Bill To & Booking Info Section
  doc.setTextColor(18, 23, 43);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("GUEST & STAY DETAILS", 15, 52);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Guest Name: ${booking.guestName || "Valued Guest"}`, 15, 60);
  doc.text(`Phone: ${booking.guestPhone || "+92 3XX XXXXXXX"}`, 15, 66);
  doc.text(`Email: ${booking.guestEmail || "guest@example.com"}`, 15, 72);
  doc.text(`CNIC/Passport: ${booking.guestCnic || "Verified on Arrival"}`, 15, 78);

  doc.text(`Apartment: ${booking.apartmentTitle || "Luxury Suite"}`, 115, 60);
  doc.text(`Location: ${booking.locationName || "Lahore"}`, 115, 66);
  doc.text(`Check-In: ${formatDate(booking.checkIn)} (${siteConfig.checkInTime})`, 115, 72);
  doc.text(`Check-Out: ${formatDate(booking.checkOut)} (${siteConfig.checkOutTime})`, 115, 78);
  doc.text(`Nights: ${booking.nights || 1} Night(s) | Status: ${(booking.status || "CONFIRMED").toUpperCase()}`, 115, 84);

  // Line Items Table
  const tableData = [
    [
      `Accommodation: ${booking.apartmentTitle || "Apartment Suite"} (${booking.nights} Nights)`,
      formatPKR(booking.pricing?.nightlyRate || 0),
      `${booking.nights}`,
      formatPKR(booking.pricing?.accommodationTotal || booking.totalAmount || 0)
    ]
  ];

  if (booking.addOns && booking.addOns.length > 0) {
    booking.addOns.forEach((addon) => {
      tableData.push([
        `Add-on: ${addon.name}`,
        formatPKR(addon.price),
        "1",
        formatPKR(addon.price)
      ]);
    });
  }

  autoTable(doc, {
    startY: 92,
    head: [["Item Description", "Unit Rate", "Qty", "Amount (PKR)"]],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: [18, 23, 43],
      textColor: [230, 200, 119],
      fontStyle: "bold"
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 35, halign: "right" },
      2: { cellWidth: 20, halign: "center" },
      3: { cellWidth: 35, halign: "right" },
    }
  });

  const finalY = (doc).lastAutoTable.finalY + 10;

  // Summary Totals Right-aligned
  const startTotalsX = 120;
  doc.setFontSize(9);
  doc.text("Subtotal:", startTotalsX, finalY);
  doc.text(formatPKR(booking.pricing?.subtotal || booking.totalAmount || 0), 195, finalY, { align: "right" });

  doc.text("Taxes (5%):", startTotalsX, finalY + 6);
  doc.text(formatPKR(booking.pricing?.taxAmount || 0), 195, finalY + 6, { align: "right" });

  doc.text("Service Fee (3%):", startTotalsX, finalY + 12);
  doc.text(formatPKR(booking.pricing?.serviceFee || 0), 195, finalY + 12, { align: "right" });

  if (booking.pricing?.discountAmount > 0) {
    doc.setTextColor(200, 50, 50);
    doc.text("Discount Applied:", startTotalsX, finalY + 18);
    doc.text(`-${formatPKR(booking.pricing.discountAmount)}`, 195, finalY + 18, { align: "right" });
  }

  // Grand Total Box
  const totalBoxY = finalY + (booking.pricing?.discountAmount > 0 ? 24 : 18);
  doc.setFillColor(247, 242, 232); // Cream
  doc.rect(startTotalsX - 5, totalBoxY - 4, 80, 12, "F");
  doc.setDrawColor(200, 162, 74);
  doc.rect(startTotalsX - 5, totalBoxY - 4, 80, 12, "S");

  doc.setTextColor(18, 23, 43);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Total Paid / Due:", startTotalsX, totalBoxY + 4);
  doc.setTextColor(200, 162, 74);
  doc.text(formatPKR(booking.pricing?.grandTotal || booking.totalAmount || 0), 195, totalBoxY + 4, { align: "right" });

  // Payment Status & Method
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Payment Method: ${(booking.paymentMethod || "Bank Transfer").toUpperCase()}`, 15, finalY);
  doc.text(`Payment Status: ${(booking.paymentStatus || "Verified").toUpperCase()}`, 15, finalY + 6);
  doc.text(`Door Code Access: Active on Check-in day at 2:00 PM`, 15, finalY + 12);

  // Footer Terms & Signature
  doc.setDrawColor(220, 220, 220);
  doc.line(15, 260, 195, 260);

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Thank you for choosing Zak Residence Lahore.", 105, 267, { align: "center" });
  doc.text("For 24/7 Concierge Support, WhatsApp +92 300 8472910 or email reservations@zakresidence.com", 105, 272, { align: "center" });
  doc.text("Zak Residence Pvt Ltd · Bahria Town Lahore · Johar Town Lahore", 105, 277, { align: "center" });

  doc.save(`Zak_Residence_Invoice_${booking.id || "Booking"}.pdf`);
}

export function generateTenancyAgreementPDF(tenancy) {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(18, 23, 43);
  doc.rect(0, 0, 210, 35, "F");
  doc.setFillColor(200, 162, 74);
  doc.rect(0, 34, 210, 2, "F");

  doc.setTextColor(230, 200, 119);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("RESIDENTIAL TENANCY AGREEMENT", 105, 18, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(247, 242, 232);
  doc.text("ZAK RESIDENCE LUXURY SERVICED SUITES · LAHORE", 105, 26, { align: "center" });

  // Body content
  doc.setTextColor(20, 20, 20);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const agreementText = `This Tenancy Agreement is entered into on ${formatDate(new Date())} between:

1. LESSOR: Zak Residence Luxury Apartments Management (Pvt) Ltd, Lahore, Pakistan.
2. TENANT: ${tenancy.tenantName || "Resident Name"}, CNIC/Passport: ${tenancy.tenantCnic || "35202-XXXXXXXX-X"}, Contact: ${tenancy.tenantPhone || "+92 3XX XXXXXXX"}.

PROPERTY PREMISES:
Apartment: ${tenancy.apartmentTitle || "Suite 402"}, ${tenancy.locationName || "Bahria Town Lahore"}.
Furnishing: Fully-furnished luxury serviced apartment including all kitchenware, appliances, smart TV, and split AC units.

TENANCY TERMS & FINANCIALS:
- Tenancy Term: ${tenancy.durationMonths || 12} Month(s) commencing from ${formatDate(tenancy.startDate)} to ${formatDate(tenancy.endDate)}.
- Monthly Rent: ${formatPKR(tenancy.monthlyRent || 140000)} payable in advance by the 5th of each calendar month.
- Security Deposit: ${formatPKR(tenancy.securityDeposit || 50000)} (Refundable at termination subject to clearance of utility dues and damage inspection).
- Maintenance & Utilities: Electricity (LESCO sub-meter), gas, and broadband WiFi shall be billed as per monthly consumption.

KEY COVENANTS:
1. The Tenant shall use the premises solely for residential purposes and shall not sublet without written consent.
2. Routine housekeeping and air conditioning servicing shall be provided as per agreed schedule.
3. Either party may terminate this agreement with 30 days written notice.`;

  const splitText = doc.splitTextToSize(agreementText, 180);
  doc.text(splitText, 15, 48);

  // Signatures
  doc.setDrawColor(18, 23, 43);
  doc.line(20, 240, 80, 240);
  doc.line(130, 240, 190, 240);

  doc.setFontSize(9);
  doc.text("LESSOR (Zak Residence)", 50, 246, { align: "center" });
  doc.text("Authorized Signatory", 50, 251, { align: "center" });

  doc.text("TENANT (Resident)", 160, 246, { align: "center" });
  doc.text(tenancy.tenantName || "Resident Signature", 160, 251, { align: "center" });

  doc.save(`Tenancy_Agreement_${tenancy.tenantName?.replace(/\s+/g, '_') || 'ZakResidence'}.pdf`);
}
