# TransDev Commerce City Training Scheduler

A professional transit-themed scheduling application for managing trainer schedules with a modern, interactive interface.

## Features

- **Sleek Transit-Themed Design**:
  - Professional color scheme inspired by public transportation branding
  - Interactive animations and transit-specific visual elements
  - Consistent design language throughout the application
  - Responsive layout for desktop and mobile devices

- **Comprehensive Scheduling Features**:
  - View and manage trainer schedules in a day-based interface
  - Add/edit/remove sessions for trainers on specific days
  - Interactive filtering by trainer or day
  - Export schedule to CSV format (can be opened in Excel)
  - Import schedule from CSV/Excel files

- **Role-Based Access Control**:
  - Admin: Full edit rights for schedule management
  - Trainer: View-only access to all schedules
  - Participant: View-only access with highlighted personal sessions
- Select multiple sessions with checkboxes for batch deletion
- Save schedule data locally in the browser
- Export schedule to CSV format (can be opened in Excel)
- Import schedule from CSV/Excel files
- Trainer registration system
- Participant login for schedule viewing

## Getting Started

1. Open `login.html` in a web browser to log in.
2. Login options:
   - Admin access: username `admin1`, password `admin123`
   - Trainer access: various trainer usernames with passwords (see trainer credentials)
   - Participant access: click "Participant Login" button and enter your name
   - New trainer registration: click "Register New Trainer" button
3. After login, the schedule view will load automatically.

## Using the Application

### User Authentication

1. The application has three access levels:
   - **Admin**: Can edit the schedule (add, modify, delete sessions)
   - **Trainer**: Can only view the schedule
   - **Participant**: Can only view the schedule, with their sessions highlighted
2. Users must log in with valid credentials to access the schedule.
3. Logout button is available in the top-right corner.

### Trainer Registration

1. Click "Register New Trainer" on the login page
2. Fill in the required information
3. Submit the form to register (in a real environment, this would require admin approval)

### Participant Login

1. Click "Participant Login" on the login page
2. Enter your name to view the schedule
3. When viewing, your scheduled sessions will be highlighted

### Filtering the Schedule

1. Use the dropdown menus at the top to filter:
   - By Trainer: Show only sessions for a specific trainer
   - By Day: Show only sessions for a specific day
2. Click "Apply Filters" to update the view
3. Click "Clear Filters" to reset and show all sessions

### Adding a New Session

1. Click the "Add Session" button (Admin only)
2. Follow the prompts to select a day and enter details
3. The new session will be added to the schedule

### Editing a Session

1. Click on any session in the schedule (Admin only)
2. Modify the details in the popup dialog
3. Click "Save" to update the session

### Deleting Sessions

1. Use the checkboxes to select one or more sessions (Admin only)
2. Click "Delete Selected" to remove them from the schedule
3. Confirm the deletion when prompted

### Saving and Loading the Schedule

1. Click "Save Schedule" to save to browser's local storage (Admin only)
2. Click "Load Schedule" to load the saved schedule

### Exporting and Importing

1. Click "Export to Excel" to download a CSV file
2. Click "Import from Excel" to load a CSV file (Admin only)

## Trainer Credentials

The following trainer accounts are pre-configured:

| Username  | Password |
|-----------|----------|
| Terry     | Welcome1 |
| Veronica  | Welcome2 |
| Sisay     | Welcome3 |
| Patsy     | Welcome4 |
| Donald    | Welcome5 |
| Demo      | Welcome6 |
| Geary     | Welcome7 |
| Galen     | Welcome8 |
| Norman    | Welcome9 |

## Browser Compatibility

This application works best in modern browsers such as:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## Recent Updates

- Added participant login system for easy access
- Added trainer registration form
- Fixed syntax error in the Saturday sessions code
- Added filtering functionality by trainer and day
- Improved mobile responsiveness
- Enhanced user interface with professional footer
- Updated trainer credentials
