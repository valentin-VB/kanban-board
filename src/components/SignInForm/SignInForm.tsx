import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { signUpScheme } from "../../services/validationShemes";
import { Alert, Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { logIn } from "@/services/api";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { setUser } from "@/redux/authSlice";
import { useRouter } from "next/router";

function SignInForm() {
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
    const { email, password } = data;

    try {
      const response = await logIn(email, password);
      dispatch(setUser(response));
      if (await response.user.getIdToken()) router.push("/board");
      setError("");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error("signUpErr", err?.message);
        return setError(err?.message);
      } else {
        return setError("Unknown Error occurred. Please reload the page");
      }
    }
    reset();
  };

  return (
    <Card>
      <Card.Body>
        <h1 className="text-center mb-4">Sign In</h1>
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
              autoComplete="current-password"
              {...register("password")}
            />
          </Form.Group>
          {errors?.password && (
            <Alert variant="danger">{errors.password.message}</Alert>
          )}

          <Button variant="primary" type="submit" className="mt-3 mb-2 w-100">
            Sign In
          </Button>
        </Form>
        <Link href="/register">
          <p className="text-center">Don't have an account? Sign Up</p>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default SignInForm;
