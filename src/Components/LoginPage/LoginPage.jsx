import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

const LoginPage = () => {

  let navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      pass: "",
    },
    onSubmit: (values) => {
      console.log("Form Values:", values);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Maximum is 15 characters")
        .required("Name is required"),
      pass: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[A-Za-z]).{8,}$/,
          "Password must be at least 8 characters long and contain at least one alphabetic character"
        ),
    }),
  });

  return (
    <>
      <div className="w-[100%] min-h-screen bg-slate-400 flex justify-center items-center">
        <div className="w-[95%] sm:w-[50%] bg-slate-500/40 shadow-md flex flex-col justify-center items-center p-14 mx-auto">
          <p className="text-3xl text-black text-center font-bold mb-0">
            Signin
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex justify-center items-center"
          >
            <div className="flex flex-col w-[100%]">
              <div className="mb-6 flex flex-col w-[100%]">
                <label htmlFor="name" className="font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className=" bg-white/70 focus:bg-white px-1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-800 font-semibold">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <label htmlFor="pass" className="font-semibold">
                Pass
              </label>
              <input
                type="password"
                id="pass"
                name="pass"
                className="bg-white/70 focus:bg-white px-1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pass}
              />
              {formik.touched.pass && formik.errors.pass && (
                <div className="text-red-800 font-semibold">
                  {formik.errors.pass}
                </div>
              )}

              <button
                type="submit"
                className={`mt-4 p-2 bg-blue-500 text-white disabled:bg-slate-500`}
                disabled={Object.keys(formik.errors).length > 0}
                onClick={() => navigate('/home')}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
