import { withPageAuthRequired } from '@auth0/nextjs-auth0';

/*
  Use this to wrap an exported page component to restrict it's access based off a role.
  example use:
    withRoleAuthorization(Profile, ["recruiter", "jobseeker"], () => (<h1>naw</h1>))
*/
const withRoleAuthorization = (
    Success,
    pageProps,
    allowedRoles,
    Err,
    onError,
    onRedirecting,
    returnTo
  ) => {
    function hoc({ user }) {
      function arrContains(arr1, arr2) {
        return arr1.some(item => arr2.includes(item))
      }
  
      // check if the array of roles for a user contains any of the roles for the allowed array 
      // for the page.
      const usersRoles = user['http://thecodercareer.com/roles']
      if (!arrContains(usersRoles, allowedRoles)){
        return (<Err />)
      }
      return (<Success  {...pageProps} user={user} />);
    }

    // https://auth0.github.io/nextjs-auth0/interfaces/frontend_with_page_auth_required.withpageauthrequiredoptions.html
    return withPageAuthRequired(hoc, {onError, onRedirecting, returnTo})
  }
export default withRoleAuthorization;  