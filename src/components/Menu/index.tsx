import { AddToCartButton, Product, ProductDetails, ProductImage, Separator } from './styles';

import { FlatList } from 'react-native';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { products } from '../../mocks/products';

export function Menu() {
    return (
        <FlatList
            data={products}
            style={{ marginTop: 32 }}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={Separator}
            renderItem={({ item: product }) => (
                <Product onPress={() => console.log(product)}>
                    <ProductImage
                        source={{ uri: `http://192.168.0.108:3001/uploads/${product.imagePath}` }}
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
                </Product>
            )}
        />
    );
}
