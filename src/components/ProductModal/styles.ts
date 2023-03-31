import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
    width: 100%;
    height: 200px;
    align-items: flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 16px;
    align-items: center;
    justify-content: center;
    margin: 24px;
`;

export const Header = styled.View`
    gap: 8px;
`;

export const ModalBody = styled.View`
    background: #fafafa;
    flex: 1;
    padding: 32px 24px 0;
    gap: 32px;
`;

export const IngredientsContainer = styled.View`
    flex: 1;
`;

export const Ingredient = styled.View`
    flex-direction: row;
    border: 1px solid rgba(204, 204, 204, 0.3);
    border-radius: 8px;
    padding: 16px;
    align-items: center;
    gap: 20px;
    margin-bottom: 4px;
`;

export const ModalFooter = styled.View`
    min-height: 110px;
    background: #fff;
    padding: 16px 24px;
`;

export const ModalFooterContainer = styled.SafeAreaView`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const PriceContainer = styled.View`
`;
