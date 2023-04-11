import { CategoryContainer, Icon } from './styles';

import { Category } from '../../types/Category';
import { FlatList } from 'react-native';
import { Text } from '../Text';
import { useState } from 'react';

interface CategoryProps {
    categories: Category[];
    onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoryProps) {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

    function handleSelectCategory(categoryId: string) {
        const category = selectedCategoryId === categoryId ? '' : categoryId;

        onSelectCategory(category);
        setSelectedCategoryId(category);
    }

    return (
        <FlatList
            horizontal
            data={categories}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 24 }}
            keyExtractor={category => category._id}
            renderItem={({ item }) => {
                const isSelected = item._id === selectedCategoryId;

                return (
                    <CategoryContainer onPress={() => handleSelectCategory(item._id)}>
                        <Icon>
                            <Text opacity={isSelected ? 1 : 0.5}>{item.icon}</Text>
                        </Icon>

                        <Text opacity={isSelected ? 1 : 0.5} size={14} weight="600">{item.name}</Text>
                    </CategoryContainer>
                );
            }}
        />
    );
}
