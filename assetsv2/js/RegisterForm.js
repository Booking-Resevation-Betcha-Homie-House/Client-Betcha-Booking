document.addEventListener('DOMContentLoaded', () => {
      const step1 = document.getElementById('step1');
      const step2 = document.getElementById('step2');
      const nextBtn = document.getElementById('nextBtn');
      const prevBtn = document.getElementById('prevBtn');
      const progressBar = document.getElementById('progressBar');

      nextBtn.addEventListener('click', () => {
        step1.classList.add('d-none');
        step2.classList.remove('d-none');
        progressBar.style.width = '100%';
        //progressBar.textContent = 'Step 2 of 2';
        progressBar.setAttribute('aria-valuenow', '100');
      });

      prevBtn.addEventListener('click', () => {
        step2.classList.add('d-none');
        step1.classList.remove('d-none');
        progressBar.style.width = '50%';
        //progressBar.textContent = 'Step 1 of 2';
        progressBar.setAttribute('aria-valuenow', '50');
      });
    });