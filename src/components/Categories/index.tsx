import { Category, Icon } from './styles';

import { FlatList } from 'react-native';
import { Text } from '../Text';
import { categories } from '../../mocks/categories';
import { useState } from 'react';

export function Categories() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    function handleSelectCategory(categoryId: string) {
        if (categoryId === selectedCategory) {
            return setSelectedCategory('');
        }

        setSelectedCategory(categoryId);
    }

    return (
        <FlatList
            horizontal
            data={categories}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 24 }}
            keyExtractor={category => category._id}
            renderItem={({ item: category }) => {
                const isSelected = category._id === selectedCategory;

                return (
                    <Category onPress={() => handleSelectCategory(category._id)}>
                        <Icon>
                            <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
                        </Icon>

                        <Text opacity={isSelected ? 1 : 0.5} size={14} weight="600">{category.name}</Text>
                    </Category>
                );
            }}
        />
    );
}
