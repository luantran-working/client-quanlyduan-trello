import { useAppSelector } from '@/src/hooks';
import { Avatar, Box, Button, Flex, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';

type Props = {
  comments: any[];
  onChange: any;
};
export default function CardComment({ comments, onChange }: Props) {
  const user = useAppSelector((state) => state.user);
  const [value, setValue] = useState('');
  const handleDelete = (index: number) => {};

  return (
    <Box>
      <Box width="100%" marginTop="1rem">
        <Box display="flex" fontWeight="bold" alignItems="center">
          <FaRegCommentDots />
          <Text marginLeft="1rem">Bình luận</Text>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" marginTop="1rem" width="90%" marginX="auto">
        {comments.map((comment, index) => (
          <Box key={index} marginX="auto" marginBottom="32px">
            <Flex alignItems="center">
              <Avatar
                size="sm"
                name={user.fullName}
                mr="5px"
                src="https://bit.ly/tioluwani-kolawole"
              />
              <Text>{user.fullName}</Text>
              <Button
                ml="8px"
                size="xs"
                onClick={() => handleDelete(index)}
                color="red.600"
                variant="plain"
                mt="2px"
                _hover={{
                  backgroundColor: 'red.600',
                  color: 'white'
                }}>
                <AiOutlineDelete />
              </Button>
            </Flex>
            <Box>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis nulla quibusdam
              voluptatum vero repellat expedita iusto assumenda earum blanditiis numquam vel optio,
              illum eveniet consequuntur, tenetur quis nesciunt, nobis debitis?
            </Box>
          </Box>
        ))}
        <Box minHeight="200px" maxWidth="80%">
          <Textarea
            name="comment"
            size="sm"
            value={value}
            fontWeight="bold"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Để lại bình luận.."
          />
        </Box>
      </Box>
    </Box>
  );
}
