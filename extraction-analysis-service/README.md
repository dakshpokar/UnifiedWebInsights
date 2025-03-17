# Website Evaluation Service

A Flask-based microservice for evaluating websites on various metrics including performance, accessibility, SEO, mobile-friendliness, and more. This service analyzes a given URL, stores the evaluation details in MongoDB, and uses RabbitMQ to queue evaluation tasks.

## Features

-   **Website Evaluation:**  
    Evaluates a given website URL for:
    -   Overall site performance
    -   SEO metrics (title, meta descriptions, headings, etc.)
    -   Mobile friendliness (responsive design, viewport, touch elements, font sizes)
    -   Accessibility issues (alt text, language attributes, form labels, etc.)
    -   Additional LLM-based analysis for improvement insights
-   **Data Persistence with MongoDB:**  
    Evaluation results are stored in MongoDB under the `site_evaluator` database. The `evaluations` collection holds records that include:
    -   URL and timestamp
    -   Initial processing status
    -   Results of different analyses (SEO, mobile, performance, accessibility, LLM analysis)
    -   Indicators of processing errors (if any)
-   **Background Analysis:**  
    Once a new evaluation is initiated via the API, a background thread pool is used to perform all analysis tasks concurrently.

-   **RabbitMQ Integration:**  
    RabbitMQ is used to create and publish evaluation messages to a persistent queue (`evaluation_queue`). This allows other consumers or workers to pick up and process tasks if needed. The message contains:
    -   Evaluation ID
    -   URL
    -   Optional user ID

## Getting Started

### Prerequisites

-   Python 3.9+
-   MongoDB
-   RabbitMQ

### Installation

1. **Clone the Repository:**

    ```bash
    git clone <repository-url>
    cd CS568-POC/extraction-analysis-service
    ```

2. **Create and Activate a Virtual Environment:**

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3. **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Create a `.env` File:**

    Create a `.env` file in the root of the project with the following content (adjust values as needed):

    ```dotenv
    SECRET_KEY=your-secret-key
    MONGODB_URI=mongodb://localhost:27017/
    PORT=4100
    FLASK_ENV=development
    MAX_WORKERS=10
    RABBITMQ_HOST=localhost
    EVALUATION_QUEUE=evaluation_queue
    ```

### Running the Application

-   **Locally:**

    To start the application in development mode, run:

    ```bash
    python app.py
    ```

    The service will be available at `http://localhost:4100`.

-   **Using Docker:**

    Build the Docker image:

    ```bash
    docker build -t site-evaluator-flask .
    ```

    Run the Docker container:

    ```bash
    docker run -p 5000:5000 --env-file .env site-evaluator-flask
    ```

## API Endpoints

### Evaluate a Website

```
POST /api/evaluate
```

Request body:

```json
{
	"url": "https://example.com",
	"userId": "optional-user-id"
}
```

Starts an evaluation by inserting an initial record in MongoDB, queuing the task in RabbitMQ, and kicking off background analysis.

### Retrieve Evaluations

-   Get all evaluations (optionally filtered by user):

    ```
    GET /api/evaluations?userId=optional-user-id
    ```

-   Get a specific evaluation by ID:

    ```
    GET /api/evaluations/:id
    ```

### Analysis Endpoints

Endpoints to retrieve the following specific analysis results are available:

-   SEO Analysis: `/api/seo/:evaluation_id`
-   Mobile Analysis: `/api/mobile/:evaluation_id`
-   Performance Analysis: `/api/performance/:evaluation_id`
-   Accessibility Analysis: `/api/accessibility/:evaluation_id`
-   LLM-based Suggestions: `/api/llm-improvements/:evaluation_id`
-   Full Report combining all analyses: `/api/full-report/:evaluation_id`

## How It Works

1. **Initial Request:**  
   When a client posts to `/api/evaluate`, an initial evaluation record is created in MongoDB with a status of "processing". An evaluation message is also published to RabbitMQ.

2. **Background Processing:**  
   A background thread pool is used to run multiple analysis tasks concurrently. These tasks call respective service functions:

    - **SiteService:** Fetches HTML content and takes a screenshot.
    - **SeoService, MobileService, PerformanceService, AccessibilityService:** Perform analysis on the HTML content.
    - **LLMService:** Provides additional improvement suggestions (currently a placeholder).

3. **Data Storage in MongoDB:**  
   After all analyses are completed, the evaluation record is updated with:

    - Analysis results for each category
    - Timestamps and status indicators
    - Any error messages encountered during processing

4. **Message Queue (RabbitMQ):**  
   The `publish_evaluation` function sends messages to RabbitMQ which can later be consumed by other services. This allows the system to scale and handle heavy loads or offload processing to dedicated workers if required.

## Environment Configuration (.env)

Make sure you create a `.env` file in the project root with the following configurations:

```dotenv
SECRET_KEY=your-secret-key
MONGODB_URI=mongodb://localhost:27017/
PORT=4100
FLASK_ENV=development
MAX_WORKERS=10
RABBITMQ_HOST=localhost
EVALUATION_QUEUE=evaluation_queue
```

Adjust the values as needed for your local or production environment.

## License

[Specify license details here]
