import { AddToCartButton, ProductContainer, ProductDetails, ProductImage, Separator } from './styles';

import { FlatList } from 'react-native';
import { PlusCircle } from '../Icons/PlusCircle';
import { Product } from '../../types/Product';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { getImageUri } from '../../utils/getImageUri';
import { useState } from 'react';

interface MenuProps {
    onAddToCart: (product: Product) => void;
    products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
    const [isProductModalVisible, setIsProductModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    function handleOpenModal(product: Product) {
        setIsProductModalVisible(true);
        setSelectedProduct(product);
    }

    return (
        <>
            <ProductModal
                visible={isProductModalVisible}
                onClose={() => setIsProductModalVisible(false)}
                product={selectedProduct}
                onAddToCart={onAddToCart}
            />

            <FlatList
                data={products}
                style={{ marginTop: 32 }}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={Separator}
                renderItem={({ item: product }) => (
                    <ProductContainer onPress={() => handleOpenModal(product)}>
                        <ProductImage
                            source={{ uri: getImageUri(product.imagePath) }}
                        />

                        <ProductDetails>
                            <Text weight="600">{product.name}</Text>
                            <Text color="#666" size={14}>
                                {product.description}
                            </Text>
                            <Text weight="600" size={14}>{formatCurrency(product.price)}</Text>
                        </ProductDetails>

                        <AddToCartButton onPress={() => onAddToCart(product)} >
                            <PlusCircle />
                        </AddToCartButton>
                    </ProductContainer>
                )}
            />
        </>
    );
}
