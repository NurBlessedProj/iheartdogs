import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/utils/dbConnect";
import PetsRussel from "@/models/PetsRussek";

// GET method
export const GET = async () => {
  try {
    await dbConnect();
    const pets = await PetsRussel.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    return new NextResponse(JSON.stringify(pets), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// POST method
export const POST = async (req) => {
  const { breed, status, sex, age, description, name, price, image } =
    await req.json();
  cloudinary.config({
    cloud_name: "dwoaukreo",
    api_key: "378833648339572",
    api_secret: "11daIfpiOnJEsAUeCIKzKShVzSw",
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(image, {
      public_id: name,
    });

    await dbConnect();
    const newPost = new PetsRussel({
      breed,
      status,
      sex,
      age,
      description,
      name,
      price,
      image: uploadResult.secure_url,
    });

    await newPost.save();
    return new NextResponse(JSON.stringify(newPost), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// PUT method
export const PUT = async (req) => {
  const { id, ...updateData } = await req.json();
  try {
    await dbConnect();
    const updatedPost = await PetsRussel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// DELETE method
export const DELETE = async (req) => {
  const { id } = await req.json();
  try {
    await dbConnect();
    await PetsRussel.findByIdAndDelete(id);
    return new NextResponse("Post deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
