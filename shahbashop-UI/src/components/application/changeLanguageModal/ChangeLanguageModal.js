import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import "./changeLanguageModal.scss";
import { useTranslation } from "react-i18next";
import { setAcceptedCookies, checkAcceptedCookies} from "../../../utils/cookies";
import i18n from "../../../i18n";


const ChangeLanguageModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(!checkAcceptedCookies());
  
  const accord = () => {
    setAcceptedCookies();
    setModal(!modal)
  };
  
  var listLanguages = [
    {
      name : "English",
      description: "Chose your Language",
      imageUrl: "english.png",
      code: "en"
    },
    {
      name: "العربية",
      description: "أختر لغتك",
      imageUrl: "arabic.png",
      code: "ar"
    }
  ];
  
  const handleClick = (index) =>{
    i18n.changeLanguage(listLanguages[index].code);
    setChosenIndex(index);
    
  }
  const indexOfLangue = () =>{
    let indexToReturn = 0;
    listLanguages.forEach((language, index) =>{
      if(language.code === i18n.language){
        indexToReturn = index;
      }
    }); 
    
    return indexToReturn;
  };

  const [chosenIndex, setChosenIndex] = useState(indexOfLangue);

  const { t } = useTranslation();
  return (
      <Modal backdrop="static" isOpen={modal} toggle={accord} className={className}>
        <ModalBody>
          <ul className="list-group list-languages">
            {listLanguages.map((language, index) => 
            <li key={language.code} className={chosenIndex === index ? "list-group-item list-group-item-action chosen" : "list-group-item list-group-item-action"} onClick={() => handleClick(index)}>
              <img alt={language.name} src={require(`../../../images/${language.imageUrl}`)} />
              <div className={language.code === "ar" ? "language-text arabic" : "language-text"}>
                <p >{language.description}</p>
                <p>{language.name}</p>
              </div>
            </li>)
            }
          </ul>
          <div>
            <p className={i18n.language === "ar" ? "policy arabic" : "policy"}>{t("changeLanguageModal.policyAccordText")}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={accord}>{t("shared.accord")}</Button>
        </ModalFooter>
      </Modal>
  );
}

export default ChangeLanguageModal;