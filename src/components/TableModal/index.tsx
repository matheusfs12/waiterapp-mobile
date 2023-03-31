import { Form, Header, Input, ModalBody, Overlay } from './styles';
import { Modal, TouchableOpacity } from 'react-native';

import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { isAndroid } from '../../utils/isAndroid';
import { useState } from 'react';

interface TableModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
    const [table, setTable] = useState('');

    function handleSave() {
        onSave(table);
        setTable('');
        onClose();
    }

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            <Overlay behavior={isAndroid ? 'height' : 'padding'}>
                <ModalBody>
                    <Header>
                        <Text weight="600">Informe a mesa</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Close color="#666" />
                        </TouchableOpacity>
                    </Header>
                    <Form>
                        <Input
                            placeholder="Número da mesa"
                            placeholderTextColor="#666"
                            keyboardType="number-pad"
                            onChangeText={setTable}
                        />

                        <Button disabled={table.length === 0} onPress={handleSave}>
                            Salvar
                        </Button>
                    </Form>
                </ModalBody>
            </Overlay>
        </Modal>
    );
}
