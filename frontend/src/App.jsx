import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#F3F4F6",
      padding: "24px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },
    card: {
      width: "100%",
      maxWidth: "700px",
      background: "#fff",
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
    if (!text.trim()) {
      setError("Please enter email or message text.");
      setResult("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult("");

      const response = await fetch("http://127.0.0.1:5000/evaluate", {
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

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Spam Detection UI</h1>
        <p style={styles.subtitle}>Enter a message and check whether it is spam.</p>

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

        {!result && <div style={styles.resultSample}>Prediction results appear here.. {result}</div> }
        {result && <div style={styles.result}>Prediction: {result}</div>}
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
}



export default App;