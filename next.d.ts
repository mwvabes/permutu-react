import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
} from 'next';
import { WithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

declare module 'next' {
  type NextLayoutComponentType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P,
    WithTranslation
  > & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
  };
}