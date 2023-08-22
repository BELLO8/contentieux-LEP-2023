/* eslint-disable */

import React from "react";

import React from "react";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useState } from "react";

import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Label } from "reactstrap";
import { Filter } from "react-feather";

const lvFillter = ({ data, event }) => {
  const [basicModal, setBasicModal] = useState(false);
  return (
    <>
      <div className="basic-modal">
        <Button
          className="mb-1 mt-3 btn-icon rounded-circle"
          outline
          color="primary"
          onClick={() => setBasicModal(!basicModal)}
        >
          <Filter size={16} />
        </Button>
        <Modal
          isOpen={basicModal}
          toggle={() => setBasicModal(!basicModal)}
          modalClassName="modal-slide-in event-sidebar"
        >
          <ModalHeader>Appliquer un filtre sur les données</ModalHeader>
          <ModalBody>
            <div>
              <h5 className="mt-3 filter-title">Lieu de vote</h5>
              <ul className="list-unstyled categories-list">
                <li className="mb-1">
                  <div className="form-check">
                    <Input
                      type="radio"
                      id="all"
                      name="item-radio"
                      defaultChecked
                      onClick={() => {
                        setSearchTerm("");
                      }}
                    />
                    <Label className="form-check-label" for="all">
                      Tout
                    </Label>
                  </div>
                </li>
                {data.map((item) => {
                  return (
                    <li key={item.value} className="mb-1">
                      <div className="form-check">
                        <Input
                          type="radio"
                          id={item.value}
                          name="item-radio"
                          onClick={() => {
                            event();
                            // dispatch(getBureauVote(item.value));
                            // setSearchTerm(item.label);
                          }}
                        />
                        <Label className="form-check-label" for={item.value}>
                          {item.label}
                        </Label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default lvFillter;
