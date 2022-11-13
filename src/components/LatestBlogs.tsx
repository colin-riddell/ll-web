import { Box, Heading, HStack, Wrap, Divider, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import BlogAuthor from "./BlogAuthor";

const LatestBlogs = ({posts}) => {
    return (
        <>
<Heading as="h2" marginTop="5">
                Latest articles
            </Heading>
            <Divider marginTop="5" />
            <HStack>
                {posts.map(({ slug, frontmatter, content }) => (

                    <Wrap spacing="5px" marginTop="5">

                        <Box w="100%">
                            <Box borderRadius="lg" overflow="hidden">
                            <Link href={`/blog/${slug}`}>
                                <Image
                                    transform="scale(1.0)"
                                    src={frontmatter.splashImageUrl}
                                    alt="some text"
                                    objectFit="contain"
                                    width="100%"
                                    transition="0.3s ease-in-out"
                                    _hover={{
                                        transform: 'scale(1.05)',
                                    }}
                                />
                                </Link>
                            </Box>
                            <Heading fontSize="xl" marginTop="2">
                            <Link href={`/blog/${slug}`}>
                                {frontmatter.title}
                            </Link>
                            </Heading>
                            <Text as="p" fontSize="md" marginTop="2">
                                {frontmatter.metaDesc}
                            </Text>
                            <BlogAuthor name={frontmatter.author} date={frontmatter.date} avatarUrl={frontmatter.authorAvatarUrl} />
                        </Box>

                    </Wrap>
                ))}
            </HStack>
            </>
    )
}

export default LatestBlogs;