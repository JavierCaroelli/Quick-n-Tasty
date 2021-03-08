import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FireBaseContext } from "../../firebase";
import { useHistory } from "react-router-dom";

function NewDish() {
  // Context with firebase actions
  const { firebase } = useContext(FireBaseContext);
  // console.log(firebase);

  // Redirect Hook
  // const navigate = useNavigate(); not available in this version
  const history = useHistory();
  function goBack() {
    history.push("/menu");
  }

  // Validate & read form's data
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Dishes should have at least 2 characters")
        .required("Name is Required"),
      price: Yup.number().min(1, "Price need to be bigger than 1").required("Price is Required"),
      category: Yup.string().required("Category is Required"),
      description: Yup.string()
        .min(10, "Description is too short")
        .required("Description is Required"),
    }),
    onSubmit: (data) => {
      try {
        const imgName = image.name;
        data.image = imgName;
        data.imgURL = url;
        data.exist = true;
        firebase.db.collection("products").add(data);

        // Redirect
        goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [uploaded, setUploaded] = useState(0);

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    // console.log(e.target.files[0]);
    try {
      const uploadTask = firebase.storage
        .ref(`images/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploaded(progress);
        },
        (error) => console.log(error),
        () => {
          firebase.storage
            .ref("images")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then((url) => setUrl(url));
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Add a new Dish</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name :
              </label>
              <input
                className="bg-gray-50  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:bg-white focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name of Dish"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Hubo un Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price :
              </label>
              <input
                className="bg-gray-50  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:bg-white focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="$20"
                min="0"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Hubo un Error</p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category :
              </label>
              <select
                className="bg-gray-50  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:bg-white focus:outline-none focus:shadow-outline"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">-- Select --</option>
                <option value="breakfast"> Breakfast </option>
                <option value="launch"> Launch </option>
                <option value="salad"> Salad </option>
                <option value="dinner"> Dinner </option>
                <option value="drink"> Drink </option>
                <option value="dessert"> Dessert </option>
              </select>
            </div>
            {formik.touched.category && formik.errors.category ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Hubo un Error</p>
                <p>{formik.errors.category}</p>
              </div>
            ) : null}

            {/* -- -- -- -- -- -- Image -- -- -- -- -- -- */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Image :
              </label>
              <input type="file" onChange={handleChange} id="image" />
            </div>
            {uploaded !== 0 && uploaded === 100 && (
              <div>
                <p className="bg-green-500 text-white p-3 text-center my-5">
                  The photo uploaded successfully
                </p>
              </div>
            )}
            {uploaded !== 0 && uploaded !== 100 && (
              <div>
                <p className="bg-red-500 text-white p-3 text-center my-5">
                  The photo upload has failed
                </p>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description :
              </label>
              <textarea
                className="bg-gray-50  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:bg-white focus:outline-none focus:shadow-outline h-40"
                id="description"
                placeholder="Description..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Hubo un Error</p>
                <p>{formik.errors.description}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="rounded-md bg-gray-800 hover:bg-gray-900 w-full mt-5 text-white font-bold"
              value="add dish"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewDish;
