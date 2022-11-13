import Splash from '../components/Splash'
import Teaser from '../components/Teaser'
import Podcast from '../components/podcast/Podcast'
import fs from 'fs'
import { useDispatch, useSelector } from 'react-redux'
import { getStripeSubscription, selectStripeSubscription } from '../features/stripe/stripeSlice'
import { useEffect } from 'react'
import { serialize } from 'next-mdx-remote/serialize';
import { Container } from '@chakra-ui/react';
import { getAllJobs } from '../lib/mongodb'
import RegisterInterest from '../components/RegisterInterest'
import PodcastCTA from '../components/PodcastCTA'
import BannerSplash from '../components/BannerSplash'

const LandingPage = ({jobs}) => {
 
  return (
    <>
      <BannerSplash />
      <Teaser  jobs={jobs}/>
      <PodcastCTA />
    </>
  )
}

export async function getServerSideProps(context) {
  const jobs =  await getAllJobs();

  return {
    props: {jobs},
  }
}

export default LandingPage
