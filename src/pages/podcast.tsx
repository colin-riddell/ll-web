import Podcast from "../components/podcast/Podcast"

const PodcastPage = ({}) => {
 
    return (
        
      <div>
        <Podcast />
      </div>
    )
  }
  
  export async function getServerSideProps(context) {
  
    return {
      props: {},
    }
  }
  
  export default PodcastPage