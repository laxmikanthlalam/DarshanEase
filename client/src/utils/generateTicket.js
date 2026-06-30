import { jsPDF } from "jspdf";

const generateTicket = (booking) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("DarshanEase", 105, 20, { align: "center" });

  doc.setFontSize(16);
  doc.text("Darshan Ticket", 105, 30, { align: "center" });

  doc.line(20, 35, 190, 35);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  let y = 50;

  doc.text(`Temple : ${booking.temple?.name}`, 20, y);
  y += 10;

  doc.text(`Darshan Slot : ${booking.slot?.slotName}`, 20, y);
  y += 10;

  doc.text(
    `Date : ${
      booking.slot?.date
        ? new Date(booking.slot.date).toLocaleDateString()
        : "N/A"
    }`,
    20,
    y
  );
  y += 10;

  doc.text(`Persons : ${booking.numberOfPersons}`, 20, y);
  y += 10;

  doc.text(`Amount : ₹${booking.totalAmount}`, 20, y);
  y += 10;

  doc.text(`Booking Status : ${booking.bookingStatus}`, 20, y);
  y += 10;

  doc.text(`Payment Status : ${booking.paymentStatus}`, 20, y);
  y += 10;

  doc.text(`Booking ID : ${booking._id}`, 20, y);
  y += 20;

  doc.setFont("helvetica", "italic");
  doc.text(
    "Please carry a valid ID proof during darshan.",
    20,
    y
  );
  y += 10;

  doc.text(
    "Thank you for booking with DarshanEase.",
    20,
    y
  );

  doc.save(`Darshan_Ticket_${booking._id}.pdf`);
};

export default generateTicket;