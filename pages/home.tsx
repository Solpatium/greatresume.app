import Head from "next/head";
import { AuthorSection } from "../src/components/sections/author";
import { CTA } from "../src/components/sections/cta";
import { Examples } from "../src/components/sections/examples";
import {FAQ, TechnicalFAQ} from "../src/components/sections/faq";
import { Features } from "../src/components/sections/features";
import { Footer } from "../src/components/sections/footer";
import { HeroSection } from "../src/components/sections/hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Resume creator</title>
      </Head>
      <HeroSection />
      <Features />
      <Examples />
      <CTA />
      <FAQ/>
      <AuthorSection />
      {/* <TechnicalFAQ /> */}
      <Footer />
    </>
  );
}
