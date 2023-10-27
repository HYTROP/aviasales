import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './VerticalMenu.css'
const ModalWindow = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal} style={{ backgroundColor: '#2196F3', borderRadius: 1, margin: '10px 1px', width: '100vw' }}>
        КОЛИЧЕСТВО ПЕРЕСАДОК
      </Button>
      <Modal title="ВЫБЕРИТЕ КОЛИЧЕСТВО ПЕРЕСАДОК" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ fontSize: 13 }}>
        {children}
      </Modal>
    </>
  );
};
export default ModalWindow;