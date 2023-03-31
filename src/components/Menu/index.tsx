import { AddToCartButton, ProductContainer, ProductDetails, ProductImage, Separator } from './styles';

import { FlatList } from 'react-native';
import { PlusCircle } from '../Icons/PlusCircle';
import { Product } from '../../types/Product';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { getImageUri } from '../../utils/getImageUri';
import { products } from '../../mocks/products';
import { useState } from 'react';

export function Menu() {
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

                        <AddToCartButton>
                            <PlusCircle />
                        </AddToCartButton>
                    </ProductContainer>
                )}
            />
        </>
    );
}
