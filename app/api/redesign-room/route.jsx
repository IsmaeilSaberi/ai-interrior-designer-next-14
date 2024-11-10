import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req) {
  const { imageUrl, interiorType, designType, additionalRequirements } =
    await req.json();

  // Convert Image to AI Image
  try {
    const input = {
      image: imageUrl,
      prompt:
        "A " +
        interiorType +
        " with a " +
        designType +
        " style interior " +
        additionalRequirements,
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );
    console.log(output);
    return NextResponse.json({ result: output });

    // Convert Output to BASE64 Image
    // Save BBase64 to liara
    // Save All to Database
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
