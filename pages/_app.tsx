import axios from "axios";
import { appWithTranslation, WithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import en from "./../public/locales/en/common";
import pl from "./../public/locales/pl/common";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { ReactNode } from "react";
import { WithTranslationProps } from "react-i18next";
import store from "../redux/store";
import { Provider } from "react-redux";

axios.defaults.withCredentials = true;

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "pl" ? pl : en;

  const changeLanguage = (locale: any) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => (
      <Layout t={t} changeLanguage={changeLanguage}>
        {page}
      </Layout>
    ));
  return (
    <Provider store={store}>
      <div className="bg-cbrown text-cgray relative min-h-screen flex flex-col">
        {getLayout(<Component {...pageProps} t={t} />)}
      </div>
    </Provider>
  );
};

export default appWithTranslation(MyApp);
