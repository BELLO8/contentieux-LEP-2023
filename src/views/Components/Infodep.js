import React from "react";
import { Badge } from "reactstrap";

const Infodep = ({
  votants,
  nombreBulletinBlanc,
  nombreBulletinNull,
}) => {
  return (
    <>
      <div className="mx-3">
        <div className="d-flex justify-content-start align-items-center">
          <div className="profile-user-info">
            <h6 className="mb-0 mx-1"> Suffrage exprimé </h6>
          </div>
          <div className="ms-auto">
            <Badge className="btn-icon" color="primary" size="sm">
              {Number(votants) -
                Number(nombreBulletinNull) -
                Number(nombreBulletinBlanc)}{" "}
            </Badge>
          </div>
        </div>

        <div className="d-flex justify-content-start align-items-center">
          <div className="profile-user-info">
            <h6 className="mb-0 mx-1"> Bulletin null </h6>
          </div>
          <div className="ms-auto">
            <Badge className="btn-icon" color="primary" size="sm">
              {nombreBulletinNull}
            </Badge>
          </div>
        </div>

        <div className="d-flex justify-content-start align-items-center">
          <div className="profile-user-info">
            <h6 className="mb-0 mx-1"> Bulletin blanc </h6>
          </div>
          <div className="ms-auto">
            <Badge className="btn-icon" color="primary" size="sm">
              {nombreBulletinBlanc}
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
};

export default Infodep;
