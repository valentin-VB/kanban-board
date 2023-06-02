import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { signUpScheme } from "../../services/validationShemes";
import { Alert, Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { signUp } from "@/services/api";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { setUser } from "@/redux/authSlice";
import { useRouter } from "next/router";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<yup.ObjectSchema>(signUpScheme),
  });
  const dispatch = useDispatch();

  const handleSignUpSubmit = async (data: FieldValues) => {
    console.log("data:", data);
    const { email, password, confirm_password } = data;
    if (password !== confirm_password) {
      return setError("Passwords do not match");
    }
    try {
      const response = await signUp(email, password);
      if (await response.user.getIdToken()) router.push("/board");
      dispatch(setUser(response));
      setError("");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error("signUpErr", err?.message);
        setError(err?.message);
      } else {
        setError("Unknown Error occurred. Please reload the page");
      }
    }
    // const newUserData = {
    //   name: `${data.firstName} ${data.lastName}`,
    //   email: data.email,
    //   password: data.password,
    // };
    // try {
    //   const response = await registerUser(newUserData);
    //   switch (response.error?.status) {
    //     case 400:
    //       toast.error("Account with this email address already exists");
    //       break;
    //     case 500:
    //       toast.error("Server Error");
    //       break;
    //     default:
    //       dispatch(setCredentials(response.data));
    //   }
    // } catch (e) {
    //   console.warn("Error", e);
    // }
    reset();
  };

  return (
    <Card>
      <Card.Body>
        <h1 className="text-center mb-4">Sign Up</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form
          onSubmit={handleSubmit((data) => {
            handleSignUpSubmit(data);
          })}
        >
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
              autoComplete="email"
            />
          </Form.Group>
          {errors?.email && (
            <Alert variant="danger">{errors.email.message}</Alert>
          )}
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
          </Form.Group>
          {errors?.password && (
            <Alert variant="danger">{errors.password.message}</Alert>
          )}
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...register("confirm_password")}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 mb-2 w-100">
            Register
          </Button>
        </Form>
        <Link href="/login">
          <p className="text-center">Already have an account? Sign in</p>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default SignUpForm;
