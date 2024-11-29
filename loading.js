function openLoading() {
    const spinnerHTML = `
      <div id="container-spinner">
        <div class="key">
          <div class="key-handle"></div>
          <div class="key-body">
            <div class="key-teeth"></div>
          </div>
        </div>
        <div class="container-loading-text">
          <p class="text-center loading-text"><strong>Unlocking Your Dream Stay</strong></p>
          <p class="text-center loading-text-2">Please wait</p>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', spinnerHTML);
  
    const style = document.createElement('style');
    style.innerHTML = `
      #container-spinner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background-color: rgba(11,64,34,0.59);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
      }
  
      .key {
        width: 60px;
        height: 160px;
        position: relative;
        animation: float 2s ease-in-out infinite;
        z-index: 10;
      }
  
      .key-handle {
        width: 60px;
        height: 60px;
        background-color: transparent;
        border: 13px solid #FFD700;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
      }
  
      .key-handle::before {
        content: '';
        width: 30px;
        height: 30px;
        background-color: transparent;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
  
      .key-body {
        width: 12px;
        height: 80px;
        background-color: #FFD700;
        position: absolute;
        top: 60px;
        left: 24px;
      }
  
      .key-teeth {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 24px;
        height: 12px;
        background-color: #FFD700;
      }
  
      .key-teeth::before, .key-teeth::after {
        content: '';
        width: 24px;
        height: 12px;
        background-color: #FFD700;
        position: absolute;
        left: 0;
      }
  
      .key-teeth::before {
        top: -16px;
      }
  
      .key-teeth::after {
        top: -32px;
      }
  
      @keyframes float {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-20px);
        }
        100% {
          transform: translateY(0);
        }
      }
  
      .loading-text {
        text-align: center;
        color: #f8f8f8;
        font-size: 32px;
      }
  
      .loading-text-2 {
        font-weight: normal;
        font-size: 16px;
        color: #ffffff;
      }
    `;
    document.head.appendChild(style);
  }

  function closeLoading() {
    const spinner = document.getElementById('container-spinner');
    if (spinner) {
      spinner.remove();
    }
  }
  