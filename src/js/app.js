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
        document.getElementById('deleteBtn').addEventListener('click', () => this.deleteSelectedSessions());        // Export button
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
    }    exportToExcel() {
        // Check if XLSX is available
        if (typeof XLSX === 'undefined') {
            // Fallback to CSV export if XLSX library isn't available
            this.exportToCSV();
            return;
        }
        
        try {
            // Create a workbook
            const wb = XLSX.utils.book_new();
            
            // Headers for the worksheet
            const headers = ['Date', 'Day', 'Trainer', 'Hours', 'Participant', 'Level/Goal'];
            
            // Data rows
            const data = [];
            this.days.forEach(day => {
                if (day.sessions.length > 0) {
                    day.sessions.forEach(session => {
                        data.push([
                            day.dateFormatted,
                            day.dayName,
                            session.trainer,
                            session.hours,
                            session.participant,
                            session.level
                        ]);
                    });
                } else {
                    // Add empty row for days with no sessions
                    data.push([day.dateFormatted, day.dayName, '', '', '', '']);
                }
            });
            
            // Combine headers and data
            const wsData = [headers, ...data];
            
            // Create worksheet and add to workbook
            const ws = XLSX.utils.aoa_to_sheet(wsData);
            
            // Add some formatting
            const wscols = [
                {wch: 12}, // Date
                {wch: 10}, // Day
                {wch: 12}, // Trainer
                {wch: 20}, // Hours
                {wch: 15}, // Participant
                {wch: 30}  // Level/Goal
            ];
            ws['!cols'] = wscols;
            
            XLSX.utils.book_append_sheet(wb, ws, "Training Schedule");
            
            // Generate file and trigger download with current date in filename
            const now = new Date();
            const dateStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
            XLSX.writeFile(wb, `TransDev_Training_Schedule_${dateStr}.xlsx`);
            
            console.log("Excel file exported successfully");
        } catch (error) {
            console.error("Error exporting to Excel:", error);
            // Fallback to CSV if Excel export fails
            alert("Excel export failed. Falling back to CSV export.");
            this.exportToCSV();
        }
    }
    
    exportToCSV() {
        // Create a CSV string
        let csv = 'Date,Day,Trainer,Hours,Participant,Level/Goal\n';
        
        // Add data rows
        this.days.forEach(day => {
            if (day.sessions.length > 0) {
                day.sessions.forEach(session => {
                    // Properly escape fields with quotes if they contain commas
                    const formatField = (field) => {
                        if (field && (field.includes(',') || field.includes('"'))) {
                            return `"${field.replace(/"/g, '""')}"`;
                        }
                        return field || '';
                    };
                    
                    csv += `${formatField(day.dateFormatted)},${formatField(day.dayName)},` +
                           `${formatField(session.trainer)},${formatField(session.hours)},` +
                           `${formatField(session.participant)},${formatField(session.level)}\n`;
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
        
        // Add date to filename
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        link.setAttribute('download', `TransDev_Training_Schedule_${dateStr}.csv`);
        
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }    importFromExcel() {
        // Check if XLSX is available
        if (typeof XLSX === 'undefined') {
            alert('Excel import library is not available. Please check your internet connection and reload the page.');
            return;
        }
          // Create a temporary file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.xlsx, .xls, .csv, .numbers, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);
        
        // Handle file selection
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) {
                document.body.removeChild(fileInput);
                return;
            }
            
            const fileName = file.name.toLowerCase();
            const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
            const isCsv = fileName.endsWith('.csv');
            
            if (!isExcel && !isCsv) {
                alert('Please upload an Excel file (.xlsx, .xls) or CSV file (.csv).');
                document.body.removeChild(fileInput);
                return;
            }
            
            const reader = new FileReader();
            
            if (isExcel) {
                // For Excel files                reader.onload = (event) => {
                    try {
                        console.log('Processing Excel file:', fileName);
                        const data = new Uint8Array(event.target.result);
                        
                        // Enhanced reading options for better compatibility
                        const readOptions = { 
                            type: 'array', 
                            cellDates: true, 
                            dateNF: 'mm/dd/yyyy',
                            cellText: false,  // Return formatted text for cells
                            cellNF: true,     // Parse number formats
                            WTF: true         // Enable error logging for troubleshooting
                        };
                        
                        const workbook = XLSX.read(data, readOptions);
                        console.log('Workbook loaded with sheets:', workbook.SheetNames);
                        
                        // Try to find the most relevant sheet (Numbers often creates multiple sheets)
                        let selectedSheet = null;
                        let selectedSheetName = null;
                        
                        // First look for sheets with specific naming patterns common in Numbers exports
                        for (const sheetName of workbook.SheetNames) {
                            const lowerName = sheetName.toLowerCase();
                            if (lowerName.includes('schedule') || 
                                lowerName.includes('training') || 
                                lowerName.includes('data') ||
                                lowerName.includes('sheet') ||
                                lowerName.includes('table')) {
                                selectedSheetName = sheetName;
                                break;
                            }
                        }
                        
                        // If no named match, take the sheet with most data
                        if (!selectedSheetName) {
                            let maxRows = 0;
                            for (const sheetName of workbook.SheetNames) {
                                const sheet = workbook.Sheets[sheetName];
                                const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
                                const rowCount = range.e.r - range.s.r + 1;
                                if (rowCount > maxRows) {
                                    maxRows = rowCount;
                                    selectedSheetName = sheetName;
                                }
                            }
                        }
                        
                        // If still no sheet found, use the first one
                        if (!selectedSheetName && workbook.SheetNames.length > 0) {
                            selectedSheetName = workbook.SheetNames[0];
                        }
                        
                        if (!selectedSheetName) {
                            throw new Error('Could not find any valid sheets in the Excel file.');
                        }
                        
                        console.log(`Selected sheet "${selectedSheetName}" for import`);
                        const worksheet = workbook.Sheets[selectedSheetName];
                        
                        // Convert to JSON - use header: 1 option to get array of arrays
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
                            header: 1, 
                            raw: false, 
                            defval: '',
                            blankrows: false // Skip completely empty rows
                        });
                        
                        console.log('Sheet converted to JSON format, rows:', jsonData.length);
                        
                        if (jsonData.length < 2) {
                            throw new Error('The Excel file must contain at least a header row and one data row.');
                        }
                        
                        // Find and skip any blank header rows (common in Numbers exports)
                        let startRow = 0;
                        for (let i = 0; i < Math.min(5, jsonData.length); i++) {
                            const row = jsonData[i];
                            // Check if this row has potential headers
                            const hasContent = row.some(cell => cell && cell.toString().trim() !== '');
                            if (hasContent) {
                                // Check if this row contains any likely header keywords
                                const rowText = row.join(' ').toLowerCase();
                                if (rowText.includes('date') || rowText.includes('train') || 
                                    rowText.includes('day') || rowText.includes('schedule')) {
                                    startRow = i;
                                    break;
                                }
                            }
                        }                        // Check if this is likely an Apple Numbers file by looking at the filename or workbook structure
                        const isLikelyNumbersFile = 
                            fileName.toLowerCase().includes('numbers') || 
                            workbook.SheetNames.some(name => 
                                name.includes('Table') || 
                                name.includes('Sheet') ||
                                name.includes('Data')
                            ) ||
                            // Multiple sheets with Tables is common in Numbers exports
                            (workbook.SheetNames.length > 1 && workbook.SheetNames.includes('Sheet1')) ||
                            // Also check common Numbers export characteristics in the data
                            (jsonData.length > 3 && jsonData.slice(0, 5).some(row => 
                                row && row.some(cell => 
                                    // Period-delimited dates are a strong indicator of Numbers format
                                    cell && typeof cell === 'string' && /\d{1,2}\.\d{1,2}\.\d{2,4}/.test(String(cell))
                                )
                            )) ||
                            // Look for textual dates with comma (May 18, 2025) - common in Numbers
                            (jsonData.length > 3 && jsonData.slice(0, 5).some(row =>
                                row && row.some(cell =>
                                    cell && typeof cell === 'string' && 
                                    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2}, \d{4}$/i.test(String(cell).trim())
                                )
                            )) ||
                            // Check for metadata rows in the header (common in Numbers)
                            (jsonData.length > 5 && jsonData.slice(0, 5).some(row =>
                                row && row.join(' ').toLowerCase().includes('generated') && 
                                row.join(' ').toLowerCase().includes('numbers')
                            ));
            
            let processedData;
            if (isLikelyNumbersFile) {
                console.log('Detected possible Apple Numbers file, applying specialized processing');
                processedData = this.handleNumbersFormatting(jsonData);
            } else {
                // Create a new dataset starting from the identified header row for standard Excel files
                processedData = jsonData.slice(startRow);
            }
            
            console.log(`Processed data has ${processedData.length} rows`);
            
            if (processedData.length < 2) {
                throw new Error('Could not find valid data with headers in the Excel file.');
            }
            
            // Process the Excel data - let the function handle header detection
            this.processExcelData(processedData);
            document.body.removeChild(fileInput);
        } catch (error) {
            console.error('Excel import error:', error);
              // Show dialog with template option            // Check if this might be an Apple Numbers file
            const isLikelyNumbersFile = fileName.toLowerCase().includes('numbers') || 
                                          (error.message && (error.message.includes('Numbers') ||
                                           error.message.includes('worksheet') ||
                                           error.message.includes('header') ||
                                           error.message.includes('format') ||
                                           error.message.includes('date'))) ||
                                          (fileName.lastIndexOf('.') > 0 && 
                                           fileName.substring(fileName.lastIndexOf('.')).toLowerCase() === '.xlsx' &&
                                           error.message && (
                                             error.message.includes('column') ||
                                             error.message.includes('header') ||
                                             error.message.includes('parsing')
                                           ));
                                                   
            if (error.message && error.message.includes('Could not find required columns')) {
                let errorMessage = `Error importing Excel file: ${error.message}\n\n`;
                errorMessage += 'Tips:\n';
                errorMessage += '1. Your Excel file should have columns for Date and Trainer (header names are flexible)\n';
                errorMessage += '2. Make sure the first row contains headers\n';
                errorMessage += '3. Date can be in any standard format\n';
                  // If it's a Numbers file, show special instructions and offer a Numbers-compatible template
                if (isLikelyNumbersFile) {
                    errorMessage += '\nIt appears you might be importing from Apple Numbers:\n';
                    errorMessage += '• When exporting from Numbers, choose "Export To" > "Excel (.xlsx)" format\n';
                    errorMessage += '• Click "Advanced Options" and check "Use Excel Compatibility Mode"\n';                    errorMessage += '• Ensure your first row clearly contains column headers like "Date" and "Trainer"\n';
                    errorMessage += '• If you see this error repeatedly, try adding a blank row before your header row\n';
                    errorMessage += '• Remove any complex formatting, tables, merged cells, or text styling\n';
                    errorMessage += '• Keep the data in a simple table format with a clear header row\n';
                    errorMessage += '• For website format templates, ensure dates are in the top row\n';
                    errorMessage += '• For website format templates, ensure "Trainer" is clearly marked in a row\n';
                    
                    const userChoice = confirm(errorMessage + '\nWould you like to download a template? Select OK for standard format, or Cancel for website format with dates as columns.');
                    if (userChoice) {
                        try {
                            this.createNumbersCompatibleTemplate();
                            alert('Numbers-compatible template downloaded successfully. Please open this file in Numbers, fill it out, and export using the instructions in the template.');
                        } catch (templateError) {
                            console.error('Error creating Numbers template:', templateError);
                            alert('Error creating template. Please make sure you have a stable internet connection.');
                        }
                    } else {
                        // User chose website format template
                        try {
                            if (typeof createWebsiteFormatTemplate === 'function') {
                                createWebsiteFormatTemplate();
                                alert('Website format template downloaded successfully. This template has dates as columns and trainers as rows.');
                            } else {
                                alert('Website format template function is not available. Loading the creator script...');
                                // If the function is not available yet, try to load it
                                const script = document.createElement('script');
                                script.src = 'src/js/websiteFormatTemplate.js';
                                script.onload = function() {
                                    createWebsiteFormatTemplate();
                                    alert('Website format template downloaded successfully. This template has dates as columns and trainers as rows.');
                                };
                                document.head.appendChild(script);
                            }
                        } catch (templateError) {
                            console.error('Error creating website format template:', templateError);
                            alert('Error creating website format template. Please make sure you have a stable internet connection.');
                        }
                    }
                } else {
                    // Standard Excel template for non-Numbers files
                    errorMessage += '\nWould you like to download a template Excel file with the correct format?';
                    
                    if (confirm(errorMessage)) {
                        try {
                            this.downloadExcelTemplate();
                            alert('Template downloaded successfully. Fill it out and try importing again.');
                        } catch (templateError) {
                            console.error('Error downloading template:', templateError);
                            alert('Error creating template. Please make sure you have a stable internet connection.');
                        }
                    }
                }
            } else {
                // Generic error
                let errorMessage = `Error importing Excel file: ${error.message || 'Unknown error'}\n\n`;
                errorMessage += 'Tips:\n';
                errorMessage += '1. Your Excel file should have columns for Date and Trainer\n';
                errorMessage += '2. Date can be in any standard format\n';
                errorMessage += '3. Make sure the first row contains headers\n';
                  if (isLikelyNumbersFile) {
                    errorMessage += '\nApple Numbers specific tips:\n';
                    errorMessage += '• Use "Export To" > "Excel (.xlsx)" in Numbers\n';
                    errorMessage += '• Click "Advanced Options" and check "Use Excel Compatibility Mode"\n';
                    errorMessage += '• Avoid special formatting, tables, merged cells, or complex styling\n';
                    errorMessage += '• Make sure column headers are clearly labeled as "Date" and "Trainer"\n';
                    errorMessage += '• If the header isn\'t detected, try adding a blank row before your header row\n';
                    errorMessage += '• Use our template file as a starting point for guaranteed compatibility\n';
                    
                    const userChoice = confirm(errorMessage + '\nWould you like to download a Numbers-compatible template?');
                    if (userChoice) {
                        try {
                            this.createNumbersCompatibleTemplate();
                            alert('Numbers-compatible template downloaded successfully. Please open this file in Numbers, fill it out, and export using the instructions in the template.');
                        } catch (templateError) {
                            console.error('Error creating Numbers template:', templateError);
                            alert('Error creating template. Please make sure you have a stable internet connection.');
                        }
                    }
                } else {
                    alert(errorMessage);
                }
            }
            document.body.removeChild(fileInput);
        }
    }processCSV(csvContent) {
        // Parse CSV content
        const lines = csvContent.split('\n');
        
        if (lines.length < 2) {
            throw new Error('CSV file appears to be empty or has insufficient data.');
        }
        
        // Try to detect the CSV format
        let isStandardFormat = false; // Date,Day,Trainer,Hours,Participant,Level/Goal format
        let isWebsiteFormat = false;  // Date at top with Trainer,Hours,Participant,Level/Goal as columns
        
        console.log('Analyzing CSV format...');
        
        // Check for standard format (header has "date" and "trainer" in it)
        const firstLineStandard = lines[0].trim().toLowerCase();
        isStandardFormat = firstLineStandard.includes('date') && firstLineStandard.includes('trainer');
          // Check for website format (has dates on top row, and "trainer" in second or third row)
        if (lines.length >= 3) {
            // First row might contain dates (check for date patterns)
            const firstLine = lines[0].trim();
            // Enhanced date pattern to catch more variations of date formats
            const datePattern = /\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}\.\d{1,2}\.\d{2,4}|\d{4}-\d{1,2}-\d{1,2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{2,4}/i;
            
            // Check multiple cells in the first row for dates
            const firstValues = this.parseCSVLine(lines[0]);
            const hasDateInFirstRow = firstValues.some(cell => datePattern.test(String(cell).trim()));
            
            // Second row might contain day names
            const secondLine = lines[1].trim().toLowerCase();
            const secondValues = this.parseCSVLine(lines[1]);
            
            const dayPatterns = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            const hasDaysInSecondRow = dayPatterns.some(day => 
                secondLine.includes(day) || secondValues.some(cell => 
                    String(cell).toLowerCase().includes(day)
                )
            );
            
            // Third row or any row in first few rows should have "trainer" in it
            let hasTrainerRow = false;
            let trainerRowIndex = -1;
            
            for (let i = 0; i < Math.min(5, lines.length); i++) {
                const lineValues = this.parseCSVLine(lines[i]);
                const lineHasTrainer = lineValues.some(cell => 
                    cell && String(cell).toLowerCase().includes('trainer')
                );
                
                if (lineHasTrainer) {
                    hasTrainerRow = true;
                    trainerRowIndex = i;
                    break;
                }
            }
            
            // If we detect the website format pattern
            isWebsiteFormat = (hasDateInFirstRow || hasDaysInSecondRow) && hasTrainerRow;            
            console.log('CSV Format Detection:', { 
                hasDateInFirstRow, 
                hasDaysInSecondRow, 
                hasTrainerRow,
                trainerRowIndex,
                isWebsiteFormat
            });
        }
        
        // If neither format is clearly detected, default to standard
        if (!isStandardFormat && !isWebsiteFormat) {
            console.log('Could not clearly determine CSV format. Checking headers...');
            
            // Try one more check - does the file have headers like "Trainer" and "Hours"?
            for (let i = 0; i < Math.min(5, lines.length); i++) {
                const line = lines[i].trim().toLowerCase();
                const values = this.parseCSVLine(line);
                
                // Check if any values in this row contain "trainer"
                const hasTrainer = values.some(cell => 
                    cell && String(cell).toLowerCase().includes('trainer')
                );
                
                // Check if this row has hours or participant
                const hasOtherColumns = values.some(cell => 
                    cell && String(cell).toLowerCase().match(/hours|participant|level|goal/)
                );
                
                if (hasTrainer && hasOtherColumns) {
                    isWebsiteFormat = true;
                    console.log('Detected website format based on trainer/hours headers at line', i+1);
                    break;
                }
            }
            
            // If still not detected, default to standard
            if (!isStandardFormat && !isWebsiteFormat) {
                isStandardFormat = true;
                console.log('Defaulting to standard format');
            }
        }
        
        // Clear current schedule data
        if (confirm('Do you want to clear the current schedule and replace it with the imported data?')) {
            this.days = [];
            
            // Process based on detected format
            if (isWebsiteFormat) {
                this.processWebsiteFormatCSV(lines);
            } else {
                this.processStandardFormatCSV(lines);
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
    
    processStandardFormatCSV(lines) {
        // This is the original format: Date,Day,Trainer,Hours,Participant,Level/Goal
        console.log('Processing as standard CSV format');
        
        // Create a map to track unique dates
        const dateMap = new Map();
        
        // Skip header row
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // Parse CSV line (handle quotes and commas in fields)
            const values = this.parseCSVLine(line);
            
            if (values.length < 4) continue; // Skip invalid lines (need at least date, day, trainer, hours)
            
            // Handle different column possibilities
            const dateStr = values[0];
            const dayName = values[1];
            const trainer = values[2];
            const hours = values[3];
            const participant = values.length > 4 ? values[4] : '';
            const level = values.length > 5 ? values[5] : '';
            
            // Skip lines without date or trainer
            if (!dateStr || !trainer) continue;
            
            // Parse the date - try multiple formats
            let date;
            try {
                // Try to handle common date formats
                date = this.parseFlexibleDate(dateStr);
                if (!date) continue; // Skip if date couldn't be parsed
            } catch (e) {
                console.error(`Error parsing date "${dateStr}" on line ${i+1}:`, e);
                continue; // Skip this line if date parsing fails
            }
            
            const formattedDateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            
            // Create or get day entry
            let dayObj;
            if (dateMap.has(formattedDateStr)) {
                dayObj = this.days[dateMap.get(formattedDateStr)];
            } else {
                dayObj = {
                    date: date,
                    dateFormatted: formattedDateStr,
                    dayName: dayName || date.toLocaleDateString('en-US', { weekday: 'long' }),
                    sessions: []
                };
                
                this.days.push(dayObj);
                dateMap.set(formattedDateStr, this.days.length - 1);
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
    }
      processWebsiteFormatCSV(lines) {
        // This is the website format: Dates as columns, with Trainer, Hours, Participant, Level/Goal rows
        console.log('Processing as website format CSV');
        
        // Find the structure rows
        let dateRowIndex = 0;
        let dayRowIndex = 1;
        let headerRowIndex = 2;
        
        // Try to find the actual row indexes by checking content (more reliable)
        for (let i = 0; i < Math.min(5, lines.length); i++) {
            const line = lines[i].trim().toLowerCase();
            const values = this.parseCSVLine(line);
            
            // Check for date patterns in the row (various formats)
            const datePattern = /\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}\.\d{1,2}\.\d{2,4}|\d{4}-\d{1,2}-\d{1,2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{2,4}/i;
            
            // Check if any value in this row contains a date
            const hasDateInRow = values.some(cell => 
                cell && datePattern.test(String(cell).trim())
            );
            
            if (hasDateInRow) {
                dateRowIndex = i;
                dayRowIndex = i + 1; // Day row is usually right after date row
                headerRowIndex = i + 2; // Header row (Trainer, Hours, etc.) is after day row
                console.log(`Found date row at index ${i}`);
                break;
            }
            
            // Alternative detection: look for day names in second row
            const dayPatterns = dayPatterns = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            const hasDayNames = dayPatterns.some(day => 
                values.some(cell => cell && String(cell).toLowerCase().includes(day))
            );
            
            if (hasDayNames) {
                dayRowIndex = i;
                dateRowIndex = Math.max(0, i - 1); // Date row is usually before day row
                headerRowIndex = i + 1; // Header row is after day row
                console.log(`Found day row at index ${i}`);
                break;
            }
            
            // Another alternative: look for "trainer" and "hours"
            const hasTrainer = values.some(cell => 
                cell && String(cell).toLowerCase().includes('trainer')
            );
            
            const hasHoursOrParticipant = values.some(cell => 
                cell && String(cell).toLowerCase().match(/hours|participant|level|goal/)
            );
            
            if (hasTrainer && hasHoursOrParticipant) {
                headerRowIndex = i;
                dayRowIndex = Math.max(0, i - 1);
                dateRowIndex = Math.max(0, i - 2);
                console.log(`Found header row at index ${i}`);
                break;
            }
        }
        
        console.log('Identified row indexes:', { dateRowIndex, dayRowIndex, headerRowIndex });
        
        // Make sure we have at least the header row plus one data row
        if (lines.length <= headerRowIndex + 1) {
            throw new Error('CSV file does not have enough data rows.');
        }
          // Parse the date row
        const dateValues = this.parseCSVLine(lines[dateRowIndex]);
        
        // Parse the day row
        const dayValues = this.parseCSVLine(lines[dayRowIndex]);
        
        // Parse the header row (Trainer, Hours, etc.)
        const headerValues = this.parseCSVLine(lines[headerRowIndex]);
        
        console.log('Date values:', dateValues);
        console.log('Day values:', dayValues);
        console.log('Header values:', headerValues);
        
        // Find which column contains what data
        const columnMap = {
            trainer: -1,
            hours: -1,
            participant: -1,
            level: -1
        };
        
        // Map header labels to columns with more flexible matching
        headerValues.forEach((header, index) => {
            if (!header) return; // Skip empty cells
            
            const lowerHeader = String(header).toLowerCase().trim();
            
            // More flexible matching
            if (lowerHeader.includes('train')) columnMap.trainer = index;
            else if (lowerHeader.includes('hour') || lowerHeader.includes('time')) columnMap.hours = index;
            else if (lowerHeader.includes('part') || lowerHeader.includes('stud')) columnMap.participant = index;
            else if (lowerHeader.includes('lev') || lowerHeader.includes('goal')) columnMap.level = index;
        });
        
        console.log('Column mapping:', columnMap);
        
        // Try to infer missing columns if possible
        if (columnMap.trainer === -1 && headerValues.length > 0) {
            // First column is often trainer in this format
            columnMap.trainer = 0;
            console.log('Inferring trainer column at index 0');
        }
        
        if (columnMap.hours === -1 && headerValues.length > 1) {
            // Second column is often hours
            columnMap.hours = 1;
            console.log('Inferring hours column at index 1');
        }
        
        // Validate we have at least the trainer column
        if (columnMap.trainer === -1) {
            throw new Error('Could not find the Trainer column in the CSV file.');
        }
          // Find date columns - they start after the column headers
        const dateColumns = [];
        const dateObjects = [];
        
        // Process each date column
        for (let colIndex = 0; colIndex < dateValues.length; colIndex++) {
            const dateValue = dateValues[colIndex];
            const dayValue = (colIndex < dayValues.length) ? dayValues[colIndex] : '';
            
            // Skip empty columns or columns with header text
            if (!dateValue || 
                (typeof dateValue === 'string' && 
                 (dateValue.toLowerCase().includes('train') || 
                  dateValue.toLowerCase().includes('hour') ||
                  dateValue.toLowerCase().includes('participant') ||
                  dateValue.toLowerCase().includes('level')))) {
                continue;
            }
            
            // Try to parse the date
            try {
                // Skip empty strings and non-date values
                if (!dateValue || dateValue === '') continue;
                
                console.log(`Trying to parse date: "${dateValue}" at column ${colIndex}`);
                const date = this.parseFlexibleDate(dateValue);
                
                if (date) {
                    dateColumns.push(colIndex);
                    dateObjects.push({
                        date: date,
                        dateFormatted: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
                        dayName: dayValue ? String(dayValue).trim() : date.toLocaleDateString('en-US', { weekday: 'long' }),
                        colIndex: colIndex
                    });
                    console.log(`Column ${colIndex} contains date: ${dateValue} (${dayValue})`);
                }
            } catch (e) {
                console.error(`Error parsing date "${dateValue}" in column ${colIndex}:`, e);
            }
        }
        
        // Make sure we found at least one date column
        if (dateColumns.length === 0) {
            // Try one more approach - check if any cell in the date row has a number pattern that might be a date
            for (let colIndex = 0; colIndex < dateValues.length; colIndex++) {
                const value = dateValues[colIndex];
                if (!value) continue;
                
                // Check if this looks like a date serial number pattern (Excel style dates)
                const numValue = parseFloat(value);
                if (!isNaN(numValue) && numValue > 40000 && numValue < 50000) {
                    // This looks like an Excel date serial number, try to convert
                    try {
                        // Excel date serial (days since 1900-01-01, or 1904-01-01 for Mac Excel)
                        const date = new Date((numValue - 25569) * 86400 * 1000);
                        if (!isNaN(date.getTime())) {
                            dateColumns.push(colIndex);
                            dateObjects.push({
                                date: date,
                                dateFormatted: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
                                dayName: 'Unknown Day',
                                colIndex: colIndex
                            });
                            console.log(`Column ${colIndex} contains Excel date serial: ${value} → ${date.toLocaleDateString()}`);
                        }
                    } catch (e) {
                        console.error(`Error converting possible Excel date serial "${value}":`, e);
                    }
                }
            }
            
            // If we still have no date columns, throw an error
            if (dateColumns.length === 0) {
                throw new Error('Could not find any date columns in the CSV file.');
            }
        }
        
        // Create day objects from date columns
        dateObjects.forEach(dateObj => {
            this.days.push({
                date: dateObj.date,
                dateFormatted: dateObj.dateFormatted,
                dayName: dateObj.dayName,
                sessions: []
            });
        });
        
        // Process data rows to extract sessions
        for (let rowIndex = headerRowIndex + 1; rowIndex < lines.length; rowIndex++) {
            const line = lines[rowIndex].trim();
            if (!line) continue;
            
            const values = this.parseCSVLine(line);
            
            // Skip if line doesn't have enough columns
            if (values.length <= columnMap.trainer) continue;
            
            // Get trainer value - skip empty rows
            const trainer = values[columnMap.trainer];
            if (!trainer || String(trainer).trim() === '') continue;
            
            // Get other values
            const hours = columnMap.hours !== -1 && values.length > columnMap.hours ? values[columnMap.hours] : '';
            const participant = columnMap.participant !== -1 && values.length > columnMap.participant ? values[columnMap.participant] : '';
            const level = columnMap.level !== -1 && values.length > columnMap.level ? values[columnMap.level] : '';
            
            console.log(`Processing row ${rowIndex+1} for trainer: ${trainer}`);
            
            // Process each date column to create sessions
            dateObjects.forEach((dateObj, idx) => {
                if (!this.days[idx]) {
                    console.error(`Missing day object at index ${idx}`);
                    return;
                }
                
                const dayObj = this.days[idx];
                
                // Check if this day already has this exact trainer/hours session
                const hasDuplicate = dayObj.sessions.some(s => 
                    String(s.trainer).trim() === String(trainer).trim() && 
                    String(s.hours).trim() === String(hours).trim());
                
                if (!hasDuplicate) {
                    // Create a new session for this trainer on this day
                    dayObj.sessions.push({
                        trainer: String(trainer).trim(),
                        hours: String(hours).trim(),
                        participant: String(participant).trim(),
                        level: String(level).trim()
                    });
                    
                    console.log(`Added session for ${trainer} on ${dayObj.dateFormatted}`);
                } else {
                    console.log(`Skipped duplicate session for ${trainer} on ${dayObj.dateFormatted}`);
                }
            });
        }
    }    processExcelData(data) {
        console.log('Processing Excel data with', data.length, 'rows');
        
        if (data.length < 2) {
            throw new Error('Excel file must have at least a header row and one data row.');
        }
        
        // Detect if this is website format (dates as columns) or standard format
        let isWebsiteFormat = false;
        
        // Check first two rows for website format characteristics
        // First row might contain dates (check for date patterns)
        const firstRow = data[0];
        let dateCount = 0;
        
        for (let i = 1; i < firstRow.length; i++) {
            const cell = firstRow[i];
            if (!cell) continue;
            
            const cellStr = String(cell).trim();
            
            // Enhanced date pattern detection
            if (/^\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}$/.test(cellStr) || 
                /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2},? \d{4}$/i.test(cellStr) ||
                /^\d{4}[\/\.\-]\d{1,2}[\/\.\-]\d{1,2}$/.test(cellStr) ||
                // Excel date serial numbers
                (typeof cell === 'number' && cell > 40000 && cell < 50000)) {
                dateCount++;
            }
        }
        
        // If we found multiple date-like cells in the first row, likely website format
        if (dateCount >= 2) {
            console.log(`Detected website format with ${dateCount} dates in first row`);
            isWebsiteFormat = true;
        }
        
        // Second check - look for day names in second row
        if (!isWebsiteFormat && data.length >= 2) {
            const secondRow = data[1];
            let dayCount = 0;
            
            const dayPatterns = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            
            for (let i = 1; i < secondRow.length; i++) {
                const cell = secondRow[i];
                if (!cell) continue;
                
                const cellStr = String(cell).toLowerCase().trim();
                
                // Check if this cell contains a day name
                if (dayPatterns.some(day => cellStr.includes(day))) {
                    dayCount++;
                }
            }
            
            // If we found multiple day names in the second row, likely website format
            if (dayCount >= 2) {
                console.log(`Detected website format with ${dayCount} day names in second row`);
                isWebsiteFormat = true;
            }
        }
        
        // Third check - look for "trainer" in first column
        if (!isWebsiteFormat) {
            for (let i = 2; i < Math.min(6, data.length); i++) {
                const row = data[i];
                if (!row || !row[0]) continue;
                
                const firstCell = String(row[0]).toLowerCase().trim();
                if (firstCell.includes('train')) {
                    console.log(`Detected website format with "trainer" in first column at row ${i+1}`);
                    isWebsiteFormat = true;
                    break;
                }
            }
        }
        
        // Final check for website format - column headers
        if (!isWebsiteFormat && data.length >= 3) {
            // Look for a row with "trainer", "hours", "participant", etc. in the first few columns
            for (let i = 0; i < Math.min(5, data.length); i++) {
                const row = data[i];
                if (!row) continue;
                
                // Count typical website format headers
                let headerCount = 0;
                for (let j = 0; j < Math.min(5, row.length); j++) {
                    const cell = row[j];
                    if (!cell) continue;
                    
                    const cellStr = String(cell).toLowerCase().trim();
                    if (cellStr.includes('train') || 
                        cellStr.includes('hour') || 
                        cellStr.includes('time') ||
                        cellStr.includes('part') || 
                        cellStr.includes('stud') ||
                        cellStr.includes('lev') || 
                        cellStr.includes('goal')) {
                        headerCount++;
                    }
                }
                
                if (headerCount >= 2) {
                    console.log(`Detected website format with ${headerCount} header keywords in row ${i+1}`);
                    isWebsiteFormat = true;
                    break;
                }
            }
        }
        
        // Convert Excel data to CSV format for processing
        let csvLines = data.map(row => 
            row.map(cell => this.escapeCsvValue(cell)).join(',')
        );
        
        // Clear current schedule data
        if (confirm('Do you want to clear the current schedule and replace it with the imported data?')) {
            this.days = [];
            
            console.log('Processing as', isWebsiteFormat ? 'website format' : 'standard format');
            
            // Process based on detected format
            if (isWebsiteFormat) {
                this.processWebsiteFormatCSV(csvLines);
            } else {
                this.processStandardFormatCSV(csvLines);
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
    
    // Helper method to escape CSV values properly
    escapeCsvValue(value) {
        if (value === null || value === undefined) return '';
        
        const stringValue = String(value);
        
        // If the value contains commas, quotes, or newlines, enclose it in quotes
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            // Double any existing quotes
            return `"${stringValue.replace(/"/g, '""')}"`;
        }
        
        return stringValue;
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
});    handleNumbersFormatting(jsonData) {
        // Apple Numbers files often have special formatting that causes import issues
        // This function tries to detect and fix common Numbers export problems
        
        console.log('Applying Apple Numbers format handling');
        
        // First, check if this might be in website format (dates across the top)
        let isWebsiteFormat = false;
        
        // Check first two rows for website format characteristics
        if (jsonData.length >= 2) {
            // Check if first row has multiple date-like patterns
            const firstRow = jsonData[0];
            let dateCount = 0;
            
            for (let i = 1; i < firstRow.length; i++) {
                const cell = firstRow[i];
                if (!cell) continue;
                
                const cellStr = String(cell).trim();
                
                // Count cells that look like dates in various formats
                if (/^\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}$/.test(cellStr) || 
                    /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2},? \d{4}$/i.test(cellStr) ||
                    /^\d{4}[\/\.\-]\d{1,2}[\/\.\-]\d{1,2}$/.test(cellStr) ||
                    // Also check for Excel date serial numbers
                    (typeof cell === 'number' && cell > 40000 && cell < 50000)) {
                    dateCount++;
                }
            }
            
            // If we found multiple date-like cells in the first row, likely website format
            if (dateCount >= 2) {
                console.log(`Detected possible website format with ${dateCount} dates in first row`);
                isWebsiteFormat = true;
            }
            
            // Alternative detection - look for day names in second row
            if (!isWebsiteFormat && jsonData.length >= 3) {
                const secondRow = jsonData[1];
                let dayCount = 0;
                
                const dayPatterns = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                
                for (let i = 1; i < secondRow.length; i++) {
                    const cell = secondRow[i];
                    if (!cell) continue;
                    
                    const cellStr = String(cell).toLowerCase().trim();
                    
                    // Count cells that look like day names
                    if (dayPatterns.some(day => cellStr.includes(day))) {
                        dayCount++;
                    }
                }
                
                // If we found multiple day names in the second row, likely website format
                if (dayCount >= 2) {
                    console.log(`Detected possible website format with ${dayCount} day names in second row`);
                    isWebsiteFormat = true;
                }
                
                // Third check - look for a row with "trainer" in the first column
                // (common in website format exports from Numbers)
                for (let i = 1; i < Math.min(6, jsonData.length); i++) {
                    const row = jsonData[i];
                    if (!row || !row[0]) continue;
                    
                    const firstCell = String(row[0]).toLowerCase().trim();
                    if (firstCell.includes('train')) {
                        console.log(`Detected possible website format with "trainer" in first column at row ${i+1}`);
                        isWebsiteFormat = true;
                        break;
                    }
                }
            }
        }
        
        // If we detected website format, return the data as is - it will be processed differently
        if (isWebsiteFormat) {
            console.log('Treating file as website format (dates as columns)');
            return jsonData;
        }
        
        // Numbers often adds empty rows at the top or metadata - find the actual header row
        let headerRowIndex = 0;
        let dataFound = false;
        
        // Search through the first several rows for data (Numbers may add more metadata rows)
        for (let i = 0; i < Math.min(15, jsonData.length); i++) {
            const row = jsonData[i];
            if (!row || row.length === 0) continue;
            
            // Check if this row has potential header data - use more comprehensive keyword matching
            const hasText = row.some(cell => {
                if (!cell) return false;
                const cellStr = String(cell).toLowerCase().trim();
                // More comprehensive keyword matching for Numbers headers
                return cellStr.includes('date') || 
                       cellStr.includes('trainer') || 
                       cellStr.includes('day') ||
                       cellStr.includes('level') ||
                       cellStr.includes('hour') ||
                       cellStr.includes('schedule') ||
                       cellStr.includes('participant') ||
                       cellStr.includes('goal') ||
                       cellStr.includes('when') ||
                       cellStr.includes('time') ||
                       cellStr.includes('instruct') ||
                       cellStr.includes('session');
            });
            
            if (hasText) {
                headerRowIndex = i;
                dataFound = true;
                console.log(`Found potential header row at index ${i} with keywords`);
                break;
            }
            
            // Check if this might be a row with single letter/number headers (common in Numbers)
            const potentialAutoHeaders = row.filter(cell => {
                if (!cell) return false;
                const cellStr = String(cell).trim();
                // Check for single letters (A, B, C) or numbers (1, 2, 3) that Numbers might use as auto-headers
                return /^[A-Z]$|^\d+$/.test(cellStr);
            });
            
            // If we have multiple single character cells that could be auto-headers
            if (potentialAutoHeaders.length >= 3) {
                console.log(`Found potential Numbers auto-header row at index ${i} with single characters`);
                headerRowIndex = i;
                dataFound = true;
                break;
            }
            
            // Check date patterns in cells that might indicate this is a data row
            const hasDatePattern = row.some(cell => {
                if (!cell) return false;
                const cellStr = String(cell).trim();
                // Look for date patterns: MM/DD/YYYY, MM.DD.YYYY, or Month names
                return /^\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}$/.test(cellStr) || 
                       /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(cellStr) ||
                       // Also check for ISO format dates
                       /^\d{4}[\/\.\-]\d{1,2}[\/\.\-]\d{1,2}$/.test(cellStr);
            });
            
            if (hasDatePattern && i > 0) {
                // If we find a date pattern, assume the previous row is the header
                headerRowIndex = Math.max(0, i - 1);
                dataFound = true;
                console.log(`Found date pattern at row ${i}, assuming header at row ${headerRowIndex}`);
                break;
            }
            
            // Special logic to detect Numbers export patterns in column structure
            // Numbers often exports with a specific pattern of empty cells or formatting
            if (row.length >= 6) {
                // Check if this looks like a data row by examining if first cell might be a date
                // and if enough columns with content exist
                const firstCell = row[0];
                const nonEmptyCells = row.filter(cell => cell !== undefined && cell !== null && cell !== '');
                
                // If we have a reasonable number of non-empty cells that could be data
                if (nonEmptyCells.length >= 3 && firstCell) {
                    const firstCellStr = String(firstCell).trim();
                    
                    // Check if first cell might be a date (by patterns or numeric values that could be dates)
                    const couldBeDate = /^\d{1,4}[\/\.\-]\d{1,2}[\/\.\-]\d{1,4}$/.test(firstCellStr) || 
                                       (typeof firstCell === 'number' && firstCell > 40000 && firstCell < 50000) // Excel date serial range
                                       /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(firstCellStr);
                    
                    if (couldBeDate && i > 0) {
                        headerRowIndex = Math.max(0, i - 1);
                        dataFound = true;
                        console.log(`Found potential date value in first column at row ${i}, assuming header at row ${headerRowIndex}`);
                        break;
                    }
                }
            }
        }
        
        if (!dataFound && jsonData.length > 0) {
            console.log('No clear header row found, using first row');
            headerRowIndex = 0;
        }
        
        // If we found a better header row, slice the data to start from there
        const processedData = headerRowIndex > 0 
            ? jsonData.slice(headerRowIndex) 
            : jsonData;
            
        console.log(`Processed data now has ${processedData.length} rows, starting from original row ${headerRowIndex + 1}`);
        
        // Check if we have at least a header and one data row
        if (processedData.length < 2) {
            throw new Error('Could not find enough data with headers in the file. Make sure the file has a header row and at least one data row.');
        }
        
        // Special handling for Numbers exports with automatic headers (single letters/numbers)
        const headers = processedData[0];
        const hasAutoHeaders = headers.filter(h => h && /^[A-Z]$|^\d+$/.test(String(h).trim())).length >= 3;
        
        if (hasAutoHeaders) {
            console.log('Detected automatic headers from Numbers, converting to proper headers');
            // Replace with standard headers if we have mostly single-character headers
            processedData[0] = ['Date', 'Day', 'Trainer', 'Hours', 'Participant', 'Level/Goal'];
            console.log('Headers replaced with standard headers');
        }
        
        // Ensure all cells are strings for consistent processing
        // Also handle Numbers' specific date formats, including period-delimited dates
        return processedData.map((row, rowIndex) => 
            row.map((cell, colIndex) => {
                if (cell === undefined || cell === null) return '';
                
                const cellStr = String(cell);
                
                // For the first column in data rows (potential dates), normalize date formats
                if (rowIndex > 0 && colIndex === 0) {
                    return this.normalizeDateFormats(cellStr);
                }
                
                return cellStr;
            })
        );
    }
    
    downloadExcelTemplate() {
        // Create a workbook with a worksheet
        const wb = XLSX.utils.book_new();
        
        // Define headers and sample data
        const headers = ['Date', 'Day', 'Trainer', 'Hours', 'Participant', 'Level/Goal'];
        const sampleData = [
            ['5/18/2025', 'Sunday', 'Terry', '11:00 am to 7:30 pm', 'Teklu', 'RTW class (5)/ BTW (T9)'],
            ['5/19/2025', 'Monday', 'Veronica', '5:00 am to 1:00 pm', 'Joshua', 'BTW-7 hr Basic-1 hr prep'],
            ['5/19/2025', 'Monday', 'Galen', '5:00 am to 1:00 pm', 'Annette', 'BTW- 8hr Advanced'],
            ['5/19/2025', 'Monday', 'Sisay', '5:00 am to 1:00 pm', 'Juan', 'BTW-finish Advanced-final eval/revenue class']
        ];
        
        // Combine headers and data
        const wsData = [headers, ...sampleData];
        
        // Create worksheet and add to workbook
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        
        // Add some formatting to make it more user-friendly
        // Set column widths
        const wscols = [
            {wch: 12}, // Date
            {wch: 10}, // Day
            {wch: 12}, // Trainer
            {wch: 20}, // Hours
            {wch: 15}, // Participant
            {wch: 30}  // Level/Goal
        ];
        ws['!cols'] = wscols;
        
        XLSX.utils.book_append_sheet(wb, ws, "Schedule Template");
        
        // Generate file and trigger download
        XLSX.writeFile(wb, "TransDev_Schedule_Template.xlsx");
        
        console.log("Template file downloaded");
    }      createNumbersCompatibleTemplate() {
        // Create a workbook with a worksheet specifically formatted for Numbers compatibility
        const wb = XLSX.utils.book_new();
        
        // Define headers and sample data in a Numbers-friendly format
        const headers = ['Date', 'Day', 'Trainer', 'Hours', 'Participant', 'Level/Goal'];
        const sampleData = [
            // Use string dates instead of Date objects for better Numbers compatibility
            ['5/18/2025', 'Sunday', 'Terry', '11:00 am to 7:30 pm', 'Teklu', 'RTW class (5)/ BTW (T9)'],
            ['5/19/2025', 'Monday', 'Veronica', '5:00 am to 1:00 pm', 'Joshua', 'BTW-7 hr Basic-1 hr prep'],
            ['5/19/2025', 'Monday', 'Galen', '5:00 am to 1:00 pm', 'Annette', 'BTW- 8hr Advanced'],
            ['5/19/2025', 'Monday', 'Sisay', '5:00 am to 1:00 pm', 'Juan', 'BTW-finish Advanced-final eval/revenue class'],
            ['5/20/2025', 'Tuesday', 'Terry', '1:00 pm to 10:00 pm', 'Teklu', 'RTW class (5)/ BTW (19)'],
            ['5/20/2025', 'Tuesday', 'Patsy', '5:00 am to 1:00 pm', 'Joshua', 'BTW-finish basic-start advanced']
        ];
        
        // Add a notes sheet with detailed instructions for Numbers users
        const notesData = [
            ['TransDev Training Schedule - Instructions for Apple Numbers Users'],
            [''],
            ['IMPORTANT: Step-by-Step Guide for Successful Import'],
            [''],
            ['1. Using This Template:'],
            ['   • Open this file in Apple Numbers'],
            ['   • Fill in your data following the sample format on the "Schedule Template" sheet'],
            ['   • Keep the header row exactly as it appears (Date, Day, Trainer, Hours, Participant, Level/Goal)'],
            ['   • Do not add extra tables, charts, or formatting'],
            [''],
            ['2. Dates in Numbers:'],
            ['   • You can enter dates in any of these formats (all will work):'],
            ['     - MM/DD/YYYY (e.g., 5/18/2025) - recommended'],
            ['     - MM.DD.YYYY (e.g., 5.18.2025) - works with our enhanced import'],
            ['     - Month DD, YYYY (e.g., May 18, 2025) - works with our enhanced import'],
            ['     - You can also use Numbers\' date picker'],
            [''],
            ['3. Exporting Correctly from Numbers:'],
            ['   a. Click File > Export To > Excel (.xlsx)'],
            ['   b. Click the "Advanced Options" button'],
            ['   c. CRITICAL: Check the box for "Use Excel Compatibility Mode"'],
            ['   d. Click Next and save the file'],
            ['   e. Import this file into the TransDev Training Scheduler'],
            [''],
            ['4. Troubleshooting Import Issues:'],
            ['   If you see "Invalid Excel header" or "Could not find required columns" errors:'],
            ['   • Make sure your first row contains the exact headers from the template'],
            ['   • Try inserting one blank row above the header row before exporting'],
            ['   • Remove any fancy formatting, colors, or styles'],
            ['   • Make sure there are no merged cells or tables'],
            ['   • Ensure you\'ve checked "Use Excel Compatibility Mode" during export'],
            ['   • Try exporting just the data table, not the entire sheet'],
            [''],
            ['5. Required Information:'],
            ['   • The "Date" and "Trainer" columns are required, others are optional'],
            ['   • The system will try to match column names even if they\'re slightly different'],
            ['   • All dates will be converted to MM/DD/YYYY format during import'],
            [''],
            ['For assistance, contact your system administrator.'],
            [''],
            ['TransDev Commerce City Training - Excel Import Guide - ' + new Date().toLocaleDateString()]
        ];
        
        // Create the main data worksheet with examples
        const wsData = [headers, ...sampleData];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        
        // Create the instructions worksheet
        const wsNotes = XLSX.utils.aoa_to_sheet(notesData);
        
        // Add some formatting to make it more user-friendly
        const wscols = [
            {wch: 12}, // Date
            {wch: 10}, // Day
            {wch: 12}, // Trainer
            {wch: 20}, // Hours
            {wch: 15}, // Participant
            {wch: 30}  // Level/Goal
        ];
        ws['!cols'] = wscols;
        
        // Format the instructions sheet
        const wsNotesCols = [
            {wch: 80}  // Wide column for instructions
        ];
        wsNotes['!cols'] = wsNotesCols;
        
        // Add worksheets to workbook - put instructions first
        XLSX.utils.book_append_sheet(wb, wsNotes, "READ ME FIRST");
        XLSX.utils.book_append_sheet(wb, ws, "Schedule Template");
        
        // Add a third sheet with alternative date formats as examples
        const dateExamples = [
            ['Date Format Examples - All These Will Work When Imported'],
            [''],
            ['Format', 'Example', 'Notes'],
            ['MM/DD/YYYY', '5/18/2025', 'Recommended - Standard Format (works best)'],
            ['MM/DD/YY', '5/18/25', 'Short year format (2-digit year)'],
            ['MM.DD.YYYY', '5.18.2025', 'Numbers format with period separators'],
            ['Month DD, YYYY', 'May 18, 2025', 'Text format with month name'],
            ['YYYY-MM-DD', '2025-05-18', 'ISO format (international standard)'],
            [''],
            ['Tips for Date Formatting:'],
            ['• In Numbers, you can format cells as dates using the Format sidebar'],
            ['• When in doubt, use the simplest format (MM/DD/YYYY)'],
            ['• Avoid custom date formats with special characters'],
            ['• Our import system will convert all dates to MM/DD/YYYY format'],
            [''],
            ['How to Test Your Export:'],
            ['1. Export from Numbers following the instructions'],
            ['2. Open the exported file in Microsoft Excel'],
            ['3. If the dates and format look correct in Excel, they should import correctly'],
            [''],
            ['What to Check:'],
            ['• Dates should be actual dates, not text (you can check by clicking a cell in Excel)'],
            ['• The header row should be clearly visible as the first row'],
            ['• There should be no blank rows, merged cells, or complex formatting']
        ];
        
        const wsExamples = XLSX.utils.aoa_to_sheet(dateExamples);
        
        // Format the examples sheet with column widths
        const wsExamplesCols = [
            {wch: 25}, // Format
            {wch: 20}, // Example
            {wch: 45}  // Notes
        ];
        wsExamples['!cols'] = wsExamplesCols;
        
        XLSX.utils.book_append_sheet(wb, wsExamples, "Date Examples");
        
        // Add a fourth sheet with common troubleshooting information
        const troubleshootingData = [
            ['Troubleshooting Guide for Numbers Export Issues'],
            [''],
            ['Common Issue', 'Solution'],
            ['"Invalid Excel header" error', '• Your header row was not recognized\n• Try adding a blank row above the header row\n• Make sure headers include "Date" and "Trainer"'],
            ['"Could not find required columns" error', '• Ensure your header names include "Date" and "Trainer"\n• Try slightly different header names (e.g., "Training Date" instead of just "Date")\n• Make sure "Use Excel Compatibility Mode" is checked during export'],
            ['Dates importing incorrectly', '• Check that dates are formatted as actual dates in Numbers\n• Try using MM/DD/YYYY format explicitly\n• Avoid custom date formats'],
            ['Only partial data imports', '• Make sure you don\'t have multiple tables in the same sheet\n• Avoid blank rows within your data\n• Keep all data in a single contiguous range'],
            ['Import fails completely', '• Try exporting as CSV instead\n• Try creating a new Numbers document and copying just the data (not formatting)\n• Remove any charts, images, or complex elements'],
            ['Import works but dates are wrong', '• The import may be using the wrong date system (1900 vs 1904)\n• Try formatting dates explicitly as text in MM/DD/YYYY format\n• Or use our built-in normalization by using MM.DD.YYYY format'],
            [''],
            ['Advanced Tip: If you continue having issues, try this process:'],
            ['1. In Numbers, select just your data table (including headers)'],
            ['2. Copy the selection'],
            ['3. Create a brand new Numbers document'],
            ['4. Paste your data into the new document'],
            ['5. Export the new document following the instructions'],
            [''],
            ['This process removes any hidden formatting or structure that might be causing issues.']
        ];
        
        const wsTroubleshooting = XLSX.utils.aoa_to_sheet(troubleshootingData);
        
        // Format the troubleshooting sheet with column widths
        const wsTroubleshootingCols = [
            {wch: 30}, // Issue
            {wch: 70}  // Solution
        ];
        wsTroubleshooting['!cols'] = wsTroubleshootingCols;
        
        XLSX.utils.book_append_sheet(wb, wsTroubleshooting, "Troubleshooting");
        
        // Generate file and trigger download
        XLSX.writeFile(wb, "TransDev_Numbers_Compatible_Template.xlsx");
        
        console.log("Enhanced Numbers-compatible template file downloaded");
    }
    
    downloadNumbersCompatibleTemplate() {
        // Create a workbook with a worksheet specifically formatted for Numbers compatibility
        const wb = XLSX.utils.book_new();
        
        // Define headers and sample data in a Numbers-friendly format
        const headers = ['Date', 'Day', 'Trainer', 'Hours', 'Participant', 'Level/Goal'];
        const sampleData = [
            // Use string dates instead of Date objects for better Numbers compatibility
            ['5/18/2025', 'Sunday', 'Terry', '11:00 am to 7:30 pm', 'Teklu', 'RTW class (5)/ BTW (T9)'],
            ['5/19/2025', 'Monday', 'Veronica', '5:00 am to 1:00 pm', 'Joshua', 'BTW-7 hr Basic-1 hr prep'],
            ['5/19/2025', 'Monday', 'Galen', '5:00 am to 1:00 pm', 'Annette', 'BTW- 8hr Advanced'],
            ['5/19/2025', 'Monday', 'Sisay', '5:00 am to 1:00 pm', 'Juan', 'BTW-finish Advanced-final eval/revenue class']
        ];
        
        // Add a notes sheet with instructions for Numbers users
        const notesData = [
            ['Instructions for Apple Numbers Users'],
            [''],
            ['1. Fill out this template without changing the header row'],
            ['2. Dates should be in MM/DD/YYYY format (e.g., 5/18/2025)'],
            ['3. When exporting from Numbers, choose File > Export To > Excel'],
            ['4. Do not merge cells or add formatting'],
            ['5. Keep the header row as the first row in your sheet']
        ];
        
        // Create the main data worksheet
        const wsData = [headers, ...sampleData];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        
        // Create the instructions worksheet
        const wsNotes = XLSX.utils.aoa_to_sheet(notesData);
        
        // Add some formatting to make it more user-friendly
        const wscols = [
            {wch: 12}, // Date
            {wch: 10}, // Day
            {wch: 12}, // Trainer
            {wch: 20}, // Hours
            {wch: 15}, // Participant
            {wch: 30}  // Level/Goal
        ];
        ws['!cols'] = wscols;
        
        // Add worksheets to workbook
        XLSX.utils.book_append_sheet(wb, wsNotes, "READ ME FIRST");
        XLSX.utils.book_append_sheet(wb, ws, "Schedule Template");
        
        // Generate file and trigger download
        XLSX.writeFile(wb, "TransDev_Numbers_Compatible_Template.xlsx");
        
        console.log("Numbers-compatible template file downloaded");
    }
      normalizeDateFormats(dateString) {
        if (!dateString) return '';
        
        const cleanStr = String(dateString).trim();
        console.log(`Normalizing date format: "${cleanStr}"`);
        
        // Handle period-separated dates (Numbers format)
        if (/^\d{1,2}\.\d{1,2}\.\d{2,4}$/.test(cleanStr)) {
            const normalized = cleanStr.replace(/\./g, '/');
            console.log(`  Converted period-delimited: "${cleanStr}" → "${normalized}"`);
            return normalized;
        }
        
        // Handle ISO format dates (YYYY-MM-DD)
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(cleanStr)) {
            const [year, month, day] = cleanStr.split('-').map(n => parseInt(n));
            const normalized = `${month}/${day}/${year}`;
            console.log(`  Converted ISO format: "${cleanStr}" → "${normalized}"`);
            return normalized;
        }
        
        // Handle European format dates (DD/MM/YYYY)
        if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleanStr)) {
            const parts = cleanStr.split('/').map(n => parseInt(n));
            // Try to intelligently determine if it's MM/DD or DD/MM
            // If first number is > 12, it's likely DD/MM
            if (parts[0] > 12 && parts[1] <= 12) {
                const normalized = `${parts[1]}/${parts[0]}/${parts[2]}`;
                console.log(`  Converted European format: "${cleanStr}" → "${normalized}"`);
                return normalized;
            }
        }
        
        // Handle textual month dates (e.g., "May 18, 2023")
        if (/^[a-zA-Z]{3,9}\s+\d{1,2},?\s+\d{4}$/.test(cleanStr)) {
            try {
                const date = new Date(cleanStr);
                if (!isNaN(date.getTime())) {
                    const normalized = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                    console.log(`  Converted textual date: "${cleanStr}" → "${normalized}"`);
                    return normalized;
                }
            } catch (e) {
                console.error(`  Error parsing textual date "${cleanStr}":`, e);
            }
        }
        
        // Handle Excel/Numbers serial numbers
        if (/^\d+(\.\d+)?$/.test(cleanStr) && !cleanStr.includes('/')) {
            const numValue = parseFloat(cleanStr);
            
            // Check if this might be an Excel/Numbers date serial
            if (numValue > 40000 && numValue < 50000) {
                try {
                    // Try both Excel (1900-based) and Mac Numbers (1904-based) date systems
                    // Numbers date system (1904-based) - days since Jan 1, 1904
                    const date1904 = new Date(Math.round((numValue - 24107) * 86400 * 1000));
                    
                    // If the date looks reasonable (within a reasonable year range)
                    if (date1904.getFullYear() >= 2000 && date1904.getFullYear() <= 2050) {
                        const normalized = `${date1904.getMonth() + 1}/${date1904.getDate()}/${date1904.getFullYear()}`;
                        console.log(`  Converted Numbers date serial: "${cleanStr}" → "${normalized}"`);
                        return normalized;
                    }
                } catch (e) {
                    console.error(`Error parsing serial date "${cleanStr}":`, e);
                }
            }
        }
        
        // For any other format, try direct parsing if it might be a date
        if (/\d+[\/\.\-]\d+/.test(cleanStr)) {
            try {
                const date = new Date(cleanStr);
                if (!isNaN(date.getTime())) {
                    const normalized = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                    console.log(`  Parsed as general date: "${cleanStr}" → "${normalized}"`);
                    return normalized;
                }
            } catch (e) {
                // If we can't parse it, just return as is
                console.log(`  Couldn't parse date: "${cleanStr}" - returning as is`);
            }
        }
        
        return cleanStr;
    }
}
