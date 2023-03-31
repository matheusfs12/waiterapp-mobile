import styled from 'styled-components/native';

export const Overlay = styled.KeyboardAvoidingView`
    background: rgba(0, 0, 0, 0.6);
    flex: 1;
    justify-content: center;
    align-items: stretch;
    padding: 0 24px;
`;

export const ModalBody = styled.View`
    background: #fafafa;
    padding: 24px;
    border-radius: 8px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Form = styled.View`
    margin-top: 32px;
    gap: 24px;
`;

export const Input = styled.TextInput`
    padding: 16px;
    background: #fff;
    border: 1px solid rgba(204, 204, 204, 0.5);
    border-radius: 8px;
`;
