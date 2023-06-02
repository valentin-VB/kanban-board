import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectRepoInfo } from "@/redux/selectors";

function SearchBar({ onSubmit }: { onSubmit: (arg: string) => void }) {
  const repoInfo = useSelector(selectRepoInfo);
  const { register, handleSubmit, reset } = useForm<{ url: string }>({
    defaultValues: {
      url: repoInfo ? repoInfo.url : "",
    },
  });

  const handleFormSubmit: SubmitHandler<{ url: string }> = (data) => {
    onSubmit(data?.url.trim());
    reset();
  };

  return (
    <Form
      className="d-flex align-items-start gap-10px"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Form.Control
        required
        type="url"
        pattern="https://.*"
        placeholder="Enter repo URL"
        {...register("url")}
      />
      <Button variant="outline-info" type="submit" className="submit-btn">
        Load Issues
      </Button>
    </Form>
  );
}

export default SearchBar;
