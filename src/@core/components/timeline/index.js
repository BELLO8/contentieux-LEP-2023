/* eslint-disable */

import Proptypes from "prop-types";
import classnames from "classnames";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import UsersList from "../../../views/Components/Table";
import TableVote from "../../../views/Components/TableVote";
const Timeline = (props) => {
  // ** Props
  const { data, tag, className } = props;

  // ** Custom Tagg
  const Tag = tag ? tag : "ul";
  const [basicModal, setBasicModal] = useState(false);
  const [open, setOpen] = useState("1");
  //const [pending, setPending] = useState(true);
  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id);
  };
  const params = useParams();
  // const dispatch = useDispatch()

  return (
    <Tag
      className={classnames("timeline", {
        [className]: className,
      })}
    >
      {data.map((item, i) => {
        const ItemTag = item.tag ? item.tag : "li";

        console.log(item.materiels);
        return (
          <ItemTag
            key={i}
            className={classnames("timeline-item", {
              [item.className]: className,
            })}
          >
            <span
              className={`timeline-point timeline-point-${
                item.status == "Ouvert" || item.status == "Encours"
                  ? "primary"
                  : item.status
                  ? "success"
                  : "secondary"
              } timeline-point-indicator`}
            >
              {item.icon ? item.icon : null}
            </span>
            <div className="timeline-event">
              <div
                className={classnames(
                  "d-flex justify-content-between flex-sm-row flex-column",
                  {
                    "mb-sm-0 mb-1": item.meta,
                  }
                )}
              >
                <h6>{item.title}</h6>
                {item.meta ? (
                  <span
                    className={classnames("timeline-event-time", {
                      [item.metaClassName]: item.metaClassName,
                    })}
                  >
                    {item.meta}
                  </span>
                ) : null}
              </div>
              <p
                className={classnames({
                  "mb-0": i === data.length - 1 && !item.customContent,
                })}
              >
                {item.content}
              </p>
              <Badge
                color={
                  item.status == "Ouvert" || item.status == "Encours"
                    ? "primary"
                    : "success"
                }
                className={classnames({
                  "mt-1": i === data.length - 1 && !item.customContent,
                })}
              >
                {item.status}
              </Badge>
              <p
                className={classnames({
                  "mt-1": i === data.length - 1 && !item.customContent,
                })}
              >
                {item.comment}
              </p>
              {/* {item.customContent ? item.customContent : null} */}
              <div className="d-flex align-items-center">
                {item.title === "Ouverture du bureau de vote" ? (
                  ""
                ) : item.title === "Vérification du matériel électoral" ? (
                  item.content ? (
                    <>
                      <Button
                        className="btn-sm"
                        color="primary"
                        onClick={() => setBasicModal(!basicModal)}
                        outline
                      >
                        Voir details
                      </Button>
                      <Modal
                        isOpen={basicModal}
                        toggle={() => setBasicModal(!basicModal)}
                        modalClassName="modal-slide-in event-sidebar"
                      >
                        <ModalHeader>{item.title}</ModalHeader>
                        <ModalBody>
                          <ul className="timeline mt-1">
                            {item.materiels?.map((item) => {
                              return (
                                <li className="timeline-item">
                                  <span className="timeline-point timeline-point timeline-point-indicator"></span>
                                  <p>{item.libelle}</p>
                                  <Badge color="success">
                                    {item.status ? "Conforme" : "Pas conforme"}
                                  </Badge>
                                </li>
                              );
                            })}
                          </ul>
                        </ModalBody>
                      </Modal>
                    </>
                  ) : (""
                    // <Badge color="danger">pas debuté</Badge>
                  )
                ) : item.title === "Déroulement du scrutin" ? (
                  item.content ? (
                    <Accordion open={open} toggle={toggle}>
                      <AccordionItem>
                        <AccordionHeader targetId="2">
                          <Button outline size="sm">
                            Voir details
                          </Button>
                        </AccordionHeader>
                        <AccordionBody accordionId="2">
                          <TableVote idbv={params.idbv} />
                        </AccordionBody>
                      </AccordionItem>
                    </Accordion>
                  ) : (""
                    // <Badge color="danger">pas debuté</Badge>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </ItemTag>
        );
      })}
    </Tag>
  );
};

export default Timeline;

// ** PropTypes
Timeline.propTypes = {
  tag: Proptypes.string,
  className: Proptypes.string,
  data: Proptypes.array.isRequired,
};
