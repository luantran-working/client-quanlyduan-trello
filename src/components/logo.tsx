import { Image } from '@chakra-ui/react';

type Props = {
  height?: any;
} & any;

export default function Logo({ height, ...other }: Props) {
  return <Image height={height || '20px'} src="/iit-logo.png" alt="brand logo" {...other}></Image>;
}
