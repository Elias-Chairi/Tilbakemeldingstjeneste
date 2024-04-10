import LoginDialog from "./LoginDialog";

const LoginButton = (props) => {
  let dialogRef;

  return (
    <>
      <button onClick={() => dialogRef.showModal()}>
        {props.children}
      </button>
      <LoginDialog ref={dialogRef} />
    </>
  );
};

export default LoginButton;
