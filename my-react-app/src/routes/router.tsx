import { createBrowserRouter } from 'react-router-dom';
import { ControlledFormPage, UncontrolledFormPage, MainPage } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: 'controlled-form',
        element: <ControlledFormPage />,
      },
      {
        path: 'uncontrolled-form',
        element: <UncontrolledFormPage />,
      },
    ],
  },
]);
