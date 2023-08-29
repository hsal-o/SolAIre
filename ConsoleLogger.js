window.ConsoleLog = function(sender, message) {
    var consoleDiv = document.querySelector('.console');
    var logEntry = document.createElement('div');
    logEntry.textContent = '[' + sender.GetName() + ']: ' + message;
    consoleDiv.appendChild(logEntry);

    // Scroll to the bottom of the console
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
};