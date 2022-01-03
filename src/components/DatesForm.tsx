import React, { useState } from 'react';
import Notification from './Notification';

export interface DatesFormValues {
  fromDate: string;
  toDate: string;
}

interface Props {
  submitDates: (values: DatesFormValues) => void;
}

const DatesForm = ({ submitDates }: Props) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate) {
      setNotification('Please enter both dates');
      return setTimeout(() => setNotification(null), 3000);
    }
    submitDates({ fromDate, toDate });
    setFromDate('');
    setToDate('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-dates">
        <h2>Pick your dates</h2>
        <label>from</label>
        <input
          type="date"
          value={fromDate}
          min={'2007-01-01'}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setFromDate(e.target.value)}
          id="input-date-to"
        />
        <label>to</label>
        <input
          type="date"
          value={toDate}
          min={'2007-01-01'}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setToDate(e.target.value)}
          id="input-date-to"
        />
        {notification ? <Notification message={notification} /> : null}
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default DatesForm;
