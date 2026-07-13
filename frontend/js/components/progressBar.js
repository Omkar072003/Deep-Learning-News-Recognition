export function renderProgressBar(percent) {
  return `
    <div class="progress">
      <div class="progress-bar" style="width:${percent}%"></div>
    </div>
  `;
}