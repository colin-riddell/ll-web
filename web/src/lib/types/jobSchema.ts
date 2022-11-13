/*
{ use Job
    companyName: "Amazon",
    title: "Frontend Developer",
    minSalary: 30000,
    maxSalary: 55000,
    description:
    "We are looking for talented computer scientists/software engineers to support the development of a suite of GUI-based interactive tools at blah blah. This software is crucial in the design and analysis of state-of-the-art semiconductor devices by companies and academic institutions worldwide.",
    location: "Remote, UK",
    companyId: 1234,
    dateAdded: "27th March 2022",
    yearsExp: 0,
    logoUrl: "https://avatars.githubusercontent.com/u/38852603?v=4",
    techTags: ["js", "Java", "k8s"]
},
*/

export interface Job {
    _id?: string
    companyName: string
    title: string,
    minSalary: number,
    maxSalary: number,
    description: string,
    location: string,
    remote: boolean,
    // companyId: number,
    dateAdded: string,
    logoUrl: string,
    techTags: string[],
    applyUrl: string
}