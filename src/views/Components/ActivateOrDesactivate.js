/* eslint-disable */

import React from "react";
import { Badge, Button } from "reactstrap";
import {
  ActivateCandidat,
  DesactivateCandidat,
} from "../../@core/auth/jwt/const";
import { CheckCircle } from "react-feather";
import Avatar from "@components/avatar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getlistCandidatByType } from "../../redux/store/Election";

const ActivateOrDesactivate = ({ id, actif }) => {
  const idType = useSelector((state) => state.election.id);
  const dispatch = useDispatch();
  return (
    <>
      <div className="d-flex">
        <Button
          className="btn-icon rounded"
          size="sm"
          color={actif === "actif" ? "danger" : "success"}
          onClick={() => {
            actif === "actif"
              ? DesactivateCandidat({ id_candidat: id }).then((result) => {
                  if (result.data.status === "success") {
                    toast(
                      <div className="d-flex">
                        <div className="me-1">
                          <Avatar
                            size="sm"
                            color="success"
                            icon={<CheckCircle size={12} />}
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <h6>{result.data.message}</h6>
                        </div>
                      </div>
                    );
                    dispatch(getlistCandidatByType(idType));
                  }
                })
              : ActivateCandidat({ id_candidat: id }).then((result) => {
                  if (result.data.status === "success") {
                    toast(
                      <div className="d-flex">
                        <div className="me-1">
                          <Avatar
                            size="sm"
                            color="success"
                            icon={<CheckCircle size={12} />}
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <h6>{result.data.message}</h6>
                        </div>
                      </div>
                    );
                    dispatch(getlistCandidatByType(idType));
                  }
                });
          }}
        >
          {actif === "actif" ? "Désactiver" : "Activer"}
        </Button>
      </div>
    </>
  );
};

export default ActivateOrDesactivate;
