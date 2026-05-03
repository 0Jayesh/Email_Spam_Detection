import { useState } from "react";
import Collapsible  from './Collapsible'
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BASE_URL = window.location.origin; 


function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [cParam, setCParam] = useState("10.0");
  const [penalty, setPenalty] = useState("l2");
  const [solver, setSolver] = useState("liblinear");
  const [training, setTraining] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [paramsModalOpen, setParamsModalOpen] = useState(false);
  const [currentParams, setCurrentParams] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#F3F4F6",
      // background: "#F9FAFB",
      padding: "24px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },
    card: {
      width: "100%",
      maxWidth: "700px",
      background: "transparent",
      padding: "32px",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      textAlign: "center",
    },
    title: {
      marginBottom: "16px",
      fontSize: "36px",
    },
    subtitle: {
      marginBottom: "8px",
      color: "#555",
    },
    textarea: {
      width: "90%",
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      marginBottom: "4px",
      fontSize: "16px",
    },
    button: {
      padding: "12px 20px",
      background: "#0f62fe",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
    },
    predictButton: {
      padding: "12px 32px",
      background: isHovered ? "#1D4ED8" : "#2563EB",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
    },
    clearButton: {
      padding: "12px 32px",
      background: "#6B7280",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
    },
    sampleButton: {
      padding: "4px 8px",
      background: "#808080",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "12px",
    },
    spamSampleButton: {
      padding: "4px 8px",
      background: "#FEE2E2",
      color: "#991B1B",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "12px",
    },
    normalSampleButton: {
      padding: "4px 8px",
      background: "#DCFCE7",
      color: "#065F46",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "12px",
    },
    otpSampleButton: {
      padding: "4px 8px",
      background: "#E0E7FF",
      color: "#1E3A8A",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "12px",
    },
    initButton: {
      width: "calc(90% + 30px)", 
      padding: "12px",
      marginBottom: "16px",
      // background: isInitialized ? "#10B981" : "#3B82F6",
      background: isInitialized ? "#10B981" : "#60A5FA",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "bold",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "background 0.2s ease",
    },
    // initButton: {
    //   width: "calc(90% + 30px)", 
    //   padding: "12px 32px", // Updated to match the Predict button's horizontal padding
    //   marginBottom: "16px",
    //   background: isInitialized ? "#059669" : "#2563EB", // Matches Predict button blue, and green when active
    //   color: "#fff",
    //   border: "none",
    //   borderRadius: "8px", // Matches Predict button border-radius
    //   cursor: "pointer",
    //   fontSize: "16px", // Matches Predict button font size
    //   fontWeight: "normal", // Matches Predict button weight
    //   boxShadow: "none", // Remove extra shadow for a flatter, matching look
    //   transition: "background 0.2s ease",
    // },
    initButtonDisabled: {
      width: "calc(90% + 30px)", 
      padding: "12px",
      marginBottom: "16px",
      background: "#9CA3AF",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "not-allowed",
      fontSize: "15px",
      fontWeight: "bold",
    },
    result: {
      marginTop: "16px",
      padding: "14px",
      background: "#e8f5e9",
      borderRadius: "10px",
      color: "#1b5e20",
      fontWeight: "bold",
    },
    resultSample: {
      marginTop: "16px",
      padding: "14px",
      background: "#F1F5F9",
      borderRadius: "10px",
      color: "#64748B",
      fontWeight: "bold",
    },
    error: {
      marginTop: "16px",
      padding: "14px",
      background: "#ffebee",
      borderRadius: "10px",
      color: "#b71c1c",
    },
    buttonSamples:  {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4px',
      marginBottom: "32px",
    },
    buttonFlex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4px'
    },
    input: {
      minWidth: '100px',
      borderRadius: '4px',
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(17, 24, 39, 0.85)",
      backdropFilter: "blur(4px)",
      // background: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    // toast: {
    //   position: "fixed",
    //   top: "24px",
    //   right: "24px",
    //   background: "#059669",
    //   color: "#fff",
    //   padding: "16px 24px",
    //   borderRadius: "8px",
    //   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    //   zIndex: 99999,
    //   fontWeight: "bold",
    //   fontFamily: "Arial, sans-serif",
    // },
    toast: {
      position: "fixed",
      top: "24px",
      right: "24px",
      background: "#059669",
      color: "#fff",
      padding: "14px 28px", 
      borderRadius: "6px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      zIndex: 99999,
      fontSize: "14px",
      fontWeight: "400",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }
    
  };

  const handleSpamSample = () => {
      setText("Congratulations! You won a free iPhone. Click the link now to claim your reward.")
      setResult("")
      setError("")
      setLoading(false)
  }

  const handleNormalSample = () => {
      setText("Hi User, your project review meeting is scheduled for tomorrow at 11 AM.")
      setResult("")
      setError("")
      setLoading(false)
  }

  const handleOTPSample = () => {
      setText("Your OTP for login is 482193. Do not share it with anyone.")
      setResult("")
      setError("")
      setLoading(false)
  }

  const clearResults = () => {
    setResult("")
    setError("")
    setText('')
    setLoading(false)
  }

  const handlePredict = async () => {

    if (!isInitialized) {
      setError("Please initialize the model before making predictions.");
      setResult("");
      return;
    }

    if (!text.trim()) {
      setError("Please enter email or message text.");
      setResult("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult("");

      const response = await fetch(`${BASE_URL}/evaluate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prediction failed");
      }

      setResult(data.prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetrain = async () => {
    try {
      setTraining(true);
      setError("");
      setResult("");

      const response = await fetch(`${BASE_URL}/train`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          C: parseFloat(cParam),
          penalty: penalty,
          solver: solver,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Retraining failed");
      }

      setMetrics(data.evaluation_on_test_set);
      setShowToast(true);
      
      // 2. Hide it automatically after 3.5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3500);

      console.log('data', data)
    } catch (err) {
      // setError(err.message);
      setErrorToast(true);
      setTimeout(() => {
        setErrorToast(false);
      }, 3500);
    } finally {
      setTraining(false);
    }
  };

  const handleInitialTraining = async () => {
    try {
      setInitLoading(true);
      setError("");
      
      const response = await fetch(`${BASE_URL}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          C: parseFloat(cParam),
          penalty: penalty,
          solver: solver,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Initialization failed");
      }

      setIsInitialized(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
      setMetrics(data.evaluation_on_test_set || data.evaluation_on_test_set);
    } catch (err) {
      setErrorToast(true);
      setTimeout(() => setErrorToast(false), 3500);
    } finally {
      setInitLoading(false);
    }
  };

  const handleGetParams = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get_params`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to load parameters");
      }
      
      setCurrentParams(data.last_trained_parameters);
    } catch (err) {
      setCurrentParams(null); // Will show no parameter state
    } finally {
      setParamsModalOpen(true);
    }
  };

  return (
    <div style={styles.page}>

      {/* Toast Notification */}
      {showToast && (
              <div style={styles.toast}>
                Model trained successfully!
              </div>
      )}

      {errorToast && (
        <div style={{...styles.toast, background: "#DC2626"}}>
          Something went wrong..
        </div>
      )}

      {/* Full-page training overlay */}
      {training && (
        <div style={styles.overlay}>
          <div style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "12px" }}>
            Retraining Model...
          </div>
          <div style={{ fontSize: "16px", color: "#9CA3AF" }}>
            Please wait while the algorithm updates its parameters.
          </div>
        </div>
      )}

      {!training && metrics && (
        <div style={styles.overlay}>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#059669" }}>
             Training Complete!
          </div>
          <div style={{ fontSize: "16px", color: "#9CA3AF", marginTop: "4px" }}>
            Performance metrics on the test dataset:
          </div>

          <div style={{
            background: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "24px",
            marginTop: "24px",
            width: "100%",
            maxWidth: "550px",
            textAlign: "left",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            maxHeight: "350px",
            overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #374151", fontSize: "15px" }}>
              <span>Accuracy:</span>
              <span style={{ color: "#34D399", fontWeight: "bold" }}>
                {(metrics.accuracy * 100).toFixed(2)}%
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #374151", fontSize: "15px" }}>
              <span>Precision:</span>
              <span style={{ color: "#60A5FA" }}>{metrics.precision.toFixed(4)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #374151", fontSize: "15px" }}>
              <span>Recall:</span>
              <span style={{ color: "#60A5FA" }}>{metrics.recall.toFixed(4)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: "15px" }}>
              <span>F1 Score:</span>
              <span style={{ color: "#60A5FA" }}>{metrics.f1_score.toFixed(4)}</span>
            </div>
          </div>

          <button 
            style={{
              marginTop: "24px",
              padding: "10px 24px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }} 
            onClick={() => setMetrics(null)}
          >
            Dismiss & Return
          </button>
        </div>
      )}

      {/* Parameters Information Overlay */}
      {paramsModalOpen && (
        <div style={styles.overlay}>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60A5FA", marginBottom: "12px" }}>
            Model Parameters
          </div>
          <div style={{ fontSize: "16px", color: "#9CA3AF", marginTop: "4px", marginBottom: "24px" }}>
            Parameters used during the last model training run:
          </div>

          <div style={{
            background: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "24px",
            width: "100%",
            maxWidth: "550px",
            textAlign: "left",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            maxHeight: "350px",
            overflowY: "auto",
          }}>
            {currentParams ? (
              Object.entries(currentParams).map(([key, value]) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #374151", fontSize: "15px" }}>
                  <span style={{ color: "#E5E7EB", textTransform: "capitalize" }}>{key.replace("lr__", "")}:</span>
                  <span style={{ color: "#34D399", fontWeight: "bold" }}>{String(value)}</span>
                </div>
              ))
            ) : (
              <div style={{ color: "#EF4444", textAlign: "center", padding: "16px" }}>
                No model has been trained yet, or parameters not recorded.
              </div>
            )}
          </div>

          <button 
            style={{
              marginTop: "24px",
              padding: "10px 24px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }} 
            onClick={() => setParamsModalOpen(false)}
          >
            Close
          </button>
        </div>
      )}

      <div style={styles.card}>
        {/* <h1 style={styles.title}>Spam Detection UI</h1> */}
        <div style={{ position: "relative", marginBottom: "16px", textAlign: "center" }}>
          <h1 style={styles.title}>Spam Detection</h1>
          <button 
            style={{
              position: "absolute",
              right: "24px",
              top: "8px",
              background: "none",
              border: "none",
              // color: "#2563EB",
              color: "#4B5563",
              cursor: "pointer",
              fontSize: "20px"
            }}
            onClick={handleGetParams}
            title="View Current Parameters"
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
        </div>
        <p style={styles.subtitle}>Enter a message and check whether it is spam.</p>
        <button
            // style={isInitialized ? styles.initButton : styles.initButton}
            style={isInitialized ? styles.initButton : {...styles.initButton, animation: "pulse 1.5s infinite"}}
            onClick={handleInitialTraining}
            disabled={initLoading || isInitialized}
           >
              {initLoading ? "Training in progress..." : isInitialized ? "✔️ Model Initialized" : "Initialize Model"}
        </button>
        <textarea
          style={styles.textarea}
          rows="10"
          placeholder="Paste email or SMS text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div style={styles.buttonSamples}>
        <button style={styles.spamSampleButton} onClick={handleSpamSample} disabled={loading}>
          {"Spam Sample"}
        </button>
        <button style={styles.normalSampleButton} onClick={handleNormalSample} disabled={loading}>
          {"Normal Sample"}
        </button>
        <button style={styles.otpSampleButton} onClick={handleOTPSample} disabled={loading}>
          {"OTP Sample"}
        </button>
        </div>

        <div style={styles.buttonFlex}>
        <button  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={styles.predictButton} onClick={handlePredict} disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
        <button style={styles.clearButton} onClick={clearResults} disabled={loading}>
          {"Clear"}
        </button>
        </div>

        <Collapsible open={false} title="Advanced Settings">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            
            {/* Regularization Strength (C) */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "14px", color: "#374151" }}>Regularization Strength (C):</label>
              <input
                type="number"
                step="0.1"
                value={cParam}
                onChange={(e) => setCParam(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Penalty */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "14px", color: "#374151" }}>Penalty:</label>
              <select
                value={penalty}
                onChange={(e) => setPenalty(e.target.value)}
                style={styles.input}
              >
                <option value="l1">l1</option>
                <option value="l2">l2</option>
              </select>
            </div>

            {/* Solver */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "14px", color: "#374151" }}>Solver:</label>
              <select
                value={solver}
                onChange={(e) => setSolver(e.target.value)}
                style={styles.input}
              >
                <option value="newton-cg">newton-cg</option>
                <option value="lbfgs">lbfgs</option>
                <option value="liblinear">liblinear</option>
                <option value="sag">sag</option>
                <option value="saga">saga</option>
              </select>
            </div>

            {/* Action Button */}
            <button 
              style={{
                marginTop: "8px",
                padding: "8px 16px",
                background: "#059669",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500"
              }}
              onClick={() => handleRetrain()}
            >
                {training ? "Training..." : "Retrain Model"}
            </button>
          </div>
        </Collapsible>

        {!result && <div style={styles.resultSample}>Prediction results appear here.. {result}</div> }
        {/* {result && <div style={styles.result}>Prediction: {result}</div>} */}
        {result && (
          <div style={{
            ...styles.result,
            background: result === "spam" ? "#fee2e2" : "#e8f5e9",
            color: result === "spam" ? "#b71c1c" : "#1b5e20",
          }}>
            Prediction: {result}
          </div>
        )}
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
}



export default App;