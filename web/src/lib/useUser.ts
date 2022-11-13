import { useUser as useAuth0User } from '@auth0/nextjs-auth0';

export const useUser = () => {
    const { user, isLoading } = useAuth0User();
    const isRecruiter = user?.["http://thecodercareer.com/roles"][0] === "recruiter";
    const isJobseeker = user?.["http://thecodercareer.com/roles"][0] === "jobseeker";
    const role = user?.["http://thecodercareer.com/roles"][0];
    let authenticated = !!user;

    return { user, isLoading, authenticated, isRecruiter, isJobseeker, role}

}

// export const isRecruiter = () => {
//     const { user } = useUser();
//     const isRecruiter = user?.["http://thecodercareer.com/roles"][0] === "recruiter";

//     return isRecruiter
// }


// export const isJobseeker = () => {
//     const { user } = useUser();
//     const isJobseeker = user?.["http://thecodercareer.com/roles"][0] === "jobseeker";

//     return isJobseeker
// }
