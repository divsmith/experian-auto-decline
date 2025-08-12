(function () {
    'use strict';

    const MAX_ATTEMPTS = 20;
    const POLLING_TIMEOUT_MS = 10000; // Stop polling after 10 seconds
    let attempts = 0;
    let observer;

    function attemptDecline() {
        try {
            if (attempts >= MAX_ATTEMPTS) {
                if (observer) {
                    observer.disconnect();
                }
                return;
            }

            let declineButton = document.querySelector('button.ecs-next-button--secondary');

            if (declineButton) {
                declineButton.click();
                if (observer) {
                    observer.disconnect();
                }
            } 
        } catch (error) {
            console.error("Experian Auto Decline error:", error);
            if (observer) {
                observer.disconnect();
            }
        } finally {
            attempts++;
        }
    }

    const config = { childList: true, subtree: true };
    observer = new MutationObserver(attemptDecline);
    observer.observe(document.body, config);

    setTimeout(() => {
        if (observer) {
            observer.disconnect();
        }
    }, POLLING_TIMEOUT_MS);

})();
