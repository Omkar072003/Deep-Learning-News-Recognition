export function showAnalysisResult(result) {
  const app = document.getElementById('app');
  app.innerHTML += `
    <section>
      <h3>Analysis Result</h3>
      <pre>${JSON.stringify(result, null, 2)}</pre>
    </section>
  `;
}