import Product from "../models/Product";

export const createProduct = async (req, res) => {
  try {
    const { name, category, price, imgURL } = req.body;

    const newProduct = new Product({ attributes: { name, category, price, imgURL } });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProducts = async (req, res) => {

  let myUrl = new URL(req.connection.encrypted ? 'https' : 'http' + '://' + req.headers.host + req.url);

  const products = await Product.find();
  // const products = await Product.find({},{"_id": 0});

  console.log(myUrl.href);

  res.json(products);

};

export const getProductsByPage = async (req, res) => {
  
  try {
    const page = parseInt(req.params.page);
    const size = parseInt(req.params.size);
  
    if (page === 0 || size === 0) {
      return res.statis(401).json({ "messagge": "No se admite valores igual a cero" });
    }
  
    //Numero total de registros
    const total = await Product.find().count(); 
    
    const ini = (page - 1) * size;
  
    const products = await Product.find().skip(ini).limit(size);
  
    res.json({data: products});  
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
};

export const deleteProductById = async (req, res) => {
    try {
      const { productId } = req.params;
      await Product.findByIdAndDelete(productId);
      res.status(204).json();
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
};
