import { Container, Heading } from "@chakra-ui/react";

import Splash from "../components/Splash";
import { getAllJobs } from "../lib/mongodb";
import RegisterInterest from "../components/RegisterInterest";
import PublicNav from "../components/PublicNav";
import Testimonials from "../components/Testimonials";
import WhatIsTcc from "../components/WhatIsTcc";
import Head from "next/head";
import Teaser from "../components/Teaser";
const IndexPage = ({ jobs }) => {
  return (
    <>
    <Head>
            <title>The Coder Career - The missing link in tech careers</title>
            <link rel="canonical" href="https://thecodercareer.com/" />

            <meta name="title" content="The Coder Career" key="title" />
            <meta name="description" content="The Coder Career - The best community for Software Engineers" key="description" />
            <meta property="og:title" content="The Coder Career" key="og-title" />
            <meta property="og:description"  content="The Coder Career is a community for Software Engineers within the first few years of their career. Get help, level up and stand out, with The Coder Career" key="og-description" />
            {/* <meta property="og:image"  */}
            <meta property="og:type" content="website" key="og-type" />
            <meta property="og:url" content={"https://thecodercareer.com/"} key="og-url" />
            <meta property="twitter:card" content="summary_large_image" key="twitter-card" />
            <meta property="twitter:url" content="@thecodercareer" key="twitter-url" />
            <meta property="twitter:title" content="The Coder Career"  key="twitter-title" />
            <meta property="twitter:description" content="The Coder Career is a community for Software Engineers within the first few years of their career. Get help, level up and stand out, with The Coder Career" key="twitter-description" />
            {/* <meta property="twitter:image" content={frontmatter.splashImageUrl} key="twitter-image" /> */}
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
      <Splash />
      <WhatIsTcc />
      <Testimonials />
      <Heading className="text-center my-16">
        Welcome to the missing link in tech careers.
      </Heading>

      <RegisterInterest />
      {/* <Teaser  jobs={jobs}/> */}
      {/* <PodcastCTA /> */}
    </>
  );
};



export async function getServerSideProps(context) {
  const jobs = await getAllJobs();

  return {
    props: { jobs },
  };
}

export default IndexPage;
