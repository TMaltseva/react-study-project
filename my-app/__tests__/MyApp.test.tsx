import { render } from '@testing-library/react';
import { AppProps } from 'next/app';
import { wrapper } from '../src/store/store';
import MyApp from '../src/components/MyApp';
import '@testing-library/jest-dom';
import { Router } from 'next/router';

jest.mock('../src/store/store', () => ({
  wrapper: {
    useWrappedStore: jest.fn().mockReturnValue({
      store: {},
      props: { pageProps: {} },
    }),
  },
}));

const mockComponent = () => <div>Mock Component</div>;

describe('MyApp', () => {
  it('renders correctly', () => {
    const props: AppProps = {
      Component: mockComponent,
      pageProps: {},
      router: {
        basePath: '',
        pathname: '/',
        route: '/',
        asPath: '/',
        query: {},
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn().mockResolvedValue(undefined),
        beforePopState: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn(),
          emit: jest.fn(),
        },
        isFallback: false,
        isReady: true,
        isLocaleDomain: false,
        isPreview: false,
        components: {},
        sdc: {},
        sbc: {},
        sub: jest.fn(),
      } as unknown as Router,
    };

    const { asFragment } = render(<MyApp {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});