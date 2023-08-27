/*eslint-disable */

import Proptypes from "prop-types";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { getNombreElecteur } from "../../../utility/Utils";
import { isEmptyObject } from "jquery";
import { Badge } from "reactstrap";

const CustomTimeline = (props) => {
  // ** Props
  const { data, tag, className } = props;
  const nbreBV = useSelector((state) => state.election.nbrBv);
  const votant = useSelector((state) => state.election.nombreVotantGlobal);
  const inscrit = useSelector((state) => state.election.nombreElecteur);

  // ** Custom Tagg

  return (
    <div className="d-flex">
      {data.map((item, i) => {
        const Tag = tag ? tag : "ul";
        const ItemTag = item.tag ? item.tag : "li";
        return (
          <Tag
            className={classnames("timeline", {
              [className]: className,
            })}
            style={{ marginRight: "5px" }}
          >
            <ItemTag
              key={i}
              className={classnames("timeline-item", {
                [item.className]: className,
              })}
            >
              <span
                className={classnames("timeline-point", {
                  [`timeline-point-${item.color}`]: "item.color",
                  "timeline-point-indicator": !item.icon,
                })}
              >
                {item.icon ? item.icon : null}
              </span>
              <div className="timeline-event">
                <div
                  className={classnames(
                    "d-flex justify-content-between flex-sm-row flex-column",
                    {
                      "mb-sm-0": item.meta,
                    }
                  )}
                >
                  <h6>{item.libelle}</h6>
                </div>
                <p
                  className={classnames({
                    "mb-0": i === data.length - 1 && !item.customContent,
                  })}
                >
                  Bv encours :{" "}
                  <b>{item.nombre_en_cours ? item.nombre_en_cours : 0}</b>
                </p>
                <p>
                  Bv terminé :{" "}
                  <b>{item.nombre_bv_termine ? item.nombre_bv_termine : 0}</b>
                </p>
                {item.id == 3 ? (
                  <div>
                    <p>
                      Votants :{" "}
                      {votant[0]?.total_votant ? votant[0]?.total_votant : 0}
                    </p>
                    <p>
                      Inscrits :{" "}
                      {!isEmptyObject(inscrit)
                        ? inscrit?.nombre
                        : getNombreElecteur()?.nombre}
                    </p>
                    <Badge color='danger' className="fw-bolder" >
                        Taux :{" "}
                      {parseFloat(
                        (Number(votant[0]?.total_votant) * 100) /
                          Number(
                            inscrit?.nombre
                              ? inscrit?.nombre
                              : getNombreElecteur()?.nombre
                          )
                      ).toFixed(2) + " %"}
                     
                    </Badge> 
                  </div>
                ) : (
                  ""
                )}

                {item.customContent ? item.customContent : null}
              </div>
            </ItemTag>
          </Tag>
        );
      })}
    </div>
  );
};

export default CustomTimeline;

// ** PropTypes
CustomTimeline.propTypes = {
  tag: Proptypes.string,
  className: Proptypes.string,
  data: Proptypes.array.isRequired,
};
