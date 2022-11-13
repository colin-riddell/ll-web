import Image from "next/image";
import { SocialIcon } from "react-social-icons";

import { Heading } from "@chakra-ui/react";
const About = () => {
  return (
    <>
      <Heading as="h2" size="2xl" className="text-center  m-6">
        About Us
      </Heading>
      <div className="flex w-screen">
        <div className="text-center m-6">
          <Heading as="h3" size="lg">
            Cameron Blackwood
          </Heading>
          <div>
            <Image src={"/cam headshot.jpeg"} width={200} height={200} />
          </div>
          <p>
            Cameron is a software engineer and former technical recruiter. After
            learning about software engineering from candidates he worked with,
            he was inspired and broke into software engineering after teaching
            himself Javascript.
          </p>
          <div>
            <SocialIcon url="https://twitter.com/camblackwood95" />
            <SocialIcon url="https://www.linkedin.com/in/cameron-blackwood/" />
          </div>
        </div>
        <div className=" text-center m-6	">
          <Heading as="h3" size="lg">
            Colin Riddell
          </Heading>
          <div>
            <Image src={"/colin headshot.jpg"} width={200} height={200} />
          </div>
          <p>
            Colin boasts well over a decade's experience in Scotland's
            technology scene as a senior software engineer. He developed his
            passion for technical education and careers after serving as a lead
            instructor at CodeClan, Scotland's largest coding bootcamp.
          </p>
          <div>
            <SocialIcon url="https://twitter.com/colin_riddell" />
            <SocialIcon url="https://www.linkedin.com/in/cjriddell/" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
