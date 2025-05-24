// This file contains utility functions for CSV parsing

/**
 * Parses a CSV line into an array of values
 * @param {string} line - A line from a CSV file
 * @returns {string[]} - Array of values
 */
function parseCSVLine(line) {
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

// Export the function for both module and global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { parseCSVLine };
} else {
    // Make the function globally available in the browser
    window.parseCSVLine = parseCSVLine;
}
