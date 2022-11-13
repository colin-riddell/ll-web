import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import {
    Tag,
    Container,
    HStack,
    Divider,
    Box,
    Heading,
    Text,
    SpaceProps,
    useColorModeValue,
    Wrap,
    WrapItem,
    Image
} from '@chakra-ui/react';
import Head from 'next/head';
import BlogAuthor from '../../components/BlogAuthor';



interface IBlogTags {
    tags: Array<string>;
    marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = ({ tags }) => {
    return (
        <HStack >
            {tags.map((tag) => (<Tag size="sm" variant="solid" key={tag}>{tag}</Tag>))}
        </HStack>
    )
};



const Blog = ({ posts }) => {
    return (
        <>
           <Head>
            <title>Blog - The Coder Career</title>
            <link rel="canonical" href="https://thecodercareer.com/blog" />

            <meta name="title" content="Blog - The Coder Career" key="title" />
            <meta name="description" content="The Coder Career Blog" key="description" />
            <meta property="og:title" content="Blog - The Coder Career" key="og-title" />
            <meta property="og:description"  content="Blog - The Coder Career. Keep up to date from members in The Coder Career community" key="og-description" />
            {/* <meta property="og:image"  */}
            <meta property="og:type" content="website" key="og-type" />
            <meta property="og:url" content={"https://thecodercareer.com/blog"} key="og-url" />
            <meta property="twitter:card" content="summary_large_image" key="twitter-card" />
            <meta property="twitter:url" content="@thecodercareer" key="twitter-url" />
            <meta property="twitter:title" content="Blog - The Coder Career"  key="twitter-title" />
            <meta property="twitter:description" content="Blog - The Coder Career. Keep up to date from members in The Coder Career community" key="twitter-description" />
            {/* <meta property="twitter:image" content={frontmatter.splashImageUrl} key="twitter-image" /> */}
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Container maxW={'7xl'} p="12">
            {posts.map(({ slug, frontmatter, content }) => (

                <Box
                    marginTop={{ base: '1', sm: '5' }}
                    display="flex"
                    flexDirection={{ base: 'column', sm: 'row' }}
                    justifyContent="space-between">
                    <Box
                        display="flex"
                        flex="1"
                        marginRight="3"
                        position="relative"
                        alignItems="center">
                        <Box
                            width={{ base: '100%', sm: '85%' }}
                            zIndex="2"
                            marginLeft={{ base: '0', sm: '5%' }}
                            marginTop="5%">
                            <Link href={`/blog/${slug}`}>
                                <Image
                                    borderRadius="lg"
                                    width={{base: '0px', md:'400px', xl:'500px'}}
                                    src={frontmatter.splashImageUrl}
                                    alt="some good alt text"
                                    // objectFit="cover"
                                />
                            </Link>
                        </Box>
                        <Box zIndex="1" width="100%" position="absolute" height="100%">
                            <Box
                                bgGradient={useColorModeValue(
                                    'radial(blue.200 1px, transparent 1px)',
                                    'radial(blue.200 1px, transparent 1px)'
                                )}
                                backgroundSize="20px 20px"
                                opacity="0.4"
                                height="100%"
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flex="1"
                        flexDirection="column"
                        justifyContent="center"
                        marginTop={{ base: '3', sm: '0' }}>
                        <Heading fontSize="xl" marginTop="16" mb={8}>
                            <Link href={`/blog/${slug}`}>
                                {frontmatter.title}
                            </Link>
                        </Heading>
                        <BlogTags tags={frontmatter.tags} />

                        <Text
                            as="p"
                            marginTop="2"
                            color={useColorModeValue('gray.700', 'gray.200')}
                            fontSize="lg">
                            {frontmatter.metaDesc}
                        </Text>
                        <BlogAuthor name={frontmatter.author} date={frontmatter.date} avatarUrl={frontmatter.authorAvatarUrl} />
                    </Box>
                </Box>
            ))}
            

        </Container>
        </>

    );
};



export async function getStaticProps() {
    const files = fs.readdirSync('src/posts');

    const posts = files.map((fileName) => {
        const slug = fileName.replace('.mdx', '');
        const readFile = fs.readFileSync(`src/posts/${fileName}`, 'utf-8');
        const { data: frontmatter, content } = matter(readFile);

        return {
            slug,
            frontmatter,
        };
    });

    return {
        props: {
            posts,
        },
    };
}



export default Blog;

