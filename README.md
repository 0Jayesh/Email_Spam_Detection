# Interactive MLOps Email Spam Classifier

An end-to-end MLOps project for email spam classification — covering model training, hyperparameter tuning, experiment tracking, and a full-stack deployment with a live, interactive dashboard for remote model reconfiguration.

**Live Demo:** [Render Deployment](https://email-spam-detection-1-mqjm.onrender.com/)

## What it does

Classifies emails as spam or not spam using a Logistic Regression model trained on TF-IDF features with N-gram support. Beyond the model itself, this project demonstrates a full MLOps loop — experiment tracking, hyperparameter tuning, model serialization, and a React dashboard that lets you reconfigure and retrain the model live, without touching code.

## Architecture

```
Text Input
    ↓
Preprocessing (lowercase, regex cleanup, stopword removal, lemmatization via NLTK)
    ↓
TF-IDF Vectorization (N-grams: 1,2)
    ↓
Logistic Regression Classifier
    ↓
Flask REST API (/train, /get_params, /evaluate)
    ↓
React (Vite) Dashboard ←→ Live hyperparameter reconfiguration (C, Solver, Penalty)
    ↓
Docker container → Deployed on Render
```

## Tech Stack

- **scikit-learn** — Logistic Regression, TF-IDF vectorization, N-grams
- **GridSearchCV** — hyperparameter optimization
- **MLflow** — experiment tracking and metrics logging
- **Joblib** — model serialization
- **Flask** — REST API backend
- **React (Vite)** — interactive frontend dashboard
- **Docker** — containerized deployment
- **Render** — hosting

## Key Features

- **Model Engineering:** Logistic Regression classifier trained on TF-IDF features. A baseline model (unigrams, fixed parameters) achieves 96.99% accuracy; a GridSearchCV-tuned model (5-fold cross-validation, unigrams + bigrams, tuned feature count and regularization strength) improves this to **98.13% accuracy**, with experiments tracked in MLflow.
- **MLOps Integration:** Flask REST API with three endpoints — `/train` (retrain with custom hyperparameters), `/get_params` (retrieve last-used parameters), and `/evaluate` (classify new text). Includes validation logic to reject scikit-learn-incompatible solver/penalty combinations before training. Models are serialized with Joblib for persistence.
- **Interactive ML Dashboard:** React (Vite) interface that lets users remotely reconfigure hyperparameters (C, Solver, Penalty) via the `/train` endpoint and trigger re-training sessions with immediate performance feedback — no code changes required.
- **Production Deployment:** Fully containerized with Docker for consistent dependency management, deployed on Render.

## Run Locally

```bash
git clone https://github.com/0Jayesh/Email_Spam_Detection
cd Email_Spam_Detection
pip install -r requirements.txt

# Run the Flask backend
python app.py
```

```bash
# In a separate terminal, run the frontend
cd frontend
npm install
npm run dev
```

## Project Structure

```
├── model/              # Trained model artifacts
├── frontend/           # React (Vite) dashboard
├── static_web/         # Static frontend assets
├── app.py              # Flask REST API
├── ModelBasic.ipynb    # Baseline model training notebook
├── HyperparameterTuning.ipynb  # GridSearchCV + MLflow experiments
├── spam_data.csv       # Training dataset
├── requirements.txt
└── Dockerfile
```

## Results

| Model | Vectorization | Accuracy | Precision |
|---|---|---|---|
| Baseline (fixed params) | TF-IDF, unigrams, 5000 features | 96.99% | 99.32% |
| GridSearchCV-tuned | TF-IDF, unigrams + bigrams, tuned features | 98.13% | 98.20% |

Best hyperparameters found via GridSearchCV (5-fold CV, optimized for F1): `C=5.0`, `max_features=7000`.

## Future Improvements

- Add precision/recall/F1 breakdown alongside accuracy for class-imbalance awareness
- Support additional classifiers (SVM, Naive Bayes) for comparison via the dashboard
- Add automated CI/CD pipeline for model retraining and redeployment
