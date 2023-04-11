import { Actions, Container, EmptyCartContainer, Image, Item, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from './styles';
import { FlatList, TouchableOpacity } from 'react-native';

import { Button } from '../Button';
import { CartItem } from '../../types/CartItem';
import { MinusCircle } from '../Icons/MinusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { PlusCircle } from '../Icons/PlusCircle';
import { Product } from '../../types/Product';
import { Text } from '../Text';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { getImageUri } from '../../utils/getImageUri';
import { useState } from 'react';

interface CartProps {
    cartItems: CartItem[];
    onAdd: (product: Product) => void;
    onDecrement: (product: Product) => void;
    onOrderFinished: () => void;
    selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecrement, onOrderFinished, selectedTable }: CartProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const total = cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);

    async function handleConfirmOrder() {
        setIsLoading(true);

        try {
            await api.post('/orders', {
                table: selectedTable,
                products: cartItems.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity
                }))
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsModalVisible(true);
        }
    }

    function handleOK() {
        setIsModalVisible(false);
        onOrderFinished();
    }

    return (
        <>
            <OrderConfirmedModal onClose={handleOK} visible={isModalVisible} />

            <Container>
                {cartItems.length > 0 && (
                    <FlatList
                        data={cartItems}
                        keyExtractor={item => item.product._id}
                        showsVerticalScrollIndicator={false}
                        style={{ maxHeight: 140 }}
                        renderItem={({ item }) => (
                            <Item>
                                <ProductContainer>
                                    <Image
                                        source={{ uri: getImageUri(item.product.imagePath) }}
                                    />

                                    <QuantityContainer>
                                        <Text size={14} color="#666">
                                            {item.quantity}x
                                        </Text>
                                    </QuantityContainer>

                                    <ProductDetails>
                                        <Text weight="600" size={14}>{item.product.name}</Text>
                                        <Text size={14} color="#666">{formatCurrency(item.product.price)}</Text>
                                    </ProductDetails>
                                </ProductContainer>

                                <Actions>
                                    <TouchableOpacity onPress={() => onAdd(item.product)} >
                                        <PlusCircle />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onDecrement(item.product)}>
                                        <MinusCircle />
                                    </TouchableOpacity>
                                </Actions>
                            </Item>
                        )}
                    />
                )}

                <Summary>
                    {cartItems.length > 0 ? (
                        <TotalContainer>
                            <Text color="#666">Total</Text>
                            <Text size={20} weight="600">{formatCurrency(total)}</Text>
                        </TotalContainer>
                    ) : (
                        <EmptyCartContainer>
                            <Text size={14} color="#999">Seu carrinho</Text>
                            <Text size={14} color="#999">está vazio</Text>
                        </EmptyCartContainer>
                    )}
                    <Button
                        onPress={handleConfirmOrder}
                        disabled={cartItems.length === 0}
                        loading={isLoading}
                    >
                    Confirmar
                    </Button>
                </Summary>
            </Container>
        </>
    );
}
