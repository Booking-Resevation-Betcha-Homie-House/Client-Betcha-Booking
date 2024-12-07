function otptimer_f() {
    const resendOtp = document.getElementById("resend-otp");
    let countdownDuration = 2 * 60; // 2 minutes in seconds

    function startCountdown() {
        resendOtp.textContent = `Resend in ${formatTime(countdownDuration)}`;
        resendOtp.style.pointerEvents = "none"; 
        resendOtp.style.color = "gray"; 
        resendOtp.style.cursor = "not-allowed";

        const interval = setInterval(() => {
            countdownDuration--;
            resendOtp.textContent = `Resend in ${formatTime(countdownDuration)}`;

            if (countdownDuration <= 0) {
                clearInterval(interval);
                resendOtp.textContent = "Resend";
                resendOtp.style.pointerEvents = "auto"; 
                resendOtp.style.color = ""; 
                resendOtp.style.cursor = "pointer";

                resendOtp.addEventListener("click", () => {
                    resetButton();
                    countdownDuration = 2 * 60;
                    startCountdown(); 
                }, { once: true });
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }

    startCountdown();
}

document.getElementById('reset').addEventListener('click', otptimer_f);
