# **WhatsApp Chat Analyzer**

## **Overview**
This is a web application that analyzes WhatsApp chat logs to provide structured insights. The app uses AI to detect themes, recognize patterns, and map relationships between content categories. It is designed to help users better understand the key themes, behaviors, and insights from their chat logs.

---

## **Features**
- **Smart Content Categorization**: Automatically organizes content into actionable categories like "Productivity," "Learning Resources," etc.
- **Theme Detection**: Identifies overarching themes such as "Motivational Reflections" or "Design Discussions."
- **Pattern Recognition**: Detects recurring habits, timestamps, and keywords.
- **Content Relationship Mapping**: Highlights relationships between shared links, reflections, and other categorized content.

---

## **Setup Instructions**

### **Prerequisites**
- Node.js (v16+)
- NPM
- Google API Key

### **Installation**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/iamsidar07/mouseyard.git
   cd mouseyard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Access the App**
   Open your browser and navigate to `http://localhost:3000`.

---

## **Usage Instructions**
1. Upload a `.txt` file exported from WhatsApp chats using the file upload form.
2. Wait for the app to process and analyze the chat log.
3. View insights categorized into themes, recurring patterns, links, and content relationships.

---

## **Explanation of Approach**

### **Frontend**
- **File Upload**: Users upload WhatsApp `.txt` files through a simple form.
- **Visualization**: The analyzed data is displayed in structured sections (Themes, Links, Patterns, Relationships).

### **Backend**
- **File Handling**: The file is sent to the backend using `FormData` and parsed.
- **Analysis**: AI processes the chat log to extract themes, patterns, and relationships. 

### **AI Integration**
- The Google Generative AI API analyzes the chat content for:
  - Theme detection (e.g., Productivity, Motivation).
  - Pattern recognition (recurring phrases, active times).
  - Relationship mapping (e.g., links associated with themes).


### **Output**
The insights are presented in a user-friendly format, including charts, grouped categories, and detailed sections.

---

## **Technologies Used**
- **Next.js**: For the frontend and backend.
- **Google Generative AI API**: For AI-based text analysis.
- **Tailwind CSS**: For styling the UI.
- **AI SDK**: For working with the Google Generative AI API.
---
