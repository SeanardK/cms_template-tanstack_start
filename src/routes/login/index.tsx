import { Button, Flex, Input, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const handleLogin = () => {
    notifications.show({
      color: "green",
      message: "You have successfully logged in!",
      title: "Success Login",
      autoClose: 1500,
      onClose: () => {
        navigate({ to: "/portfolio" });
      },
    });
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div
          className={`w-1/2 h-full bg-[url(https://png.pngtree.com/background/20250102/original/pngtree-vivid-abstract-texture-a-burst-of-colorful-background-picture-image_15292555.jpg)] bg-no-repeat bg-cover`}
        ></div>

        <div className="w-1/2 flex items-center justify-center">
          <form className="max-w-3/5 w-full">
            <Title mb={"md"}>Login</Title>

            <Flex direction={"column"} gap={"sm"}>
              <Input.Wrapper label="Email or Username" required>
                <Input placeholder="Input Email or Username" />
              </Input.Wrapper>

              <Input.Wrapper label="Password" required>
                <Input placeholder="Input Password" type="password" />
              </Input.Wrapper>
            </Flex>

            <Button onClick={handleLogin} mt={"xl"} fullWidth size="md">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
