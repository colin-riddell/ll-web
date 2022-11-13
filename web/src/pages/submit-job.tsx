import { Box, Container } from "@chakra-ui/react"
import SubmitJob from "../components/SubmitJob"

const SubmitJobPage = ({}) => {
 
    return (
        <Box my={10} mx={10}>
        <SubmitJob />
        </Box>
    )
  }
  SubmitJobPage.auth = { roles: ["recruiter"], error: () => (<h2>403: Submit job. Nope :)</h2>) }


  
  export default SubmitJobPage