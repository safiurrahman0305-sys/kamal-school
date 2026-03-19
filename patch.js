window.downloadPDF = function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // اسکول کا نام اور ہیڈنگ
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("KAMAL EVERGREEN PUBLIC SCHOOL", 105, 20, { align: "center" });
    
    doc.setFontSize(16);
    doc.text("Student Admission Form", 105, 30, { align: "center" });

    // فارم کے خانے (Tables/Rows)
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    const startY = 50;
    const rowHeight = 10;
    const labels = [
        "Student Name:", "Father Name:", "Father's Occupation:", 
        "Date of Birth:", "Gender:", "Class for Admission:", 
        "Previous School (if any):", "Contact Number:", 
        "Emergency Contact:", "Permanent Address:", "Postal Address:"
    ];

    labels.forEach((label, index) => {
        let currentY = startY + (index * rowHeight);
        doc.rect(15, currentY - 7, 180, rowHeight); // خانہ بنانا
        doc.line(70, currentY - 7, 70, currentY + 3); // درمیانی لائن
        doc.text(label, 20, currentY);
    });

    // فائل محفوظ کریں
    doc.save("Kamal-Evergreen-Admission-Form.pdf");
};