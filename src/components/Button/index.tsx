// Interfaces
import { ButtonProps } from '../../interfaces/ButtonProps';

// Styles
import { Container, StyledText } from './styles';

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <StyledText>{title}</StyledText>
    </Container>
  );
};

export default Button;
