import { HStack, Image, Text } from "@chakra-ui/react";

interface BlogAuthorProps {
    date: Date;
    name: string;
    avatarUrl: string;
}

const BlogAuthor: React.FC<BlogAuthorProps> = ({ name, date, avatarUrl }) => {
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Image
                borderRadius="full"
                boxSize="40px"
                src={avatarUrl}
                alt={`Avatar of ${name}`}
            />
            <Text fontWeight="medium">{name}</Text>
            <Text>—</Text>
            <Text>{new Date(date).toDateString()}</Text>
        </HStack>
    );
};

export default BlogAuthor;
