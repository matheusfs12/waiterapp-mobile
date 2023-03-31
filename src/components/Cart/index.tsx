import { Actions, Image, Item, ProductContainer, ProductDetails, QuantityContainer } from './styles';
import { FlatList, TouchableOpacity } from 'react-native';

import { CartItem } from '../../types/CartItem';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { getImageUri } from '../../utils/getImageUri';

interface CartProps {
    cartItems: CartItem[];
}

export function Cart({ cartItems }: CartProps) {
    return (
        <>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.product._id}
                showsVerticalScrollIndicator={false}
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
                            <TouchableOpacity>
                                <PlusCircle />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MinusCircle />
                            </TouchableOpacity>
                        </Actions>
                    </Item>
                )}
            />
        </>
    );
}
