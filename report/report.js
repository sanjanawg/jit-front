
document.addEventListener('DOMContentLoaded', function() {
    // Fetch report data from the backend API (replace with your actual API endpoint)
    fetch('https://example.com/api/report')
      .then(response => response.json())
      .then(data => displayReport(data))
      .catch(error => console.error('Error fetching report data:', error));
  });
  
  function displayReport(reportData) {
    const reportContainer = document.getElementById('report-container');
  
    // Create HTML content for the report
    const reportContent = `
      <p><strong>Name:</strong> ${reportData.name}</p>
      <p><strong>Subject:</strong> ${reportData.subject}</p>
      <p><strong>Attendance:</strong> ${reportData.attendance}</p>
      <p><strong>Grades:</strong> ${reportData.grades}</p>
      <!-- Add more report details as needed -->
    `;
  
    // Append the report content to the container
    reportContainer.innerHTML = reportContent;
  }
  
  function downloadReport() {
    // Simulate downloading a report (replace with actual download logic)
    const reportData = document.getElementById('report-container').innerText;
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }