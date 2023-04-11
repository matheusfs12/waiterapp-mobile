import { CategoriesContainer, CenteredContainer, Container, Footer, FooterContainer, MenuContainer } from './styles';
import { useEffect, useState } from 'react';

import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { Categories } from '../components/Categories';
import { Category } from '../types/Category';
import { Empty } from '../components/Icons/Empty';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Product } from '../types/Product';
import { TableModal } from '../components/TableModal';
import { Text } from '../components/Text';
import { api } from '../utils/api';

export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setIsLoading(true);

        Promise.all([
            api.get('/categories'),
            api.get('/products')
        ]).then(([categoriesResponse, productResponse]) => {
            setCategories(categoriesResponse.data);
            setProducts(productResponse.data);
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    async function handleSelectCategory(categoryId: string) {
        try {
            setIsLoadingProducts(true);

            const route = categoryId ? `/categories/${categoryId}/products` : '/products';

            const response = await api.get(route);

            setProducts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingProducts(false);
        }
    }

    function handleResetOrder() {
        setSelectedTable('');
        setCartItems([]);
    }

    function handleSaveTable(table: string) {
        setSelectedTable(table);
    }

    function handleAddToCart(product: Product) {
        if (!selectedTable) {
            setIsTableModalVisible(true);
        }

        setCartItems((prevState) => {
            const existingItemIndex = prevState.findIndex((item) => item.product._id === product._id);

            if (existingItemIndex !== -1) {
                const newItems = [...prevState];
                newItems[existingItemIndex].quantity += 1;

                return newItems;
            }

            return prevState.concat({
                product,
                quantity: 1
            });
        });
    }

    function handleDecrementCartItem(product: Product) {
        setCartItems((prevState) => {
            const existingItemIndex = prevState.findIndex((item) => item.product._id === product._id);

            if (existingItemIndex !== -1) {
                const newItems = [...prevState];
                newItems[existingItemIndex].quantity -= 1;

                return newItems.filter((item) => item.quantity > 0);
            }

            return prevState;
        });
    }

    return (
        <>
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleResetOrder}
                />

                {!isLoading && (
                    <>
                        <CategoriesContainer>
                            <Categories
                                categories={categories}
                                onSelectCategory={handleSelectCategory}
                            />
                        </CategoriesContainer>

                        {isLoadingProducts ? (
                            <CenteredContainer>
                                <ActivityIndicator />
                            </CenteredContainer>
                        ) : (
                            <>
                                {products.length > 0 ? (
                                    <MenuContainer>
                                        <Menu
                                            products={products}
                                            onAddToCart={handleAddToCart}
                                        />
                                    </MenuContainer>
                                ) : (
                                    <CenteredContainer>
                                        <Empty />
                                        <Text style={{ marginTop: 24 }} color="#666">Nenhum produto foi encontrado!</Text>
                                    </CenteredContainer>
                                )}
                            </>
                        )}
                    </>
                )}

                {isLoading && (
                    <CenteredContainer>
                        <ActivityIndicator />
                    </CenteredContainer>
                )}
            </Container>

            <Footer>
                {/* <FooterContainer> */}
                {!selectedTable ? (
                    <Button
                        onPress={() => setIsTableModalVisible(true)}
                        disabled={isLoading}
                    >
                        Novo pedido
                    </Button>
                ) : (
                    <Cart
                        onAdd={handleAddToCart}
                        onDecrement={handleDecrementCartItem}
                        cartItems={cartItems}
                        onOrderFinished={handleResetOrder}
                        selectedTable={selectedTable}
                    />
                )}
                {/* </FooterContainer> */}
            </Footer>

            <TableModal
                visible={isTableModalVisible}
                onClose={() => setIsTableModalVisible(false)}
                onSave={handleSaveTable}
            />
        </>
    );
}
