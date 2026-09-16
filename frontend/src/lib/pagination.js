export function createPagination(container, totalItems, currentPage, onPageChange, pageSize = 5) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  container.innerHTML = totalItems > pageSize ? `
    <div class="pagination-summary">Showing ${Math.min((currentPage - 1) * pageSize + 1, totalItems)}-${Math.min(currentPage * pageSize, totalItems)} of ${totalItems}</div>
    <div class="pagination-controls">
      <button class="pagination-button" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
      <span>Page ${currentPage} of ${totalPages}</span>
      <button class="pagination-button" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    </div>` : '';
  container.querySelectorAll('[data-page]').forEach((button) => button.addEventListener('click', () => onPageChange(Number(button.dataset.page))));
  return totalPages;
}