// Interfaces
import { TextFieldProps } from '../../interfaces/TextFieldProps';

// Styles
import { Container } from './styles';

const TextField: React.FC<TextFieldProps> = ({ ...rest }) => {
  return <Container {...rest} />;
};

export default TextField;
