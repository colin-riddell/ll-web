import React, { useState } from 'react';
import Joab from '../../components/Joab';
import { getAllJobs } from '../../lib/mongodb';

const Jobs = ({ jobs }) => {

  return (
    <section className="flex-row h-auto pt-16 ">
      <div className="flex-row mx-32">

        <p className="">Latest jobs </p>
        {jobs.map((job) => <Joab job={job} />)}


        <p className="flex right-32 justify-end pr-6">view all . .  </p>

      </div>
    </section>
  );
}


export async function getServerSideProps() {
  const jobs = await  getAllJobs()
  return {
    props: { jobs },
  }
}

export default Jobs;
