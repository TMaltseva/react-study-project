import renderer from 'react-test-renderer';
import ErrorButton from '../src/components/ErrorButton';

test('ErrorButton component renders correctly', () => {
  const tree = renderer.create(<ErrorButton />).toJSON();
  expect(tree).toMatchSnapshot();
});