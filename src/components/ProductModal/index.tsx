import { CloseButton, Header, Image, Ingredient, IngredientsContainer, ModalBody, ModalFooter, ModalFooterContainer, PriceContainer } from './styles';
import { FlatList, Modal } from 'react-native';

import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Product } from '../../types/Product';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { getImageUri } from '../../utils/getImageUri';

interface ProductModalProps {
    visible: boolean;
    onClose: () => void;
    product: Product | null;
    onAddToCart: (product: Product) => void;
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {
    if (!product) return null;

    function handleAdicionar() {
        onAddToCart(product!);
        onClose();
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <Image source={{
                uri: getImageUri(product.imagePath)
            }}>
                <CloseButton onPress={onClose}>
                    <Close />
                </CloseButton>
            </Image>

            <ModalBody>
                <Header>
                    <Text size={24} weight="600">{product.name}</Text>
                    <Text color="#666">{product.description}</Text>
                </Header>

                {product.ingredients.length > 0 && (
                    <IngredientsContainer>
                        <Text color="#666" weight="600">Ingredientes</Text>

                        <FlatList
                            data={product.ingredients}
                            keyExtractor={ingredient => ingredient._id}
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: 16 }}
                            renderItem={({ item: ingredient }) => (
                                <Ingredient>
                                    <Text>{ingredient.icon}</Text>
                                    <Text size={14} color="#666">{ingredient.name}</Text>
                                </Ingredient>
                            )}
                        />
                    </IngredientsContainer>
                )}
            </ModalBody>

            <ModalFooter>
                <ModalFooterContainer>
                    <PriceContainer>
                        <Text color="#666">Preço</Text>
                        <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
                    </PriceContainer>

                    <Button onPress={handleAdicionar}>Adicionar</Button>
                </ModalFooterContainer>
            </ModalFooter>
        </Modal>
    );
}
