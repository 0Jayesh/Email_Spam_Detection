
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Collapsible  = ({ open, children, title }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  const styles = {
    card: {
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      background: "#fff",
      marginTop: '12px',
      marginBottom: "24px",
      width: "100%",
    },
    header: {
      padding: "16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
    },
    title: {
      margin: 0,
      fontSize: "14px",
      fontWeight: "bold",
      color: "#111827",
    },
    button: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#4B5563",
    },
    content: {
      padding: "16px",
      borderTop: "1px solid #E5E7EB",
      textAlign: "left", 
      color: "#4B5563",
      fontSize: "14px",
      lineHeight: "1.5",
    },
  };

return (
    <div style={styles.card}>
      <div style={styles.header} onClick={handleFilterOpening}>
        <h6 style={styles.title}>{title}</h6>
        <button type="button" style={styles.button}>
          {!isOpen ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </button>
      </div>

      <div>
        {isOpen && <div style={styles.content}>{children}</div>}
      </div>
    </div>
  );

};

export default Collapsible;