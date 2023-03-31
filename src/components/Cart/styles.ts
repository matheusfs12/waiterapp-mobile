import styled from 'styled-components/native';

export const Item = styled.View`
    flex-direction: row;
    padding: 8px 0px;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
`;

export const Actions = styled.View`
    flex-direction: row;
    gap: 26px;
`;

export const ProductContainer = styled.View`
    flex-direction: row;
    flex-shrink: 1;
`;

export const Image = styled.Image`
    width: 48px;
    height: 40px;
    border-radius: 6px;
`;

export const QuantityContainer = styled.View`
    min-width: 30px;
    margin-left: 12px;
    padding-right: 8px;
    align-items: flex-end;
`;

export const ProductDetails = styled.View`
    flex: 1;
`;
