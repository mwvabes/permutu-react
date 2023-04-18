import Navbar from "./Navbar";
import Head from "next/head";
import { getLoggedInThunk } from "../redux/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SmallLoader from "./SmallLoader";

const Layout = (props: any) => {
  const router = useRouter();

  const { t, changeLanguage } = props;

  const { user } = useSelector((state: any) => state.user);
  const { userResponseCode } = useSelector(
    (state: any) => state.userResponseCode
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInThunk());
  }, []);

  if (userResponseCode === undefined)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-cnav">
        <SmallLoader loading={true} />
      </div>
    );
  if (userResponseCode != 200) {
    router.push(`${process.env.AUTH_API_PUBLIC_ADDRESS}/auth/logout`);
  }

  //if (!user.uuid) return <></>;

  if (userResponseCode === 200) {
    return (
      <div
      //className="z-10"
      >
        <Head>
          <link
            rel="preload"
            href="/fonts/Permutu.ttf"
            as="font"
            crossOrigin=""
          />
        </Head>
        <div className="absolute bg-cbrownl h-60 w-full z-0"></div>
        <div className="z-20 relative">
          <Navbar t={t} changeLanguage={changeLanguage} />
        </div>
        <div className="z-10 relative">{props.children}</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-cnav">
      <SmallLoader loading={true} />
    </div>
  );
};

export default Layout;
