/* eslint-disable */

import Proptypes from "prop-types";
import classnames from "classnames";
import { Badge, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useState } from "react";
const Timeline = (props) => {
  // ** Props
  const { data, tag, className } = props;

  // ** Custom Tagg
  const Tag = tag ? tag : "ul";
  const [basicModal, setBasicModal] = useState(false);
  return (
    <Tag
      className={classnames("timeline", {
        [className]: className,
      })}
    >
      {data.map((item, i) => {
        const ItemTag = item.tag ? item.tag : "li";

        return (
          <ItemTag
            key={i}
            className={classnames("timeline-item", {
              [item.className]: className,
            })}
          >
            <span
              className={classnames("timeline-point", {
                [`timeline-point-${item.color}`]: item.color,
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
                color="primary"
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
                {item.title === "Ouverture bureau de vote" ? (
                  ""
                ) : (
                  <>
                    <Button
                      className="btn-sm"
                      color="primary"
                      onClick={() => setBasicModal(!basicModal)}
                      outline
                    >
                      Voir les details de l'étape
                    </Button>
                    <Modal
                      isOpen={basicModal}
                      toggle={() => setBasicModal(!basicModal)}
                      modalClassName="modal-slide-in event-sidebar"
                    >
                      <ModalHeader>
                        Detail de l'étape
                      </ModalHeader>
                      <ModalBody>
                        
                      </ModalBody>
                    </Modal>
                  </>
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
