import {
  Text
} from '@chakra-ui/react';


function MailContent({content}) {
    const text = content;
    return text.split('\n').map( (str, index) => <Text color={'white'} key={index}>{str}</Text>);
  }
  export default MailContent;
  
  
 