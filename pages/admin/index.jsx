import React, { useEffect, useState, useContext } from "react";
import Layout from "@components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { ContextAPI } from "@utils/context";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BRAND, ADD_CATEGORY, ADD_PRODUCT } from "@graphql/mutations";
import { CATEGORIES, BRANDS } from "@graphql/queries";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import NextLink from "next/link";
import toast from "react-hot-toast";
const Admin = () => {
  // queries
  const { loading: catQueryLoading } = useQuery(CATEGORIES, {
    onCompleted: (data) => {
      setCategories(data.categories);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { loading: brandQueryLoading } = useQuery(BRANDS, {
    onCompleted: (data) => {
      setBrands(data.brands);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // mutations
  const [addProduct, { loading }] = useMutation(ADD_PRODUCT, {
    onCompleted: () => {
      toast.success("Product Added!");
      setValue("name", "");
      setTimeout(function () {
        window.location.reload();
      }, timeout);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [addCategory, { loading: catLoading }] = useMutation(ADD_CATEGORY, {
    onCompleted: (data) => {
      toast.success("Category Added!");
      setCatValue("name", "");
      setTimeout(function () {
        window.location.reload();
      }, timeout);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [addBrand, { loading: brandLoading }] = useMutation(ADD_BRAND, {
    onCompleted: () => {
      toast.success("Brand Added!");
      setBrandValue("name", "");
      setTimeout(function () {
        window.location.reload();
      }, timeout);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // contexts
  const { timeout } = useContext(ContextAPI);
  // states
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [feature, setFeature] = useState(false);
  const [featureImage, setFeatureImage] = useState([]);

  const router = useRouter();
  useEffect(() => {
    let user = null;
    const data = Cookies.get("user");
    data !== undefined ? (user = JSON.parse(data)) : (user = null);
    user === null
      ? router.push("/authentication?redirect=/admin")
      : !user.token &&
        !user.role === "admin" &&
        router.push("/authentication?redirect=/admin");
  }, []);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const {
    handleSubmit: categorySubmit,
    control: categoryControl,
    formState: { errors: categoryErrors },
    setValue: setCatValue,
  } = useForm();
  const {
    handleSubmit: brandSubmit,
    control: brandControl,
    formState: { errors: brandErrors },
    setValue: setBrandValue,
  } = useForm();
  const handleProductName = (e) => {
    setValue(`name`, e.target.value);
    const theName = e.target.value.replace(/\s+/g, "-");
    setSlug(theName.toLowerCase());
  };
  //functions to handle file selection
  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setImage(fileArray);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleFeature = (e) => {
    // toast.success(`${e.target.checked}`);
    setValue(`feature`, e.target.checked);
    setFeature(e.target.checked);
  };
  const saveTheProduct = async (data, featureData) => {
    // upload the feature image
    const formData = new FormData();
    formData.append(`file`, image[0]);
    formData.append("upload_preset", "la-shop");
    const { data: upload } = await axios.post(
      `${process.env.CLOUDINARY_UPLOAD}`,
      formData,
    );
    if (upload) {
      addProduct({
        variables: {
          name: data.name,
          slug: slug,
          image: upload.secure_url,
          imageID: upload.public_id,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          description: data.description,
          brand: data.brand,
          category: data.category,
          feature: feature,
          featureImage: feature ? featureData.secure_url : "",
          featureImageID: feature ? featureData.public_id : "",
        },
      });
    }
  };
  const addProduct_ = async (data) => {
    // check if feature is checked
    if (feature) {
      // check for the feature image
      if (featureImage.length <= 0) {
        return toast.error(`*Feature Image not uploaded`);
      }
      try {
        // upload the feature image
        const formData = new FormData();
        formData.append(`file`, featureImage[0]);
        formData.append("upload_preset", "la-shop");
        const { data: upload } = await axios.post(
          `${process.env.CLOUDINARY_UPLOAD}`,
          formData,
        );
        // check if upload is complete
        if (upload) {
          saveTheProduct(data, upload);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      saveTheProduct(data);
    }
    // addProduct({
    //   variables: { slug: slug, name: name },
    // });
  };
  const addBrand_ = ({ name }) => {
    addBrand({
      variables: { name: name },
    });
  };
  const addCategory_ = ({ name }) => {
    addCategory({ variables: { name: name } });
  };
  return (
    <Layout title="Admin">
      <main className="admin__container">
        <section className="admin__section">
          <div>
            <List>
              <NextLink href="/admin" passHref>
                <ListItem button component="a" selected>
                  <ListItemText primary="Manage Products" />
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem button component="a">
                  <ListItemText primary="View Orders" />
                </ListItem>
              </NextLink>
            </List>
          </div>
          <div className="product__area">
            <Typography>View Products</Typography>
            <Typography>Add Product</Typography>
            <form onSubmit={handleSubmit(addProduct_)}>
              <div className="photo__section">
                <div className={`photo__container`}>
                  <img src={selectedImage} alt="image icon" />
                </div>
                <div style={{ margin: "auto" }}>
                  <IconButton component="label">
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileSelect}
                    />
                    <MdOutlinePhotoCameraBack />
                  </IconButton>
                </div>
              </div>
              <p className="slug">product slug: {slug}</p>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    id="name"
                    label="Product name"
                    fullWidth
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name?.type === "required"
                        ? "Product name is required"
                        : "e.g: Nike Air Jordan, Nike Airmax etc..."
                    }
                    {...field}
                    onChange={handleProductName}
                  />
                )}
              />
              <Controller
                name="brand"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    select
                    id="brand"
                    label="Brand"
                    fullWidth
                    error={Boolean(errors.brand)}
                    helperText={
                      errors.brand
                        ? "Brand is required"
                        : "e.g. Nike, Puma etc..."
                    }
                    inputProps={{
                      inputRef: (ref) => {
                        if (!ref) return;
                        register(`brand`, { value: "" || ref._id });
                      },
                    }}
                    {...field}
                  >
                    <MenuItem disabled value="">
                      <em>-- select brand --</em>
                    </MenuItem>
                    {brands.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <Controller
                name="category"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    select
                    id="category"
                    label="Category"
                    fullWidth
                    error={Boolean(errors.category)}
                    helperText={
                      errors.category
                        ? "Category is required"
                        : "e.g. Shoes, Tops etc..."
                    }
                    inputProps={{
                      inputRef: (ref) => {
                        if (!ref) return;
                        register(`category`, { value: "" || ref._id });
                      },
                    }}
                    {...field}
                  >
                    <MenuItem disabled value="">
                      <em>-- select category --</em>
                    </MenuItem>
                    {categories.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    id="description"
                    label="Product Description"
                    multiline
                    minRows={5}
                    fullWidth
                    error={Boolean(errors.description)}
                    helperText={
                      errors.description
                        ? "Product description is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    id="price"
                    label="Product Price"
                    fullWidth
                    type={`number`}
                    error={Boolean(errors.price)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R</InputAdornment>
                      ),
                    }}
                    helperText={errors.price ? "Product price is required" : ""}
                    {...field}
                  />
                )}
              />
              <Controller
                name="stock"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    id="stock"
                    label="Product Stock"
                    fullWidth
                    type={`number`}
                    error={Boolean(errors.stock)}
                    helperText={errors.stock ? "Product stock is required" : ""}
                    {...field}
                  />
                )}
              />
              <FormControlLabel
                // value='end'
                control={
                  <Controller
                    name="feature"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        color="primary"
                        onChange={handleFeature}
                      />
                    )}
                  />
                }
                label="Feature ?"
                labelPlacement="end"
              />
              {feature ? (
                <section className={`photo__section`}>
                  <div className={`photo__container`}>
                    <img src={selectedImage} alt="image icon" />
                  </div>
                  <div style={{ margin: "auto" }}>
                    <IconButton component="label">
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileSelect}
                      />
                      <MdOutlinePhotoCameraBack />
                    </IconButton>
                  </div>
                </section>
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
              >
                Add Product
              </Button>
            </form>
          </div>
          <div className="category__area">
            <Typography> Add Category</Typography>
            <form onSubmit={categorySubmit(addCategory_)}>
              <Controller
                name="name"
                control={categoryControl}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    id="name"
                    label="Category"
                    fullWidth
                    error={Boolean(categoryErrors.name)}
                    helperText={
                      categoryErrors.name?.type === "required"
                        ? "Category is required"
                        : "e.g: Shoes, Tops etc..."
                    }
                    {...field}
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={catLoading}
              >
                Add Category
              </Button>
            </form>
            <Typography> Add Brand</Typography>
            <form onSubmit={brandSubmit(addBrand_)}>
              <Controller
                name="name"
                control={brandControl}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    id="name"
                    label="Brand"
                    fullWidth
                    error={Boolean(brandErrors.name)}
                    helperText={
                      brandErrors.name?.type === "required"
                        ? "Brand is required"
                        : "e.g: Nike, Puma etc..."
                    }
                    {...field}
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={brandLoading}
              >
                Add Brand
              </Button>
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Admin;
