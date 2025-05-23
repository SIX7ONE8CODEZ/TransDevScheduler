// Main application logic
class TrainingScheduler {    constructor() {
        this.days = [];
        this.sessionData = {};
        this.currentCell = null;
        this.userRole = 'trainer'; // Default to trainer (view-only)
        this.filters = {
            trainer: 'all',
            day: 'all'
        };
        
        // Show loading animation
        if (typeof showTransitLoader === 'function') {
            showTransitLoader('Initializing transit training schedule...');
        }
        
        // Initialize with some default data
        this.initializeDefaultData();
        
        // DOM elements
        this.scheduleTable = document.getElementById('scheduleTable');
        this.scheduleBody = document.getElementById('scheduleBody');
        this.dateRow = document.getElementById('date-row');
        this.dayRow = document.getElementById('day-row');
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Render initial schedule
        this.renderSchedule();
        
        // Populate trainer filter dropdown
        this.populateTrainerFilter();
        
        // Hide loading animation after initialization
        setTimeout(() => {
            if (typeof hideTransitLoader === 'function') {
                hideTransitLoader();
            }
        }, 1000);
    }initializeDefaultData() {
        const currentDate = new Date();
        this.days = [];
        
        // Find the most recent Sunday (0 is Sunday in JavaScript)
        const currentDay = currentDate.getDay(); // 0-6 (Sunday-Saturday)
        const daysFromSunday = currentDay; // How many days to go back to reach Sunday
        
        // Create date for the most recent Sunday
        const sundayDate = new Date(currentDate);
        sundayDate.setDate(currentDate.getDate() - daysFromSunday);
        
        // Create 7 days starting from Sunday
        for (let i = 0; i < 7; i++) {
            const date = new Date(sundayDate);
            date.setDate(sundayDate.getDate() + i);
            
            const dayObj = {
                date: date,
                dateFormatted: date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
                dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
                sessions: []
            };
            
            this.days.push(dayObj);
        }
        
        // Add some sample data
        this.addSampleData();
    }    addSampleData() {
        // Sample trainers and sessions (matching our login credentials)
        const trainers = ['Terry', 'Veronica', 'Galen', 'Patsy', 'Sisay', 'Donald', 'Geary', 'Norman'];
        const participants = ['Teklu', 'Joshua', 'Annette', 'Juan', 'David'];
        const levels = [
            'RTW class (5)/ BTW (19)',
            'BTW-7 hr Basic-1 hr prep',
            'BTW- 8hr Advanced',
            'BTW-finish Advanced-final eval/revenue class',
            'Retrain/Ride evals',
            'BTW-finish basic-start advanced',
            'BTW-Revenue class'
        ];
          // Sunday sessions
        this.days[0].sessions.push({
            trainer: 'Terry',
            hours: '11:00 am to 7:30 pm',
            participant: 'Teklu',
            level: 'RTW class (5)/ BTW (19)'
        });
        
        // Monday sessions
        this.days[1].sessions.push({
            trainer: 'Veronica',
            hours: '5:00 am to 1:00 pm',
            participant: 'Joshua',
            level: 'BTW-7 hr Basic-1 hr prep'
        });
        
        this.days[1].sessions.push({
            trainer: 'Galen',
            hours: '5:00 am to 1:00 pm',
            participant: 'Annette',
            level: 'BTW- 8hr Advanced'
        });
          this.days[1].sessions.push({
            trainer: 'Sisay',
            hours: '5:00 am to 1:00 pm',
            participant: 'Juan',
            level: 'BTW-finish Advanced-final eval/revenue class'
        });
        
        this.days[1].sessions.push({
            trainer: 'Patsy',
            hours: '5:00 am to 1:00 pm',
            participant: 'David',
            level: 'BTW-finish Advanced-final eval/revenue class'
        });
        
        // Tuesday sessions
        this.days[2].sessions.push({
            trainer: 'Terry',
            hours: '1:00 pm to 10:00 pm',
            participant: 'Teklu',
            level: 'RTW class (5)/ BTW (19)'
        });
        
        this.days[2].sessions.push({
            trainer: 'Galen',
            hours: '5:00 am to 1:00 pm',
            participant: 'Retrain/Ride evals',
            level: 'Retrain/Ride evals'
        });
          this.days[2].sessions.push({
            trainer: 'Sisay',
            hours: '5:00 am to 1:00 pm',
            participant: 'Annette',
            level: 'BTW-finish Advanced-final eval'
        });
          this.days[2].sessions.push({
            trainer: 'Donald',
            hours: '10:00 am to 6:00 pm',
            participant: 'Retrain/Ride evals',
            level: 'Retrain/Ride evals'
        });
        
        this.days[2].sessions.push({
            trainer: 'Patsy',
            hours: '5:00 am to 1:00 pm',
            participant: 'Joshua',
            level: 'BTW-finish basic-start advanced'
        });
          // Wednesday sessions
        this.days[3].sessions.push({
            trainer: 'Terry',
            hours: '11:00 am to 3:00 pm',
            participant: 'retrain',
            level: 'retrain'
        });
        
        this.days[3].sessions.push({
            trainer: 'Terry',
            hours: '3:00 pm to 7:00 pm',
            participant: '',
            level: ''
        });
        
        this.days[3].sessions.push({
            trainer: 'Galen',
            hours: '5:00 am to 1:00 pm',
            participant: '',
            level: ''
        });
          this.days[3].sessions.push({
            trainer: 'Donald',
            hours: '11:00 am to 7:00 pm',
            participant: 'Retrain/Ride evals',
            level: 'Retrain/Ride evals'
        });
        
        this.days[3].sessions.push({
            trainer: 'Patsy',
            hours: '5:00 am to 1:00 pm',
            participant: 'Annette',
            level: 'BTW-Revenue class'
        });
        
        // Thursday sessions
        this.days[4].sessions.push({
            trainer: 'Terry',
            hours: '11:00 am to 7:00 pm',
            participant: 'David',
            level: 'RTW class (5)/ BTW (19)'
        });
          // Friday sessions
        this.days[5].sessions.push({
            trainer: 'Veronica',
            hours: '5:00 am to 1:00 pm',
            participant: 'Joshua',
            level: 'BTW-7 hr Basic-1 hr prep'
        });
        
        // Saturday sessions
        this.days[6].sessions.push({
            trainer: 'Geary',
            hours: '8:00 am to 4:00 pm',
            participant: 'Weekend training',
            level: 'Retrain/Ride evals'
        });
    }    initializeEventListeners() {
        // Add Day button
        document.getElementById('addDayBtn').addEventListener('click', () => this.addNewDay());
        
        // Add Session button
        document.getElementById('addSessionBtn').addEventListener('click', () => this.addNewSession());
        
        // Save button
        document.getElementById('saveBtn').addEventListener('click', () => this.saveSchedule());
        
        // Load button
        document.getElementById('loadBtn').addEventListener('click', () => this.loadSchedule());
          // Delete button
        document.getElementById('deleteBtn').addEventListener('click', () => this.deleteSelectedSessions());
        
        // Export button
        document.getElementById('exportBtn').addEventListener('click', () => this.exportToExcel());
        
        // Import button
        document.getElementById('importBtn').addEventListener('click', () => this.importFromExcel());
        
        // Filter buttons
        document.getElementById('applyFiltersBtn').addEventListener('click', () => this.applyFilters());
        document.getElementById('clearFiltersBtn').addEventListener('click', () => this.clearFilters());
        
        // Trainer filter change
        document.getElementById('trainerFilter').addEventListener('change', (e) => {
            this.filters.trainer = e.target.value;
        });
        
        // Day filter change
        document.getElementById('dayFilter').addEventListener('change', (e) => {
            this.filters.day = e.target.value;
        });
        
        // Modal event listeners
        const modal = document.getElementById('eventModal');
        const closeBtn = document.querySelector('.close');
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Event form submission
        document.getElementById('eventForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEvent();
        });
    }    renderSchedule() {
        // Clear existing table content
        this.scheduleBody.innerHTML = '';
        this.dateRow.innerHTML = '';
        this.dayRow.innerHTML = '';
        
        // Add empty cell for the trainer column in header
        const emptyHeaderCell = document.createElement('th');
        emptyHeaderCell.colSpan = 3;
        emptyHeaderCell.textContent = '';
        this.dateRow.appendChild(emptyHeaderCell);
        
        const emptyDayCell = document.createElement('th');
        emptyDayCell.colSpan = 3;
        emptyDayCell.textContent = '';
        this.dayRow.appendChild(emptyDayCell);
        
        // Add day headers - only for days that pass the filter
        const filteredDays = this.days.filter(day => this.shouldShowDay(day));
        
        // If no days match filters, show message
        if (filteredDays.length === 0) {
            const noResultsRow = document.createElement('tr');
            const noResultsCell = document.createElement('td');
            noResultsCell.colSpan = 3 * (this.days.length + 1);
            noResultsCell.textContent = 'No sessions match the current filters. Please try different filters.';
            noResultsCell.style.textAlign = 'center';
            noResultsCell.style.padding = '30px';
            noResultsRow.appendChild(noResultsCell);
            this.scheduleBody.appendChild(noResultsRow);
            
            // Update trainer filter dropdown
            this.populateTrainerFilter();
            
            return;
        }
        
        // Add headers for filtered days
        filteredDays.forEach(day => {
            const dateCell = document.createElement('th');
            dateCell.textContent = day.dateFormatted;
            dateCell.colSpan = 3;
            this.dateRow.appendChild(dateCell);
            
            const dayCell = document.createElement('th');
            dayCell.textContent = day.dayName;
            dayCell.colSpan = 3;
            this.dayRow.appendChild(dayCell);
        });
        
        // Add day sections for filtered days
        filteredDays.forEach(day => {
            if (day.sessions.length > 0) {
                // Filter sessions for this day
                const filteredSessions = day.sessions.filter(session => this.shouldShowSession(session));
                
                // Skip day if no sessions match
                if (filteredSessions.length === 0) {
                    return;
                }
                
                // Group sessions by day
                const daySection = document.createElement('tr');
                daySection.className = 'day-section';
                
                // Create day header (spans all columns)
                const dayHeader = document.createElement('td');
                dayHeader.className = 'day-header';
                dayHeader.colSpan = 3 * (this.days.length + 1); // Header + all days
                dayHeader.style.backgroundColor = '#ddd';
                dayHeader.style.fontWeight = 'bold';
                dayHeader.textContent = `${day.dateFormatted} - ${day.dayName}`;
                daySection.appendChild(dayHeader);
                
                this.scheduleBody.appendChild(daySection);                // Create column headers for each day section
                const headerRow = document.createElement('tr');
                
                // Add Select header (only for admin users)
                const selectHeader = document.createElement('td');
                
                if (this.userRole === 'admin') {
                    const selectAllCheckbox = document.createElement('input');
                    selectAllCheckbox.type = 'checkbox';
                    selectAllCheckbox.className = 'select-all-checkbox';
                    selectAllCheckbox.title = 'Select all sessions for this day';
                    
                    // Add event listener to select/deselect all checkboxes for this day
                    selectAllCheckbox.addEventListener('change', (e) => {
                        const dayIndex = this.days.indexOf(day);
                        const checkboxes = document.querySelectorAll(`.session-checkbox[data-day-index="${dayIndex}"]`);
                        checkboxes.forEach(checkbox => {
                            checkbox.checked = e.target.checked;
                        });
                    });
                    
                    selectHeader.appendChild(selectAllCheckbox);
                }
                
                headerRow.appendChild(selectHeader);
                
                const trainerHeader = document.createElement('td');
                trainerHeader.textContent = 'Trainer';
                trainerHeader.className = 'trainer-cell';
                headerRow.appendChild(trainerHeader);
                
                const hoursHeader = document.createElement('td');
                hoursHeader.textContent = 'Hours';
                hoursHeader.className = 'hours-cell';
                headerRow.appendChild(hoursHeader);
                
                const participantHeader = document.createElement('td');
                participantHeader.textContent = 'Participant';
                participantHeader.className = 'participant-cell';
                headerRow.appendChild(participantHeader);
                
                const levelHeader = document.createElement('td');
                levelHeader.textContent = 'Level/Goal';
                levelHeader.className = 'level-cell';
                levelHeader.colSpan = 3 * this.days.length - 1; // Adjusted for checkbox column
                headerRow.appendChild(levelHeader);
                
                this.scheduleBody.appendChild(headerRow);                
                // Add filtered sessions for this day
                filteredSessions.forEach(session => {
                    const sessionRow = document.createElement('tr');
                    sessionRow.dataset.dayIndex = this.days.indexOf(day);
                    sessionRow.dataset.sessionIndex = day.sessions.indexOf(session);
                    
                    // Add checkbox for selection (only for admin users)
                    const checkboxCell = document.createElement('td');
                    
                    if (this.userRole === 'admin') {
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.className = 'session-checkbox';
                        checkbox.dataset.dayIndex = this.days.indexOf(day);
                        checkbox.dataset.sessionIndex = day.sessions.indexOf(session);
                        
                        // Stop propagation to prevent row click when clicking checkbox
                        checkbox.addEventListener('click', (e) => {
                            e.stopPropagation();
                        });
                        
                        checkboxCell.appendChild(checkbox);
                    }
                    
                    sessionRow.appendChild(checkboxCell);
                    
                    const trainerCell = document.createElement('td');
                    trainerCell.textContent = session.trainer;
                    trainerCell.className = 'trainer-cell';
                    sessionRow.appendChild(trainerCell);
                    
                    const hoursCell = document.createElement('td');
                    hoursCell.textContent = session.hours;
                    hoursCell.className = 'hours-cell';
                    sessionRow.appendChild(hoursCell);
                    
                    const participantCell = document.createElement('td');
                    participantCell.textContent = session.participant;
                    participantCell.className = 'participant-cell';
                    sessionRow.appendChild(participantCell);
                    
                    const levelCell = document.createElement('td');
                    levelCell.textContent = session.level;
                    levelCell.className = 'level-cell';
                    levelCell.colSpan = 3 * this.days.length - 1; // Adjusted for checkbox column
                    sessionRow.appendChild(levelCell);
                    
                    // Add click event to row for editing (but not when clicking checkbox)
                    sessionRow.addEventListener('click', () => this.editSession(day, session));
                    
                    this.scheduleBody.appendChild(sessionRow);
                });
                
                // Add empty row after each day for spacing
                const spacerRow = document.createElement('tr');
                const spacerCell = document.createElement('td');
                spacerCell.colSpan = 3 * (this.days.length + 1);
                spacerCell.style.height = '10px';
                spacerRow.appendChild(spacerCell);
                this.scheduleBody.appendChild(spacerRow);
            }
        });
        
        // Update trainer filter dropdown
        this.populateTrainerFilter();
    }    editSession(day, session) {
        // Only admins can edit sessions
        if (this.userRole !== 'admin') {
            // For trainers and participants, just show the session details in a non-editable popup
            let roleSpecificMessage = '';
            
            if (this.userRole === 'participant') {
                // For participants, highlight if this is their session
                const username = sessionStorage.getItem('username');
                if (session.participant && session.participant.toLowerCase() === username.toLowerCase()) {
                    roleSpecificMessage = `\n\nThis is your scheduled session!`;
                }
            }
            
            alert(`Session Details:\n\nTrainer: ${session.trainer || ''}\nHours: ${session.hours || ''}\nParticipant: ${session.participant || ''}\nLevel/Goal: ${session.level || ''}${roleSpecificMessage}`);
            return;
        }
        
        const modal = document.getElementById('eventModal');
        const titleInput = document.getElementById('eventTitle');
        const locationInput = document.getElementById('eventLocation');
        const notesInput = document.getElementById('eventNotes');
        
        // Store current cell information
        this.currentCell = { day, session };
        
        // Populate the form with session data
        titleInput.value = session.trainer || '';
        locationInput.value = session.hours || '';
        notesInput.value = `Participant: ${session.participant || ''}\nLevel/Goal: ${session.level || ''}`;
        
        modal.style.display = 'block';
    }
    
    saveEvent() {
        const { day, session } = this.currentCell;
        const titleInput = document.getElementById('eventTitle');
        const locationInput = document.getElementById('eventLocation');
        const notesInput = document.getElementById('eventNotes');
        
        // Update session data
        session.trainer = titleInput.value;
        session.hours = locationInput.value;
        
        // Parse participant and level from notes
        const notesText = notesInput.value;
        const participantMatch = notesText.match(/Participant:(.*?)(?=\n|$)/);
        const levelMatch = notesText.match(/Level\/Goal:(.*?)(?=\n|$)/);
        
        session.participant = participantMatch ? participantMatch[1].trim() : '';
        session.level = levelMatch ? levelMatch[1].trim() : '';
        
        // Close the modal
        document.getElementById('eventModal').style.display = 'none';
        
        // Update the schedule display
        this.renderSchedule();
    }
      addNewDay() {
        // Add a new day after the last one
        const lastDay = this.days[this.days.length - 1];
        const newDate = new Date(lastDay.date);
        newDate.setDate(newDate.getDate() + 1);
        
        const newDay = {
            date: newDate,
            dateFormatted: newDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
            dayName: newDate.toLocaleDateString('en-US', { weekday: 'long' }),
            sessions: []
        };
        
        this.days.push(newDay);
        this.renderSchedule();
    }
    
    addNewSession() {
        // Prompt for day selection
        const dayOptions = this.days.map((day, index) => `${index + 1}: ${day.dateFormatted} (${day.dayName})`).join('\n');
        const daySelection = prompt(`Select a day to add a session to:\n${dayOptions}`);
        
        if (!daySelection) return;
        
        const dayIndex = parseInt(daySelection) - 1;
        if (isNaN(dayIndex) || dayIndex < 0 || dayIndex >= this.days.length) {
            alert('Invalid day selection');
            return;
        }
        
        // Prompt for trainer
        const trainer = prompt('Enter trainer name:');
        if (!trainer) return;
        
        // Prompt for hours
        const hours = prompt('Enter hours (e.g., "9:00 am to 5:00 pm"):');
        if (!hours) return;
        
        // Prompt for participant
        const participant = prompt('Enter participant name:');
        
        // Prompt for level/goal
        const level = prompt('Enter level/goal:');
        
        // Add new session
        this.days[dayIndex].sessions.push({
            trainer,
            hours,
            participant: participant || '',
            level: level || ''
        });
        
        this.renderSchedule();
    }
      saveSchedule() {
        // Convert schedule data to JSON string
        const scheduleJSON = JSON.stringify({
            days: this.days
        });
        
        // Save to localStorage
        localStorage.setItem('trainingSchedule', scheduleJSON);
        
        alert('Schedule saved successfully!');
    }    loadSchedule() {
        const savedData = localStorage.getItem('trainingSchedule');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                
                // Convert date strings back to Date objects
                this.days = parsedData.days.map(day => {
                    return {
                        ...day,
                        date: new Date(day.date)
                    };
                });
                
                // Update trainer filter dropdown
                this.populateTrainerFilter();
                
                // Render schedule
                this.renderSchedule();
                alert('Schedule loaded successfully!');
                return true;
            } catch (e) {
                console.error('Error loading saved schedule:', e);
                alert('Error loading schedule. No saved schedule found or data is corrupted.');
                return false;
            }
        } else {
            alert('No saved schedule found.');
            return false;
        }
    }
      deleteSchedule() {
        if (confirm('Are you sure you want to delete the entire saved schedule? This cannot be undone.')) {
            localStorage.removeItem('trainingSchedule');
            
            // Reset to default data
            this.initializeDefaultData();
            this.renderSchedule();
            
            alert('Schedule deleted successfully.');
        }
    }
    
    deleteSelectedSessions() {
        const checkboxes = document.querySelectorAll('.session-checkbox:checked');
        
        if (checkboxes.length === 0) {
            alert('No sessions selected. Please select sessions to delete.');
            return;
        }
        
        if (confirm(`Are you sure you want to delete ${checkboxes.length} selected session(s)? This cannot be undone.`)) {
            // Store day/session combinations to delete
            // We need to process them in reverse order to avoid index shifting problems
            const toDelete = [];
            
            checkboxes.forEach(checkbox => {
                toDelete.push({
                    dayIndex: parseInt(checkbox.dataset.dayIndex),
                    sessionIndex: parseInt(checkbox.dataset.sessionIndex)
                });
            });
            
            // Sort by day index (descending) and then by session index (descending)
            toDelete.sort((a, b) => {
                if (a.dayIndex !== b.dayIndex) {
                    return b.dayIndex - a.dayIndex; // Descending day order
                }
                return b.sessionIndex - a.sessionIndex; // Descending session order
            });
            
            // Delete the selected sessions
            toDelete.forEach(item => {
                const { dayIndex, sessionIndex } = item;
                
                if (dayIndex >= 0 && dayIndex < this.days.length &&
                    sessionIndex >= 0 && sessionIndex < this.days[dayIndex].sessions.length) {
                    // Remove the session
                    this.days[dayIndex].sessions.splice(sessionIndex, 1);
                }
            });
            
            // Render the updated schedule
            this.renderSchedule();
            
            alert('Selected sessions deleted successfully.');
        }
    }exportToExcel() {
        // Create a CSV string
        let csv = 'Date,Day,Trainer,Hours,Participant,Level/Goal\n';
        
        // Add data rows
        this.days.forEach(day => {
            if (day.sessions.length > 0) {
                day.sessions.forEach(session => {
                    csv += `${day.dateFormatted},${day.dayName},${session.trainer},${session.hours},${session.participant},${session.level}\n`;
                });
            } else {
                // Add empty row for days with no sessions
                csv += `${day.dateFormatted},${day.dayName},,,,,\n`;
            }
        });
        
        // Create a download link
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'training_schedule.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    importFromExcel() {
        // Create a temporary file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.csv';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);
        
        // Handle file selection
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) {
                document.body.removeChild(fileInput);
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    this.processCSV(event.target.result);
                    document.body.removeChild(fileInput);
                } catch (error) {
                    alert('Error importing CSV file. Please check the file format.');
                    console.error('CSV import error:', error);
                    document.body.removeChild(fileInput);
                }
            };
            
            reader.readAsText(file);
        });
        
        // Trigger file selection dialog
        fileInput.click();
    }
    
    processCSV(csvContent) {
        // Parse CSV content
        const lines = csvContent.split('\n');
        
        // Check if the CSV has a header row and it matches our expected format
        const header = lines[0].trim();
        if (!header.includes('Date') || !header.includes('Trainer') || !header.includes('Hours')) {
            throw new Error('Invalid CSV header. Expected: Date,Day,Trainer,Hours,Participant,Level/Goal');
        }
        
        // Clear current schedule data
        if (confirm('Do you want to clear the current schedule and replace it with the imported data?')) {
            this.days = [];
            
            // Create a map to track unique dates
            const dateMap = new Map();
            
            // Process data rows (skip header)
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                // Parse CSV line (handle quotes and commas in fields)
                const values = this.parseCSVLine(line);
                
                if (values.length < 6) continue; // Skip invalid lines
                
                const [dateStr, dayName, trainer, hours, participant, level] = values;
                
                // Skip lines without date or trainer
                if (!dateStr || !trainer) continue;
                
                // Create or get day entry
                let dayObj;
                if (dateMap.has(dateStr)) {
                    dayObj = this.days[dateMap.get(dateStr)];
                } else {
                    // Parse date from string
                    const dateParts = dateStr.split('/');
                    if (dateParts.length !== 3) continue;
                    
                    const month = parseInt(dateParts[0]) - 1; // 0-based month
                    const day = parseInt(dateParts[1]);
                    const year = parseInt(dateParts[2]);
                    
                    const date = new Date(year, month, day);
                    
                    dayObj = {
                        date: date,
                        dateFormatted: dateStr,
                        dayName: dayName || date.toLocaleDateString('en-US', { weekday: 'long' }),
                        sessions: []
                    };
                    
                    this.days.push(dayObj);
                    dateMap.set(dateStr, this.days.length - 1);
                }
                
                // Add session for this day
                if (trainer) {
                    dayObj.sessions.push({
                        trainer,
                        hours: hours || '',
                        participant: participant || '',
                        level: level || ''
                    });
                }
            }
              // Sort days by date
            this.days.sort((a, b) => a.date - b.date);
            
            // Update trainer filter
            this.populateTrainerFilter();
            
            // Render the schedule
            this.renderSchedule();
            alert('Schedule imported successfully!');
        }
    }
    
    parseCSVLine(line) {
        const values = [];
        let inQuote = false;
        let currentValue = '';
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                values.push(currentValue);
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        
        // Add the final value
        values.push(currentValue);
        
        return values.map(value => {
            // Remove surrounding quotes
            if (value.startsWith('"') && value.endsWith('"')) {
                return value.substring(1, value.length - 1);
            }
            return value;
        });
    }
    
    populateTrainerFilter() {
        const trainerFilter = document.getElementById('trainerFilter');
        
        // Clear existing options except "All Trainers"
        while (trainerFilter.options.length > 1) {
            trainerFilter.remove(1);
        }
        
        // Get unique trainers from the schedule
        const trainers = new Set();
        this.days.forEach(day => {
            day.sessions.forEach(session => {
                if (session.trainer) {
                    trainers.add(session.trainer);
                }
            });
        });
        
        // Add trainer options to dropdown
        trainers.forEach(trainer => {
            const option = document.createElement('option');
            option.value = trainer;
            option.textContent = trainer;
            trainerFilter.appendChild(option);
        });
    }
    
    applyFilters() {
        // Get values from filter dropdowns
        const trainerFilter = document.getElementById('trainerFilter').value;
        const dayFilter = document.getElementById('dayFilter').value;
        
        // Update filter state
        this.filters.trainer = trainerFilter;
        this.filters.day = dayFilter;
        
        // Rerender the schedule with filters applied
        this.renderSchedule();
        
        // Display filter information
        let filterInfo = '';
        if (trainerFilter !== 'all' || dayFilter !== 'all') {
            filterInfo = 'Filters applied: ';
            if (trainerFilter !== 'all') filterInfo += `Trainer: ${trainerFilter}`;
            if (trainerFilter !== 'all' && dayFilter !== 'all') filterInfo += ' | ';
            if (dayFilter !== 'all') filterInfo += `Day: ${dayFilter}`;
        }
        
        // You could display this information in a specific element
        // For now, just show an alert
        if (filterInfo) {
            alert(filterInfo);
        }
    }
    
    clearFilters() {
        // Reset filter dropdowns
        document.getElementById('trainerFilter').value = 'all';
        document.getElementById('dayFilter').value = 'all';
        
        // Reset filter state
        this.filters.trainer = 'all';
        this.filters.day = 'all';
        
        // Rerender schedule without filters
        this.renderSchedule();
    }
    
    shouldShowDay(day) {
        // If day filter is active, check if this day matches
        if (this.filters.day !== 'all' && day.dayName !== this.filters.day) {
            return false;
        }
        
        // If trainer filter is active, check if any sessions match
        if (this.filters.trainer !== 'all') {
            const hasMatchingTrainer = day.sessions.some(session => 
                session.trainer === this.filters.trainer
            );
            
            return hasMatchingTrainer;
        }
        
        // No filters or filters match
        return true;
    }
    
    shouldShowSession(session) {
        // If trainer filter is active, check if this session matches
        if (this.filters.trainer !== 'all' && session.trainer !== this.filters.trainer) {
            return false;
        }
        
        // Session passes filters
        return true;
    }
    
    checkLoginStatus() {
        // Check if user is logged in through session storage
        const userRole = sessionStorage.getItem('userRole');
        const username = sessionStorage.getItem('username');
        
        // If logged in, set the role
        if (userRole) {
            this.userRole = userRole;
        }
        
        // Show or hide controls based on user role
        if (userRole === 'participant') {
            // Participants can only view the schedule, not edit it
            document.querySelectorAll('.admin-only').forEach(element => {
                element.style.display = 'none';
            });
            
            // Display welcome message for participant
            alert(`Welcome, ${username}! You are viewing the training schedule as a participant.`);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const userRole = sessionStorage.getItem('userRole');
    const username = sessionStorage.getItem('username');
    
    // If not logged in, redirect to login page
    if (!userRole || !username) {
        window.location.href = 'login.html';
        return;
    }
      // Display user information
    document.getElementById('username-display').textContent = username;
    document.getElementById('role-display').textContent = `(${userRole})`;
    
    // Apply permissions based on role
    if (userRole === 'trainer' || userRole === 'participant') {
        // Hide admin-only buttons for trainers and participants
        document.querySelectorAll('.admin-only').forEach(element => {
            element.style.display = 'none';
        });
    }
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('username');
        window.location.href = 'login.html';
    });
    
    const scheduler = new TrainingScheduler();
    
    // Set the user role in the scheduler
    scheduler.userRole = userRole;
    
    // Try to load saved schedule
    const loadSuccessful = scheduler.loadSchedule();
    if (!loadSuccessful) {
        // If no saved schedule, use default data
        scheduler.renderSchedule();
    }
    
    // Check login status and handle participant view
    scheduler.checkLoginStatus();
});
