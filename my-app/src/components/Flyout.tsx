import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { clearItems } from '../services/selectedItemsSlice';
import { saveAs } from 'file-saver';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUnselectAll = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    const csvHeader = 'Name,URL';
    const csvContent = selectedItems.map((item) => `${item.name},${item.url}`).join('\n');
    const csvData = `${csvHeader}\n${csvContent}`;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItems.length}_items.csv`);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className={`flyout ${selectedItems.length > 0 ? 'active' : ''}`}>
      {selectedItems.length > 0 && (
        <>
          <p>{selectedItems.length} items selected</p>
          <button onClick={handleUnselectAll}>Unselect all</button>
          <button onClick={handleDownload}>Download</button>
        </>
      )}
    </div>
  );
};

export default Flyout;
