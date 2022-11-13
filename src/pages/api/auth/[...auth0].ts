import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

const getLoginState = (req, loginOptions) => {
    const  { role, returnTo } = req.query;
    loginOptions.authorizationParams.role = role;

    return { role: role, returnTo: returnTo };
  };

export default handleAuth({
    async login(req, res) {
        try {
          await handleLogin(req, res, { getLoginState });
        } catch (error) {
          res.status(error.status || 500).end(error.message);
        }
      }
});
