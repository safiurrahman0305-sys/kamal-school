const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the html2pdf script in head
html = html.replace(
    '<script src="https://unpkg.com/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>'
);

// 2. Add placeholders and data-t to inputs in the form
const formInputs = [
    { name: 'student_name', ph: 'Enter Student Name', t: 'ph-name' },
    { name: 'father_name', ph: 'Enter Father\\'s Name', t: 'ph-fname' },
    { name: 'father_occupation', ph: 'Enter Father\\'s Occupation', t: 'ph-focc' },
    { name: 'previous_school', ph: 'Enter Previous School', t: 'ph-prev' },
    { name: 'contact', ph: 'Enter Contact Number', t: 'ph-phone' },
    { name: 'emergency', ph: 'Enter Emergency Contact', t: 'ph-emerg' }
];

for (const input of formInputs) {
    const rx = new RegExp(`(<input type="text" name="${input.name}"( required)?>)`);
    html = html.replace(rx, `<input type="text" name="${input.name}" placeholder="${input.ph}" data-t="${input.t}"$2>`);
}
// Add data-t to dob input
html = html.replace(
    '<input type="date" name="dob" required>',
    '<input type="date" name="dob" data-t="ph-dob" required>'
);

// Textareas
const textareas = [
    { name: 'permanent_address', ph: 'Enter Permanent Address', t: 'ph-perm' },
    { name: 'postal_address', ph: 'Enter Postal Address', t: 'ph-post' }
];
for (const ta of textareas) {
    const rx = new RegExp(`(<textarea name="${ta.name}" rows="2" required></textarea>)`);
    html = html.replace(rx, `<textarea name="${ta.name}" rows="2" placeholder="${ta.ph}" data-t="${ta.t}" required></textarea>`);
}

// 3. Add data-t to missing items like Mr. Irfan Ullah and Ms. Zainab Jan
html = html.replace(
    '<h4 class="text-xl font-bold text-emerald-950 mb-1">Mr. Irfan Ullah</h4>',
    '<h4 class="text-xl font-bold text-emerald-950 mb-1" data-t="t6-name">Mr. Irfan Ullah</h4>'
);
html = html.replace(
    '<p class="text-gold-600 font-bold text-xs uppercase tracking-widest mb-4">M.Sc Physics (B.Ed)\\n                        </p>',
    '<p class="text-gold-600 font-bold text-xs uppercase tracking-widest mb-4" data-t="t6-qual">M.Sc Physics (B.Ed)\\n                        </p>'
);
html = html.replace(
    '<p class="text-gray-500 text-sm line-clamp-2">General Science expert with a passion for\\n                            experimental learning.</p>',
    '<p class="text-gray-500 text-sm line-clamp-2" data-t="t6-desc">General Science expert with a passion for\\n                            experimental learning.</p>'
);

html = html.replace(
    '<h4 class="text-xl font-bold text-emerald-950 mb-1">Ms. Zainab Jan</h4>',
    '<h4 class="text-xl font-bold text-emerald-950 mb-1" data-t="t7-name">Ms. Zainab Jan</h4>'
);
html = html.replace(
    '<p class="text-gold-600 font-bold text-xs uppercase tracking-widest mb-4">M.A Urdu Literature\\n                        </p>',
    '<p class="text-gold-600 font-bold text-xs uppercase tracking-widest mb-4" data-t="t7-qual">M.A Urdu Literature\\n                        </p>'
);
html = html.replace(
    '<p class="text-gray-500 text-sm line-clamp-2">Promoting Urdu literature and national values\\n                            among students.</p>',
    '<p class="text-gray-500 text-sm line-clamp-2" data-t="t7-desc">Promoting Urdu literature and national values\\n                            among students.</p>'
);

// Add data-t to missing nav links and fee classes that might be misaligned
html = html.replace(
    '<td class="p-6 md:p-8 font-bold text-emerald-950" data-t="l1-title">Playgroup to KG</td>',
    '<td class="p-6 md:p-8 font-bold text-emerald-950" data-t="fee-r1">Playgroup to KG</td>'
);
html = html.replace(
    '<td class="p-6 md:p-8 font-bold text-emerald-950" data-t="l2-title">Grade 1 to 5</td>',
    '<td class="p-6 md:p-8 font-bold text-emerald-950" data-t="fee-r2">Grade 1 to 5</td>'
);
html = html.replace(
    '<td class="p-6 md:p-8 font-bold text-emerald-950" data-t="l3-title">Grade 6 to 7</td>',
    '<td class="p-6 md:p-8 font-bold text-emerald-950" data-t="fee-r3">Grade 6 to 7</td>'
);

// 4. Update the toggleLanguage and setLanguage to reinitialize lucide icons
html = html.replace(
    `document.getElementById('lang-text-mobile').innerText = translations[lang === 'en' ? 'en' : 'ur']['lang-mobile'];`,
    `document.getElementById('lang-text-mobile').innerText = translations[lang === 'en' ? 'en' : 'ur']['lang-mobile'];\\n            lucide.createIcons();`
);

let formPdf = `        const downloadAdmissionPDF = () => {\\n            withHtml2Pdf(() => {\\n                const element = document.getElementById('admission-form-area');\\n                const uploadLabel = element.querySelector('.photo-upload-label');\\n                if (uploadLabel) uploadLabel.style.display = 'none';\\n\\n                const opt = {\\n                    margin:       10,\\n                    filename:     'Student_Admission_Form.pdf',\\n                    image:        { type: 'jpeg', quality: 0.98 },\\n                    html2canvas:  { scale: 2, useCORS: true, logging: false },\\n                    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }\\n                };\\n\\n                html2pdf().set(opt).from(element).save().then(() => {\\n                    if (uploadLabel) uploadLabel.style.display = '';\\n                }).catch(() => {\\n                    if (uploadLabel) uploadLabel.style.display = '';\\n                });\\n            });\\n        };`;

let origFormPdf = `        const downloadAdmissionPDF = () => {
            withHtml2Pdf(() => {
                const element = document.getElementById('admission-form-area');
                // Hide the upload label for clean PDF output
                const uploadLabel = element.querySelector('.photo-upload-label');
                if (uploadLabel) uploadLabel.style.display = 'none';

                html2pdf().from(element).set({
                    margin: 0.1,
                    filename: 'Student_Admission_Form.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 3, useCORS: true, allowTaint: true, logging: false },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                }).save().then(() => {
                    // Restore upload label after PDF generated
                    if (uploadLabel) uploadLabel.style.display = '';
                }).catch(() => {
                    if (uploadLabel) uploadLabel.style.display = '';
                });
            });
        };`;

let slipPdf = `        const downloadSlipPDF = () => {\\n            withHtml2Pdf(() => {\\n                const element = document.getElementById('roll-no-slip-area');\\n                const opt = {\\n                    margin:       10,\\n                    filename:     'Roll_No_Slip.pdf',\\n                    image:        { type: 'jpeg', quality: 0.98 },\\n                    html2canvas:  { scale: 2, useCORS: true, logging: false },\\n                    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }\\n                };\\n                html2pdf().set(opt).from(element).save();\\n            });\\n        };`;
                
let origSlipPdf = `        const downloadSlipPDF = () => {
            withHtml2Pdf(() => {
                const element = document.getElementById('roll-no-slip-area');
                html2pdf().from(element).set({
                    margin: 0.4,
                    filename: 'Roll_No_Slip.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 3, useCORS: true, allowTaint: true, logging: false },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                }).save();
            });
        };`;

html = html.replace(origFormPdf, formPdf);
html = html.replace(origSlipPdf, slipPdf);

fs.writeFileSync('index.html', html);
console.log('Done with structural replacements');
