import Head from "next/head";
import Homee from "../src/components/home";
import { Theme } from "../src/utils/theme";
export default function Home() {
  return (
    <>
      <Head>
        <title>Resume creator</title>
      </Head>
      <Theme>
        <Homee></Homee>
      </Theme>
    </>
  );
}
