/*eslint-disable */

import Proptypes from "prop-types";
import classnames from "classnames";
import { useSelector } from "react-redux";

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
            className={classnames("timeline px-1", {
              [className]: className,
            })}
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
                  Bv encours : <b>{item.nombre_en_cours}</b>
                </p>
                <p>
                  Bv terminé : <b >{item.nombre_bv_termine}</b>
                </p>
                {item.libelle == "Ouverture du scrutin" ? (
                  <div>
                    <p>Votant : {votant[0]?.total_votant}</p>
                    <p>Inscrit : {inscrit?.nombre}</p>
                    <p>
                      Taux :{" "}
                      {parseInt(
                        (Number(votant[0]?.total_votant) * 100) /
                          Number(inscrit?.nombre)
                      ) + "%"}
                    </p>
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
