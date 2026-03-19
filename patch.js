window.downloadPDF = function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    // اسکول کا نام (ہیڈنگ)
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("KAMAL EVERGREEN PUBLIC SCHOOL", 105, 20, { align: "center" });
    
    // فارم کی سرخی
    doc.setFontSize(16);
    doc.text("Student Admission Form", 105, 30, { align: "center" });

    // فارم کے خانے (ڈیٹا)
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    let yPos = 50;
    const fields = [
        "Student Name: __________________________",
        "Father Name: ___________________________",
        "Father's Occupation: ____________________",
        "Date of Birth: _________________________",
        "Gender: ________________________________",
        "Class for Admission: ___________________",
        "Contact Number: ________________________",
        "Address: _______________________________"
    ];

    fields.forEach(field => {
        doc.text(field, 20, yPos);
        yPos += 12; // ہر لائن کے درمیان فاصلہ
    });

    // دستخط کا خانہ
    doc.text("Parent/Guardian Signature: ________________", 20, 160);
    doc.text("Date: ___________", 150, 160);

    // فائل کو محفوظ کریں (صرف ایک ہی بار)
    doc.save("Kamal-School-Admission-Form.pdf");
};