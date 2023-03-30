import { isAndroid } from '../../utils/isAndroid';
import styled from 'styled-components/native';

export const Category = styled.TouchableOpacity`
    align-items: center;
`;

export const Icon = styled.View`
    background: #fff;
    width: 44px;
    height: 44px;
    border-radius: 22px;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;

    box-shadow: 0px 2px 1px rgba(0, 0, 0, ${isAndroid ? 1 : 0.1});
    elevation: 2;
`;
