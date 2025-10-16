import React, { FC, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Input,
  ModalOverlay,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
  Textarea
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { CardDetail } from '@/src/types/cards';
import { deleteCard, fetchCards, updateCard } from '@/src/slices/cards';
import { useAppSelector } from '@/src/hooks';
import { AiOutlineDelete, AiOutlineClose, AiOutlineLaptop } from 'react-icons/ai';
import { GrTextAlignFull } from 'react-icons/gr';
import QuillEditor from '@/src/components/quill-editor';
import { AiOutlineDown } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import CardComment from './card-comment';
type Props = {
  onClose: () => void;
  isOpen: boolean;
  card: CardDetail;
};

const CardDetailsModal: FC<Props> = ({ onClose, isOpen, card }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(card?.description);
  const [assigned, assignUser] = useState(card?.assignedTo);

  const cardRequest = useAppSelector((state) => state.cards.isRequesting);
  const cardDelete = useAppSelector((state) => state.cards.isDeleting);
  const users = useAppSelector((state) => state.users.users);

  const handleCardDelete = async () => {
    await dispatch(deleteCard(card._id));
    await dispatch(fetchCards());

    onClose();
  };

  const handleModalClose = async () => {
    const data = {
      _id: card._id,
      title,
      description,
      columnId: card.columnId,
      assignedTo: assigned
    };

    await dispatch(updateCard(data));
    await dispatch(fetchCards());

    onClose();
  };

  const handleClick = async (userId) => {
    assignUser(userId);

    const data = {
      _id: card._id,
      title,
      description,
      columnId: card.columnId,
      assignedTo: userId
    };

    await dispatch(updateCard(data));
  };

  const assignToMenu = () => {
    return (
      <Menu>
        <MenuButton as={Button} size="xs" rightIcon={<AiOutlineDown />}>
          Phụ trách
        </MenuButton>
        <MenuList>
          {users.map((user, index) => (
            <MenuItem key={index} onClick={() => handleClick(user._id)}>
              {user?.fullName}
            </MenuItem>
          ))}
          <MenuItem onClick={() => handleClick('')}>Không</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <>
      <Modal
        size="xl"
        onClose={handleModalClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior="inside">
        <ModalOverlay />
        {/* https://github.com/chakra-ui/chakra-ui/discussions/2676 */}
        <ModalContent maxW="64rem">
          <ModalBody>
            {card.label && (
              <Badge bg={card.label.type} color="white">
                {card.label.type}
              </Badge>
            )}
            <Box display="flex" marginTop="1rem" alignItems="center">
              <AiOutlineLaptop />
              <Input
                name="title"
                size="sm"
                marginLeft="1rem"
                value={title}
                fontWeight="bold"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tên thẻ"
              />
            </Box>
            <Box display="flex">
              <Box width="100%" marginTop="2rem">
                <Box display="flex" fontWeight="bold" alignItems="center">
                  <GrTextAlignFull />
                  <Text marginLeft="1rem">Mô tả</Text>
                </Box>
                <Box marginLeft="1.5rem" minHeight="200px" width="90%">
                  <QuillEditor value={description} onChange={setDescription} />
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" marginTop="3rem">
                {/* <CardLabel id={card._id} boardId={card.boardId} /> */}
                {assignToMenu()}
              </Box>
            </Box>
            {/* <CardComment comments={[1, 2, 3, 4, 5, 6]} onChange={() => {}} /> */}
          </ModalBody>
          <ModalFooter>
            <Button
              size="xs"
              marginRight="1rem"
              onClick={handleCardDelete}
              disabled={cardDelete}
              isLoading={cardDelete}
              bg="red.500"
              color="white"
              _hover={{
                backgroundColor: 'red.600'
              }}>
              <AiOutlineDelete />
            </Button>
            <Button
              size="xs"
              onClick={handleModalClose}
              disabled={cardRequest}
              isLoading={cardRequest}>
              <AiOutlineClose /> Lưu & đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardDetailsModal;
