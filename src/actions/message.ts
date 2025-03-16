"use server";
import { createMessage } from "@/services/message";

export async function createMessageAction({
  name,
  email,
  message,
  company,
}: {
  name: string;
  email: string;
  message: string;
  company?: string;
}) {
  if (!name) return "Name is required";
  if (!email) return "Email is required";
  if (!message) return "Message is required";

  try {
    const newMessage = await createMessage({
      name,
      email,
      message,
      company,
    });

    return newMessage;
  } catch (error) {
    console.error(error);
    return "An error occurred while processing your request";
  }
}
