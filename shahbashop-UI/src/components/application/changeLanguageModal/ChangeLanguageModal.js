import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./changeLanguageModal.scss";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n"

const ChangeLanguageModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  var listLanguages = [
    {
        name : "English",
        description: "Chose your Language",
        imageUrl: "english.png",
        chosen: true,
        code: "en"
    },
    {
        name: "العربية",
        description: "أختر لغتك",
        imageUrl: "arabic.png",
        chosen: false,
        code: "ar"
    }
  ];

  const handleClick = (index) =>{
    i18n.changeLanguage(listLanguages[index].code);
    listLanguages = listLanguages.map((language, languageIndex) => {
      if(languageIndex  === index){
        return {
          ...language,
          chosen: true
        }
      }
      return{
        ...language,
        chosen: false
      }
    });

    
  }

  const { t, i18n } = useTranslation();

  return (
    <div>
      <Modal backdrop="static" isOpen={modal} toggle={toggle} className={className}>
        <ModalBody>
          <ul className="list-group list-languages">
            {listLanguages.map((language, index) => 
            <li className={language.chosen ? "" : "list-group-item list-group-item-action"} onClick={() => handleClick(index)}>
              <img src={require(`../../../images/${language.imageUrl}`)} />
              <div className="language-text">
                <p >{language.description}</p>
                <p>{language.name}</p>
              </div>
            </li>)
            }
          </ul>
          <div>
            <p>{t("changeLanguageModal.policyAccordText")}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>{t("shared.accord")}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ChangeLanguageModal;