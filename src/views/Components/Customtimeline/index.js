/*eslint-disable */

import classnames from "classnames";
import { isEmptyObject } from "jquery";
import Proptypes from "prop-types";
import { useSelector } from "react-redux";
import { Badge } from "reactstrap";
import { getNombreElecteur } from "../../../utility/Utils";

const CustomTimeline = (props) => {
  // ** Props
  const { data, tag, className } = props;
  const nbreBV = useSelector((state) => state.election.nbrBv);
  const votant = useSelector((state) => state.election.nombreVotantGlobal);
  const inscrit = useSelector((state) => state.election.nombreElecteur);

  // ** Custom Tagg

  return (
    <div className="flex">
      {data.map((item, i) => {
        const Tag = tag ? tag : "ul";
        const ItemTag = item.tag ? item.tag : "li";
        return (
          <Tag
            key={i}
            className={classnames("timeline", {
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
                className={classnames("font-bold text-black timeline-point", {
                  [`timeline-point-${item.color}`]: "item.color",
                  "": !item.icon,
                })}
              >
                {i + 1}
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
                  <p className="text-sm text-black font-bold">{item.libelle}</p>
                </div>
                {
                  item.id == 7 ? (
                    <>
                      <p>
                        Encours :{" "}
                        <b>0</b>
                      </p>
                      <p>
                        Bien arrivé :{" "}
                        <b>0</b>
                      </p>

                      <p>
                        A problème :{" "}
                        <b>0</b>
                      </p>
                    </>
                  ) : <>
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
                  </>
                }

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
                    <Badge color="danger" className="fw-bolder">
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
                ) : ""}

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
