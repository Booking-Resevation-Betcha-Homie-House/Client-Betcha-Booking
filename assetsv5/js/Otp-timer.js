document.addEventListener("DOMContentLoaded", () => {
    const resendOtp = document.getElementById("resend-otp");
    let countdownDuration = 2 * 60; // Countdown duration in seconds (2 minutes)

    function startCountdown() {
        resendOtp.textContent = `Resend in ${formatTime(countdownDuration)}`;
        resendOtp.style.pointerEvents = "none"; // Make it non-clickable
        resendOtp.style.color = "gray"; // Optional: change the style to indicate it's disabled

        const interval = setInterval(() => {
            countdownDuration--;
            resendOtp.textContent = `Resend in ${formatTime(countdownDuration)}`;

            if (countdownDuration <= 0) {
                clearInterval(interval);
                resendOtp.textContent = "Resend";
                resendOtp.style.pointerEvents = "auto"; // Make it clickable
                resendOtp.style.color = ""; // Restore default color or styling

                // Add click functionality for resending OTP
                resendOtp.addEventListener("click", () => {
                    alert("OTP resent!");
                    // Add your OTP resend logic here
                    countdownDuration = 2 * 60; // Reset countdown
                    startCountdown(); // Restart the countdown
                }, { once: true }); // Ensure the click event is added only once
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }

    startCountdown(); // Start the countdown on page load or modal show
});
