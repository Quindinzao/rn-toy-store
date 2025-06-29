import { TouchableOpacity } from 'react-native';
import { CardProps } from '../../interfaces/CardProps';
import {
  Container,
  Row,
  StyledButtonText,
  StyledText,
  StyledTitle,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../interfaces/RoutesProps';

const Card: React.FC<CardProps> = ({
  name,
  email,
  birthDate,
  sales,
  firstCharacter,
}) => {
  const navigation = useNavigation<propsStack>();
  const handleGoToNewSale = () => navigation.navigate('SaleCreate', { email });
  return (
    <Container>
      <Row>
        <StyledTitle>Nome: </StyledTitle>
        <StyledText>{name}</StyledText>
      </Row>
      <Row>
        <StyledTitle>E-mail: </StyledTitle>
        <StyledText>{email}</StyledText>
      </Row>
      <Row>
        <StyledTitle>Nascimento: </StyledTitle>
        <StyledText>{birthDate}</StyledText>
      </Row>
      <Row>
        <StyledTitle>Vendas: </StyledTitle>
        <StyledText>{sales}</StyledText>
      </Row>
      <Row>
        <StyledTitle>Primeira letra faltante: </StyledTitle>
        <StyledText>{firstCharacter}</StyledText>
      </Row>

      <TouchableOpacity onPress={handleGoToNewSale}>
        <StyledButtonText>Crie uma venda</StyledButtonText>
      </TouchableOpacity>
    </Container>
  );
};

export default Card;
