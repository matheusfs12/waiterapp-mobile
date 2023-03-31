import { CategoriesContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';

import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { cartItemsList } from '../mocks/cartItems';
import { useState } from 'react';

export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [cartItems, setCartItems] = useState<CartItem[]>(cartItemsList);

    function handleCancelOrder() {
        setSelectedTable('');
    }

    return (
        <>
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleCancelOrder}
                />

                <CategoriesContainer>
                    <Categories />
                </CategoriesContainer>

                <MenuContainer>
                    <Menu />
                </MenuContainer>
            </Container>

            <Footer>
                <FooterContainer>
                    {!selectedTable ? (
                        <Button onPress={() => setIsTableModalVisible(true)}>Novo pedido</Button>
                    ) : (
                        <Cart cartItems={cartItems} />
                    )}
                </FooterContainer>
            </Footer>

            <TableModal
                visible={isTableModalVisible}
                onClose={() => setIsTableModalVisible(false)}
                onSave={setSelectedTable}
            />
        </>
    );
}
