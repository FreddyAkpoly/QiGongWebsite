document.addEventListener('DOMContentLoaded', () => {
    // Sound Playback on the Six Healing Sounds Page
    const soundButtons = document.querySelectorAll('.play-sound');

    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioFile = button.getAttribute('src'); // Get audio file from the src attribute
            if (audioFile) {
                const audio = new Audio(audioFile);
                audio.play();
            } else {
                console.error("Audio file source not found for this button.");
            }
        });
    });

    // Practice Tracker Functionality
    const trackerForm = document.getElementById('tracker-form');
    const logList = document.getElementById('log-list');
    const currentPrompt = document.getElementById('current-prompt');
    const nextPromptButton = document.getElementById('next-prompt');
    const homepageLogSection = document.getElementById('homepage-log-section');

    // Prompt questions for reflections
    const prompts = [
        "How did your body feel during today’s practice?",
        "What emotions arose during your session?",
        "Did you notice any improvements in your movements?",
        "What was the most challenging part of today’s practice?",
        "How did your breathing feel during your session?"
    ];
    let currentPromptIndex = 0;

    // Load and display logs from local storage
    const reflectionLogs = JSON.parse(localStorage.getItem('reflectionLogs')) || [];

    const displayLogs = () => {
        if (logList) {
            logList.innerHTML = ''; // Clear current logs
            if (reflectionLogs.length === 0) {
                logList.innerHTML = '<p>No reflections yet. Start logging your practice!</p>';
            } else {
                reflectionLogs.forEach((log, index) => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>${log.date}</strong>: ${log.reflection} 
                        <button class="delete-log" data-index="${index}">Delete</button>
                    `;
                    logList.appendChild(listItem);
                });
            }
        }

        // Update homepage with latest logs
        if (homepageLogSection) {
            homepageLogSection.innerHTML = ''; // Clear existing logs on homepage
            if (reflectionLogs.length === 0) {
                homepageLogSection.innerHTML = '<p>No reflections available. Log your practice to see entries here!</p>';
            } else {
                const recentLogs = reflectionLogs.slice(-3); // Show the last 3 logs
                recentLogs.forEach(log => {
                    const entry = document.createElement('p');
                    entry.innerHTML = `<strong>${log.date}</strong>: ${log.reflection}`;
                    homepageLogSection.appendChild(entry);
                });
            }
        }
    };

    displayLogs(); // Initial display of logs

    // Cycle to the next prompt
    if (nextPromptButton) {
        nextPromptButton.addEventListener('click', () => {
            currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
            currentPrompt.textContent = prompts[currentPromptIndex];
        });
    }

    // Add new reflection log
    if (trackerForm) {
        trackerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const date = document.getElementById('date').value;
            const reflection = document.getElementById('reflection').value;

            if (date && reflection) {
                const newLog = { date, reflection };

                reflectionLogs.push(newLog); // Add new log to the array
                localStorage.setItem('reflectionLogs', JSON.stringify(reflectionLogs)); // Save to localStorage
                displayLogs(); // Update log display

                trackerForm.reset(); // Clear form inputs
            } else {
                alert("Please fill out both the date and reflection fields.");
            }
        });
    }

    // Delete reflection log
    if (logList) {
        logList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-log')) {
                const index = e.target.getAttribute('data-index');
                if (index !== null) {
                    reflectionLogs.splice(index, 1); // Remove log from array
                    localStorage.setItem('reflectionLogs', JSON.stringify(reflectionLogs)); // Save updated array
                    displayLogs(); // Refresh logs
                }
            }
        });
    }
});
