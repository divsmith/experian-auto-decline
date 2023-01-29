var maxAttempts = 20;
var attempts = 0;
var found = false;
var interval;

function decline() {
    if (interval && (found || attempts > maxAttempts)) {
        clearInterval(interval);
    }

    var declineButton = document.querySelector('button.ecs-next-button');
    if (declineButton) {
        declineButton.click();
        found = true;
    }

    attempts++;
}

interval = setInterval(decline, 500);