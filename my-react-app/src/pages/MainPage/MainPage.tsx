import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { Nav } from '../../components/Nav/Nav';
import { RootState } from '../../store/store';

export const MainPage = () => {
  const { uncontrolledData, controlledData } = useSelector((state: RootState) => state.form);

  const controlledHighlightRef = useRef<HTMLDivElement | null>(null);
  const uncontrolledHighlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('Uncontrolled Data:', uncontrolledData);
    console.log('Controlled Data:', controlledData);
  }, [uncontrolledData, controlledData]);

  return (
    <main className="main-page">
      <Nav />
      <Outlet />
      <section className="tile-wrapper">
        {controlledData && (
          <div className={`tile-style ${controlledData ? 'highlight' : 'no-border'}`} ref={controlledHighlightRef}>
            <h2>Controlled Form Data</h2>
            <p>Name: {controlledData.name}</p>
            <p>Age: {controlledData.age}</p>
            <p>Gender: {controlledData.gender}</p>
            <p>Email: {controlledData.email}</p>
            <p>Country: {controlledData.country}</p>
          </div>
        )}

        {uncontrolledData && (
          <div className={`tile-style ${uncontrolledData ? 'highlight' : 'no-border'}`} ref={uncontrolledHighlightRef}>
            <h2>Uncontrolled Form Data</h2>
            <p>Name: {uncontrolledData.name}</p>
            <p>Age: {uncontrolledData.age}</p>
            <p>Gender: {uncontrolledData.gender}</p>
            <p>Email: {uncontrolledData.email}</p>
            <p>Country: {uncontrolledData.country}</p>
          </div>
        )}
      </section>
    </main>
  );
};
