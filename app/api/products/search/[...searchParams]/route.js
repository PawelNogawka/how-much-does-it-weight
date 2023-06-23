
import { connectToDB } from "@/utils/utils";
import Product from "@/models/product";




export const GET = async (request, { params }) => {
  const { searchParams } = params;
  const [category = '', search = ''] = searchParams;


  try {
    await connectToDB();

    let products = [];

    if (category=="all" && !search) {

      products = await Product.find();
    } else if (category && !search) {

      products = await Product.find({ category });
    } else if (category=="all" && search) {

      products = await Product.find({ title: { $regex: search, $options: 'i' } });
    } else if (category && search) {

      products = await Product.find({
        category,
        title: { $regex: search, $options: 'i' }
      });
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch products", { status: 500 });
  }
};
