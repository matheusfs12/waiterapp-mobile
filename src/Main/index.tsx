import { CategoriesContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';

export function Main() {
    return (
        <>
            <Container>
                <Header />

                <CategoriesContainer>
                    <Categories />
                </CategoriesContainer>

                <MenuContainer>
                    <Menu />
                </MenuContainer>
            </Container>

            <Footer>
                <FooterContainer>
                    <Button onPress={() => console.log('epa')}>Novo pedido</Button>
                </FooterContainer>
            </Footer>
        </>
    );
}
