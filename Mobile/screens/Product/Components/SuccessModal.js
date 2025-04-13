/* import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const SuccessModal = ({ visible, message, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <View className="bg-white p-6 rounded-2xl items-center w-full max-w-md">
          <Text className="text-xl font-bold text-green-600 mb-3">✅ Succès</Text>
          <Text className="text-base text-center mb-4 text-[#212121]">{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-[#212121] px-5 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
 */