import type { NextLayoutComponentType } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import SmallLoader from "../components/SmallLoader";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInThunk } from "../redux/user";

const Token: NextLayoutComponentType = ({ t }: { t: any }) => {
  const router = useRouter();
  const [errm, setErrm] = useState(false);

  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    handleToken(router.query);
  }, [router.query]);

  const handleToken = (token: any) => {
    if (!token.t) {
      return;
    }

    axios
      .post(`${process.env.AUTH_API_PUBLIC_ADDRESS}/oauth/token`, {
        t: token.t,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(getLoggedInThunk());
          router.push("/");
        }
      })
      .catch((e) => {
        setErrm(true);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-cnav">
      <SmallLoader loading={!errm} />
      {errm ? "" : <p className="mt-4 animate-bounce">{t.loading}</p>}
      <p>{errm ? t.errorOccured : ""}</p>
    </div>
  );
};

Token.getLayout = function getLayout(page: any): ReactNode {
  return <>{page}</>;
};

export default Token;
