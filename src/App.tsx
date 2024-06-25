import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import { MarsRoverPhotosApiResponse, Photo } from './types';
import SelectBar from './SelectBar';


interface MarsRoverPhotosApiResponse {
  photos: Photo[];
}

interface Photo {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

interface Camera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

interface Rover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
}

const App: React.FC = () => {
  const [selectedRover, setSelectedRover] = useState<string>('curiosity');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const [hasNoData, setHasNoData] = useState<boolean>(false)

  const styles = {
    datePickerDiv: {
      paddingBottom: '1rem',
    },
    datePickerLabel: {
      paddingRight: '1rem',
    },
  }

  const handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedRover(event.currentTarget.value);

  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(!hasSubmitted);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const apiKey = import.meta.env.VITE_SOME_KEY; // Replace with your NASA API key if available
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?earth_date=${formattedDate}&api_key=${apiKey}`;
      setIsLoading(true);
      try {
        
        const response = await axios.get<MarsRoverPhotosApiResponse>(url);
        setIsLoading(false);
        setPhotos(response.data.photos.slice(1, 50));
        if(response.data.photos.length < 1) {
          setHasNoData(true)

        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data from NASA API', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>RoverScope</h1>
      <h4 style={{ paddingTop: '1.5rem' }}>Select a Mars rover and date to get first 50 images taken on that date.</h4>
      <form onSubmit={handleSubmit}>
      <SelectBar selectedRover={selectedRover} handleSelect={handleSelect} />
      <div style={styles.datePickerDiv}>
        <label style={styles.datePickerLabel}>Select Date:</label>
        <br />
        <DatePicker className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600" selected={selectedDate} onChange={(date: Date | null) => setSelectedDate(date)} />
      </div>
      <button className="bg-gray-50 hover:bg-gray-300 border border-gray-300 text-gray-900 text-sm"type="submit">Submit</button>
      </form>
      <div className="photo-area">
        {
        isLoading &&  <div
         className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >
      Loading...
      </span>
  </div>
        }
        {photos.length > 0 ? (
          <div id="photo-display">
            <h2>Photos taken by {selectedRover.charAt(0).toUpperCase() + selectedRover.slice(1)} on {selectedDate?.toDateString()}:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {photos.map((photo) => (
                <div key={photo.id} style={{ margin: '10px' }}>
                  <img src={photo.img_src} alt={`Mars Rover ${selectedRover}`} style={{ width: '200px' }} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          hasSubmitted && hasNoData && <p>No photos available for this date.</p>
        )}
      </div>
    </div>
  );
};

export default App
