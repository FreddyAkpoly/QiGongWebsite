document.addEventListener('DOMContentLoaded', () => {
    // Sound Playback on the Six Healing Sounds Page
    const soundButtons = document.querySelectorAll('.play-sound');

    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioFile = button.getAttribute('src'); // Get audio file from the src attribute
            const audio = new Audio(audioFile);
            audio.play();
        });
    });

    // Practice Tracker Functionality
    const trackerForm = document.getElementById('tracker-form');
    const logList = document.getElementById('log-list');
    const currentPrompt = document.getElementById('current-prompt');
    const nextPromptButton = document.getElementById('next-prompt');

    if (trackerForm && logList) {
        // Prompt questions for reflections
        const prompts = [
            "How did your body feel during today’s practice?",
            "What emotions arose during your session?",
            "Did you notice any improvements in your movements?",
            "What was the most challenging part of today’s practice?",
            "How did your breathing feel during your session?"
        ];
        let currentPromptIndex = 0;

        // Retrieve logs from local storage
        const reflectionLogs = JSON.parse(localStorage.getItem('reflectionLogs')) || [];

        // Display existing logs
        const displayLogs = () => {
            logList.innerHTML = ''; // Clear current logs
            reflectionLogs.forEach((log, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${log.date}</strong>: ${log.reflection} <button class="delete-log" data-index="${index}">Delete</button>`;
                logList.appendChild(listItem);
            });
        };

        // Initial display of existing logs
        displayLogs();

        // Cycle to the next prompt
        nextPromptButton.addEventListener('click', () => {
            currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
            currentPrompt.textContent = prompts[currentPromptIndex];
        });

        // Add new log
        trackerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload on form submission

            const date = document.getElementById('date').value;
            const reflection = document.getElementById('reflection').value;

            // Validate inputs before saving
            if (date && reflection) {
                // Create new log object
                const newLog = { date, reflection };

                // Push to logs array
                reflectionLogs.push(newLog);

                // Save to localStorage
                localStorage.setItem('reflectionLogs', JSON.stringify(reflectionLogs));

                // Update the displayed logs
                displayLogs();

                // Clear the form inputs
                trackerForm.reset();
            } else {
                alert("Please fill out both the date and reflection fields.");
            }
        });

        // Delete log functionality
        logList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-log')) {
                const index = e.target.getAttribute('data-index');
                reflectionLogs.splice(index, 1); // Remove the selected log

                // Update localStorage
                localStorage.setItem('reflectionLogs', JSON.stringify(reflectionLogs));

                // Refresh the displayed logs
                displayLogs();
            }
        });
    }
});
