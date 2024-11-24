import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Loading from "../common/loading";
import MainNavbar from "./navbar";
import ResponsiveFooter from "./footer";

const UserProfile = () => {
  const [user, setUser] = useState({
    userId: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    image: { public_id: "", url: "" },
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/current-user",
        { withCredentials: true }
      );

      const userData = data.user || {
        userId: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: "",
        image: { public_id: "", url: "" },
      };

      setUser(userData);
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUser({
          ...user,
          image: { ...user.image, url: reader.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("username", values.username || "");
      formData.append("firstname", values.firstname || "");
      formData.append("lastname", values.lastname || "");
      formData.append("address", values.address || "");
      formData.append("phone", values.phone || "");

      if (imageFile) {
        formData.append("upload_profile", imageFile);
      }

      const { data } = await axios.put(
        "http://localhost:5000/api/auth/update",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Profile updated successfully!");
      setUser(data.user);
    } catch (error) {
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Formik initial values
  const initialValues = {
    username: user.username || "",
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    address: user.address || "",
    phone: user.phone || "",
  };

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^\d+$/, "Phone must be numeric")
      .min(10, "Phone must be at least 10 digits"),
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "transparent",
      }}
    >
      <MainNavbar />
      <Loading loading={loading} />

      <Box
        sx={{
          width: { lg: "80%", md: "90%", xs: "96%" },
          mx: "auto",
          display: "flex",
          gap: 4,
          py: { lg: 8, md: 6, sm: 8, xs: 6 },
          flexGrow: 1,
          mt: 5,
        }}
      >
        <Box
          sx={{
            width: { lg: "88%", md: "80%", sm: "88%", xs: "100%" },
            mx: "auto",
            boxShadow: 3,
            p: 4,
            borderRadius: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "white",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { lg: "2rem", md: "1.75rem", sm: "1.5rem", xs: "1.5rem" },
              fontWeight: "bold",
              fontFamily: "serif",
              mb: 2,
              color: (theme) =>
                theme.palette.mode === "dark" ? "white" : "black",
            }}
          >
            Profile
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
                {/* Profile Image */}
                <Box
                  sx={{
                    width: 250, 
                    height: 250,
                    borderRadius: "50%",
                    backgroundImage: `url(${user.image?.url || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    position: "relative",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <input
                    type="file"
                    id="upload_profile"
                    hidden
                    onChange={handleImageChange}
                  />
                  <label htmlFor="upload_profile">
                    <Box
                      sx={{
                        backgroundColor: "white",
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        />
                      </svg>
                    </Box>
                  </label>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", mt: 1, fontWeight: "bold" }}
                >
                  Upload Profile Image
                </Typography>

                {/* Form Fields */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Username"
                    name="username"
                    error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    onChange={handleChange}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    name="email"
                    disabled
                    value={user.email}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="First Name"
                    name="firstname"
                    error={touched.firstname && !!errors.firstname}
                    helperText={touched.firstname && errors.firstname}
                    onChange={handleChange}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    error={touched.lastname && !!errors.lastname}
                    helperText={touched.lastname && errors.lastname}
                    onChange={handleChange}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Address"
                    name="address"
                    error={touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    onChange={handleChange}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    label="Phone"
                    name="phone"
                    error={touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    onChange={handleChange}
                  />
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ mt: 4, backgroundColor: "black", color: "white" }}
                >
                  Save Changes
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <ResponsiveFooter />
    </Box>
  );
};

export default UserProfile;
