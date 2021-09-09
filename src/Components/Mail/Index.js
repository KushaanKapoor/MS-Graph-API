import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react';
import MailContent from '../../utils/mailContent';
import moment, { Moment } from 'moment';


function Title({title})
{
    return(
        <Text
            color={'blue.500'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontSize={'sm'}
                letterSpacing={1.1}>
                {title}
              </Text>
    )
}
function Mail({mailData}) {
  console.log('Mail props', mailData);
  return (
    <div>
        <Accordion allowToggle>
        {mailData.map((item, index) => {
            const senderName=item.from.emailAddress.name;
            const senderEmail=item.from.emailAddress.address;
            var dateTime = moment(item.sentDateTime).format('MMMM Do YYYY, h:mm:ss a');
          return (
            <AccordionItem key={index}>
                <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                  <Title title={'Sub : ' + item.subject}/>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
            <Box
            maxW={'1000px'}
            w={'full'}
            bg={'gray.900'}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <Stack>
              <Title title={'Mail'}/>
              {<MailContent content={item.body.content}/>}
            </Stack>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
              <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Stack direction={'row'} spacing={3} fontSize={'sm'} color={'blue.500'}>
                  <Title title={'from : '} />
                <Text fontWeight={600} marginX={5}>{senderEmail}</Text>
                <Text fontWeight={600}>{senderName}</Text>
              </Stack>
                <Text fontSize={'sm'} color={'gray.500'}>{dateTime}</Text>
              </Stack>
            </Stack>
          </Box>
          </AccordionPanel>
          </AccordionItem>
          );
        })}
        </Accordion>
    </div>
  );
}
export default Mail;


/*
      <Box
        maxW={'1000px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            Mail
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            Subject
          </Heading>
          <Text color={'gray.500'}>
            Body
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Sender</Text>
            <Text color={'gray.500'}>Date/Time</Text>
          </Stack>
        </Stack>
      </Box>


*/

/*

<AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {item.subject}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
               {item.body.content}
              </AccordionPanel>
            </AccordionItem>

*/