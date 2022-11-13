import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import {
    Tag,
    Container,
    HStack,
    Avatar,
    TagLabel
} from '@chakra-ui/react';

import DiscordCTA from "../../components/DiscordCTA"
import Head from 'next/head';
import Image from 'next/image';

const components = { DiscordCTA }

const AuthorTag = ({ name, avatarUrl }) => {
    return (
        <Tag size='lg' colorScheme='green' borderRadius='full'>
            <Avatar
                src={avatarUrl}
                size='xs'
                name={name}
                ml={-1}
                mr={2}
            />
            <TagLabel>{name}</TagLabel>
        </Tag>
    )
}


const BlogPost = ({ frontmatter, content, jsxContent, url }) => {

    return (
        <>
        <Head>
            <title>{frontmatter.title}</title>
            <link rel="canonical" href={url} />

            <meta name="title" content={frontmatter.title} key="title" />
            <meta name="description" content={frontmatter.metaDesc} key="description" />
            <meta property="og:title" content={frontmatter.title} key="og-title" />
            <meta property="og:description"  content={frontmatter.metaDesc} key="og-description" />
            <meta property="og:image" content={frontmatter.splashImageUrl} />
            <meta property="og:type" content="article" key="og-type" />
            <meta property="og:url" content={url} key="og-url" />
            <meta property="twitter:card" content="summary_large_image" key="twitter-card" />
            <meta property="twitter:url" content="@thecodercareer" key="twitter-url" />
            <meta property="twitter:title" content={frontmatter.title} key="twitter-title" />
            <meta property="twitter:description" content={frontmatter.metaDesc} key="twitter-description" />
            <meta property="twitter:image" content={frontmatter.splashImageUrl} key="twitter-image" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Container w={[320, 375, 768, 900]} py={['10', '20', '25']} maxW='900px'>
            {/* Note: modify tailwind.config.js typography section to customise prose section */}
            <article className="prose lg:prose-xl">
                <h1>{frontmatter.title}</h1>
                <Image src={frontmatter.splashImageUrl} width={'700'} height='500' />
                <p className="text-slate-500">
                    <em>
                        {new Date(frontmatter.date).toDateString()} 
                         <AuthorTag name={frontmatter.author} avatarUrl={frontmatter.authorAvatarUrl} />
                    </em>
                </p>
                <MDXRemote {...jsxContent} components={components} />
            </article>

            <HStack my={8}>
                {frontmatter.tags.map((tag) => (<Tag key={tag} size="lg">{tag}</Tag>))}
            </HStack>
        </Container>
        </>
    )
}

export default BlogPost;


export async function getStaticPaths() {
    const files = fs.readdirSync('src/posts');
    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.mdx', ''),
        },
    }));
    return {
        paths,
        fallback: false,
    }
}


export async function getStaticProps({ params: { slug } }) {
    const file = fs.readFileSync(`src/posts/${slug}.mdx`, 'utf-8');
    const { data: frontmatter, content } = matter(file);
    const jsxContent = await serialize(content);
    return {
        props: {
            frontmatter,
            content,
            jsxContent,
            url: `https://thecodercareer.com/blog/${slug}`
        },
    };

}
