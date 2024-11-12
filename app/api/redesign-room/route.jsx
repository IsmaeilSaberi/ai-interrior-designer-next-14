import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { configDotenv } from "dotenv";
import Replicate from "replicate";
import axios from "axios";

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

    // const output = await replicate.run(
    //   "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
    //   { input }
    // );
    // console.log(output);
    // return NextResponse.json({ result: output });

    const output =
      "https://replicate.delivery/pbxt/0dRWbeMDUj0NQKfNswzdScmQOuSPeHOB7RLL125c0hPKHffdC/out.png";

    // Convert Output to BASE64 Image
    const base64ImageUrl = await ConvertImageToBase64(output);
    const fileName = Date.now() + ".png";
    console.log(fileName);
    // Save Base64 to liara
    // a function for uploading file or image to liara
    const client = new S3Client({
      region: "default",
      endpoint: process.env.LIARA_ENDPOINT,
      credentials: {
        accessKeyId: process.env.LIARA_ACCESS_KEY,
        secretAccessKey: process.env.LIARA_SECRET_KEY,
      },
    });

    const uploadparams = {
      Body: base64ImageUrl,
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: fileName,
    };

    // async/await
    try {
      await client.send(new PutObjectCommand(uploadparams));
    } catch (error) {
      console.log(error);
    }

    // callback
    client.send(new PutObjectCommand(params), (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    });

    // getting download url from liara

    const downloadparams = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: fileName,
    };
    // async/await
    try {
      const data = await client.send(new GetObjectCommand(downloadparams));
      console.log(data.Body.toString());
    } catch (error) {
      console.log(error);
    }

    // callback
    client.send(new GetObjectCommand(downloadparams), (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data.Body.toString());
      }
    });
    return NextResponse.json({ result: data.Body.toString() });
    // Save All to Database
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

// a function to convert image to base64
async function ConvertImageToBase64(imageUrl) {
  try {
    const resp = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0", // Mimics a browser
        Referer: imageUrl, // Often required by image servers
        Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
      },
    });
    const base64ImageRaw = Buffer.from(resp.data).toString("base64");
    console.log("resp");

    return "data:image/png;base64," + base64ImageRaw;
  } catch (error) {
    // Log full error details
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    throw error;
  }
}
