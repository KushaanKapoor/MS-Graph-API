function MailContent({content}) {
    const text = content;
    return text.split('\n').map(str => <>{str}</>);
  }
  export default MailContent;
  
  
 