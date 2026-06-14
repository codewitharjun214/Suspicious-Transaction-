// Export utilities for CSV and PDF
export const exportToCSV = (data, filename = 'export.csv') => {
  const headers = Object.keys(data[0] || {});
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma
        const escaped = String(value || '').replace(/"/g, '""');
        return escaped.includes(',') ? `"${escaped}"` : escaped;
      }).join(',')
    )
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv');
};

export const exportToJSON = (data, filename = 'export.json') => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
};

const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateReport = (data, title) => {
  const timestamp = new Date().toLocaleString();
  const report = `
=${title}=
Generated: ${timestamp}

Summary:
--------
${JSON.stringify(data.summary || {}, null, 2)}

Details:
--------
${JSON.stringify(data.details || [], null, 2)}
  `;
  
  downloadFile(report, `${title}-${Date.now()}.txt`, 'text/plain');
};
