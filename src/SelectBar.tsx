import React, {FC} from 'react';

interface SelectBarProps {
    selectedRover: string;
    handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBar : FC<SelectBarProps> = ({ selectedRover, handleSelect}) => {
    const rovers: string[] = ['curiosity', 'opportunity', 'spirit', 'perseverance'];

    const styles = {
        dropDownSelectStyle: {
            paddingTop: '1rem',
            paddingBottom: '1rem',
        },
        dropDownLabel: {
            paddingRight: '1rem',
        }
    }
    return (
        <div style={styles.dropDownSelectStyle}>
        <label style={styles.dropDownLabel}>Select Rover:</label>
        <select value={selectedRover} onChange={handleSelect} className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600">
          {rovers.map((rover) => (
            <option key={rover} value={rover}>
              {rover.charAt(0).toUpperCase() + rover.slice(1, 20)}
            </option>
          ))}
        </select>
        
      </div>
    )
}

export default SelectBar;