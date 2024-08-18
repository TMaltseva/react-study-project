import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Nav } from '../../components';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
}

export const MainPage = () => {
  const [uncontrolledData, setUncontrolledData] = useState<FormData | null>(null);
  const uncontrolledHighlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('uncontrolledFormData');
    if (storedData) {
      setUncontrolledData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    console.log('Uncontrolled Data:', uncontrolledData);
  }, [uncontrolledData]);

  return (
    <main className="main-page">
      <Nav />
      <Outlet />
      <section className="tile-wrapper">
        {uncontrolledData && (
          <div className={`tile-style ${uncontrolledData ? 'highlight' : 'no-border'}`} ref={uncontrolledHighlightRef}>
            <h2>Uncontrolled Form Data</h2>
            <p>Name: {uncontrolledData.name}</p>
            <p>Age: {uncontrolledData.age}</p>
            <p>Gender: {uncontrolledData.gender}</p>
            <p>Email: {uncontrolledData.email}</p>
            <p>Country: {uncontrolledData.country}</p>
            {uncontrolledData.picture && <img src={uncontrolledData.picture} alt="Profile" />}
          </div>
        )}
      </section>
    </main>
  );
};
