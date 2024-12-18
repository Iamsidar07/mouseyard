import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return new Response("No file found", { status: 400 });
  }
  const chatData = await file.text();
  try {
    const result = await generateText({
      model: google("gemini-1.5-flash"),
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for analyzing WhatsApp chats. You are an expert assistant trained in text analysis and content organization. Your role is to analyze large pieces of text (such as WhatsApp chat logs) and provide a comprehensive and well-structured breakdown of insights. Follow these instructions closely:
** Do not add tilte and description **
** All your links should be in markdown format **
** Do not add any Note like this Note: This link is a placeholder and should be replaced with the actual link if available **
** If the link is not available, do not add it **

1. **Smart Content Categorization**:
   - Organize the chat content into meaningful categories like "Productivity," "Learning Resources," "Motivational Reflections," and "Technical Discussions."
   - Highlight the context of messages and group similar ideas.

2. **Theme Detection**:
   - Detect overarching themes in the content, such as recurring topics or focus areas (e.g., "Time Management," "Product Design," or "Building in Public").
   - Ensure themes are concise and clearly defined.

3. **Pattern Recognition**:
   - Identify recurring behaviors, habits, or messages (e.g., frequent sharing of links, repeated phrases, or a focus on user needs).
   - Highlight trends in timestamps or patterns in user activity (e.g., "Most active during evenings").

4. **Content Relationship Mapping**:
   - Analyze how different pieces of content relate to one another (e.g., "This link relates to a design discussion," "These journal entries are linked to a productivity theme").
   - Map relationships between categories and identify overlaps.

5. **Output Requirements**:
   - Use a structured format with sections like "Themes," "Patterns," "Links and Resources," and "Content Relationships."
   - Include examples and actionable insights for each section.
   - Provide a high-level summary of the overall focus of the chat.

6. **Tone**:
   - Be concise, specific, and avoid generic observations.
    `,
        },
        {
          role: "user",
          content: `Analyze the following WhatsApp chat log and provide a structured breakdown of the key insights in markdown format. Specifically, identify:

1. **Key Themes**: Extract the primary topics discussed, focusing on specific and actionable categories like "Productivity Tips," "Learning Resources," "Motivational Quotes," etc.

2. **Patterns and Recurring Ideas**:
   - Identify recurring themes or messages (e.g., "simplicity in design," "focus on user needs").
   - Highlight common keywords, phrases, or ideas that appear multiple times.

3. **Links and Resources**:
   - Extract all URLs shared in the chat.
   - For each URL, provide a brief description or categorize it (e.g., "Productivity Tool," "Design Resource").
   - **If no actual URL is present, leave the section blank or exclude it entirely. Do not fabricate or add placeholder links under any circumstances.**

4. **Quotes or Reflections**:
   - Highlight inspirational quotes or personal reflections shared by the user.
   - Categorize these into "Motivation," "Mindset," or similar groups.

5. **User Behavior Patterns**:
   - Comment on any recurring habits or behaviors (e.g., journaling, frequent sharing of resources).
   - Note any trends in the timestamps (e.g., most active times, regular weekend reflections).

6. **Summary**:
   - Provide a brief summary of the overall tone and focus of the chat log (e.g., "The chat shows a clear focus on personal and professional development with an emphasis on...").

Chat Log: ${chatData}`,
        },
      ],
    });
    console.log("result", result.text);
    return NextResponse.json({ result: result.text });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ message: "Error processing file." });
  }
};
